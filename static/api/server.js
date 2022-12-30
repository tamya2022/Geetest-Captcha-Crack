const {get_w1} = require(`${__dirname}/ck_fullpage_v1`)
const {get_w3} = require(`${__dirname}/ck_slide_v1`)
const fs = require('fs');
const express = require("express")
const bodyParser = require('body-parser');
const app = express()


String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

app.use(bodyParser.urlencoded({extended: true, limit: "200mb", parameterLimit: 500000}))
app.get('/', (req, res) => {
    res.send("welcome!")
});

app.post('/api_fullpage/get_w1', (req, res) => {
    let result = req.body;
    try {
        let w = get_w1(...Object.values(result))
        res.send({
            "msg": "success",
            "data": w
        })
    } catch (e) {
        console.log(e);
        res.send({
            "msg": "error",
            "data": -1
        })
    }
});

app.post("/api_slide/get_w3", (req, res) => {
    let result = req.body;
    c = result.c;
    s = result.s;
    gt = result.gt;
    challenge = result.challenge;
    slide_track_str = result.track;
    try {
        let w = get_w3(c, s, gt, challenge, slide_track_str)
        res.send({
            "msg": "success",
            "data": w
        })
    } catch (e) {
        console.log(e);
        res.send({
            "msg": "error",
            "data": -1
        })
    }
})
app.listen(3001, function () {
    console.log("监听端口3001成功....")
})
