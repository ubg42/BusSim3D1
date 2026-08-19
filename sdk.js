var YaGamesLoader;

(() => {
    "use strict";

    var e = {
        r: e => {
            if (
                "undefined" != typeof Symbol &&
                Symbol.toStringTag
            ) {
                Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                });
            }

            Object.defineProperty(e, "__esModule", {
                value: !0
            });
        }
    };

    (() => {
        if (void 0 !== e) {
            var r = e.u;
            var o = e.e;
            var n = {};
            var a = {};

            e.u = function (e) {
                return r(e) + (
                    n.hasOwnProperty(e)
                        ? "?" + n[e]
                        : ""
                );
            };

            e.e = function (n) {
                return o(n).catch(function (o) {
                    var t = a.hasOwnProperty(n)
                        ? a[n]
                        : 3;

                    if (t < 1) {
                        var s = r(n);

                        o.message =
                            "Loading chunk " +
                            n +
                            " failed after 3 retries.\n(" +
                            s +
                            ")";

                        o.request = s;

                        throw o;
                    }

                    return new Promise(function (r) {
                        setTimeout(function () {
                            a[n] = t - 1;
                            r(e.e(n));
                        }, 0);
                    });
                });
            };
        }
    })();

    var r = {};

    e.r(r);

    var o = Object.defineProperty;
    var n = Object.getOwnPropertySymbols;
    var a = Object.prototype.hasOwnProperty;
    var t = Object.prototype.propertyIsEnumerable;

    var s = (e, r, n) =>
        r in e
            ? o(e, r, {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: n
            })
            : e[r] = n;

    var i = (e, r) => {
        for (var o in r || {}) {
            if (a.call(r, o)) {
                s(e, o, r[o]);
            }
        }

        if (n) {
            for (var o of n(r)) {
                if (t.call(r, o)) {
                    s(e, o, r[o]);
                }
            }
        }

        return e;
    };

    if (
        window === window.top ||
        window.sdkLoaderWasInited
    ) {
        const e = window.sdkLoaderWasInited
            ? "The SDK Loader was loaded more than once"
            : "SDK initialization outside of frame";

        console.warn(e);

    } else {

        let e;
        let r;
        let o;
        let n;

        window.sdkLoaderWasInited = !0;

        let a = !1;
        let t = !1;
        let s = !1;

        window.isSdkLoader = !0;

        window.YaGames = {
            init: i => {
                var d;

                return t
                    ? null == (d = window.YaGames)
                        ? void 0
                        : d.init(i)
                    : s
                        ? Promise.reject(f)
                        : n
                            ? (
                                console.warn(
                                    "YaGames was initialized"
                                ),
                                n
                            )
                            : (
                                n = new Promise((n, t) => {
                                    e = n;
                                    r = t;
                                    o = i;
                                    a = !0;
                                }),
                                n
                            );
            }
        };

        const d = {
            type: "unknown",

            isMobile: () => !1,
            isTablet: () => !1,
            isDesktop: () => !1,
            isTV: () => !1
        };

        const c = (e, r = {}) => {
            var o;
            var n;

            window.parent.postMessage(
                {
                    source: "YandexGamesSDK",

                    messageId:
                        `${Date.now()}-${Math.random()}`,

                    type: "error",

                    data: {
                        block:
                            "ErrorCounter/common: sdk-loader",

                        error: {
                            message:
                                `[SDK LOADER]: ${e}`
                        },

                        additional: i(
                            i(
                                i({}, r),

                                (
                                    null == (o = r.error)
                                        ? void 0
                                        : o.message
                                )
                                    ? {
                                        originalMessage:
                                            null == (n = r.error)
                                                ? void 0
                                                : n.message
                                    }
                                    : {}
                            ),

                            r.source
                                ? {
                                    originalSource:
                                        r.source
                                }
                                : {}
                        ),

                        level: "error",
                        source: "sdk-loader",
                        type: "error"
                    }
                },

                "*"
            );
        };

        Object.defineProperty(
            window.YaGames,
            "deviceInfo",
            {
                get: () => {
                    c(
                        "accessing deviceInfo in YaGames"
                    );

                    return d;
                }
            }
        );

        const l = e => {
            const r =
                document.querySelectorAll(
                    `script[src="${e}"]`
                );

            for (let e of Array.from(r)) {
                e.remove();
            }
        };

        const m =
            /^(https|yandexgames):\/\/[^\/][^.][\w.\/\-]+\/sdk\/v2(\?|$)/;

        const u =
            /(^|yandex\.net)\/sdk\/(v\d+|_)\/v2(\.[0-9a-f]*)?\.js/;

        const w = "url sdk not valid";
        const f = "load sdk file error";
        const v = 3;

        const g = (n, i) => {
            const d =
                document.createElement("script");

            d.src = n;

            d.onload = () => {
                var n;

                t = !0;

                if (a) {
                    null == (n = window.YaGames) ||
                    n.init(o)
                        .then(r => {
                            e(r);
                        })
                        .catch(e => {
                            c(
                                "Error while init sdk",
                                {
                                    error: e
                                }
                            );

                            r(e);
                        });
                }
            };

            d.onerror = (
                e,
                o,
                t,
                d,
                m
            ) => {
                l(n);

                if (i > 0) {
                    g(n, --i);
                } else {
                    s = !0;

                    c(
                        f,
                        {
                            event: e,
                            error: m,
                            source: o
                        }
                    );

                    if (a) {
                        r(f);
                    }
                }
            };

            (
                document.head ||
                document.documentElement
            ).append(d);
        };

        const p = (e, o = "") => {
            if (
                e &&
                (
                    m.test(e) ||
                    u.test(e)
                )
            ) {
                const r =
                    new URL(e, location.origin);

                if (o) {
                    r.searchParams.set(
                        "dvh",
                        o
                    );
                }

                g(
                    r.toString(),
                    v
                );

            } else {
                s = !0;

                if (a) {
                    r(w);
                }

                c(w);
            }
        };

        const h =
            new URLSearchParams(
                location.search
            ).get("sdk");

        if (h) {

            p(h);

        } else {

            (async () =>
                new Promise((e, r) => {

                    const o =
                        `${Date.now()}-${Math.random()}`;

                    const n =
                        setTimeout(() => {
                            r(
                                new Error(
                                    "Get external iframe timeout"
                                )
                            );
                        }, 500);

                    window.addEventListener(
                        "message",

                        function r(a) {

                            const t =
                                function (e) {
                                    try {
                                        return JSON.parse(e);
                                    } catch (e) {
                                        return null;
                                    }
                                }(a.data);

                            if (
                                t &&
                                t.messageId === o
                            ) {
                                window.removeEventListener(
                                    "message",
                                    r
                                );

                                clearTimeout(n);

                                e(t.payload);
                            }
                        }
                    );

                    window.parent.postMessage(
                        JSON.stringify({
                            source:
                                "YandexGamesSDK",

                            actionName:
                                "GET_IFRAME_ORIGIN_SRC",

                            channel:
                                "EARLY_SDK_EVENT",

                            messageId: o
                        }),

                        "*"
                    );
                })

            )()

                .then(e => {

                    const r = new URL(e);
                    const o = r.searchParams;
                    const n = o.get("sdk");
                    const a = o.get("dvh") || "";

                    if (!n) {
                        const e =
                            new URLSearchParams(
                                r.search
                            ).get("sdk");

                        return void p(e);
                    }

                    p(n, a);
                })

                .catch(e => {

                    c(
                        "Error while get iframe src",
                        {
                            error: e
                        }
                    );

                    console.error(
                        "SDK initialization failed",
                        e
                    );
                });
        }
    }

    YaGamesLoader = r;

})();

//# sourceMappingURL=https://s3.mds.yandex.net/games-static-private/source-maps/_/sdk/sdk-loader/sdk.js.map
