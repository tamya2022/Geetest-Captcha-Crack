import io
import json
import random
import time

import requests
from PIL import Image

from error.GeetestException import GeetestException
from geetest import js
from utils.OcrUtil import OcrUtil


class GeetestThree:
    """
    极验三代
    """

    def __init__(self, gt: str, challenge: str, referer: str = 'https://www.geetest.com/'):
        self.__gt = gt
        self.__challenge = challenge
        """验证类型"""
        self.validation_type = None
        """静态资源路径"""
        self.__static_url = 'https://static.geetest.com/'
        """请求"""
        self.__requests = requests.session()
        """设置请求头"""
        self.__requests.headers = {
            "Referer": referer,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.33"
        }
        """第一步请求url"""
        self.__first_url = "https://api.geetest.com/gettype.php"
        """第二步请求url"""
        self.__second_url = "https://api.geetest.com/get.php"
        """第三步请求url"""
        self.__third_url = "https://api.geetest.com/ajax.php"
        """获取图片等参数url"""
        self.__get_url = "https://api.geetest.com/get.php"
        """校验url"""
        self.__verify_url = "https://api.geetest.com/ajax.php"
        """JS"""
        self.__js = js
        self.__js = js
        self.__js = js
        """aes_key"""
        self.__aes_key = self.__js.call('')
        """图片乱序还原数组"""
        self.__revert_arr = []
        """图片识别工具类"""
        self.__ocr_util = OcrUtil
        """加密参数"""
        self.__w = None
        self.__c = None
        self.__s = None
        """返回参数"""
        self.validate = None

    def __first_step(self):
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "gt": self.__gt,
            "callback": callback
        }
        self.__requests.get(self.__first_url, params=payload)
        return self

    def __second_step(self):
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "gt": self.__gt,
            "challenge": self.__challenge,
            "lang": "zh-cn",
            "pt": 0,
            "client_type": "web",
            "w": "",
            "callback": callback
        }
        resp_text = self.__requests.get(self.__second_url, params=payload).text
        print(resp_text)
        if resp_text.find('success') == -1:
            raise GeetestException("please check challenge value or gt value")
        data = json.loads(resp_text.replace(f'{callback}(', '').replace(')', ''))['data']
        self.__c = data['c']
        self.__s = data['s']
        return self

    def __third_step(self):
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "gt": self.__gt,
            "challenge": self.__challenge,
            "lang": "zh-cn",
            "pt": 0,
            "client_type": "web",
            "w": "",
            "callback": callback
        }
        resp_text = self.__requests.get(self.__third_url, params=payload).text
        data = json.loads(resp_text.replace(f"{callback}(", "").replace(")", ""))['data']
        if data['result'] == 'success':
            self.validate = data['validate']
            return 'sense'
        return data['result']

    @classmethod
    def __ease_out_expo(cls, sep):
        if sep == 1:
            return 1
        else:
            return 1 - pow(2, -10 * sep)

    def _get_slide_data(self, distance):
        """
        根据滑动距离生成滑动轨迹
        :param distance: 需要滑动的距离
        :return: 滑动轨迹<type 'list'>: [[x,y,t], ...]
            x: 已滑动的横向距离
            y: 已滑动的纵向距离, 除起点外, 均为0
            t: 滑动过程消耗的时间, 单位: 毫秒
        """
        return []

    def _revert_image(self, img_url: str) -> Image:
        """
        图片乱序还原
        :param img_url: 图片地址
        :return:
        """
        image = Image.open(io.BytesIO(requests.get(img_url).content))
        return image

    def __slider_validation(self):
        """
        滑块
        :return:
        """
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "is_next": "true",
            "type": "slide3",
            "gt": self.__gt,
            "challenge": self.__challenge,
            "lang": "zh-cn",
            "https": True,
            "protocol": "https://",
            "offline": False,
            "product": "embed",
            "api_server": "api.geetest.com",
            "isPC": "true",
            "autoReset": True,
            "width": "100%",
            "callback": callback
        }
        resp_text = self.__requests.get(self.__get_url, params=payload).text
        data = json.loads(resp_text.replace(f"{callback}(", "").replace(")", ""))
        print(data)
        c = data['c']
        s = data['s']
        self.__gt = data['gt']
        self.__challenge = data['challenge']
        bg_img = self.__static_url + data['bg']
        slice_img = self.__static_url + data['slice']
        bg_img = self._revert_image(bg_img)
        """获取滑块缺口距离"""
        distance = self.__ocr_util.get_slide_distance(bg_img, slice_img, True)
        """生成滑块轨迹"""
        slide_data = self._get_slide_data(distance)
        self.__w = self.__js.call('get_w', c, s, self.__gt, self.__challenge, slide_data, random.randint(10, 50))
        return self

    def __click_word_validation(self):
        """
        文字点选
        :return:
        """
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "is_next": "true",
            "type": "click",
            "gt": self.__gt,
            "challenge": self.__challenge,
            "lang": "zh-cn",
            "https": True,
            "protocol": "https://",
            "offline": False,
            "product": "embed",
            "api_server": "api.geetest.com",
            "isPC": "true",
            "autoReset": True,
            "width": "100%",
            "callback": callback
        }
        resp_text = self.__requests.get(self.__get_url, params=payload).text
        data = json.loads(resp_text.replace(f"{callback}(", "").replace(")", ""))['data']
        c = data['c']
        s = data['s']
        pic = data['pic']
        pic_url = self.__static_url + pic
        img = Image.open(io.BytesIO(requests.get(pic_url).content))
        word_img = img.crop((0, 344, 116, 384))
        words = self.__ocr_util.get_word(word_img)
        xy_img = img.crop((0, 0, 344, 344))
        xys = self.__ocr_util.get_xy(xy_img)
        points = list()
        for word in words:
            if not xys.get(word):
                raise GeetestException('识别失败，请重试')
            xy = xys[word]
            x = xy[0]
            y = xy[1]
            points.append(f'{x}_{y}')
        points = ",".join(points)
        time.sleep(1.5)
        return self

    def __verify(self):
        callback = f'geetest_{int(time.time() * 1000)}'
        payload = {
            "gt": self.__gt,
            "challenge": self.__challenge,
            "lang": "zh-cn",
            "pt": "0",
            "client_type": "web",
            "w": self.__w,
            "callback": callback
        }
        resp_text = self.__requests.get(self.__verify_url, params=payload).text
        if resp_text.find('validate') > -1:
            data = json.loads(resp_text.replace(f"{callback}(", "").replace(")", ""))
            data = data['data'] if resp_text.find('data') > -1 else data
            self.validate = data['validate']
        else:
            raise GeetestException('verify fail,please again')

    def validation(self):
        """
        校验
        :return:
        """
        result_type = self.__first_step().__second_step().__third_step()
        self.validation_type = result_type
        if result_type == 'sense':
            pass
        elif result_type == 'click':
            self.__click_word_validation().__verify()
        elif result_type == 'slide':
            self.__slider_validation().__verify()
        else:
            raise Exception('unknown type')
        return self.validate, self.validation_type
