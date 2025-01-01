/**
 * FingerprintJS v4.5.1 - Copyright (c) FingerprintJS, Inc, 2024 (https://fingerprint.com)
 *
 * Licensed under Business Source License 1.1 https://mariadb.com/bsl11/
 * Licensor: FingerprintJS, Inc.
 * Licensed Work: FingerprintJS browser fingerprinting library
 * Additional Use Grant: None
 * Change Date: Four years from first release for the specific version.
 * Change License: MIT, text at https://opensource.org/license/mit/ with the following copyright notice:
 * Copyright 2015-present FingerprintJS, Inc.
 */
var n = function () {
    return n = Object.assign || function (n) {
        for (var e, t = 1, r = arguments.length; t < r; t++) for (var o in e = arguments[t]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
        return n
    }, n.apply(this, arguments)
};

function e(n, e, t, r) {
    return new (t || (t = Promise))((function (o, i) {
        function a(n) {
            try {
                u(r.next(n))
            } catch (e) {
                i(e)
            }
        }

        function c(n) {
            try {
                u(r.throw(n))
            } catch (e) {
                i(e)
            }
        }

        function u(n) {
            var e;
            n.done ? o(n.value) : (e = n.value, e instanceof t ? e : new t((function (n) {
                n(e)
            }))).then(a, c)
        }

        u((r = r.apply(n, e || [])).next())
    }))
}

function t(n, e) {
    var t, r, o, i, a = {
        label: 0, sent: function () {
            if (1 & o[0]) throw o[1];
            return o[1]
        }, trys: [], ops: []
    };
    return i = {
        next: c(0),
        throw: c(1),
        return: c(2)
    }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
        return this
    }), i;

    function c(c) {
        return function (u) {
            return function (c) {
                if (t) throw new TypeError("Generator is already executing.");
                for (; i && (i = 0, c[0] && (a = 0)), a;) try {
                    if (t = 1, r && (o = 2 & c[0] ? r.return : c[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, c[1])).done) return o;
                    switch (r = 0, o && (c = [2 & c[0], o.value]), c[0]) {
                        case 0:
                        case 1:
                            o = c;
                            break;
                        case 4:
                            return a.label++, {value: c[1], done: !1};
                        case 5:
                            a.label++, r = c[1], c = [0];
                            continue;
                        case 7:
                            c = a.ops.pop(), a.trys.pop();
                            continue;
                        default:
                            if (!(o = a.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                                a = 0;
                                continue
                            }
                            if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                                a.label = c[1];
                                break
                            }
                            if (6 === c[0] && a.label < o[1]) {
                                a.label = o[1], o = c;
                                break
                            }
                            if (o && a.label < o[2]) {
                                a.label = o[2], a.ops.push(c);
                                break
                            }
                            o[2] && a.ops.pop(), a.trys.pop();
                            continue
                    }
                    c = e.call(n, a)
                } catch (u) {
                    c = [6, u], r = 0
                } finally {
                    t = o = 0
                }
                if (5 & c[0]) throw c[1];
                return {value: c[0] ? c[1] : void 0, done: !0}
            }([c, u])
        }
    }
}

function r(n, e, t) {
    if (t || 2 === arguments.length) for (var r, o = 0, i = e.length; o < i; o++) !r && o in e || (r || (r = Array.prototype.slice.call(e, 0, o)), r[o] = e[o]);
    return n.concat(r || Array.prototype.slice.call(e))
}

function o(n, e) {
    return new Promise((function (t) {
        return setTimeout(t, n, e)
    }))
}

function i(n) {
    return !!n && "function" == typeof n.then
}

function a(n, e) {
    try {
        var t = n();
        i(t) ? t.then((function (n) {
            return e(!0, n)
        }), (function (n) {
            return e(!1, n)
        })) : e(!0, t)
    } catch (r) {
        e(!1, r)
    }
}

function c(n, r, o) {
    return void 0 === o && (o = 16), e(this, void 0, void 0, (function () {
        var e, i, a, c;
        return t(this, (function (t) {
            switch (t.label) {
                case 0:
                    e = Array(n.length), i = Date.now(), a = 0, t.label = 1;
                case 1:
                    return a < n.length ? (e[a] = r(n[a], a), (c = Date.now()) >= i + o ? (i = c, [4, new Promise((function (n) {
                        var e = new MessageChannel;
                        e.port1.onmessage = function () {
                            return n()
                        }, e.port2.postMessage(null)
                    }))]) : [3, 3]) : [3, 4];
                case 2:
                    t.sent(), t.label = 3;
                case 3:
                    return ++a, [3, 1];
                case 4:
                    return [2, e]
            }
        }))
    }))
}

function u(n) {
    return n.then(void 0, (function () {
    })), n
}

function l(n) {
    return parseInt(n)
}

function s(n) {
    return parseFloat(n)
}

function d(n, e) {
    return "number" == typeof n && isNaN(n) ? e : n
}

function f(n) {
    return n.reduce((function (n, e) {
        return n + (e ? 1 : 0)
    }), 0)
}

function m(n, e) {
    if (void 0 === e && (e = 1), Math.abs(e) >= 1) return Math.round(n / e) * e;
    var t = 1 / e;
    return Math.round(n * t) / t
}

function v(n, e) {
    var t = n[0] >>> 16, r = 65535 & n[0], o = n[1] >>> 16, i = 65535 & n[1], a = e[0] >>> 16, c = 65535 & e[0],
        u = e[1] >>> 16, l = 0, s = 0, d = 0, f = 0;
    d += (f += i + (65535 & e[1])) >>> 16, f &= 65535, s += (d += o + u) >>> 16, d &= 65535, l += (s += r + c) >>> 16, s &= 65535, l += t + a, l &= 65535, n[0] = l << 16 | s, n[1] = d << 16 | f
}

function h(n, e) {
    var t = n[0] >>> 16, r = 65535 & n[0], o = n[1] >>> 16, i = 65535 & n[1], a = e[0] >>> 16, c = 65535 & e[0],
        u = e[1] >>> 16, l = 65535 & e[1], s = 0, d = 0, f = 0, m = 0;
    f += (m += i * l) >>> 16, m &= 65535, d += (f += o * l) >>> 16, f &= 65535, d += (f += i * u) >>> 16, f &= 65535, s += (d += r * l) >>> 16, d &= 65535, s += (d += o * u) >>> 16, d &= 65535, s += (d += i * c) >>> 16, d &= 65535, s += t * l + r * u + o * c + i * a, s &= 65535, n[0] = s << 16 | d, n[1] = f << 16 | m
}

function p(n, e) {
    var t = n[0];
    32 === (e %= 64) ? (n[0] = n[1], n[1] = t) : e < 32 ? (n[0] = t << e | n[1] >>> 32 - e, n[1] = n[1] << e | t >>> 32 - e) : (e -= 32, n[0] = n[1] << e | t >>> 32 - e, n[1] = t << e | n[1] >>> 32 - e)
}

function b(n, e) {
    0 !== (e %= 64) && (e < 32 ? (n[0] = n[1] >>> 32 - e, n[1] = n[1] << e) : (n[0] = n[1] << e - 32, n[1] = 0))
}

