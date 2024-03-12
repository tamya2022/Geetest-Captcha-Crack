<p align="center">
<img src="https://cdn.kagamiz.com/Geetest3-Crack/geetest.svg" width="300">
</p>

<h3 align="center">Geetest极验三代滑动逆向</h3>

## 免责声明
本项目主要使用Python和Nodejs开发，仅用于学习交流, 不得用于任何商业用途!!!
注：截至2024-03-12 本代码已失效

## 使用说明
启动：先运行 ./static/js/server.js ,然后选择运行 geetest_slide.py
版本：fullpage 9.1.1 slide 7.8.9
补充：不同的网站只需要替换该网站对应的极验token(即gt值)即可

## 轨迹收集
修改slide.7.8.9.js文件，在文件开头定义了一个全局变量window.aaa = []，在轨迹加密位置将轨迹数组添加进变量即window.aaa.push()。

## 错误结果
```
// challenge 不对
geetest_xxxxxxxxxxxxx({"status": "error", "error": "illegal challenge", "user_error": "\u7f51\u7edc\u4e0d\u7ed9\u529b", "error_code": "error_23"})
// w 不对
geetest_xxxxxxxxxxxxx({"status": "error", "error": "param decrypt error", "user_error": "\u7f51\u7edc\u4e0d\u7ed9\u529b", "error_code": "error_03"})
// 无轨迹
geetest_xxxxxxxxxxxxx({"status": "error", "error": "not proof", "user_error": "\u7f51\u7edc\u4e0d\u7ed9\u529b", "error_code": "error_21"})
// 轨迹、缺口距离、参数问题
geetest_xxxxxxxxxxxxx({"success": 0, "message": "fail"})
geetest_xxxxxxxxxxxxx({"success": 0, "message": "forbidden"})
```

## 结果验证
![测试结果.png](http://tva1.sinaimg.cn/large/007nbYLzly1h9m7ez35laj30tu070dp7.jpg)
