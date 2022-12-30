import io
import json
import re
import time
import traceback
from PIL import Image
import requests
from loguru import logger
import sys
from utils.custom_track import get_slide_track
from utils.dddocr_img import get_notch_position_x

# 移除控制台输出
logger.remove(handler_id=None)
logger.add("./log/slide/geetest_slide_log.log", rotation='00:00', level="INFO", encoding='utf-8')
logger.add(sys.stdout, level="INFO")


class ResultException(Exception):
    def __init__(self, error='ResultException'):
        Exception.__init__(self, error)
        self.error = error

    def __str__(self):
        return self.error


class JiyanTrack(object):
    def __init__(self):
        with open("./static/json/tracks.json", "r") as f:
            self.tracks_json = json.load(f)

    @staticmethod
    def get_standard_img(content: bytes) -> object:
        """
        :param content: 二进制图片
        :return: 还原后的图片对象
        """
        ut_position = [39, 38, 48, 49, 41, 40, 46, 47, 35, 34, 50, 51, 33, 32, 28, 29, 27, 26, 36, 37, 31, 30, 44, 45,
                       43,
                       42, 12, 13, 23, 22, 14, 15, 21, 20, 8, 9, 25, 24, 6, 7, 3, 2, 0, 1, 11, 10, 4, 5, 19, 18, 16, 17]
        image = Image.open(io.BytesIO(content))
        standard_img = Image.new("RGBA", (260, 160))
        IMG_SHUFFLE_X_STEP = 10
        IMG_SHUFFLE_Y_STEP = 80
        for _ in range(52):
            x = ut_position[_] % 26 * 12 + 1
            y = IMG_SHUFFLE_Y_STEP if ut_position[_] > 25 else 0
            cut = image.crop(box=(x, y, x + IMG_SHUFFLE_X_STEP, y + IMG_SHUFFLE_Y_STEP))
            standard_img.paste(cut, box=(_ % 26 * 10, IMG_SHUFFLE_Y_STEP if _ > 25 else 0))
        return standard_img

    def download_captcha_image(self, session: object, gap_bg_url: str, full_bg_url: str) -> tuple:
        """
        对滑块所需的图片进行还原,保存
        @param gap_bg_url: 带缺口的背景url
        @param full_bg_url: 不带缺口的背景url
        @return: 还原后的图片对象
        """
        try:
            res_gap_bg = session.get(url=gap_bg_url, timeout=5)
            res_full_bg = session.get(url=full_bg_url, timeout=5)
            # 还原背景图
            standard_res_gap_bg = self.get_standard_img(res_gap_bg.content)
            standard_res_full_bg = self.get_standard_img(res_full_bg.content)

            logger.debug("图片获取成功")
            return standard_res_gap_bg, standard_res_full_bg
        except Exception as e:
            logger.error(f"图片获取失败")
            raise e

    @staticmethod
    def get_distance(gap_bg_obj: object, full_bg_obj: object) -> int:
        """
          拿到滑动验证码需要移动的距离
          :param gap_bg_obj:带缺口的图片对象
          :param full_bg_obj:没有缺口的图片对象
          :return:需要移动的距离
        """
        distance = get_notch_position_x(gap_bg_obj, full_bg_obj)
        return distance