function y(n, e) {
    n[0] ^= e[0], n[1] ^= e[1]
}

var g = [4283543511, 3981806797], w = [3301882366, 444984403];

function L(n) {
    var e = [0, n[0] >>> 1];
    y(n, e), h(n, g), e[1] = n[0] >>> 1, y(n, e), h(n, w), e[1] = n[0] >>> 1, y(n, e)
}

var k = [2277735313, 289559509], V = [1291169091, 658871167], S = [0, 5], W = [0, 1390208809], x = [0, 944331445];

function Z(n, e) {
    var t = function (n) {
        for (var e = new Uint8Array(n.length), t = 0; t < n.length; t++) {
            var r = n.charCodeAt(t);
            if (r > 127) return (new TextEncoder).encode(n);
            e[t] = r
        }
        return e
    }(n);
    e = e || 0;
    var r, o = [0, t.length], i = o[1] % 16, a = o[1] - i, c = [0, e], u = [0, e], l = [0, 0], s = [0, 0];
    for (r = 0; r < a; r += 16) l[0] = t[r + 4] | t[r + 5] << 8 | t[r + 6] << 16 | t[r + 7] << 24, l[1] = t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24, s[0] = t[r + 12] | t[r + 13] << 8 | t[r + 14] << 16 | t[r + 15] << 24, s[1] = t[r + 8] | t[r + 9] << 8 | t[r + 10] << 16 | t[r + 11] << 24, h(l, k), p(l, 31), h(l, V), y(c, l), p(c, 27), v(c, u), h(c, S), v(c, W), h(s, V), p(s, 33), h(s, k), y(u, s), p(u, 31), v(u, c), h(u, S), v(u, x);
    l[0] = 0, l[1] = 0, s[0] = 0, s[1] = 0;
    var d = [0, 0];
    switch (i) {
        case 15:
            d[1] = t[r + 14], b(d, 48), y(s, d);
        case 14:
            d[1] = t[r + 13], b(d, 40), y(s, d);
        case 13:
            d[1] = t[r + 12], b(d, 32), y(s, d);
        case 12:
            d[1] = t[r + 11], b(d, 24), y(s, d);
        case 11:
            d[1] = t[r + 10], b(d, 16), y(s, d);
        case 10:
            d[1] = t[r + 9], b(d, 8), y(s, d);
        case 9:
            d[1] = t[r + 8], y(s, d), h(s, V), p(s, 33), h(s, k), y(u, s);
        case 8:
            d[1] = t[r + 7], b(d, 56), y(l, d);
        case 7:
            d[1] = t[r + 6], b(d, 48), y(l, d);
        case 6:
            d[1] = t[r + 5], b(d, 40), y(l, d);
        case 5:
            d[1] = t[r + 4], b(d, 32), y(l, d);
        case 4:
            d[1] = t[r + 3], b(d, 24), y(l, d);
        case 3:
            d[1] = t[r + 2], b(d, 16), y(l, d);
        case 2:
            d[1] = t[r + 1], b(d, 8), y(l, d);
        case 1:
            d[1] = t[r], y(l, d), h(l, k), p(l, 31), h(l, V), y(c, l)
    }
    return y(c, o), y(u, o), v(c, u), v(u, c), L(c), L(u), v(c, u), v(u, c), ("00000000" + (c[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (c[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (u[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (u[1] >>> 0).toString(16)).slice(-8)
}

function R(n) {
    return "function" != typeof n
}

function M(n, r, o, i) {
    var l = Object.keys(n).filter((function (n) {
        return !function (n, e) {
            for (var t = 0, r = n.length; t < r; ++t) if (n[t] === e) return !0;
            return !1
        }(o, n)
    })), s = u(c(l, (function (e) {
        return function (n, e) {
            var t = u(new Promise((function (t) {
                var r = Date.now();
                a(n.bind(null, e), (function () {
                    for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
                    var o = Date.now() - r;
                    if (!n[0]) return t((function () {
                        return {error: n[1], duration: o}
                    }));
                    var i = n[1];
                    if (R(i)) return t((function () {
                        return {value: i, duration: o}
                    }));
                    t((function () {
                        return new Promise((function (n) {
                            var e = Date.now();
                            a(i, (function () {
                                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                                var i = o + Date.now() - e;
                                if (!t[0]) return n({error: t[1], duration: i});
                                n({value: t[1], duration: i})
                            }))
                        }))
                    }))
                }))
            })));
            return function () {
                return t.then((function (n) {
                    return n()
                }))
            }
        }(n[e], r)
    }), i));
    return function () {
        return e(this, void 0, void 0, (function () {
            var n, e, r, o;
            return t(this, (function (t) {
                switch (t.label) {
                    case 0:
                        return [4, s];
                    case 1:
                        return [4, c(t.sent(), (function (n) {
                            return u(n())
                        }), i)];
                    case 2:
                        return n = t.sent(), [4, Promise.all(n)];
                    case 3:
                        for (e = t.sent(), r = {}, o = 0; o < l.length; ++o) r[l[o]] = e[o];
                        return [2, r]
                }
            }))
        }))
    }
}

function G(n, e) {
    var t = function (n) {
        return R(n) ? e(n) : function () {
            var t = n();
            return i(t) ? t.then(e) : e(t)
        }
    };
    return function (e) {
        var r = n(e);
        return i(r) ? r.then(t) : t(r)
    }
}

function F() {
    var n = window, e = navigator;
    return f(["MSCSSMatrix" in n, "msSetImmediate" in n, "msIndexedDB" in n, "msMaxTouchPoints" in e, "msPointerEnabled" in e]) >= 4
}

function I() {
    var n = window, e = navigator;
    return f(["msWriteProfilerMark" in n, "MSStream" in n, "msLaunchUri" in e, "msSaveBlob" in e]) >= 3 && !F()
}

function Y() {
    var n = window, e = navigator;
    return f(["webkitPersistentStorage" in e, "webkitTemporaryStorage" in e, 0 === e.vendor.indexOf("Google"), "webkitResolveLocalFileSystemURL" in n, "BatteryManager" in n, "webkitMediaStream" in n, "webkitSpeechGrammar" in n]) >= 5
}

function j() {
    var n = window;
    return f(["ApplePayError" in n, "CSSPrimitiveValue" in n, "Counter" in n, 0 === navigator.vendor.indexOf("Apple"), "RGBColor" in n, "WebKitMediaKeys" in n]) >= 4
}

function X() {
    var n = window, e = n.HTMLElement, t = n.Document;
    return f(["safari" in n, !("ongestureend" in n), !("TouchEvent" in n), !("orientation" in n), e && !("autocapitalize" in e.prototype), t && "pointerLockElement" in t.prototype]) >= 4
}

function C() {
    var n, e = window;
    return n = e.print, /^function\s.*?\{\s*\[native code]\s*}$/.test(String(n)) && "[object WebPageNamespace]" === String(e.browser)
}

function P() {
    var n, e, t = window;
    return f(["buildID" in navigator, "MozAppearance" in (null !== (e = null === (n = document.documentElement) || void 0 === n ? void 0 : n.style) && void 0 !== e ? e : {}), "onmozfullscreenchange" in t, "mozInnerScreenX" in t, "CSSMozDocumentRule" in t, "CanvasCaptureMediaStream" in t]) >= 4
}

function E() {
    var n = window, e = navigator, t = n.CSS, r = n.HTMLButtonElement;
    return f([!("getStorageUpdates" in e), r && "popover" in r.prototype, "CSSCounterStyleRule" in n, t.supports("font-size-adjust: ex-height 0.5"), t.supports("text-transform: full-width")]) >= 4
}

function H() {
    var n = document;
    return n.fullscreenElement || n.msFullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement || null
}

function A() {
    var n = Y(), e = P(), t = window, r = navigator, o = "connection";
    return n ? f([!("SharedWorker" in t), r[o] && "ontypechange" in r[o], !("sinkId" in new Audio)]) >= 2 : !!e && f(["onorientationchange" in t, "orientation" in t, /android/i.test(r.appVersion)]) >= 2
}

function N() {
    var n = navigator, e = window, t = Audio.prototype, r = e.visualViewport;
    return f(["srLatency" in t, "srChannelCount" in t, "devicePosture" in n, r && "segments" in r, "getTextInformation" in Image.prototype]) >= 3
}

function J() {
    var n = window, e = n.OfflineAudioContext || n.webkitOfflineAudioContext;
    if (!e) return -2;
    if (j() && !X() && !function () {
        var n = window;
        return f(["DOMRectList" in n, "RTCPeerConnectionIceEvent" in n, "SVGGeometryElement" in n, "ontransitioncancel" in n]) >= 3
    }()) return -1;
    var t = new e(1, 5e3, 44100), r = t.createOscillator();
    r.type = "triangle", r.frequency.value = 1e4;
    var o = t.createDynamicsCompressor();
    o.threshold.value = -50, o.knee.value = 40, o.ratio.value = 12, o.attack.value = 0, o.release.value = .25, r.connect(o), o.connect(t.destination), r.start(0);
    var a = function (n) {
        var e = 3, t = 500, r = 500, o = 5e3, a = function () {
        };
        return [new Promise((function (c, l) {
            var s = !1, d = 0, f = 0;
            n.oncomplete = function (n) {
                return c(n.renderedBuffer)
            };
            var m = function () {
                setTimeout((function () {
                    return l(T("timeout"))
                }), Math.min(r, f + o - Date.now()))
            }, v = function () {
                try {
                    var r = n.startRendering();
                    switch (i(r) && u(r), n.state) {
                        case"running":
                            f = Date.now(), s && m();
                            break;
                        case"suspended":
                            document.hidden || d++, s && d >= e ? l(T("suspended")) : setTimeout(v, t)
                    }
                } catch (o) {
                    l(o)
                }
            };
            v(), a = function () {
                s || (s = !0, f > 0 && m())
            }
        })), a]
    }(t), c = a[0], l = a[1], s = u(c.then((function (n) {
        return function (n) {
            for (var e = 0, t = 0; t < n.length; ++t) e += Math.abs(n[t]);
            return e
        }(n.getChannelData(0).subarray(4500))
    }), (function (n) {
        if ("timeout" === n.name || "suspended" === n.name) return -3;
        throw n
    })));
    return function () {
        return l(), s
    }
}

function T(n) {
    var e = new Error(n);
    return e.name = n, e
}

function D(n, r, i) {
    var a, c, u;
    return void 0 === i && (i = 50), e(this, void 0, void 0, (function () {
        var e, l;
        return t(this, (function (t) {
            switch (t.label) {
                case 0:
                    e = document, t.label = 1;
                case 1:
                    return e.body ? [3, 3] : [4, o(i)];
                case 2:
                    return t.sent(), [3, 1];
                case 3:
                    l = e.createElement("iframe"), t.label = 4;
                case 4:
                    return t.trys.push([4, , 10, 11]), [4, new Promise((function (n, t) {
                        var o = !1, i = function () {
                            o = !0, n()
                        };
                        l.onload = i, l.onerror = function (n) {
                            o = !0, t(n)
                        };
                        var a = l.style;
                        a.setProperty("display", "block", "important"), a.position = "absolute", a.top = "0", a.left = "0", a.visibility = "hidden", r && "srcdoc" in l ? l.srcdoc = r : l.src = "about:blank", e.body.appendChild(l);
                        var c = function () {
                            var n, e;
                            o || ("complete" === (null === (e = null === (n = l.contentWindow) || void 0 === n ? void 0 : n.document) || void 0 === e ? void 0 : e.readyState) ? i() : setTimeout(c, 10))
                        };
                        c()
                    }))];
                case 5:
                    t.sent(), t.label = 6;
                case 6:
                    return (null === (c = null === (a = l.contentWindow) || void 0 === a ? void 0 : a.document) || void 0 === c ? void 0 : c.body) ? [3, 8] : [4, o(i)];
                case 7:
                    return t.sent(), [3, 6];
                case 8:
                    return [4, n(l, l.contentWindow)];
                case 9:
                    return [2, t.sent()];
                case 10:
                    return null === (u = l.parentNode) || void 0 === u || u.removeChild(l), [7];
                case 11:
                    return [2]
            }
        }))
    }))
}

function _(n) {
    for (var e = function (n) {
        for (var e, t, r = "Unexpected syntax '".concat(n, "'"), o = /^\s*([a-z-]*)(.*)$/i.exec(n), i = o[1] || void 0, a = {}, c = /([.:#][\w-]+|\[.+?\])/gi, u = function (n, e) {
            a[n] = a[n] || [], a[n].push(e)
        }; ;) {
            var l = c.exec(o[2]);
            if (!l) break;
            var s = l[0];
            switch (s[0]) {
                case".":
                    u("class", s.slice(1));
                    break;
                case"#":
                    u("id", s.slice(1));
                    break;
                case"[":
                    var d = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(s);
                    if (!d) throw new Error(r);
                    u(d[1], null !== (t = null !== (e = d[4]) && void 0 !== e ? e : d[5]) && void 0 !== t ? t : "");
                    break;
                default:
                    throw new Error(r)
            }
        }
        return [i, a]
    }(n), t = e[0], r = e[1], o = document.createElement(null != t ? t : "div"), i = 0, a = Object.keys(r); i < a.length; i++) {
        var c = a[i], u = r[c].join(" ");
        "style" === c ? z(o.style, u) : o.setAttribute(c, u)
    }
    return o
}

function z(n, e) {
    for (var t = 0, r = e.split(";"); t < r.length; t++) {
        var o = r[t], i = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(o);
        if (i) {
            var a = i[1], c = i[2], u = i[4];
            n.setProperty(a, c, u || "")
        }
    }
}

var B = ["monospace", "sans-serif", "serif"],
    O = ["sans-serif-thin", "ARNO PRO", "Agency FB", "Arabic Typesetting", "Arial Unicode MS", "AvantGarde Bk BT", "BankGothic Md BT", "Batang", "Bitstream Vera Sans Mono", "Calibri", "Century", "Century Gothic", "Clarendon", "EUROSTILE", "Franklin Gothic", "Futura Bk BT", "Futura Md BT", "GOTHAM", "Gill Sans", "HELV", "Haettenschweiler", "Helvetica Neue", "Humanst521 BT", "Leelawadee", "Letter Gothic", "Levenim MT", "Lucida Bright", "Lucida Sans", "Menlo", "MS Mincho", "MS Outlook", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MYRIAD PRO", "Marlett", "Meiryo UI", "Microsoft Uighur", "Minion Pro", "Monotype Corsiva", "PMingLiU", "Pristina", "SCRIPTINA", "Segoe UI Light", "Serifa", "SimHei", "Small Fonts", "Staccato222 BT", "TRAJAN PRO", "Univers CE 55 Medium", "Vrinda", "ZWAdobeF"];

function U(n) {
    var e, t, r, o = !1, i = function () {
        var n = document.createElement("canvas");
        return n.width = 1, n.height = 1, [n, n.getContext("2d")]
    }(), a = i[0], c = i[1];
    return !function (n, e) {
        return !(!e || !n.toDataURL)
    }(a, c) ? t = r = "unsupported" : (o = function (n) {
        return n.rect(0, 0, 10, 10), n.rect(2, 2, 6, 6), !n.isPointInPath(5, 5, "evenodd")
    }(c), n ? t = r = "skipped" : (e = function (n, e) {
        !function (n, e) {
            n.width = 240, n.height = 60, e.textBaseline = "alphabetic", e.fillStyle = "#f60", e.fillRect(100, 1, 62, 20), e.fillStyle = "#069", e.font = '11pt "Times New Roman"';
            var t = "Cwm fjordbank gly ".concat(String.fromCharCode(55357, 56835));
            e.fillText(t, 2, 15), e.fillStyle = "rgba(102, 204, 0, 0.2)", e.font = "18pt Arial", e.fillText(t, 4, 45)
        }(n, e);
        var t = Q(n), r = Q(n);
        if (t !== r) return ["unstable", "unstable"];
        return function (n, e) {
            n.width = 122, n.height = 110, e.globalCompositeOperation = "multiply";
            for (var t = 0, r = [["#f2f", 40, 40], ["#2ff", 80, 40], ["#ff2", 60, 80]]; t < r.length; t++) {
                var o = r[t], i = o[0], a = o[1], c = o[2];
                e.fillStyle = i, e.beginPath(), e.arc(a, c, 40, 0, 2 * Math.PI, !0), e.closePath(), e.fill()
            }
            e.fillStyle = "#f9c", e.arc(60, 60, 60, 0, 2 * Math.PI, !0), e.arc(60, 60, 20, 0, 2 * Math.PI, !0), e.fill("evenodd")
        }(n, e), [Q(n), t]
    }(a, c), t = e[0], r = e[1])), {winding: o, geometry: t, text: r}
}

function Q(n) {
    return n.toDataURL()
}

function K() {
    var n = screen, e = function (n) {
        return d(l(n), null)
    }, t = [e(n.width), e(n.height)];
    return t.sort().reverse(), t
}

var q, $;

function nn() {
    var n = this;
    return function () {
        if (void 0 === $) {
            var n = function () {
                var e = en();
                tn(e) ? $ = setTimeout(n, 2500) : (q = e, $ = void 0)
            };
            n()
        }
    }(), function () {
        return e(n, void 0, void 0, (function () {
            var n;
            return t(this, (function (e) {
                switch (e.label) {
                    case 0:
                        return tn(n = en()) ? q ? [2, r([], q, !0)] : H() ? [4, (t = document, (t.exitFullscreen || t.msExitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen).call(t))] : [3, 2] : [3, 2];
                    case 1:
                        e.sent(), n = en(), e.label = 2;
                    case 2:
                        return tn(n) || (q = n), [2, n]
                }
                var t
            }))
        }))
    }
}

function en() {
    var n = screen;
    return [d(s(n.availTop), null), d(s(n.width) - s(n.availWidth) - d(s(n.availLeft), 0), null), d(s(n.height) - s(n.availHeight) - d(s(n.availTop), 0), null), d(s(n.availLeft), null)]
}

function tn(n) {
    for (var e = 0; e < 4; ++e) if (n[e]) return !1;
    return !0
}

function rn(n) {
    var r;
    return e(this, void 0, void 0, (function () {
        var e, i, a, c, u, l, s;
        return t(this, (function (t) {
            switch (t.label) {
                case 0:
                    for (e = document, i = e.createElement("div"), a = new Array(n.length), c = {}, on(i), s = 0; s < n.length; ++s) "DIALOG" === (u = _(n[s])).tagName && u.show(), on(l = e.createElement("div")), l.appendChild(u), i.appendChild(l), a[s] = u;
                    t.label = 1;
                case 1:
                    return e.body ? [3, 3] : [4, o(50)];
                case 2:
                    return t.sent(), [3, 1];
                case 3:
                    e.body.appendChild(i);
                    try {
                        for (s = 0; s < n.length; ++s) a[s].offsetParent || (c[n[s]] = !0)
                    } finally {
                        null === (r = i.parentNode) || void 0 === r || r.removeChild(i)
                    }
                    return [2, c]
            }
        }))
    }))
}

function on(n) {
    n.style.setProperty("visibility", "hidden", "important"), n.style.setProperty("display", "block", "important")
}

function an(n) {
    return matchMedia("(inverted-colors: ".concat(n, ")")).matches
}

function cn(n) {
    return matchMedia("(forced-colors: ".concat(n, ")")).matches
}

function un(n) {
    return matchMedia("(prefers-contrast: ".concat(n, ")")).matches
}

function ln(n) {
    return matchMedia("(prefers-reduced-motion: ".concat(n, ")")).matches
}

function sn(n) {
    return matchMedia("(prefers-reduced-transparency: ".concat(n, ")")).matches
}

function dn(n) {
    return matchMedia("(dynamic-range: ".concat(n, ")")).matches
}

var fn = Math, mn = function () {
    return 0
};
var vn = {
    default: [],
    apple: [{font: "-apple-system-body"}],
    serif: [{fontFamily: "serif"}],
    sans: [{fontFamily: "sans-serif"}],
    mono: [{fontFamily: "monospace"}],
    min: [{fontSize: "1px"}],
    system: [{fontFamily: "system-ui"}]
};
var hn = function () {
    for (var n = window; ;) {
        var e = n.parent;
        if (!e || e === n) return !1;
        try {
            if (e.location.origin !== n.location.origin) return !0
        } catch (t) {
            if (t instanceof Error && "SecurityError" === t.name) return !0;
            throw t
        }
        n = e
    }
};
var pn = new Set([10752, 2849, 2884, 2885, 2886, 2928, 2929, 2930, 2931, 2932, 2960, 2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968, 2978, 3024, 3042, 3088, 3089, 3106, 3107, 32773, 32777, 32777, 32823, 32824, 32936, 32937, 32938, 32939, 32968, 32969, 32970, 32971, 3317, 33170, 3333, 3379, 3386, 33901, 33902, 34016, 34024, 34076, 3408, 3410, 3411, 3412, 3413, 3414, 3415, 34467, 34816, 34817, 34818, 34819, 34877, 34921, 34930, 35660, 35661, 35724, 35738, 35739, 36003, 36004, 36005, 36347, 36348, 36349, 37440, 37441, 37443, 7936, 7937, 7938]),
    bn = new Set([34047, 35723, 36063, 34852, 34853, 34854, 34229, 36392, 36795, 38449]),
    yn = ["FRAGMENT_SHADER", "VERTEX_SHADER"],
    gn = ["LOW_FLOAT", "MEDIUM_FLOAT", "HIGH_FLOAT", "LOW_INT", "MEDIUM_INT", "HIGH_INT"];

function wn(n) {
    if (n.webgl) return n.webgl.context;
    var e, t = document.createElement("canvas");
    t.addEventListener("webglCreateContextError", (function () {
        return e = void 0
    }));
    for (var r = 0, o = ["webgl", "experimental-webgl"]; r < o.length; r++) {
        var i = o[r];
        try {
            e = t.getContext(i)
        } catch (a) {
        }
        if (e) break
    }
    return n.webgl = {context: e}, e
}

function Ln(n, e, t) {
    var r = n.getShaderPrecisionFormat(n[e], n[t]);
    return r ? [r.rangeMin, r.rangeMax, r.precision] : []
}

function kn(n) {
    return Object.keys(n.__proto__).filter(Vn)
}

function Vn(n) {
    return "string" == typeof n && !n.match(/[^A-Z0-9_x]/)
}

function Sn() {
    return P()
}

function Wn(n) {
    return "function" == typeof n.getParameter
}

var xn = {
    fonts: function () {
        var n = this;
        return D((function (r, o) {
            var i = o.document;
            return e(n, void 0, void 0, (function () {
                var n, e, r, o, a, c, u, l, s, d, f;
                return t(this, (function (t) {
                    for ((n = i.body).style.fontSize = "48px", (e = i.createElement("div")).style.setProperty("visibility", "hidden", "important"), r = {}, o = {}, a = function (n) {
                        var t = i.createElement("span"), r = t.style;
                        return r.position = "absolute", r.top = "0", r.left = "0", r.fontFamily = n, t.textContent = "mmMwWLliI0O&1", e.appendChild(t), t
                    }, c = function (n, e) {
                        return a("'".concat(n, "',").concat(e))
                    }, u = function () {
                        for (var n = {}, e = function (e) {
                            n[e] = B.map((function (n) {
                                return c(e, n)
                            }))
                        }, t = 0, r = O; t < r.length; t++) {
                            e(r[t])
                        }
                        return n
                    }, l = function (n) {
                        return B.some((function (e, t) {
                            return n[t].offsetWidth !== r[e] || n[t].offsetHeight !== o[e]
                        }))
                    }, s = function () {
                        return B.map(a)
                    }(), d = u(), n.appendChild(e), f = 0; f < B.length; f++) r[B[f]] = s[f].offsetWidth, o[B[f]] = s[f].offsetHeight;
                    return [2, O.filter((function (n) {
                        return l(d[n])
                    }))]
                }))
            }))
        }))
    }, domBlockers: function (n) {
        var r = (void 0 === n ? {} : n).debug;
        return e(this, void 0, void 0, (function () {
            var n, e, o, i, a;
            return t(this, (function (t) {
                switch (t.label) {
                    case 0:
                        return j() || A() ? (c = atob, n = {
                            abpIndo: ["#Iklan-Melayang", "#Kolom-Iklan-728", "#SidebarIklan-wrapper", '[title="ALIENBOLA" i]', c("I0JveC1CYW5uZXItYWRz")],
                            abpvn: [".quangcao", "#mobileCatfish", c("LmNsb3NlLWFkcw=="), '[id^="bn_bottom_fixed_"]', "#pmadv"],
                            adBlockFinland: [".mainostila", c("LnNwb25zb3JpdA=="), ".ylamainos", c("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"), c("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],
                            adBlockPersian: ["#navbar_notice_50", ".kadr", 'TABLE[width="140px"]', "#divAgahi", c("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")],
                            adBlockWarningRemoval: ["#adblock-honeypot", ".adblocker-root", ".wp_adblock_detect", c("LmhlYWRlci1ibG9ja2VkLWFk"), c("I2FkX2Jsb2NrZXI=")],
                            adGuardAnnoyances: [".hs-sosyal", "#cookieconsentdiv", 'div[class^="app_gdpr"]', ".as-oil", '[data-cypress="soft-push-notification-modal"]'],
                            adGuardBase: [".BetterJsPopOverlay", c("I2FkXzMwMFgyNTA="), c("I2Jhbm5lcmZsb2F0MjI="), c("I2NhbXBhaWduLWJhbm5lcg=="), c("I0FkLUNvbnRlbnQ=")],
                            adGuardChinese: [c("LlppX2FkX2FfSA=="), c("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"), "#widget-quan", c("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"), c("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")],
                            adGuardFrench: ["#pavePub", c("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"), ".mobile_adhesion", ".widgetadv", c("LmFkc19iYW4=")],
                            adGuardGerman: ['aside[data-portal-id="leaderboard"]'],
                            adGuardJapanese: ["#kauli_yad_1", c("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="), c("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="), c("LmFkZ29vZ2xl"), c("Ll9faXNib29zdFJldHVybkFk")],
                            adGuardMobile: [c("YW1wLWF1dG8tYWRz"), c("LmFtcF9hZA=="), 'amp-embed[type="24smi"]', "#mgid_iframe1", c("I2FkX2ludmlld19hcmVh")],
                            adGuardRussian: [c("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="), c("LnJlY2xhbWE="), 'div[id^="smi2adblock"]', c("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"), "#psyduckpockeball"],
                            adGuardSocial: [c("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="), c("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="), ".etsy-tweet", "#inlineShare", ".popup-social"],
                            adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", ".cnt-publi"],
                            adGuardTrackingProtection: ["#qoo-counter", c("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="), c("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="), c("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="), "#top100counter"],
                            adGuardTurkish: ["#backkapat", c("I3Jla2xhbWk="), c("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="), c("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"), c("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],
                            bulgarian: [c("dGQjZnJlZW5ldF90YWJsZV9hZHM="), "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"],
                            easyList: [".yb-floorad", c("LndpZGdldF9wb19hZHNfd2lkZ2V0"), c("LnRyYWZmaWNqdW5reS1hZA=="), ".textad_headline", c("LnNwb25zb3JlZC10ZXh0LWxpbmtz")],
                            easyListChina: [c("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="), c("LmZyb250cGFnZUFkdk0="), "#taotaole", "#aafoot.top_box", ".cfa_popup"],
                            easyListCookie: [".ezmob-footer", ".cc-CookieWarning", "[data-cookie-number]", c("LmF3LWNvb2tpZS1iYW5uZXI="), ".sygnal24-gdpr-modal-wrap"],
                            easyListCzechSlovak: ["#onlajny-stickers", c("I3Jla2xhbW5pLWJveA=="), c("LnJla2xhbWEtbWVnYWJvYXJk"), ".sklik", c("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],
                            easyListDutch: [c("I2FkdmVydGVudGll"), c("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="), ".adstekst", c("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="), "#semilo-lrectangle"],
                            easyListGermany: ["#SSpotIMPopSlider", c("LnNwb25zb3JsaW5rZ3J1ZW4="), c("I3dlcmJ1bmdza3k="), c("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"), c("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")],
                            easyListItaly: [c("LmJveF9hZHZfYW5udW5jaQ=="), ".sb-box-pubbliredazionale", c("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"), c("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"), c("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],
                            easyListLithuania: [c("LnJla2xhbW9zX3RhcnBhcw=="), c("LnJla2xhbW9zX251b3JvZG9z"), c("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"), c("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"), c("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],
                            estonian: [c("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
                            fanboyAnnoyances: ["#ac-lre-player", ".navigate-to-top", "#subscribe_popup", ".newsletter_holder", "#back-top"],
                            fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
                            fanboyEnhancedTrackers: [".open.pushModal", "#issuem-leaky-paywall-articles-zero-remaining-nag", "#sovrn_container", 'div[class$="-hide"][zoompage-fontsize][style="display: block;"]', ".BlockNag__Card"],
                            fanboySocial: ["#FollowUs", "#meteored_share", "#social_follow", ".article-sharer", ".community__social-desc"],
                            frellwitSwedish: [c("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="), c("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="), "article.category-samarbete", c("ZGl2LmhvbGlkQWRz"), "ul.adsmodern"],
                            greekAdBlock: [c("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"), c("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="), c("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"), "DIV.agores300", "TABLE.advright"],
                            hungarian: ["#cemp_doboz", ".optimonk-iframe-container", c("LmFkX19tYWlu"), c("W2NsYXNzKj0iR29vZ2xlQWRzIl0="), "#hirdetesek_box"],
                            iDontCareAboutCookies: ['.alert-info[data-block-track*="CookieNotice"]', ".ModuleTemplateCookieIndicator", ".o--cookies--container", "#cookies-policy-sticky", "#stickyCookieBar"],
                            icelandicAbp: [c("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
                            latvian: [c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="), c("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],
                            listKr: [c("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="), c("I2xpdmVyZUFkV3JhcHBlcg=="), c("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="), c("aW5zLmZhc3R2aWV3LWFk"), ".revenue_unit_item.dable"],
                            listeAr: [c("LmdlbWluaUxCMUFk"), ".right-and-left-sponsers", c("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="), c("YVtocmVmKj0iYm9vcmFxLm9yZyJd"), c("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],
                            listeFr: [c("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="), c("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="), c("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="), ".site-pub-interstitiel", 'div[id^="crt-"][data-criteo-id]'],
                            officialPolish: ["#ceneo-placeholder-ceneo-12", c("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"), c("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="), c("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="), c("ZGl2I3NrYXBpZWNfYWQ=")],
                            ro: [c("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"), c("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"), c("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="), c("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"), 'a[href^="/url/"]'],
                            ruAd: [c("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"), c("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="), c("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="), "#pgeldiz", ".yandex-rtb-block"],
                            thaiAds: ["a[href*=macau-uta-popup]", c("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="), c("LmFkczMwMHM="), ".bumq", ".img-kosana"],
                            webAnnoyancesUltralist: ["#mod-social-share-2", "#social-tools", c("LmN0cGwtZnVsbGJhbm5lcg=="), ".zergnet-recommend", ".yt.btn-link.btn-md.btn"]
                        }, e = Object.keys(n), [4, rn((a = []).concat.apply(a, e.map((function (e) {
                            return n[e]
                        }))))]) : [2, void 0];
                    case 1:
                        return o = t.sent(), r && function (n, e) {
                            for (var t = "DOM blockers debug:\n```", r = 0, o = Object.keys(n); r < o.length; r++) {
                                var i = o[r];
                                t += "\n".concat(i, ":");
                                for (var a = 0, c = n[i]; a < c.length; a++) {
                                    var u = c[a];
                                    t += "\n  ".concat(e[u] ? "🚫" : "➡️", " ").concat(u)
                                }
                            }
                            console.log("".concat(t, "\n```"))
                        }(n, o), (i = e.filter((function (e) {
                            var t = n[e];
                            return f(t.map((function (n) {
                                return o[n]
                            }))) > .6 * t.length
                        }))).sort(), [2, i]
                }
                var c
            }))
        }))
    }, fontPreferences: function () {
        return function (n, e) {
            void 0 === e && (e = 4e3);
            return D((function (t, o) {
                var i = o.document, a = i.body, c = a.style;
                c.width = "".concat(e, "px"), c.webkitTextSizeAdjust = c.textSizeAdjust = "none", Y() ? a.style.zoom = "".concat(1 / o.devicePixelRatio) : j() && (a.style.zoom = "reset");
                var u = i.createElement("div");
                return u.textContent = r([], Array(e / 20 << 0), !0).map((function () {
                    return "word"
                })).join(" "), a.appendChild(u), n(i, a)
            }), '<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">')
        }((function (n, e) {
            for (var t = {}, r = {}, o = 0, i = Object.keys(vn); o < i.length; o++) {
                var a = i[o], c = vn[a], u = c[0], l = void 0 === u ? {} : u, s = c[1],
                    d = void 0 === s ? "mmMwWLliI0fiflO&1" : s, f = n.createElement("span");
                f.textContent = d, f.style.whiteSpace = "nowrap";
                for (var m = 0, v = Object.keys(l); m < v.length; m++) {
                    var h = v[m], p = l[h];
                    void 0 !== p && (f.style[h] = p)
                }
                t[a] = f, e.append(n.createElement("br"), f)
            }
            for (var b = 0, y = Object.keys(vn); b < y.length; b++) {
                r[a = y[b]] = t[a].getBoundingClientRect().width
            }
            return r
        }))
    }, audio: function () {
        return j() && E() && C() || Y() && N() && (n = window, e = n.URLPattern, f(["union" in Set.prototype, "Iterator" in n, e && "hasRegExpGroups" in e.prototype, "RGB8" in WebGLRenderingContext.prototype]) >= 3) ? -4 : J();
        var n, e
    }, screenFrame: function () {
        var n = this;
        if (j() && E() && C()) return function () {
            return Promise.resolve(void 0)
        };
        var r = nn();
        return function () {
            return e(n, void 0, void 0, (function () {
                var n, e;
                return t(this, (function (t) {
                    switch (t.label) {
                        case 0:
                            return [4, r()];
                        case 1:
                            return n = t.sent(), [2, [(e = function (n) {
                                return null === n ? null : m(n, 10)
                            })(n[0]), e(n[1]), e(n[2]), e(n[3])]]
                    }
                }))
            }))
        }
    }, canvas: function () {
        return U(j() && E() && C())
    }, osCpu: function () {
        return navigator.oscpu
    }, languages: function () {
        var n, e = navigator, t = [], r = e.language || e.userLanguage || e.browserLanguage || e.systemLanguage;
        if (void 0 !== r && t.push([r]), Array.isArray(e.languages)) Y() && f([!("MediaSettingsRange" in (n = window)), "RTCEncodedAudioFrame" in n, "" + n.Intl == "[object Intl]", "" + n.Reflect == "[object Reflect]"]) >= 3 || t.push(e.languages); else if ("string" == typeof e.languages) {
            var o = e.languages;
            o && t.push(o.split(","))
        }
        return t
    }, colorDepth: function () {
        return window.screen.colorDepth
    }, deviceMemory: function () {
        return d(s(navigator.deviceMemory), void 0)
    }, screenResolution: function () {
        if (!(j() && E() && C())) return K()
    }, hardwareConcurrency: function () {
        return d(l(navigator.hardwareConcurrency), void 0)
    }, timezone: function () {
        var n, e = null === (n = window.Intl) || void 0 === n ? void 0 : n.DateTimeFormat;
        if (e) {
            var t = (new e).resolvedOptions().timeZone;
            if (t) return t
        }
        var r,
            o = (r = (new Date).getFullYear(), -Math.max(s(new Date(r, 0, 1).getTimezoneOffset()), s(new Date(r, 6, 1).getTimezoneOffset())));
        return "UTC".concat(o >= 0 ? "+" : "").concat(o)
    }, sessionStorage: function () {
        try {
            return !!window.sessionStorage
        } catch (n) {
            return !0
        }
    }, localStorage: function () {
        try {
            return !!window.localStorage
        } catch (n) {
            return !0
        }
    }, indexedDB: function () {
        if (!F() && !I()) try {
            return !!window.indexedDB
        } catch (n) {
            return !0
        }
    }, openDatabase: function () {
        return !!window.openDatabase
    }, cpuClass: function () {
        return navigator.cpuClass
    }, platform: function () {
        var n = navigator.platform;
        return "MacIntel" === n && j() && !X() ? function () {
            if ("iPad" === navigator.platform) return !0;
            var n = screen, e = n.width / n.height;
            return f(["MediaSource" in window, !!Element.prototype.webkitRequestFullscreen, e > .65 && e < 1.53]) >= 2
        }() ? "iPad" : "iPhone" : n
    }, plugins: function () {
        var n = navigator.plugins;
        if (n) {
            for (var e = [], t = 0; t < n.length; ++t) {
                var r = n[t];
                if (r) {
                    for (var o = [], i = 0; i < r.length; ++i) {
                        var a = r[i];
                        o.push({type: a.type, suffixes: a.suffixes})
                    }
                    e.push({name: r.name, description: r.description, mimeTypes: o})
                }
            }
            return e
        }
    }, touchSupport: function () {
        var n, e = navigator, t = 0;
        void 0 !== e.maxTouchPoints ? t = l(e.maxTouchPoints) : void 0 !== e.msMaxTouchPoints && (t = e.msMaxTouchPoints);
        try {
            document.createEvent("TouchEvent"), n = !0
        } catch (r) {
            n = !1
        }
        return {maxTouchPoints: t, touchEvent: n, touchStart: "ontouchstart" in window}
    }, vendor: function () {
        return navigator.vendor || ""
    }, vendorFlavors: function () {
        for (var n = [], e = 0, t = ["chrome", "safari", "__crWeb", "__gCrWeb", "yandex", "__yb", "__ybro", "__firefox__", "__edgeTrackingPreventionStatistics", "webkit", "oprt", "samsungAr", "ucweb", "UCShellJava", "puffinDevice"]; e < t.length; e++) {
            var r = t[e], o = window[r];
            o && "object" == typeof o && n.push(r)
        }
        return n.sort()
    }, cookiesEnabled: function () {
        var n = document;
        try {
            n.cookie = "cookietest=1; SameSite=Strict;";
            var e = -1 !== n.cookie.indexOf("cookietest=");
            return n.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT", e
        } catch (t) {
            return !1
        }
    }, colorGamut: function () {
        for (var n = 0, e = ["rec2020", "p3", "srgb"]; n < e.length; n++) {
            var t = e[n];
            if (matchMedia("(color-gamut: ".concat(t, ")")).matches) return t
        }
    }, invertedColors: function () {
        return !!an("inverted") || !an("none") && void 0
    }, forcedColors: function () {
        return !!cn("active") || !cn("none") && void 0
    }, monochrome: function () {
        if (matchMedia("(min-monochrome: 0)").matches) {
            for (var n = 0; n <= 100; ++n) if (matchMedia("(max-monochrome: ".concat(n, ")")).matches) return n;
            throw new Error("Too high value")
        }
    }, contrast: function () {
        return un("no-preference") ? 0 : un("high") || un("more") ? 1 : un("low") || un("less") ? -1 : un("forced") ? 10 : void 0
    }, reducedMotion: function () {
        return !!ln("reduce") || !ln("no-preference") && void 0
    }, reducedTransparency: function () {
        return !!sn("reduce") || !sn("no-preference") && void 0
    }, hdr: function () {
        return !!dn("high") || !dn("standard") && void 0
    }, math: function () {
        var n, e = fn.acos || mn, t = fn.acosh || mn, r = fn.asin || mn, o = fn.asinh || mn, i = fn.atanh || mn,
            a = fn.atan || mn, c = fn.sin || mn, u = fn.sinh || mn, l = fn.cos || mn, s = fn.cosh || mn,
            d = fn.tan || mn, f = fn.tanh || mn, m = fn.exp || mn, v = fn.expm1 || mn, h = fn.log1p || mn;
        return {
            acos: e(.12312423423423424),
            acosh: t(1e308),
            acoshPf: (n = 1e154, fn.log(n + fn.sqrt(n * n - 1))),
            asin: r(.12312423423423424),
            asinh: o(1),
            asinhPf: function (n) {
                return fn.log(n + fn.sqrt(n * n + 1))
            }(1),
            atanh: i(.5),
            atanhPf: function (n) {
                return fn.log((1 + n) / (1 - n)) / 2
            }(.5),
            atan: a(.5),
            sin: c(-1e300),
            sinh: u(1),
            sinhPf: function (n) {
                return fn.exp(n) - 1 / fn.exp(n) / 2
            }(1),
            cos: l(10.000000000123),
            cosh: s(1),
            coshPf: function (n) {
                return (fn.exp(n) + 1 / fn.exp(n)) / 2
            }(1),
            tan: d(-1e300),
            tanh: f(1),
            tanhPf: function (n) {
                return (fn.exp(2 * n) - 1) / (fn.exp(2 * n) + 1)
            }(1),
            exp: m(1),
            expm1: v(1),
            expm1Pf: function (n) {
                return fn.exp(n) - 1
            }(1),
            log1p: h(10),
            log1pPf: function (n) {
                return fn.log(1 + n)
            }(10),
            powPI: function (n) {
                return fn.pow(fn.PI, n)
            }(-100)
        }
    }, pdfViewerEnabled: function () {
        return navigator.pdfViewerEnabled
    }, architecture: function () {
        var n = new Float32Array(1), e = new Uint8Array(n.buffer);
        return n[0] = 1 / 0, n[0] = n[0] - n[0], e[3]
    }, applePay: function () {
        var n = window.ApplePaySession;
        if ("function" != typeof (null == n ? void 0 : n.canMakePayments)) return -1;
        if (hn()) return -3;
        try {
            return n.canMakePayments() ? 1 : 0
        } catch (e) {
            return function (n) {
                if (n instanceof Error && "InvalidAccessError" === n.name && /\bfrom\b.*\binsecure\b/i.test(n.message)) return -2;
                throw n
            }(e)
        }
    }, privateClickMeasurement: function () {
        var n, e = document.createElement("a"),
            t = null !== (n = e.attributionSourceId) && void 0 !== n ? n : e.attributionsourceid;
        return void 0 === t ? void 0 : String(t)
    }, audioBaseLatency: function () {
        var n;
        return A() || j() ? window.AudioContext && null !== (n = (new AudioContext).baseLatency) && void 0 !== n ? n : -1 : -2
    }, webGlBasics: function (n) {
        var e, t, r, o, i, a, c = wn(n.cache);
        if (!c) return -1;
        if (!Wn(c)) return -2;
        var u = Sn() ? null : c.getExtension("WEBGL_debug_renderer_info");
        return {
            version: (null === (e = c.getParameter(c.VERSION)) || void 0 === e ? void 0 : e.toString()) || "",
            vendor: (null === (t = c.getParameter(c.VENDOR)) || void 0 === t ? void 0 : t.toString()) || "",
            vendorUnmasked: u ? null === (r = c.getParameter(u.UNMASKED_VENDOR_WEBGL)) || void 0 === r ? void 0 : r.toString() : "",
            renderer: (null === (o = c.getParameter(c.RENDERER)) || void 0 === o ? void 0 : o.toString()) || "",
            rendererUnmasked: u ? null === (i = c.getParameter(u.UNMASKED_RENDERER_WEBGL)) || void 0 === i ? void 0 : i.toString() : "",
            shadingLanguageVersion: (null === (a = c.getParameter(c.SHADING_LANGUAGE_VERSION)) || void 0 === a ? void 0 : a.toString()) || ""
        }
    }, webGlExtensions: function (n) {
        var e = wn(n.cache);
        if (!e) return -1;
        if (!Wn(e)) return -2;
        var t = e.getSupportedExtensions(), r = e.getContextAttributes(), o = [], i = [], a = [], c = [], u = [];
        if (r) for (var l = 0, s = Object.keys(r); l < s.length; l++) {
            var d = s[l];
            i.push("".concat(d, "=").concat(r[d]))
        }
        for (var f = 0, m = kn(e); f < m.length; f++) {
            var v = e[L = m[f]];
            a.push("".concat(L, "=").concat(v).concat(pn.has(v) ? "=".concat(e.getParameter(v)) : ""))
        }
        if (t) for (var h = 0, p = t; h < p.length; h++) {
            var b = p[h];
            if (!("WEBGL_debug_renderer_info" === b && Sn() || "WEBGL_polygon_mode" === b && (Y() || j()))) {
                var y = e.getExtension(b);
                if (y) for (var g = 0, w = kn(y); g < w.length; g++) {
                    var L;
                    v = y[L = w[g]];
                    c.push("".concat(L, "=").concat(v).concat(bn.has(v) ? "=".concat(e.getParameter(v)) : ""))
                } else o.push(b)
            }
        }
        for (var k = 0, V = yn; k < V.length; k++) for (var S = V[k], W = 0, x = gn; W < x.length; W++) {
            var Z = x[W], R = Ln(e, S, Z);
            u.push("".concat(S, ".").concat(Z, "=").concat(R.join(",")))
        }
        return c.sort(), a.sort(), {
            contextAttributes: i,
            parameters: a,
            shaderPrecisions: u,
            extensions: t,
            extensionParameters: c,
            unsupportedExtensions: o
        }
    }
};

function Zn(n) {
    var e = function (n) {
        if (A()) return .4;
        if (j()) return !X() || E() && C() ? .3 : .5;
        var e = "value" in n.platform ? n.platform.value : "";
        if (/^Win/.test(e)) return .6;
        if (/^Mac/.test(e)) return .5;
        return .7
    }(n), t = function (n) {
        return m(.99 + .01 * n, 1e-4)
    }(e);
    return {score: e, comment: "$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g, "".concat(t))}
}

function Rn(e) {
    return JSON.stringify(e, (function (e, t) {
        return t instanceof Error ? n({
            name: (r = t).name,
            message: r.message,
            stack: null === (o = r.stack) || void 0 === o ? void 0 : o.split("\n")
        }, r) : t;
        var r, o
    }), 2)
}

function Mn(n) {
    return Z(function (n) {
        for (var e = "", t = 0, r = Object.keys(n).sort(); t < r.length; t++) {
            var o = r[t], i = n[o], a = "error" in i ? "error" : JSON.stringify(i.value);
            e += "".concat(e ? "|" : "").concat(o.replace(/([:|\\])/g, "\\$1"), ":").concat(a)
        }
        return e
    }(n))
}

function Gn(n) {
    return void 0 === n && (n = 50), function (n, e) {
        void 0 === e && (e = 1 / 0);
        var t = window.requestIdleCallback;
        return t ? new Promise((function (n) {
            return t.call(window, (function () {
                return n()
            }), {timeout: e})
        })) : o(Math.min(n, e))
    }(n, 2 * n)
}

function Fn(n, r) {
    var o = Date.now();
    return {
        get: function (i) {
            return e(this, void 0, void 0, (function () {
                var e, a, c;
                return t(this, (function (t) {
                    switch (t.label) {
                        case 0:
                            return e = Date.now(), [4, n()];
                        case 1:
                            return a = t.sent(), c = function (n) {
                                var e;
                                return {
                                    get visitorId() {
                                        return void 0 === e && (e = Mn(this.components)), e
                                    }, set visitorId(n) {
                                        e = n
                                    }, confidence: Zn(n), components: n, version: "4.5.1"
                                }
                            }(a), (r || (null == i ? void 0 : i.debug)) && console.log("Copy the text below to get the debug data:\n\n```\nversion: ".concat(c.version, "\nuserAgent: ").concat(navigator.userAgent, "\ntimeBetweenLoadAndGet: ").concat(e - o, "\nvisitorId: ").concat(c.visitorId, "\ncomponents: ").concat(Rn(a), "\n```")), [2, c]
                    }
                }))
            }))
        }
    }
}

function In(n) {
    return void 0 === n && (n = {}), e(this, void 0, void 0, (function () {
        var e, r, o;
        return t(this, (function (t) {
            switch (t.label) {
                case 0:
                    return n.monitoring, e = n.delayFallback, r = n.debug, [4, Gn(e)];
                case 1:
                    return t.sent(), o = function (n) {
                        return M(xn, n, [])
                    }({cache: {}, debug: r}), [2, Fn(o, r)]
            }
        }))
    }))
}

var Yn = {load: In, hashComponents: Mn, componentsToDebugString: Rn}, jn = Z;
export {
    Rn as componentsToDebugString,
    Yn as default,
    H as getFullscreenElement,
    J as getUnstableAudioFingerprint,
    U as getUnstableCanvasFingerprint,
    nn as getUnstableScreenFrame,
    K as getUnstableScreenResolution,
    wn as getWebGLContext,
    Mn as hashComponents,
    A as isAndroid,
    Y as isChromium,
    X as isDesktopWebKit,
    I as isEdgeHTML,
    P as isGecko,
    N as isSamsungInternet,
    F as isTrident,
    j as isWebKit,
    In as load,
    M as loadSources,
    jn as murmurX64Hash128,
    Gn as prepareForSources,
    xn as sources,
    G as transformSource,
    D as withIframe
};