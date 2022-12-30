var window = {
    document: {
        body: "body",
        getElementsByTagName: function (name) {
            return name;
        },
        documentElement: function (name) {
            return name;
        },
        createElement: function (name) {
            if (name == "canvas") {
                return myCanvasElement;
            }
            return name;
        },
        compatMode: 'CSS1Compat'
    },
    location: {
        "ancestorOrigins": {},
        "href": "https://www.geetest.com/demo/slide-float.html",
        "origin": "https://www.geetest.com",
        "protocol": "https:",
        "host": "www.geetest.com",
        "hostname": "www.geetest.com",
        "port": "",
        "pathname": "/demo/slide-float.html",
        "search": "",
        "hash": "",
        toString: function () {
            return "https://www.geetest.com/demo/slide-float.html"
        }
    },
    navigator: {
        userAgent: "python"
    }
};

Ve = window["navigator"];
var U = function () {
    function n() {
        this["i"] = 0, this["j"] = 0, this["S"] = [];
    }

    n["prototype"]["init"] = function S(e) {
        var t, n, r;
        for (t = 0; t < 256; ++t) this["S"][t] = t;
        for (t = n = 0; t < 256; ++t) n = n + this["S"][t] + e[t % e["length"]] & 255, r = this["S"][t], this["S"][t] = this["S"][n], this["S"][n] = r;
        this["i"] = 0, this["j"] = 0;
    }, n["prototype"]["next"] = function C() {
        var e;
        return this["i"] = this["i"] + 1 & 255, this["j"] = this["j"] + this["S"][this["i"]] & 255, e = this["S"][this["i"]], this["S"][this["i"]] = this["S"][this["j"]], this["S"][this["j"]] = e, this["S"][e + this["S"][this["i"]] & 255];
    };
    var r,
        o,
        i,
        e,
        a = 256;
    if (null == o) {
        var t;
        o = [], i = 0;
        try {
            if (window["crypto"] && window["crypto"]["getRandomValues"]) {
                var s = new Uint32Array(256);
                for (window["crypto"]["getRandomValues"](s), t = 0; t < s["length"]; ++t) o[i++] = 255 & s[t];
            }
        } catch (T) {
        }
        var c = 0,
            u = function (e) {
                if (256 <= (c = c || 0) || a <= i) window["removeEventListener"] ? (c = 0, window["removeEventListener"]("mousemove", u, !1)) : window["detachEvent"] && (c = 0, window["detachEvent"]("onmousemove", u)); else try {
                    var t = e["x"] + e["y"];
                    o[i++] = 255 & t, c += 1;
                } catch (T) {
                }
            };
        window["addEventListener"] ? window["addEventListener"]("mousemove", u, !1) : window["attachEvent"] && window["attachEvent"]("onmousemove", u);
    }

    function l() {
        if (null == r) {
            r = function t() {
                return new n();
            }();
            while (i < a) {
                var e = Math["floor"](65536 * Math["random"]());
                o[i++] = 255 & e;
            }
            for (r["init"](o), i = 0; i < o["length"]; ++i) o[i] = 0;
            i = 0;
        }
        return r["next"]();
    }

    function _() {
    }

    _["prototype"]["nextBytes"] = function A(e) {
        var t;
        for (t = 0; t < e["length"]; ++t) e[t] = l();
    };

    function w(e, t, n) {
        null != e && ("number" == typeof e ? this["fromNumber"](e, t, n) : null == t && "string" != typeof e ? this["fromString"](e, 256) : this["fromString"](e, t));
    }

    function y() {
        return new w(null);
    }

    e = "Microsoft Internet Explorer" == Ve["appName"] ? (w["prototype"]["am"] = function k(e, t, n, r, o, i) {
        var a = 32767 & t,
            s = t >> 15;
        while (0 <= --i) {
            var c = 32767 & this[e],
                u = this[e++] >> 15,
                l = s * c + u * a;
            o = ((c = a * c + ((32767 & l) << 15) + n[r] + (1073741823 & o)) >>> 30) + (l >>> 15) + s * u + (o >>> 30), n[r++] = 1073741823 & c;
        }
        return o;
    }, 30) : "Netscape" != Ve["appName"] ? (w["prototype"]["am"] = function M(e, t, n, r, o, i) {
        while (0 <= --i) {
            var a = t * this[e++] + n[r] + o;
            o = Math["floor"](a / 67108864), n[r++] = 67108863 & a;
        }
        return o;
    }, 26) : (w["prototype"]["am"] = function P(e, t, n, r, o, i) {
        var a = 16383 & t,
            s = t >> 14;
        while (0 <= --i) {
            var c = 16383 & this[e],
                u = this[e++] >> 14,
                l = s * c + u * a;
            o = ((c = a * c + ((16383 & l) << 14) + n[r] + o) >> 28) + (l >> 14) + s * u, n[r++] = 268435455 & c;
        }
        return o;
    }, 28), w["prototype"]["DB"] = e, w["prototype"]["DM"] = (1 << e) - 1, w["prototype"]["DV"] = 1 << e;
    w["prototype"]["FV"] = Math["pow"](2, 52), w["prototype"]["F1"] = 52 - e, w["prototype"]["F2"] = 2 * e - 52;
    var f,
        p,
        h = "0123456789abcdefghijklmnopqrstuvwxyz",
        d = [];
    for (f = "0"["charCodeAt"](0), p = 0; p <= 9; ++p) d[f++] = p;
    for (f = "a"["charCodeAt"](0), p = 10; p < 36; ++p) d[f++] = p;
    for (f = "A"["charCodeAt"](0), p = 10; p < 36; ++p) d[f++] = p;

    function g(e) {
        return h["charAt"](e);
    }

    function v(e) {
        var t = y();
        return t["fromInt"](e), t;
    }

    function x(e) {
        var t,
            n = 1;
        return 0 != (t = e >>> 16) && (e = t, n += 16), 0 != (t = e >> 8) && (e = t, n += 8), 0 != (t = e >> 4) && (e = t, n += 4), 0 != (t = e >> 2) && (e = t, n += 2), 0 != (t = e >> 1) && (e = t, n += 1), n;
    }

    function m(e) {
        this["m"] = e;
    }

    function b(e) {
        this["m"] = e, this["mp"] = e["invDigit"](), this["mpl"] = 32767 & this["mp"], this["mph"] = this["mp"] >> 15, this["um"] = (1 << e["DB"] - 15) - 1, this["mt2"] = 2 * e["t"];
    }

    function E() {
        this["n"] = null, this["e"] = 0, this["d"] = null, this["p"] = null, this["q"] = null, this["dmp1"] = null, this["dmq1"] = null, this["coeff"] = null;
        this["setPublic"]("00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81", "10001");
    }

    return m["prototype"]["convert"] = function R(e) {
        return e["s"] < 0 || 0 <= e["compareTo"](this["m"]) ? e["mod"](this["m"]) : e;
    }, m["prototype"]["revert"] = function O(e) {
        return e;
    }, m["prototype"]["reduce"] = function D(e) {
        e["divRemTo"](this["m"], null, e);
    }, m["prototype"]["mulTo"] = function L(e, t, n) {
        e["multiplyTo"](t, n), this["reduce"](n);
    }, m["prototype"]["sqrTo"] = function N(e, t) {
        e["squareTo"](t), this["reduce"](t);
    }, b["prototype"]["convert"] = function F(e) {
        var t = y();
        return e["abs"]()["dlShiftTo"](this["m"]["t"], t), t["divRemTo"](this["m"], null, t), e["s"] < 0 && 0 < t["compareTo"](w["ZERO"]) && this["m"]["subTo"](t, t), t;
    }, b["prototype"]["revert"] = function I(e) {
        var t = y();
        return e["copyTo"](t), this["reduce"](t), t;
    }, b["prototype"]["reduce"] = function j(e) {
        while (e["t"] <= this["mt2"]) e[e["t"]++] = 0;
        for (var t = 0; t < this["m"]["t"]; ++t) {
            var n = 32767 & e[t],
                r = n * this["mpl"] + ((n * this["mph"] + (e[t] >> 15) * this["mpl"] & this["um"]) << 15) & e["DM"];
            e[n = t + this["m"]["t"]] += this["m"]["am"](0, r, e, t, 0, this["m"]["t"]);
            while (e[n] >= e["DV"]) e[n] -= e["DV"], e[++n]++;
        }
        e["clamp"](), e["drShiftTo"](this["m"]["t"], e), 0 <= e["compareTo"](this["m"]) && e["subTo"](this["m"], e);
    }, b["prototype"]["mulTo"] = function B(e, t, n) {
        e["multiplyTo"](t, n), this["reduce"](n);
    }, b["prototype"]["sqrTo"] = function H(e, t) {
        e["squareTo"](t), this["reduce"](t);
    }, w["prototype"]["copyTo"] = function G(e) {
        for (var t = this["t"] - 1; 0 <= t; --t) e[t] = this[t];
        e["t"] = this["t"], e["s"] = this["s"];
    }, w["prototype"]["fromInt"] = function U(e) {
        this["t"] = 1, this["s"] = e < 0 ? -1 : 0, 0 < e ? this[0] = e : e < -1 ? this[0] = e + this["DV"] : this["t"] = 0;
    }, w["prototype"]["fromString"] = function V(e, t) {
        var n;
        if (16 == t) n = 4; else if (8 == t) n = 3; else if (256 == t) n = 8; else if (2 == t) n = 1; else if (32 == t) n = 5; else {
            if (4 != t) return void this["fromRadix"](e, t);
            n = 2;
        }
        this["t"] = 0, this["s"] = 0;
        var r,
            o,
            i = e["length"],
            a = !1,
            s = 0;
        while (0 <= --i) {
            var c = 8 == n ? 255 & e[i] : (r = i, null == (o = d[e["charCodeAt"](r)]) ? -1 : o);
            c < 0 ? "-" == e["charAt"](i) && (a = !0) : (a = !1, 0 == s ? this[this["t"]++] = c : s + n > this["DB"] ? (this[this["t"] - 1] |= (c & (1 << this["DB"] - s) - 1) << s, this[this["t"]++] = c >> this["DB"] - s) : this[this["t"] - 1] |= c << s, (s += n) >= this["DB"] && (s -= this["DB"]));
        }
        8 == n && 0 != (128 & e[0]) && (this["s"] = -1, 0 < s && (this[this["t"] - 1] |= (1 << this["DB"] - s) - 1 << s)), this["clamp"](), a && w["ZERO"]["subTo"](this, this);
    }, w["prototype"]["clamp"] = function W() {
        var e = this["s"] & this["DM"];
        while (0 < this["t"] && this[this["t"] - 1] == e) --this["t"];
    }, w["prototype"]["dlShiftTo"] = function X(e, t) {
        var n;
        for (n = this["t"] - 1; 0 <= n; --n) t[n + e] = this[n];
        for (n = e - 1; 0 <= n; --n) t[n] = 0;
        t["t"] = this["t"] + e, t["s"] = this["s"];
    }, w["prototype"]["drShiftTo"] = function q(e, t) {
        for (var n = e; n < this["t"]; ++n) t[n - e] = this[n];
        t["t"] = Math["max"](this["t"] - e, 0), t["s"] = this["s"];
    }, w["prototype"]["lShiftTo"] = function z(e, t) {
        var n,
            r = e % this["DB"],
            o = this["DB"] - r,
            i = (1 << o) - 1,
            a = Math["floor"](e / this["DB"]),
            s = this["s"] << r & this["DM"];
        for (n = this["t"] - 1; 0 <= n; --n) t[n + a + 1] = this[n] >> o | s, s = (this[n] & i) << r;
        for (n = a - 1; 0 <= n; --n) t[n] = 0;
        t[a] = s, t["t"] = this["t"] + a + 1, t["s"] = this["s"], t["clamp"]();
    }, w["prototype"]["rShiftTo"] = function $(e, t) {
        t["s"] = this["s"];
        var n = Math["floor"](e / this["DB"]);
        if (n >= this["t"]) t["t"] = 0; else {
            var r = e % this["DB"],
                o = this["DB"] - r,
                i = (1 << r) - 1;
            t[0] = this[n] >> r;
            for (var a = n + 1; a < this["t"]; ++a) t[a - n - 1] |= (this[a] & i) << o, t[a - n] = this[a] >> r;
            0 < r && (t[this["t"] - n - 1] |= (this["s"] & i) << o), t["t"] = this["t"] - n, t["clamp"]();
        }
    }, w["prototype"]["subTo"] = function Y(e, t) {
        var n = 0,
            r = 0,
            o = Math["min"](e["t"], this["t"]);
        while (n < o) r += this[n] - e[n], t[n++] = r & this["DM"], r >>= this["DB"];
        if (e["t"] < this["t"]) {
            r -= e["s"];
            while (n < this["t"]) r += this[n], t[n++] = r & this["DM"], r >>= this["DB"];
            r += this["s"];
        } else {
            r += this["s"];
            while (n < e["t"]) r -= e[n], t[n++] = r & this["DM"], r >>= this["DB"];
            r -= e["s"];
        }
        t["s"] = r < 0 ? -1 : 0, r < -1 ? t[n++] = this["DV"] + r : 0 < r && (t[n++] = r), t["t"] = n, t["clamp"]();
    }, w["prototype"]["multiplyTo"] = function K(e, t) {
        var n = this["abs"](),
            r = e["abs"](),
            o = n["t"];
        t["t"] = o + r["t"];
        while (0 <= --o) t[o] = 0;
        for (o = 0; o < r["t"]; ++o) t[o + n["t"]] = n["am"](0, r[o], t, o, 0, n["t"]);
        t["s"] = 0, t["clamp"](), this["s"] != e["s"] && w["ZERO"]["subTo"](t, t);
    }, w["prototype"]["squareTo"] = function J(e) {
        var t = this["abs"](),
            n = e["t"] = 2 * t["t"];
        while (0 <= --n) e[n] = 0;
        for (n = 0; n < t["t"] - 1; ++n) {
            var r = t["am"](n, t[n], e, 2 * n, 0, 1);
            (e[n + t["t"]] += t["am"](n + 1, 2 * t[n], e, 2 * n + 1, r, t["t"] - n - 1)) >= t["DV"] && (e[n + t["t"]] -= t["DV"], e[n + t["t"] + 1] = 1);
        }
        0 < e["t"] && (e[e["t"] - 1] += t["am"](n, t[n], e, 2 * n, 0, 1)), e["s"] = 0, e["clamp"]();
    }, w["prototype"]["divRemTo"] = function Z(e, t, n) {
        var r = e["abs"]();
        if (!(r["t"] <= 0)) {
            var o = this["abs"]();
            if (o["t"] < r["t"]) return null != t && t["fromInt"](0), void (null != n && this["copyTo"](n));
            null == n && (n = y());
            var i = y(),
                a = this["s"],
                s = e["s"],
                c = this["DB"] - x(r[r["t"] - 1]);
            0 < c ? (r["lShiftTo"](c, i), o["lShiftTo"](c, n)) : (r["copyTo"](i), o["copyTo"](n));
            var u = i["t"],
                l = i[u - 1];
            if (0 != l) {
                var _ = l * (1 << this["F1"]) + (1 < u ? i[u - 2] >> this["F2"] : 0),
                    f = this["FV"] / _,
                    p = (1 << this["F1"]) / _,
                    h = 1 << this["F2"],
                    d = n["t"],
                    g = d - u,
                    v = null == t ? y() : t;
                i["dlShiftTo"](g, v), 0 <= n["compareTo"](v) && (n[n["t"]++] = 1, n["subTo"](v, n)), w["ONE"]["dlShiftTo"](u, v), v["subTo"](i, i);
                while (i["t"] < u) i[i["t"]++] = 0;
                while (0 <= --g) {
                    var m = n[--d] == l ? this["DM"] : Math["floor"](n[d] * f + (n[d - 1] + h) * p);
                    if ((n[d] += i["am"](0, m, n, g, 0, u)) < m) {
                        i["dlShiftTo"](g, v), n["subTo"](v, n);
                        while (n[d] < --m) n["subTo"](v, n);
                    }
                }
                null != t && (n["drShiftTo"](u, t), a != s && w["ZERO"]["subTo"](t, t)), n["t"] = u, n["clamp"](), 0 < c && n["rShiftTo"](c, n), a < 0 && w["ZERO"]["subTo"](n, n);
            }
        }
    }, w["prototype"]["invDigit"] = function Q() {
        if (this["t"] < 1) return 0;
        var e = this[0];
        if (0 == (1 & e)) return 0;
        var t = 3 & e;
        return 0 < (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this["DV"]) % this["DV"]) ? this["DV"] - t : -t;
    }, w["prototype"]["isEven"] = function ee() {
        return 0 == (0 < this["t"] ? 1 & this[0] : this["s"]);
    }, w["prototype"]["exp"] = function te(e, t) {
        if (4294967295 < e || e < 1) return w["ONE"];
        var n = y(),
            r = y(),
            o = t["convert"](this),
            i = x(e) - 1;
        o["copyTo"](n);
        while (0 <= --i) if (t["sqrTo"](n, r), 0 < (e & 1 << i)) t["mulTo"](r, o, n); else {
            var a = n;
            n = r, r = a;
        }
        return t["revert"](n);
    }, w["prototype"]["toString"] = function ne(e) {
        if (this["s"] < 0) return "-" + this["negate"]()["toString"](e);
        var t;
        if (16 == e) t = 4; else if (8 == e) t = 3; else if (2 == e) t = 1; else if (32 == e) t = 5; else {
            if (4 != e) return this["toRadix"](e);
            t = 2;
        }
        var n,
            r = (1 << t) - 1,
            o = !1,
            i = "",
            a = this["t"],
            s = this["DB"] - a * this["DB"] % t;
        if (0 < a--) {
            s < this["DB"] && 0 < (n = this[a] >> s) && (o = !0, i = g(n));
            while (0 <= a) s < t ? (n = (this[a] & (1 << s) - 1) << t - s, n |= this[--a] >> (s += this["DB"] - t)) : (n = this[a] >> (s -= t) & r, s <= 0 && (s += this["DB"], --a)), 0 < n && (o = !0), o && (i += g(n));
        }
        return o ? i : "0";
    }, w["prototype"]["negate"] = function re() {
        var e = y();
        return w["ZERO"]["subTo"](this, e), e;
    }, w["prototype"]["abs"] = function oe() {
        return this["s"] < 0 ? this["negate"]() : this;
    }, w["prototype"]["compareTo"] = function $_Fl(e) {
        var t = this["s"] - e["s"];
        if (0 != t) return t;
        var n = this["t"];
        if (0 != (t = n - e["t"])) return this["s"] < 0 ? -t : t;
        while (0 <= --n) if (0 != (t = this[n] - e[n])) return t;
        return 0;
    }, w["prototype"]["bitLength"] = function ae() {
        return this["t"] <= 0 ? 0 : this["DB"] * (this["t"] - 1) + x(this[this["t"] - 1] ^ this["s"] & this["DM"]);
    }, w["prototype"]["mod"] = function $_GJ(e) {
        var t = y();
        return this["abs"]()["divRemTo"](e, null, t), this["s"] < 0 && 0 < t["compareTo"](w["ZERO"]) && e["subTo"](t, t), t;
    }, w["prototype"]["modPowInt"] = function $_Hw(e, t) {
        var n;
        return n = e < 256 || t["isEven"]() ? new m(t) : new b(t), this["exp"](e, n);
    }, w["ZERO"] = v(0), w["ONE"] = v(1), E["prototype"]["doPublic"] = function $_IZ(e) {
        return e["modPowInt"](this["e"], this["n"]);
    }, E["prototype"]["setPublic"] = function $_JJ(e, t) {
        null != e && null != t && 0 < e["length"] && 0 < t["length"] ? (this["n"] = function n(e, t) {
            return new w(e, t);
        }(e, 16), this["e"] = parseInt(t, 16)) : console && console["error"] && console["error"]("Invalid RSA public key");
    }, E["prototype"]["encrypt"] = function $_BAB(e) {
        var t = function s(e, t) {
            if (t < e["length"] + 11) return console && console["error"] && console["error"]("Message too long for RSA"), null;
            var n = [],
                r = e["length"] - 1;
            while (0 <= r && 0 < t) {
                var o = e["charCodeAt"](r--);
                o < 128 ? n[--t] = o : 127 < o && o < 2048 ? (n[--t] = 63 & o | 128, n[--t] = o >> 6 | 192) : (n[--t] = 63 & o | 128, n[--t] = o >> 6 & 63 | 128, n[--t] = o >> 12 | 224);
            }
            n[--t] = 0;
            var i = new _(),
                a = [];
            while (2 < t) {
                a[0] = 0;
                while (0 == a[0]) i["nextBytes"](a);
                n[--t] = a[0];
            }
            return n[--t] = 2, n[--t] = 0, new w(n);
        }(e, this["n"]["bitLength"]() + 7 >> 3);
        if (null == t) return null;
        var n = this["doPublic"](t);
        if (null == n) return null;
        var r = n["toString"](16);
        return 0 == (1 & r["length"]) ? r : "0" + r;
    }, E;
}();

