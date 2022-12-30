function $_BEG(t, e) {
    t = t["$_CGz"], e = e["$_CGz"];
    // 312，160
    var n = t["width"],
        r = t["height"],
        i = h["createElement"]("canvas");
    // h为document, i是canvas对象，目的是对图像操作用来把图片裁剪出来
    i["width"] = n, i["height"] = r;
    var o = i["getContext"]("2d");
    o["drawImage"](t, 0, 0);
    var s = e["getContext"]("2d");
    e["height"] = r, e["width"] = 260;
    // a = 80，原本 312x160 的图被切分为 52块 10x80，最后一共拼成一个 260x160 的图
    for (var a = r / 2, _ = 0; _ < 52; _ += 1) {
        var c = Ut[_] % 26 * 12 + 1,
            u = 25 < Ut[_] ? a : 0,
            l = o["getImageData"](c, u, 10, a);
        s["putImageData"](l, _ % 26 * 10, 25 < _ ? a : 0);
    }
}