class GeetestSlide(JiyanTrack):
    def __init__(self):
        super().__init__()
        self.session = requests.session()
        self.x = 6
        self.host = "https://static.geetest.com/"
        self.api_fullpage_1 = "http://127.0.0.1:3001/api_fullpage/get_w1"
        self.api_slide = "http://127.0.0.1:3001/api_slide/get_w3"

        self.url_challenge = "https://www.geetest.com/demo/gt/register-slide-official"
        self.url_gettype = "https://api.geetest.com/gettype.php"  # 非必要请求
        self.url_resources = "https://api.geetest.com/get.php"
        self.url_ajax = "https://api.geetest.com/ajax.php"

    def _get_nowTime(self):
        return int(time.time() * 1000)

    def get_gt_challenge(self) -> tuple:
        """
        获取验证ID及验证流水号;即初始gt以及challenge
        :return: gt,challenge
        """
        try:
            params = {
                "t": int(time.time() * 1000)
            }
            response = self.session.get(url=self.url_challenge, params=params)
            logger.debug(f"获取初始gt_challenge成功 -> {response.status_code, response.json()}")
            return response.json()["gt"], response.json()["challenge"]
        except Exception as e:
            raise e

    def get_w1(self, gt, challenge):
        api_payload = {
            "gt": gt,
            "challenge": challenge
        }
        try:
            res_api = self.session.post(url=self.api_fullpage_1, data=api_payload).json()
            if res_api["msg"] == "success":
                return res_api["data"]
            else:
                raise ResultException("参数w获取失败")
        except ResultException as e:
            raise e

    def get_s_c_info(self, gt: str, challenge: str, w1: str) -> dict:
        params = {
            "gt": gt,
            "challenge": challenge,
            "lang": "zh-cn",
            "pt": 0,
            "client_type": "web",
            "w": w1,
        }
        try:
            response = self.session.get(url=self.url_resources, params=params)
            response_dict = response.text[1:-1]
            response_dict = json.loads(response_dict)
            logger.debug(f"获取验证的基本参数成功 -> {response.status_code, response_dict}")
            return response_dict
        except Exception as e:
            logger.error(f"参数解析失败 -> {response.text}")
            raise e

    def get_geetest_ajax_user(self, gt: str, challenge: str):
        """
        获取验证方式
        @param e_e: 加密所需的随机字符串
        @param gt:
        @param challenge:
        @param s: 加密所需字符串,上一步请求的响应所得
        @return:
        """
        try:
            params = {
                "gt": gt,
                "challenge": challenge,
                "lang": "zh-cn",
                "pt": 0,
                "client_type": "web",
                # 本次介绍的内容是滑动验证，fullpage发起的无感验证的请求里面加密的w参数随便填，w2值可置空, 留作扩展。
                "w": "",
            }
            response = self.session.get(url=self.url_ajax, params=params)
            response_dict = response.text[1:-1]
            response_dict = json.loads(response_dict)
            logger.debug(f"获取验证方式成功 -> {response.status_code, response_dict}")
        except Exception as e:
            logger.error(f"参数解析失败 -> {response.text}")
            raise e

    def get_material(self, gt: str, challenge: str) -> tuple:
        """
        获取验证素材信息
        @param gt:
        @param challenge:
        @return: id，新的验证ID及验证流水号，加密所需的s，背景、滑块和gct.js的地址
        """
        try:
            params = {
                "is_next": "true",
                "type": "slide3",
                "gt": gt,
                "challenge": challenge,
                "lang": "zh-cn",
                "https": "true",
                "protocol": "https://",
                "offline": "false",
                "product": "embed",
                "api_server": "api.geetvisit.com",
                "isPC": "true",
                "autoReset": "true",
                "width": "100%",
            }
            response = self.session.get(url=self.url_resources, params=params)
            data = re.search(r"new Geetest\((.*?),true\)", response.text).group(1)
            data_dict = eval(data.replace("true", "'true'").replace("false", "'false'"))
            logger.debug("获取验证素材信息成功")
            gt = data_dict["gt"]
            s = data_dict["s"]
            challenge = data_dict["challenge"]
            id = data_dict["id"]
            gap_bg = data_dict["bg"]  # 带缺口的背景
            full_bg = data_dict["fullbg"]  # 不带缺口的背景
            slice = data_dict["slice"]  # 缺口小图
            gct_path = data_dict["gct_path"][1:]  # gct.js的地址
            return gt, challenge, s, id, gap_bg, full_bg, slice, gct_path
        except Exception as e:
            logger.error(f"参数解析失败 -> {response.text}")
            raise e

    def get_distance_track(self, session: object, gap_bg_url: str, full_bg_url: str) -> list:
        """
        :param gap_bg_url: 带缺口的图片url
        :param full_bg_url: 不带缺口的图片url
        :return: 距离,轨迹,耗时
        """
        try:
            # 获取还原后的图片对象
            standard_res_gap_bg, standard_res_full_bg = self.download_captcha_image(session, gap_bg_url, full_bg_url)
            #  获取距离
            distance = self.get_distance(standard_res_gap_bg, standard_res_full_bg) - self.x
            #  获取轨迹
            track = self.choice_track_1(distance)
            return track
        except Exception as e:
            logger.error("获取轨迹失败")
            raise e

    def get_w3(self, c, s, gt_new, challenge_new, slide_track):
        # print(str(slide_track))
        api_payload = {
            "gt": gt_new,
            "challenge": challenge_new,
            "c": str(c),
            "s": s,
            "track": str(slide_track),
        }
        res_api = self.session.post(url=self.api_slide, data=api_payload).json()
        if res_api["msg"] == "success":
            return res_api["data"]
        else:
            raise ResultException("参数w3获取失败")

    def get_validate(self, gt: str, challenge: str, w3):
        try:
            params = {
                "gt": gt,
                "challenge": challenge,
                "lang": "zh-cn",
                "$_BCw": 0,
                "client_type": "web",
                "w": w3,
                # "callback": "geetest_{}".format(self._get_nowTime()),
            }
            response = self.session.get(url=self.url_ajax, params=params)
            response_dict = response.text[1:-1]
            response_dict = json.loads(response_dict)
            if response_dict["message"] == "success":
                logger.success(f"验证通过 -> {response.status_code, response_dict}")
                return response_dict["validate"]
            elif response_dict["message"] == "fail":
                logger.warning(f"验证不通过,未能正确拼合图像 -> {response.status_code, response_dict}")
                return None
            elif response_dict["message"] == "forbidden":
                logger.warning(f"轨迹验证不通过 -> {response.status_code, response_dict}")
                return None
        except ResultException as e:
            raise e
        except Exception as e:
            logger.error(f"参数解析失败 -> {response.text}")
            raise e

    def choice_track_1(self, distance: int) -> list:
        for track in self.tracks_json:
            if distance == track[-1][0]:
                return track
        logger.debug("未找到途径，采用快速算法")
        new_track_list = get_slide_track(distance)
        return new_track_list

    def main(self):
        try:
            # 第一步 获取验证码图片信息
            gt, challenge = self.get_gt_challenge()
            # 1、获取w1参数
            w1 = self.get_w1(gt, challenge)
            logger.debug(f"生成加密参数：\nw1 -> {w1}\n")
            # 2、获取s，c。s用于生成w2，由于滑动验证，w2可以直接置空
            config_info = self.get_s_c_info(gt, challenge, w1)
            s = config_info['data']['s']
            c = config_info['data']['c']
            # 第二步 验证码缺口识别
            # 1、获取验证码类型 - slide
            self.get_geetest_ajax_user(gt, challenge)
            # 2、获取图片素材
            gt_new, challenge_new, s_new, id, gap_bg, full_bg, slice, gct_path = self.get_material(gt, challenge)
            # 3、获取滑动轨迹
            slide_track = self.get_distance_track(self.session, self.host + gap_bg, self.host + full_bg)
            # 4、加密轨迹
            w3 = self.get_w3(c, s_new, gt_new, challenge_new, slide_track)
            # 5、提交验证
            self.get_validate(gt_new, challenge_new, w3)
        except Exception:
            logger.error(traceback.format_exc())