function $_BFx() {
    var e,
        n = Object["create"] || function () {
            function n() {
            }

            return function (e) {
                var t;
                return n["prototype"] = e, t = new n(), n["prototype"] = null, t;
            };
        }(),
        t = {},
        r = t["lib"] = {},
        o = r["Base"] = {
            "extend": function (e) {
                var t = n(this);
                return e && t["mixIn"](e), t["hasOwnProperty"]("init") && this["init"] !== t["init"] || (t["init"] = function () {
                    t["$super"]["init"]["apply"](this, arguments);
                }), (t["init"]["prototype"] = t)["$super"] = this, t;
            },
            "create": function () {
                var e = this["extend"]();
                return e["init"]["apply"](e, arguments), e;
            },
            "init": function () {
            },
            "mixIn": function (e) {
                for (var t in e) e["hasOwnProperty"](t) && (this[t] = e[t]);
                e["hasOwnProperty"]("toString") && (this["toString"] = e["toString"]);
            }
        },
        l = r["WordArray"] = o["extend"]({
            "init": function (e, t) {
                e = this["words"] = e || [], t != undefined ? this["sigBytes"] = t : this["sigBytes"] = 4 * e["length"];
            },
            "concat": function (e) {
                var t = this["words"],
                    n = e["words"],
                    r = this["sigBytes"],
                    o = e["sigBytes"];
                if (this["clamp"](), r % 4) for (var i = 0; i < o; i++) {
                    var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8;
                } else for (i = 0; i < o; i += 4) t[r + i >>> 2] = n[i >>> 2];
                return this["sigBytes"] += o, this;
            },
            "clamp": function () {
                var e = this["words"],
                    t = this["sigBytes"];
                e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e["length"] = Math["ceil"](t / 4);
            }
        }),
        i = t["enc"] = {},
        _ = i["Latin1"] = {
            "parse": function (e) {
                for (var t = e["length"], n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e["charCodeAt"](r)) << 24 - r % 4 * 8;
                return new l["init"](n, t);
            }
        },
        a = i["Utf8"] = {
            "parse": function (e) {
                return _["parse"](unescape(encodeURIComponent(e)));
            }
        },
        s = r["BufferedBlockAlgorithm"] = o["extend"]({
            "reset": function () {
                this["$_BGi"] = new l["init"](), this["$_BHT"] = 0;
            },
            "$_BIe": function (e) {
                "string" == typeof e && (e = a["parse"](e)), this["$_BGi"]["concat"](e), this["$_BHT"] += e["sigBytes"];
            },
            "$_BJg": function (e) {
                var t = this["$_BGi"],
                    n = t["words"],
                    r = t["sigBytes"],
                    o = this["blockSize"],
                    i = r / (4 * o),
                    a = (i = e ? Math["ceil"](i) : Math["max"]((0 | i) - this["$_CAa"], 0)) * o,
                    s = Math["min"](4 * a, r);
                if (a) {
                    for (var c = 0; c < a; c += o) this["$_CBa"](n, c);
                    var u = n["splice"](0, a);
                    t["sigBytes"] -= s;
                }
                return new l["init"](u, s);
            },
            "$_CAa": 0
        }),
        c = t["algo"] = {},
        u = r["Cipher"] = s["extend"]({
            "cfg": o["extend"](),
            "createEncryptor": function (e, t) {
                return this["create"](this["$_CCE"], e, t);
            },
            "init": function (e, t, n) {
                this["cfg"] = this["cfg"]["extend"](n), this["$_CDT"] = e, this["$_CEa"] = t, this["reset"]();
            },
            "reset": function () {
                s["reset"]["call"](this), this["$_CFs"]();
            },
            "process": function (e) {
                return this["$_BIe"](e), this["$_BJg"]();
            },
            "finalize": function (e) {
                return e && this["$_BIe"](e), this["$_CGp"]();
            },
            "keySize": 4,
            "ivSize": 4,
            "$_CCE": 1,
            "$_CHJ": 2,
            "$_CIz": function (u) {
                return {
                    "encrypt": function (e, t, n) {
                        t = _["parse"](t), n && n["iv"] || ((n = n || {})["iv"] = _["parse"]("0000000000000000"));
                        for (var r = m["encrypt"](u, e, t, n), o = r["ciphertext"]["words"], i = r["ciphertext"]["sigBytes"], a = [], s = 0; s < i; s++) {
                            var c = o[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            a["push"](c);
                        }
                        return a;
                    },
                    "encrypt1": function (e, t, n) {
                        t = _["parse"](t), n && n["iv"] || ((n = n || {})["iv"] = _["parse"]("0000000000000000"));
                        for (var r = m["encrypt"](u, e, t, n), o = r["ciphertext"]["words"], i = r["ciphertext"]["sigBytes"], a = [], s = 0; s < i; s++) {
                            var c = o[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                            a["push"](c);
                        }
                        return a;
                    }
                };
            }
        }),
        f = t["mode"] = {},
        p = r["BlockCipherMode"] = o["extend"]({
            "createEncryptor": function (e, t) {
                return this["Encryptor"]["create"](e, t);
            },
            "init": function (e, t) {
                this["$_CJc"] = e, this["$_DAI"] = t;
            }
        }),
        h = f["CBC"] = ((e = p["extend"]())["Encryptor"] = e["extend"]({
            "processBlock": function (e, t) {
                var n = this["$_CJc"],
                    r = n["blockSize"];
                (function a(e, t, n) {
                    var r = this["$_DAI"];
                    if (r) {
                        var o = r;
                        this["$_DAI"] = undefined;
                    } else var o = this["$_DBd"];
                    for (var i = 0; i < n; i++) e[t + i] ^= o[i];
                })["call"](this, e, t, r), n["encryptBlock"](e, t), this["$_DBd"] = e["slice"](t, t + r);
            }
        }), e),
        d = (t["pad"] = {})["Pkcs7"] = {
            "pad": function (e, t) {
                for (var n = 4 * t, r = n - e["sigBytes"] % n, o = r << 24 | r << 16 | r << 8 | r, i = [], a = 0; a < r; a += 4) i["push"](o);
                var s = l["create"](i, r);
                e["concat"](s);
            }
        },
        g = r["BlockCipher"] = u["extend"]({
            "cfg": u["cfg"]["extend"]({
                "mode": h,
                "padding": d
            }),
            "reset": function () {
                u["reset"]["call"](this);
                var e = this["cfg"],
                    t = e["iv"],
                    n = e["mode"];
                if (this["$_CDT"] == this["$_CCE"]) var r = n["createEncryptor"];
                this["$_DCL"] && this["$_DCL"]["$_DDb"] == r ? this["$_DCL"]["init"](this, t && t["words"]) : (this["$_DCL"] = r["call"](n, this, t && t["words"]), this["$_DCL"]["$_DDb"] = r);
            },
            "$_CBa": function (e, t) {
                this["$_DCL"]["processBlock"](e, t);
            },
            "$_CGp": function () {
                var e = this["cfg"]["padding"];
                if (this["$_CDT"] == this["$_CCE"]) {
                    e["pad"](this["$_BGi"], this["blockSize"]);
                    var t = this["$_BJg"](!0);
                }
                return t;
            },
            "blockSize": 4
        }),
        v = r["CipherParams"] = o["extend"]({
            "init": function (e) {
                this["mixIn"](e);
            }
        }),
        m = r["SerializableCipher"] = o["extend"]({
            "cfg": o["extend"](),
            "encrypt": function (e, t, n, r) {
                r = this["cfg"]["extend"](r);
                var o = e["createEncryptor"](n, r),
                    i = o["finalize"](t),
                    a = o["cfg"];
                return v["create"]({
                    "ciphertext": i,
                    "key": n,
                    "iv": a["iv"],
                    "algorithm": e,
                    "mode": a["mode"],
                    "padding": a["padding"],
                    "blockSize": e["blockSize"],
                    "formatter": r["format"]
                });
            }
        }),
        w = [],
        y = [],
        x = [],
        b = [],
        E = [],
        S = [],
        C = [],
        T = [],
        A = [],
        k = [];
    !function () {
        for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
        var n = 0,
            r = 0;
        for (t = 0; t < 256; t++) {
            var o = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4;
            o = o >>> 8 ^ 255 & o ^ 99, w[n] = o;
            var i = e[y[o] = n],
                a = e[i],
                s = e[a],
                c = 257 * e[o] ^ 16843008 * o;
            x[n] = c << 24 | c >>> 8, b[n] = c << 16 | c >>> 16, E[n] = c << 8 | c >>> 24, S[n] = c;
            c = 16843009 * s ^ 65537 * a ^ 257 * i ^ 16843008 * n;
            C[o] = c << 24 | c >>> 8, T[o] = c << 16 | c >>> 16, A[o] = c << 8 | c >>> 24, k[o] = c, n ? (n = i ^ e[e[e[s ^ i]]], r ^= e[e[r]]) : n = r = 1;
        }
    }();
    var M = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        P = c["AES"] = g["extend"]({
            "$_CFs": function () {
                if (!this["$_DEq"] || this["$_DFy"] !== this["$_CEa"]) {
                    for (var e = this["$_DFy"] = this["$_CEa"], t = e["words"], n = e["sigBytes"] / 4, r = 4 * (1 + (this["$_DEq"] = 6 + n)), o = this["$_DGh"] = [], i = 0; i < r; i++) if (i < n) o[i] = t[i]; else {
                        var a = o[i - 1];
                        i % n ? 6 < n && i % n == 4 && (a = w[a >>> 24] << 24 | w[a >>> 16 & 255] << 16 | w[a >>> 8 & 255] << 8 | w[255 & a]) : (a = w[(a = a << 8 | a >>> 24) >>> 24] << 24 | w[a >>> 16 & 255] << 16 | w[a >>> 8 & 255] << 8 | w[255 & a], a ^= M[i / n | 0] << 24), o[i] = o[i - n] ^ a;
                    }
                    for (var s = this["$_DHX"] = [], c = 0; c < r; c++) {
                        i = r - c;
                        if (c % 4) a = o[i]; else a = o[i - 4];
                        s[c] = c < 4 || i <= 4 ? a : C[w[a >>> 24]] ^ T[w[a >>> 16 & 255]] ^ A[w[a >>> 8 & 255]] ^ k[w[255 & a]];
                    }
                }
            },
            "encryptBlock": function (e, t) {
                this["$_DIn"](e, t, this["$_DGh"], x, b, E, S, w);
            },
            "$_DIn": function (e, t, n, r, o, i, a, s) {
                for (var c = this["$_DEq"], u = e[t] ^ n[0], l = e[t + 1] ^ n[1], _ = e[t + 2] ^ n[2], f = e[t + 3] ^ n[3], p = 4, h = 1; h < c; h++) {
                    var d = r[u >>> 24] ^ o[l >>> 16 & 255] ^ i[_ >>> 8 & 255] ^ a[255 & f] ^ n[p++],
                        g = r[l >>> 24] ^ o[_ >>> 16 & 255] ^ i[f >>> 8 & 255] ^ a[255 & u] ^ n[p++],
                        v = r[_ >>> 24] ^ o[f >>> 16 & 255] ^ i[u >>> 8 & 255] ^ a[255 & l] ^ n[p++],
                        m = r[f >>> 24] ^ o[u >>> 16 & 255] ^ i[l >>> 8 & 255] ^ a[255 & _] ^ n[p++];
                    u = d, l = g, _ = v, f = m;
                }
                d = (s[u >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[_ >>> 8 & 255] << 8 | s[255 & f]) ^ n[p++], g = (s[l >>> 24] << 24 | s[_ >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & u]) ^ n[p++], v = (s[_ >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & l]) ^ n[p++], m = (s[f >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & _]) ^ n[p++];
                e[t] = d, e[t + 1] = g, e[t + 2] = v, e[t + 3] = m;
            },
            "keySize": 8
        });
    return t["AES"] = g["$_CIz"](P), t["AES"];
}

function e() {
    return (65536 * (1 + Math["random"]()) | 0)["toString"](16)["substring"](1);
}

// 将这里写成跟之前一样的固定值
function getRandomStr() {
    return e() + e() + e() + e();
}

var randomv = "983e0d788dd69ebf";
// var u = new U()['encrypt'](randomv);

// console.log('u 参数的值为:', u);


function getL(gt, challenge) {
    const timestamp = new Date().getTime()
    const o = {
        "gt": gt,
        "challenge": challenge,
        "offline": false,
        "new_captcha": true,
        "product": "float",
        "width": "300px",
        "https": true,
        "protocol": "https://",
        "type": "fullpage",
        "static_servers": ["static.geetest.com/", "dn-staticdown.qbox.me/"],
        "beeline": "/static/js/beeline.1.0.1.js",
        "voice": "/static/js/voice.1.2.2.js",
        "click": "/static/js/click.3.0.7.js",
        "fullpage": "/static/js/fullpage.9.1.1.js",
        "slide": "/static/js/slide.7.8.9.js",
        "geetest": "/static/js/geetest.6.0.9.js",
        "aspect_radio": {"slide": 103, "click": 128, "voice": 128, "beeline": 50},
        "cc": 4,
        "ww": true,
        "i": "137603!!361624!!CSS1Compat!!87!!-1!!-1!!-1!!-1!!1!!-1!!-1!!-1!!55!!2!!2!!7!!-1!!-1!!-1!!-1!!-1!!3!!-1!!-1!!2!!18!!-1!!-1!!-1!!0!!0!!0!!0!!1920!!770!!1920!!1040!!zh-CN!!zh-CN,zh!!-1!!1!!24!!Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36!!1!!1!!1920!!1080!!1920!!1040!!1!!1!!1!!-1!!Win32!!0!!-8!!c99bd6524db15eed18ca159de59c3e74!!0!!internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer!!0!!-1!!0!!4!!Arial,ArialBlack,ArialNarrow,ArialUnicodeMS,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaBright,LucidaCalligraphy,LucidaConsole,LucidaFax,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3!!" + timestamp + "!!-1!!-1!!-1!!277!!73!!9!!23!!36!!-1!!-1"
        // "i": "137603!!361625!!CSS1Compat!!87!!-1!!-1!!-1!!-1!!1!!-1!!-1!!-1!!55!!2!!2!!7!!-1!!-1!!-1!!-1!!-1!!3!!-1!!-1!!2!!18!!-1!!-1!!-1!!0!!0!!0!!0!!1920!!416!!1920!!1040!!zh-CN!!zh-CN,zh!!-1!!1!!24!!Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36!!1!!1!!1920!!1080!!1920!!1040!!1!!1!!1!!-1!!Win32!!0!!-8!!c99bd6524db15eed18ca159de59c3e74!!0!!internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer!!0!!-1!!0!!4!!Arial,ArialBlack,ArialNarrow,ArialUnicodeMS,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaBright,LucidaCalligraphy,LucidaConsole,LucidaFax,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3!!"+timestamp+"!!-1!!-1!!-1!!277!!73!!9!!23!!36!!-1!!-1"
    }
    // var aaa='{"gt":"fe23d6148baf995e34decea58c12b5e4","challenge":"9c17e9be3467429802f4a7c29cb5a338","offline":false,"new_captcha":true,"product":"float","width":"300px","https":true,"protocol":"https://","type":"fullpage","static_servers":["static.geetest.com/","dn-staticdown.qbox.me/"],"beeline":"/static/js/beeline.1.0.1.js","voice":"/static/js/voice.1.2.2.js","click":"/static/js/click.3.0.7.js","fullpage":"/static/js/fullpage.9.1.1.js","slide":"/static/js/slide.7.8.9.js","geetest":"/static/js/geetest.6.0.9.js","aspect_radio":{"slide":103,"click":128,"voice":128,"beeline":50},"cc":4,"ww":true,"i":"137603!!361625!!CSS1Compat!!87!!-1!!-1!!-1!!-1!!1!!-1!!-1!!-1!!55!!2!!2!!7!!-1!!-1!!-1!!-1!!-1!!3!!-1!!-1!!2!!18!!-1!!-1!!-1!!0!!0!!0!!0!!1920!!416!!1920!!1040!!zh-CN!!zh-CN,zh!!-1!!1!!24!!Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36!!1!!1!!1920!!1080!!1920!!1040!!1!!1!!1!!-1!!Win32!!0!!-8!!c99bd6524db15eed18ca159de59c3e74!!0!!internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer,internal-pdf-viewer!!0!!-1!!0!!4!!Arial,ArialBlack,ArialNarrow,ArialUnicodeMS,BookAntiqua,BookmanOldStyle,Calibri,Cambria,CambriaMath,Century,CenturyGothic,ComicSansMS,Consolas,Courier,CourierNew,Garamond,Georgia,Helvetica,Impact,LucidaBright,LucidaCalligraphy,LucidaConsole,LucidaFax,LucidaHandwriting,LucidaSansUnicode,MicrosoftSansSerif,MonotypeCorsiva,MSGothic,MSPGothic,MSReferenceSansSerif,MSSansSerif,MSSerif,PalatinoLinotype,SegoePrint,SegoeScript,SegoeUI,SegoeUILight,SegoeUISemibold,SegoeUISymbol,Tahoma,Times,TimesNewRoman,TrebuchetMS,Verdana,Wingdings,Wingdings2,Wingdings3!!1671720933148!!-1!!-1!!-1!!277!!73!!9!!23!!36!!-1!!-1"}'
    // 都是抠出来的代码
    return $_BFx().encrypt1(JSON.stringify(o), randomv)
}

// console.log(getL().length)

var O = {
    "$_FIG": {
        "$_FJs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
        "$_GAy": ".",
        "$_GBP": 7274496,
        "$_GCM": 9483264,
        "$_GDk": 19220,
        "$_GES": 235,
        "$_GFe": 24
    },
    "$_FJs": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()",
    "$_GAy": ".",
    "$_GBP": 7274496,
    "$_GCM": 9483264,
    "$_GDk": 19220,
    "$_GES": 235,
    "$_GFe": 24,
    "$_GGy": function (e) {
        for (var t = [], n = 0, r = e["length"]; n < r; n += 1) t["push"](e["charCodeAt"](n));
        return t;
    },
    "$_GHK": function (e) {
        for (var t = "", n = 0, r = e["length"]; n < r; n += 1) t += String["fromCharCode"](e[n]);
        return t;
    },
    "$_GIp": function (e) {
        var t = this["$_FJs"];
        return e < 0 || e >= t["length"] ? "." : t["charAt"](e);
    },
    "$_GJo": function (e) {
        return this["$_FJs"]["indexOf"](e);
    },
    "$_HAt": function (e, t) {
        return e >> t & 1;
    },
    "$_HBu": function (e, o) {
        var i = this;
        o || (o = i);
        for (var t = function (e, t) {
            for (var n = 0, r = o["$_GFe"] - 1; 0 <= r; r -= 1) 1 === i["$_HAt"](t, r) && (n = (n << 1) + i["$_HAt"](e, r));
            return n;
        }, n = "", r = "", a = e["length"], s = 0; s < a; s += 3) {
            var c;
            if (s + 2 < a) c = (e[s] << 16) + (e[s + 1] << 8) + e[s + 2], n += i["$_GIp"](t(c, o["$_GBP"])) + i["$_GIp"](t(c, o["$_GCM"])) + i["$_GIp"](t(c, o["$_GDk"])) + i["$_GIp"](t(c, o["$_GES"])); else {
                var u = a % 3;
                2 == u ? (c = (e[s] << 16) + (e[s + 1] << 8), n += i["$_GIp"](t(c, o["$_GBP"])) + i["$_GIp"](t(c, o["$_GCM"])) + i["$_GIp"](t(c, o["$_GDk"])), r = o["$_GAy"]) : 1 == u && (c = e[s] << 16, n += i["$_GIp"](t(c, o["$_GBP"])) + i["$_GIp"](t(c, o["$_GCM"])), r = o["$_GAy"] + o["$_GAy"]);
            }
        }
        return {
            "res": n,
            "end": r
        };
    },
    "$_HCb": function (e) {
        var t = this["$_HBu"](this["$_GGy"](e));
        return t["res"] + t["end"];
    },
    "$_HDL": function (e) {
        var t = this["$_HBu"](e);
        return t["res"] + t["end"];
    },
    "$_HEV": function (e, i) {
        var a = this;
        i || (i = a);
        for (var t = function (e, t) {
            if (e < 0) return 0;
            for (var n = 5, r = 0, o = i["$_GFe"] - 1; 0 <= o; o -= 1) 1 === a["$_HAt"](t, o) && (r += a["$_HAt"](e, n) << o, n -= 1);
            return r;
        }, n = e["length"], r = "", o = 0; o < n; o += 4) {
            var s = t(a["$_GJo"](e["charAt"](o)), i["$_GBP"]) + t(a["$_GJo"](e["charAt"](o + 1)), i["$_GCM"]) + t(a["$_GJo"](e["charAt"](o + 2)), i["$_GDk"]) + t(a["$_GJo"](e["charAt"](o + 3)), i["$_GES"]),
                c = s >> 16 & 255;
            if (r += String["fromCharCode"](c), e["charAt"](o + 2) !== i["$_GAy"]) {
                var u = s >> 8 & 255;
                if (r += String["fromCharCode"](u), e["charAt"](o + 3) !== i["$_GAy"]) {
                    var l = 255 & s;
                    r += String["fromCharCode"](l);
                }
            }
        }
        return r;
    },
    "$_HFH": function (e) {
        var t = 4 - e["length"] % 4;
        if (t < 4) for (var n = 0; n < t; n += 1) e += this["$_GAy"];
        return this["$_HEV"](e);
    },
    "$_HGT": function (e) {
        return this["$_HFH"](e);
    }
}

// console.log(O["$_HDL"](getL()))
function get_w1(gt, challenge) {
    let r = new U()['encrypt'](randomv);
    let o = getL(gt, challenge);
    let i = O["$_HDL"](o)
    return i + r
}

module.exports = {
    get_w1,
};