def test_func():
    geetest = GeetestSlide()
    c = [12, 58, 98, 36, 43, 95, 62, 15, 12]
    s = "5049286c"
    gt_new = "ff3cd843746782b0e0f377c2d234d6a5"
    challenge_new = "274442570249e5058a830c7770a47eacce"
    slide_track = [[-31, -36, 0], [0, 0, 0], [0, 1, 157], [1, 1, 293], [2, 1, 333],
                   [3, 1, 341], [4, 1, 365], [5, 1, 374], [6, 1, 382], [7, 1, 408],
                   [8, 1, 424], [9, 1, 429], [10, 1, 457], [11, 1, 461], [12, 1, 477],
                   [13, 1, 486], [14, 1, 493], [15, 1, 509], [17, 1, 525], [18, 1, 542],
                   [19, 1, 549], [20, 1, 558], [21, 1, 565], [23, 1, 613], [24, 1, 640],
                   [26, 1, 661], [27, 1, 693], [28, 1, 709], [29, 1, 717], [30, 1, 725],
                   [31, 1, 741], [32, 1, 749], [33, 1, 757], [34, 1, 774], [35, 1, 797],
                   [36, 1, 824], [37, 1, 840], [38, 1, 847], [39, 1, 893], [40, 1, 917],
                   [41, 1, 1013], [42, 1, 1109], [43, 1, 1125], [44, 1, 1149],
                   [45, 1, 1442], [46, 1, 1477], [47, 1, 1486], [48, 1, 1624],
                   [49, 1, 1781], [49, 1, 2149]]
    w3 = geetest.get_w3(c, s, gt_new, challenge_new, slide_track)
    geetest.get_validate(gt_new, challenge_new, w3)


if __name__ == '__main__':
    geetest = GeetestSlide()
    for i in range(1, 10):
        geetest.main()
        time.sleep(1)
