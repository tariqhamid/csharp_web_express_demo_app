/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.4.0
 */
Bridge.assembly("CSharpWebLib", function ($asm, globals) {
    "use strict";

    Bridge.define("Config.DataConstants", {
        statics: {
            fields: {
                CurrentWorkspaceFileName: null,
                WorkspaceFolder: null
            },
            ctors: {
                init: function () {
                    this.CurrentWorkspaceFileName = "current";
                    this.WorkspaceFolder = "workspaces";
                }
            }
        }
    });

    Bridge.define("Config.GlobalColors", {
        statics: {
            fields: {
                PopupBackground: null,
                PopupBorder: null
            },
            ctors: {
                init: function () {
                    this.PopupBackground = "honeydew";
                    this.PopupBorder = "slategray";
                }
            }
        }
    });

    Bridge.define("Config.GlobalConstants", {
        statics: {
            fields: {
                FontColorIvory: null,
                FontSize25Px: null,
                FontFamilyBioRhymeSerif: null,
                FontFamilyHappyMonkeyBold: null,
                FontFamilyUbuntuMono: null,
                FontFamilyFredokaOne: null,
                FontFamilyMacondo: null,
                FontStyleFormat: null,
                FontStyleBioRhymeIvory25: null,
                FontStyleHappyMonkeyBoldIvory25: null,
                FontStyleUbuntuMonoIvory25: null,
                FontStyleFredokaOneIvory25: null,
                FontStyleMacondoIvory25: null,
                CSharpWebLabel: null,
                CSharpWebLabelStyle: null,
                CSharpWebLabelWidth: 0,
                BUTTON_DEBOUNCE_THRESHOLD: 0
            },
            ctors: {
                init: function () {
                    this.FontColorIvory = "ivory";
                    this.FontSize25Px = "35px";
                    this.FontFamilyBioRhymeSerif = "'BioRhyme',serif";
                    this.FontFamilyHappyMonkeyBold = "'Happy Monkey',cursive";
                    this.FontFamilyUbuntuMono = "'Ubuntu Mono'";
                    this.FontFamilyFredokaOne = "'Fredoka One'";
                    this.FontFamilyMacondo = "'Macondo'";
                    this.FontStyleFormat = "font-family:{0};color:{1};font-size:{2};";
                    this.FontStyleBioRhymeIvory25 = System.String.format(Config.GlobalConstants.FontStyleFormat, Config.GlobalConstants.FontFamilyBioRhymeSerif, Config.GlobalConstants.FontColorIvory, Config.GlobalConstants.FontSize25Px);
                    this.FontStyleHappyMonkeyBoldIvory25 = System.String.format(Config.GlobalConstants.FontStyleFormat, Config.GlobalConstants.FontFamilyHappyMonkeyBold, Config.GlobalConstants.FontColorIvory, Config.GlobalConstants.FontSize25Px);
                    this.FontStyleUbuntuMonoIvory25 = System.String.format(Config.GlobalConstants.FontStyleFormat, Config.GlobalConstants.FontFamilyUbuntuMono, Config.GlobalConstants.FontColorIvory, Config.GlobalConstants.FontSize25Px);
                    this.FontStyleFredokaOneIvory25 = System.String.format(Config.GlobalConstants.FontStyleFormat, Config.GlobalConstants.FontFamilyFredokaOne, Config.GlobalConstants.FontColorIvory, Config.GlobalConstants.FontSize25Px);
                    this.FontStyleMacondoIvory25 = System.String.format(Config.GlobalConstants.FontStyleFormat, Config.GlobalConstants.FontFamilyMacondo, Config.GlobalConstants.FontColorIvory, Config.GlobalConstants.FontSize25Px);
                    this.CSharpWebLabel = "CSharpWebExpress Demo";
                    this.CSharpWebLabelStyle = Config.GlobalConstants.FontStyleMacondoIvory25;
                    this.CSharpWebLabelWidth = 375;
                    this.BUTTON_DEBOUNCE_THRESHOLD = 500;
                }
            }
        }
    });

    Bridge.define("Config.GlobalDimensions", {
        statics: {
            fields: {
                PopupPadding: 0,
                TranscriptLeftInset: 0,
                TranscriptTopInset: 0
            },
            ctors: {
                init: function () {
                    this.PopupPadding = 7;
                    this.TranscriptLeftInset = 15;
                    this.TranscriptTopInset = 55;
                }
            }
        }
    });

    Bridge.define("Config.GlobalFonts", {
        statics: {
            fields: {
                PopupFontSize: null,
                PopupFontFamily: null,
                TranscriptFontSize: null,
                TranscriptFontFamily: null
            },
            ctors: {
                init: function () {
                    this.PopupFontSize = "15px";
                    this.PopupFontFamily = "Ubuntu Mono";
                    this.TranscriptFontSize = "14px";
                    this.TranscriptFontFamily = "Ubuntu Mono";
                }
            }
        }
    });

    Bridge.define("Config.GlobalStyles", {
        statics: {
            fields: {
                TextAlignCenter: null
            },
            ctors: {
                init: function () {
                    this.TextAlignCenter = "center";
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.api.CustomManager", {
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (CSharpWebLib.api.CustomManager._instance == null) {
                            CSharpWebLib.api.CustomManager._instance = new CSharpWebLib.api.CustomManager();
                        }
                        return CSharpWebLib.api.CustomManager._instance;
                    }
                }
            }
        },
        methods: {
            Init: function () {
                var createCustomFn = Bridge.fn.bind(this, function (x) {
                    return this.CreateWidget(x);
                });
                var handleCustomFn = Bridge.fn.bind(this, function (o, n, f) {
                    return this.HandleCustom(o, n, f);
                });
                window.PyQxCreateCustom = createCustomFn;
                var isCustomFn = Bridge.fn.bind(this, function (x) {
                    return this.IsCustom(x);
                });
                window.PyQxCreateCustom = createCustomFn;
                window.PyQxHandleCustom = handleCustomFn;
                window.PyQxIsCustom = isCustomFn;
            },
            CreateWidget: function (name) {
                switch (name) {
                    case ":board": 
                        return new CSharpWebLib.qx.ui.container.GamePanel(3);
                    default: 
                        return new CSharpWebLib.qx.ui.core.Widget();
                }
            },
            AsCustom: function (obj) {
                if (obj == null || obj.getUserData == null) {
                    return null;
                }
                if (this.IsCustomType(obj)) {
                    return Bridge.as(obj, CSharpWebLib.qx.interfaces.ICustomEvent);
                }
                var owner = obj.getUserData("widget_owner");
                if (owner == null) {
                    return null;
                }
                return Bridge.as(owner, CSharpWebLib.qx.interfaces.ICustomEvent);
            },
            HandleCustom: function (obj, name, fn) {
                var customObject = this.AsCustom(obj);
                var eventName = Bridge.as(name, System.String);
                var customFn = fn;
                if (customObject == null || eventName == null || Bridge.staticEquals(customFn, null)) {
                    return;
                }
                customObject.CSharpWebLib$qx$interfaces$ICustomEvent$HandleCustomEvent(eventName, fn);
            },
            IsCustom: function (obj) {
                return this.AsCustom(obj) != null;
            },
            IsCustomType: function (obj) {
                return Bridge.is(obj, CSharpWebLib.qx.interfaces.ICustomEvent);
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.IWidget", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IEventHandler", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.core.Qobject", {
        fields: {
            _qxClass: null,
            NativeObject: null
        },
        props: {
            WindowHeight: {
                get: function () {
                    var $window = window;
                    return $window.innerHeight;
                }
            },
            WindowWidth: {
                get: function () {
                    var $window = window;
                    return $window.innerWidth;
                }
            }
        },
        ctors: {
            ctor: function (qxClass) {
                if (qxClass === void 0) { qxClass = null; }

                this.$initialize();
                this._qxClass = qxClass;
                this.BaseInit();
            }
        },
        methods: {
            AddListener: function (eventName, fn) {
                this.NativeObject.addListener(eventName, fn);
            },
            AfterInit: function () { },
            AsString: function (o) {
                return System.String.format("{0}", [o]);
            },
            BaseInit: function () {
                this.Init();
                this.AfterInit();
            },
            FireEvent: function (eventName) {
                this.NativeObject.fireEvent(eventName);
            },
            Init: function () {
                var $t;
                this.NativeObject = this.Create(($t = this._qxClass, $t != null ? $t : this.QxClass()));
            },
            Create: function (className) {
                var widget = qxlib.app.App.createWidget(className, this.CreationArgs());
                widget.setUserData("widget_owner", this);
                return widget;
            },
            CreationArgs: function () {
                return null;
            },
            PerformAction: function (action) {
                return this.PerformAction$1(action, System.Array.init([], System.Object));
            },
            PerformAction$1: function (action, args) {
                return false;
            },
            PrintLog: function (messages) {
                if (messages === void 0) { messages = []; }
                window.console.log.apply(null, messages);
            },
            QxClass: function () {
                return "qx.core.Object";
            },
            Set: function (name, obj) {
                var fullName = System.String.format("window.{0}", [name]);
                fullName = obj;
            },
            GetUserData: function (tag) {
                return this.NativeObject.getUserData(tag);
            },
            SetUserData: function (tag, value) {
                this.NativeObject.setUserData(tag, value);
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.IPage", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.IRender", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.constants.Colors", {
        statics: {
            fields: {
                ColorWindowBlue: null,
                ColorNavbarBlue: null,
                ColorNavbarBlue2: null,
                ColorBlack: null,
                ColorBlue: null,
                ColorButtonHighlight: null,
                ColorButtonPressed: null,
                ColorButtonShadow: null,
                ColorControl: null,
                ColorControlDark: null,
                ColorControlLight: null,
                ColorControlText: null,
                ColorHatBlue: null,
                ColorDarkBlue: null,
                ColorDarkPurple: null,
                ColorDarkRed: null,
                ColorDarkYellow: null,
                ColorDarkerBlue: null,
                ColorFocusFrame: null,
                ColorGreen: null,
                ColorHighlight: null,
                ColorHotTrack: null,
                ColorIconDark: null,
                ColorIconDarkBlue: null,
                ColorIconLightBlue: null,
                ColorInactiveCaptionText: null,
                ColorInfo: null,
                ColorLightBlue: null,
                ColorLightGray: null,
                ColorLighterGray: null,
                ColorLightPurple: null,
                ColorLighterBlue: null,
                ColorLighterPurple: null,
                ColorMask: null,
                ColorMenu: null,
                ColorMenuText: null,
                ColorPurple: null,
                ColorRed: null,
                ColorScrollBar: null,
                ColorSlateGray: null,
                ColorSuccess: null,
                ColorTableRowBackgroundFocused: null,
                ColorTableRowBackgroundFocusedSelected: null,
                ColorTableRowBackgroundOdd: null,
                ColorTableRowBackgroundSelected: null,
                ColorTextPlaceholder: null,
                ColorWarning: null,
                ColorWhite: null,
                ColorWindowFrame: null,
                ColorWindowText: null,
                ColorYellow: null
            },
            ctors: {
                init: function () {
                    this.ColorWindowBlue = "#517bbd";
                    this.ColorNavbarBlue = "#2c409a";
                    this.ColorNavbarBlue2 = "#3f67a6";
                    this.ColorBlack = "#000000";
                    this.ColorBlue = "#517bbd";
                    this.ColorButtonHighlight = "#28608f";
                    this.ColorButtonPressed = "#204c73";
                    this.ColorButtonShadow = "#7a7a7a";
                    this.ColorControl = "#cdcdcd";
                    this.ColorControlDark = "#b9b9b9";
                    this.ColorControlLight = "#e5e5e5";
                    this.ColorControlText = "#5f5f5f";
                    this.ColorHatBlue = "#494db9";
                    this.ColorDarkBlue = "#385b94";
                    this.ColorDarkPurple = "#4d4c68";
                    this.ColorDarkRed = "#c34134";
                    this.ColorDarkYellow = "#f6af08";
                    this.ColorDarkerBlue = "#315081";
                    this.ColorFocusFrame = "#ffbe00";
                    this.ColorGreen = "#079c58";
                    this.ColorHighlight = "#298ae5";
                    this.ColorHotTrack = "#c1dcf1";
                    this.ColorIconDark = "#919191";
                    this.ColorIconDarkBlue = "#186ded";
                    this.ColorIconLightBlue = "#27a5fa";
                    this.ColorInactiveCaptionText = "#5b5b5b";
                    this.ColorInfo = "#97ccfe";
                    this.ColorLightBlue = "#6b8ec7";
                    this.ColorLightGray = "#bbb";
                    this.ColorLighterGray = "#ddd";
                    this.ColorLightPurple = "#808099";
                    this.ColorLighterBlue = "#90aad5";
                    this.ColorLighterPurple = "#9d9cb0";
                    this.ColorMask = "rgba(255,255,255,0.51)";
                    this.ColorMenu = "#efefef";
                    this.ColorMenuText = "#2b2b2b";
                    this.ColorPurple = "#6a6983";
                    this.ColorRed = "#db4437";
                    this.ColorScrollBar = "#f0f0f0";
                    this.ColorSlateGray = "slategray";
                    this.ColorSuccess = "#1e7b34";
                    this.ColorTableRowBackgroundFocused = "#ddeeff";
                    this.ColorTableRowBackgroundFocusedSelected = "#5a8ad3";
                    this.ColorTableRowBackgroundOdd = "#ededed";
                    this.ColorTableRowBackgroundSelected = "#b3d9ff";
                    this.ColorTextPlaceholder = "#b5b5b5";
                    this.ColorWarning = "#cc9900";
                    this.ColorWhite = "#ffffff";
                    this.ColorWindowFrame = "#bdbfbf";
                    this.ColorWindowText = "#3f3f3f";
                    this.ColorYellow = "#fbbe0e";
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.constants.Dimensions", {
        statics: {
            fields: {
                NavbarFillerAdjust: 0,
                NavbarPadding: null,
                StatusBarHeight: 0
            },
            ctors: {
                init: function () {
                    this.NavbarFillerAdjust = 50;
                    this.NavbarPadding = System.Array.init([0, 7], System.Int32);
                    this.StatusBarHeight = 20;
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.constants.Fonts", {
        statics: {
            fields: {
                FontAudiowide: null,
                FontUbuntu: null
            },
            ctors: {
                init: function () {
                    this.FontAudiowide = "Audiowide";
                    this.FontUbuntu = "Ubuntu";
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.constants.UiConstants", {
        statics: {
            fields: {
                UiVersion: null
            },
            ctors: {
                init: function () {
                    this.UiVersion = "UI version 1.0.0 2018-Sep-09 11:00 am";
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.interfaces.ICodeDisplay", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.ICustomEvent", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IDecorate", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IFileApi", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IHandleSelection", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IServerApi", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.qx.interfaces.IVmApi", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebLib.util.Base64", {
        statics: {
            methods: {
                Encode: function (plainText) {
                    var plainTextBytes = System.Text.Encoding.UTF8.GetBytes$2(plainText);
                    return System.Convert.toBase64String(plainTextBytes, null, null, null);
                },
                Decode: function (base64EncodedData) {
                    var base64Str;
                    if (System.String.startsWith(base64EncodedData, "b'")) {
                        base64Str = base64EncodedData.substr(2, ((base64EncodedData.length - 3) | 0));
                    } else {
                        base64Str = base64EncodedData;
                    }
                    var base64EncodedBytes = System.Convert.fromBase64String(base64Str);
                    return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.util.ButtonConfig", {
        fields: {
            _eventName: null,
            _flex: 0,
            _handler: null,
            _label: null,
            _width: 0
        },
        props: {
            EventName: {
                get: function () {
                    return this._eventName;
                },
                set: function (value) {
                    this._eventName = value;
                }
            },
            Flex: {
                get: function () {
                    return this._flex;
                },
                set: function (value) {
                    this._flex = value;
                }
            },
            Handler: {
                get: function () {
                    return this._handler;
                },
                set: function (value) {
                    this._handler = value;
                }
            },
            Label: {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                }
            },
            Width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                }
            }
        },
        ctors: {
            ctor: function (flex, width) {
                if (width === void 0) { width = 0; }

                this.$initialize();
                this._flex = flex;
                this._width = width;
            },
            $ctor1: function (label, handler) {
                this.$initialize();
                this.Label = label;
                this.Handler = handler;
                this.EventName = System.String.format("on_{0}", [System.String.replaceAll(this.Label.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95))]);
            },
            $ctor2: function (label, handler, eventName) {
                this.$initialize();
                this.Label = label;
                this.Handler = handler;
                this.EventName = eventName;
            }
        }
    });

    Bridge.define("CSharpWebLib.util.HtmlWriter", {
        fields: {
            _sb: null,
            _tagStack: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                this._sb = new System.Text.StringBuilder();
                this._tagStack = new (System.Collections.Generic.Stack$1(System.String)).ctor();
            }
        },
        methods: {
            Newline: function () {
                this._sb.appendLine("<br>");
                return this;
            },
            Pr: function (s) {
                this._sb.append(s);
                return this;
            },
            PrintBold: function (s) {
                return this.PrintSimpleTag("b", s);
            },
            PrintItalic: function (s) {
                return this.PrintSimpleTag("i", s);
            },
            PrintLn: function (s) {
                this.Pr(s);
                this.Newline();
                return this;
            },
            PrintParagraph: function (p) {
                return this.PrnSimpleTag("p", p);
            },
            PrintParagraphs: function (plist) {
                var $t;
                if (plist === void 0) { plist = []; }
                $t = Bridge.getEnumerator(plist);
                try {
                    while ($t.moveNext()) {
                        var p = $t.Current;
                        this.PrintParagraph(p);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return this;
            },
            PrintSimpleTag: function (tag, content) {
                this.PrnSimpleTag(tag, content);
                this.Newline();
                return this;
            },
            Prn: function (s) {
                this._sb.appendLine(s);
                return this;
            },
            PrnSimpleTag: function (tag, content) {
                var s = System.String.format("<{0}>{1}</{0}>", tag, content);
                this.Prn(s);
                return this;
            },
            Space: function () {
                this._sb.append(String.fromCharCode(32));
                return this;
            },
            toString: function () {
                return this._sb.toString();
            }
        }
    });

    Bridge.define("CSharpWebLib.util.Json", {
        statics: {
            fields: {
                _nativeJson: null
            },
            props: {
                NativeJson: {
                    get: function () {
                        if (CSharpWebLib.util.Json._nativeJson == null) {
                            CSharpWebLib.util.Json._nativeJson = window.JSON;
                        }
                        return CSharpWebLib.util.Json._nativeJson;
                    }
                }
            },
            methods: {
                Decode: function (jsonString) {
                    try {
                        return CSharpWebLib.util.Json.NativeJson.parse(jsonString);
                    } catch (e) {
                        e = System.Exception.create(e);
                        System.Console.WriteLine(System.String.format("Json decode error: {0} [{1}]", e.Message, jsonString));
                        return e.Message;
                    }
                },
                Encode: function (obj) {
                    try {
                        return CSharpWebLib.util.Json.NativeJson.stringify(obj);
                    } catch (e) {
                        e = System.Exception.create(e);
                        System.Console.WriteLine(System.String.format("Json encode error: {0}", e.Message));
                        return e.Message;
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.util.ParseUtil", {
        statics: {
            methods: {
                ParseClassDef: function (class_def) {
                    var match = System.Text.RegularExpressions.Regex.match(class_def, "class\\s+([A-Z][A-Za-z0-9_]*)\\s*\\(\\s*([A-Z][A-Za-z0-9_]*)\\s*\\)\\s*");
                    if (match.getSuccess()) {
                        return System.Array.init([match.getGroups().get(1).getValue(), match.getGroups().get(2).getValue()], System.String);
                    } else {
                        return System.Array.init([], System.String);
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.util.StringUtil", {
        statics: {
            methods: {
                AsAscii: function (text) {
                    return System.Text.RegularExpressions.Regex.replace(text, "[^\\u0000-\\u007F]+", "");
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.util.StyleUtil", {
        statics: {
            methods: {
                SetCss: function (widget, cssStr) {
                    window.qx.bom.element.Style.setCss(widget.GetContentElement().NativeObject, cssStr);
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpElement", {
        inherits: [CSharpWebLib.app.viewport.panels.IWidget],
        statics: {
            fields: {
                idCounter: 0
            },
            ctors: {
                init: function () {
                    this.idCounter = 0;
                }
            }
        },
        fields: {
            Widget: null,
            Id: null,
            EventMap: null,
            CssClass: null,
            CssStyle: null,
            CssType: null
        },
        props: {
            Sb: {
                get: function () {
                    return this.GetWidget().Sb;
                }
            }
        },
        alias: ["GetWidget", "CSharpWebLib$app$viewport$panels$IWidget$GetWidget"],
        ctors: {
            init: function () {
                var $t;
                this.Id = System.String.format("bp-id-{0}", [Bridge.box(Bridge.identity(CSharpWebLib.app.bootstrap.BpElement.idCounter, ($t = (CSharpWebLib.app.bootstrap.BpElement.idCounter + 1) | 0, CSharpWebLib.app.bootstrap.BpElement.idCounter = $t, $t)), System.Int32)]);
                this.EventMap = new (System.Collections.Generic.Dictionary$2(System.String,Function))();
            },
            ctor: function (widget) {
                this.$initialize();
                this.Widget = widget;
            }
        },
        methods: {
            Build: function () { },
            AddHandler: function (eventName, handler) {
                this.EventMap.set(eventName, handler);
            },
            AddStyle: function (name, value) {
                if (this.CssStyle == null) {
                    this.CssStyle = "";
                }
                this.CssStyle = (this.CssStyle || "") + ((System.String.format("{0}:{1};", name, value)) || "");
            },
            CloseDiv: function () {
                this.CloseTag("div");
            },
            CloseIframe: function () {
                this.CloseTag("iframe");
            },
            CloseTag: function (tag) {
                this.Prn(System.String.format("</{0}>", [tag]));
                return this;
            },
            MapEvents: function () {
                var $t;
                var element = document.getElementById(this.Id);
                if (element == null) {
                    return;
                }
                $t = Bridge.getEnumerator(this.EventMap.getKeys(), System.String);
                try {
                    while ($t.moveNext()) {
                        var key = $t.Current;
                        element[key] = this.EventMap.get(key);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            OpenH5: function () {
                this.OpenTag("h5");
            },
            CloseH5: function () {
                this.CloseTag("h5");
            },
            OpenDiv: function () {
                this.OpenTag("div");
            },
            ClosePre: function () {
                this.CloseTag("pre");
            },
            OpenPre: function () {
                this.OpenTag("pre");
            },
            OpenBootstrapIframe: function () {
                this.Prn("<iframe>");
                this.Prn("<html>");
                this.Prn("<head>");
                this.Prn("<link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\" rel=\"stylesheet\">");
                this.Prn("</head>");
                this.Prn("<body>");
            },
            CloseBootstrapIframe: function () {
                this.Prn("</body>");
                this.Prn("</html");
            },
            OpenResponsiveIframe: function (src) {
                var html = System.String.format("<iframe class=\"embed-responsive-item\" src=\"{0}\">", [src]);
                this.Pr(html);
            },
            OpenP: function () {
                return this.OpenTag("p");
            },
            CloseImg: function () {
                this.Prn(">");
            },
            CloseP: function () {
                return this.CloseTag("p");
            },
            CloseRow: function () {
                this.CloseTag("tr");
            },
            OpenRow: function () {
                this.OpenTag("tr");
            },
            OpenImg: function (src) {
                var html = System.String.format("<img class=\"img-fluid\" src=\"{0}\" ", [src]);
                this.Pr(html);
            },
            OpenTag: function (tag) {
                var html = System.String.format("<{0}", [tag]);
                html = (html || "") + ((System.String.format(System.String.format(" id=\"{0}\"", [this.Id]), null)) || "");
                if (this.CssClass != null) {
                    html = (html || "") + ((System.String.format(" class=\"{0}\"", [this.CssClass])) || "");
                }
                if (this.CssStyle != null) {
                    html = (html || "") + ((System.String.format(" style=\"{0}\"", [this.CssStyle])) || "");
                }
                if (this.CssType != null) {
                    html = (html || "") + ((System.String.format(" type=\"{0}\"", [this.CssType])) || "");
                }
                html = (html || "") + ">";
                this.Prn(html);
                return this;
            },
            PrnBold: function (str) {
                this.Prn(System.String.format("<b>{0}</b>", [str]));
            },
            PrnP: function (str) {
                this.Prn(System.String.format("<p>{0}</p>", [str]));
            },
            Pr: function (str) {
                this.Sb.append(str);
            },
            Prn: function (str) {
                this.Sb.appendLine(str);
            },
            Render: function () {
                this.Build();
                this.AfterBuild();
                return this.GetWidget().Sb.toString();
            },
            AfterBuild: function () { },
            GetWidget: function () {
                return this.Widget.CSharpWebLib$app$viewport$panels$IWidget$GetWidget();
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.core.LayoutItem", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        fields: {
            _height: 0,
            _marginBottom: 0,
            _marginLeft: 0,
            _marginRight: 0,
            _marginTop: 0,
            _parent: null,
            _width: 0
        },
        props: {
            Height: {
                get: function () {
                    return this._height;
                },
                set: function (value) {
                    this._height = value;
                    if (this._height >= 0) {
                        this.NativeObject.setHeight(this._height);
                    }
                }
            },
            MarginBottom: {
                get: function () {
                    return this._marginBottom;
                },
                set: function (value) {
                    this._marginBottom = value;
                    if (this._marginBottom >= 0) {
                        this.NativeObject.setMarginBottom(this._marginBottom);
                    }
                }
            },
            MarginLeft: {
                get: function () {
                    return this._marginLeft;
                },
                set: function (value) {
                    this._marginLeft = value;
                    if (this._marginLeft >= 0) {
                        this.NativeObject.setMarginLeft(this._marginLeft);
                    }
                }
            },
            MarginRight: {
                get: function () {
                    return this._marginRight;
                },
                set: function (value) {
                    this._marginRight = value;
                    if (this._marginRight >= 0) {
                        this.NativeObject.setMarginRight(this._marginRight);
                    }
                }
            },
            MarginTop: {
                get: function () {
                    return this._marginTop;
                },
                set: function (value) {
                    this._marginTop = value;
                    if (this._marginTop >= 0) {
                        this.NativeObject.setMarginTop(this._marginTop);
                    }
                }
            },
            Parent: {
                get: function () {
                    return this._parent;
                },
                set: function (value) {
                    this._parent = value;
                }
            },
            Width: {
                get: function () {
                    return this._width;
                },
                set: function (value) {
                    this._width = value;
                    if (this._width >= 0) {
                        this.NativeObject.setWidth(this._width);
                    }
                }
            }
        },
        ctors: {
            ctor: function (qxClass) {
                if (qxClass === void 0) { qxClass = null; }

                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this, qxClass);
            }
        },
        methods: {
            DefaultHeight: function () {
                return -1;
            },
            DefaultMarginBottom: function () {
                return -1;
            },
            DefaultMarginLeft: function () {
                return -1;
            },
            DefaultMarginRight: function () {
                return -1;
            },
            DefaultMarginTop: function () {
                return -1;
            },
            DefaultWidth: function () {
                return -1;
            },
            Init: function () {
                CSharpWebLib.qx.core.Qobject.prototype.Init.call(this);
                this.Height = this.DefaultHeight();
                this.Width = this.DefaultWidth();
                this.MarginBottom = this.DefaultMarginBottom();
                this.MarginLeft = this.DefaultMarginLeft();
                this.MarginRight = this.DefaultMarginRight();
                this.MarginTop = this.DefaultMarginTop();
            },
            OnParentResize: function () { },
            QxClass: function () {
                return "qx.ui.core.LayoutItem";
            }
        }
    });

    Bridge.define("CSharpWebLib.proxy.ProxyManager", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (CSharpWebLib.proxy.ProxyManager._instance == null) {
                            CSharpWebLib.proxy.ProxyManager._instance = new CSharpWebLib.proxy.ProxyManager();
                        }
                        return CSharpWebLib.proxy.ProxyManager._instance;
                    }
                }
            }
        },
        fields: {
            _proxyTable: null,
            _vmApi: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this);
                this._proxyTable = new (System.Collections.Generic.Dictionary$2(System.Int32,System.Object))();
            }
        },
        methods: {
            ProcessMessages: function (messages) {
                var $t;
                $t = Bridge.getEnumerator(messages);
                try {
                    while ($t.moveNext()) {
                        var message = Bridge.cast($t.Current, System.Object);
                        this.ProcessMessage(message);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            ProcessMessage: function (message) {
                var action = message.action;
                switch (action) {
                    case "builtin": 
                        this.ActionBuiltin(message);
                        break;
                    case "create": 
                        this.ActionCreate(message);
                        break;
                    case "on_event": 
                        this.ActionOnEvent(message);
                        break;
                    case "send": 
                        this.ActionSend(message);
                        break;
                    default: 
                        this.PrintLog([System.String.format("action [{0}] not found", [action])]);
                        break;
                }
            },
            ActionBuiltin: function (message) {
                var method = message.method;
                var args = this.NormalizeArgs(message.args);
                switch (method) {
                    case "print": 
                        this.BuiltinPrint(args);
                        break;
                    default: 
                        this.PrintLog([System.String.format("builtin method [{0}] not found", [method])]);
                        break;
                }
            },
            ActionCreate: function (message) {
                var proxyId = message.proxy_id;
                var args = message.args;
                if (args.length < 1) {
                    return;
                }
                var createClass = args[System.Array.index(0, args)];
                switch (createClass) {
                    case "window": 
                        this._proxyTable.set(proxyId, new CSharpWebLib.qx.ui.windows.Window());
                        break;
                    default: 
                        var obj = this.Create(createClass);
                        this._proxyTable.set(proxyId, obj);
                        break;
                }
            },
            ActionOnEvent: function (message) {
                var proxyId = message.proxy_id;
                var receiver = this.LookupInTable(proxyId);
                if (receiver == null) {
                    return;
                }
                var event_name = message.event_name;
                var handler_id = message.handler_id;
                var handler_fn_name = message.handler_fn_name;
                var fn = Bridge.fn.bind(this, function () {
                    this.OnEvent(handler_id, handler_fn_name);
                });
                receiver.addListener(event_name, fn);
            },
            ActionSend: function (message) {
                var proxyId = message.proxy_id;
                var args = message.args;
                if (args.length < 1) {
                    return;
                }
                args = args[System.Array.index(0, args)];
                if (args.length < 1) {
                    return;
                }
                var method = Bridge.toString(args.shift());
                var receiver = this.LookupInTable(proxyId);
                if (receiver == null) {
                    return;
                }
                var fn = receiver[method];
                if (fn == null) {
                    return;
                }
                fn.apply(receiver, this.NormalizeArgs(args));
            },
            BuiltinPrint: function (args) { },
            LookupInTable: function (proxyId) {
                var value = { };
                this._proxyTable.tryGetValue(proxyId, value);
                if (value.v != null && value.v.NativeObject != null) {
                    return value.v.NativeObject;
                }
                return value.v;
            },
            NormalizeArgs: function (args) {
                var $t;
                var args2 = new (System.Collections.Generic.List$1(System.Object)).ctor();
                $t = Bridge.getEnumerator(args);
                try {
                    while ($t.moveNext()) {
                        var arg = $t.Current;
                        if (arg.proxy_id != null) {
                            args2.add(this.LookupInTable(arg.proxy_id));
                        } else {
                            args2.add(arg);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return args2.ToArray();
            },
            OnEvent: function (proxyId, methodName) {
                this._vmApi.CSharpWebLib$qx$interfaces$IVmApi$HandleEvent(proxyId, methodName);
            },
            SetVmApi: function (vmApi) {
                this._vmApi = vmApi;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.html.Element", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        fields: {
            _domElement: null
        },
        ctors: {
            ctor: function (element) {
                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this);
                this.NativeObject = element;
            }
        },
        methods: {
            AddClass: function (className) {
                this.NativeObject.addClass(className);
            },
            EnsureDomElement: function () {
                if (this._domElement == null) {
                    this._domElement = this.NativeObject.getDomElement();
                }
            },
            GetDomElement: function () {
                this.EnsureDomElement();
                return this._domElement;
            },
            GetScrollHeight: function () {
                this.EnsureDomElement();
                if (this._domElement == null) {
                    return 0;
                } else {
                    return this._domElement.scrollHeight;
                }
            },
            ScrollTo: function (scroll) {
                this.EnsureDomElement();
                if (this._domElement != null) {
                    if (this._domElement.scrollTo != null) {
                        this._domElement.scrollTo(0, scroll);
                    } else {
                        this._domElement.scrollTop = scroll;
                    }
                }
            },
            ScrollToBottom: function () {
                this.ScrollTo(this.GetScrollHeight());
            },
            SetStyle: function (key, value) {
                this.NativeObject.setStyle(key, value);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.io.request.AbstractRequest", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        fields: {
            _contentType: null,
            _requestData: null,
            _url: null
        },
        props: {
            ContentType: {
                get: function () {
                    return this._contentType;
                },
                set: function (value) {
                    this._contentType = value;
                    this.NativeObject.setRequestHeader("Content-Type", this._contentType);
                }
            },
            Response: {
                get: function () {
                    return this.NativeObject.getResponse();
                }
            },
            ResponseJson: {
                get: function () {
                    return CSharpWebLib.util.Json.Decode(this.ResponseText);
                }
            },
            ResponseText: {
                get: function () {
                    return this.NativeObject.getResponseText();
                }
            },
            RequestData: {
                get: function () {
                    return this._requestData;
                },
                set: function (value) {
                    this._requestData = value;
                    this.NativeObject.setRequestData(this._requestData);
                }
            },
            Url: {
                get: function () {
                    return this._url;
                },
                set: function (value) {
                    this._url = value;
                    this.NativeObject.setUrl(this._url);
                }
            }
        },
        methods: {
            Send: function () {
                this.NativeObject.send();
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.decoration.AbstractDecoration", {
        inherits: [CSharpWebLib.qx.core.Qobject]
    });

    Bridge.define("CSharpWebLib.qx.ui.form.Form", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        methods: {
            QxClass: function () {
                return "qx.ui.form.Form";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Abstract", {
        inherits: [CSharpWebLib.qx.core.Qobject]
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.Manager", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        methods: {
            QxClass: function () {
                return "qx.ui.menu.Manager";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.AbstractTableModel", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        methods: {
            SetData: function (data) { },
            QxClass: function () {
                return "qx.ui.table.model.Abstract";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.BasicColumnModel", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        methods: {
            SetColumnVisible: function (col, visible) {
                this.NativeObject.setColumnVisible(col, visible);
            },
            QxClass: function () {
                return "qx.ui.table.columnmodel.Basic";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.SelectionModel", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        fields: {
            Table: null
        },
        ctors: {
            ctor: function (table) {
                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this);
                this.Table = table;
            }
        },
        methods: {
            AfterInit: function () {
                this.AddListener("changeSelection", Bridge.fn.cacheBind(this, this.OnChangeSelection));
            },
            GetAnchorSelectionIndex: function () {
                return this.NativeObject.getAnchorSelectionIndex();
            },
            OnChangeSelection: function () {
                this.Table.OnChangeSelection();
            },
            QxClass: function () {
                return "qx.ui.table.selection.Model";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.util.TextMeasure", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (CSharpWebLib.qx.ui.util.TextMeasure._instance == null) {
                            CSharpWebLib.qx.ui.util.TextMeasure._instance = new CSharpWebLib.qx.ui.util.TextMeasure();
                        }

                        return CSharpWebLib.qx.ui.util.TextMeasure._instance;
                    }
                }
            },
            methods: {
                GetWidth: function (text, fontFamily, fontSize) {
                    return CSharpWebLib.qx.ui.util.TextMeasure.Instance.MeasureText(text, fontFamily, fontSize);
                }
            }
        },
        fields: {
            _canvas: null,
            _ctx: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this);
                this._canvas = document.createElement("canvas");
                this._ctx = this._canvas.getContext("2d");
            }
        },
        methods: {
            MeasureText: function (text, fontFamily, fontSize) {
                this._ctx.font = System.String.format("{0} '{1}'", fontSize, fontFamily);
                return this._ctx.measureText(text).width;
            }
        }
    });

    Bridge.define("CSharpWebLib.util.NewsWriter", {
        inherits: [CSharpWebLib.util.HtmlWriter],
        methods: {
            Generate: function () { },
            CloseNewsItem: function () {
                this.Newline();
                this.Newline();
            },
            GenerateNewsItem: function (subject, plist) {
                if (plist === void 0) { plist = []; }
                this.OpenNewsItem(subject, System.DateTime.getNow());
                this.PrintParagraphs(plist);
                this.CloseNewsItem();
            },
            OpenNewsItem: function (subject, date) {
                this.PrintBold(subject);
                this.PrintItalic(System.DateTime.format(date, "ddd, dd MMM yyyy HH:mm:ss UTC"));
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpContainer", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Children: null
        },
        ctors: {
            init: function () {
                this.Children = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpElement)).ctor();
            },
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
            }
        },
        methods: {
            AddChild: function (child) {
                this.Children.add(child);
            },
            Build: function () {
                var $t;
                this.OpenContainer();
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseContainer();
            },
            OpenContainer: function () {
                this.CssClass = "container-fluid";
                this.CssStyle = "padding: 25px 10px;";
                this.OpenDiv();
            },
            CloseContainer: function () {
                this.CloseDiv();
            },
            MapEvents: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.MapEvents();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpBr", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            _n: 0
        },
        ctors: {
            ctor: function (widget, n) {
                if (n === void 0) { n = 1; }

                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this._n = n;
            }
        },
        methods: {
            Build: function () {
                for (var i = 0; i < this._n; i = (i + 1) | 0) {
                    this.Prn("<br>");
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpButton", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Text: null
        },
        ctors: {
            ctor: function (text, widget, onClick) {
                if (onClick === void 0) { onClick = null; }

                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Text = text;
                if (!Bridge.staticEquals(onClick, null)) {
                    this.AddHandler("onclick", onClick);
                }
            }
        },
        methods: {
            Build: function () {
                this.OpenButton();
                this.Pr(this.Text);
                this.CloseButton();
            },
            OpenButton: function () {
                this.CssClass = "btn btn-outline-secondary btn-sm btn-block";
                this.CssType = "button";
                this.OpenTag("button");
            },
            CloseButton: function () {
                this.CloseTag("button");
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpCard", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            HeaderStyle: null,
            Title: null,
            Container: null
        },
        ctors: {
            ctor: function (text, widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Title = text;
                this.Container = new CSharpWebLib.app.bootstrap.BpContainer(this);
            }
        },
        methods: {
            Build: function () {
                this.OpenCard();
                this.OpenCardBody();
                this.BuildTitle();
                this.BuildContent();
                this.CloseCardBody();
                this.CloseCard();
            },
            AddContent: function () { },
            AddContentItem: function (item) {
                this.Container.AddChild(item);
            },
            BuildContent: function () {
                this.AddContent();
                this.Container.Build();
            },
            BuildTitle: function () {
                this.OpenTitle();
                this.Pr(this.Title);
                this.CloseTitle();
            },
            OpenTitle: function () {
                this.CssClass = "card-title";
                this.CssStyle = this.HeaderStyle;
                this.OpenH5();
            },
            CloseTitle: function () {
                this.CloseH5();
            },
            OpenCard: function () {
                this.CssClass = "card";
                this.OpenDiv();
            },
            OpenCardBody: function () {
                this.CssClass = "card-body";
                this.OpenDiv();
            },
            CloseCardBody: function () {
                this.CloseDiv();
            },
            CloseCard: function () {
                this.CloseDiv();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpCode", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Code: null
        },
        ctors: {
            init: function () {
                this.Code = "";
            },
            ctor: function (widget, code) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Code = code;
            }
        },
        methods: {
            Build: function () {
                this.OpenCode();
                this.Pr(this.Code);
                this.CloseCode();
            },
            OpenCode: function () {
                this.CssClass = "prettyprint";
                this.OpenPre();
            },
            CloseCode: function () {
                this.ClosePre();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpColumn", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Width: 0,
            Children: null
        },
        ctors: {
            init: function () {
                this.Children = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpElement)).ctor();
            },
            ctor: function (widget, width) {
                if (width === void 0) { width = 6; }

                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Width = width;
            }
        },
        methods: {
            AddChild: function (child) {
                this.Children.add(child);
                return this;
            },
            Build: function () {
                var $t;
                this.OpenColumn();
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseColumn();
            },
            OpenColumn: function () {
                this.CssClass = System.String.format("col-md-{0}", [Bridge.box(this.Width, System.Int32)]);
                this.OpenDiv();
            },
            CloseColumn: function () {
                this.CloseDiv();
            },
            MapEvents: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.MapEvents();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpImg", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Src: null
        },
        ctors: {
            ctor: function (widget, src) {
                if (src === void 0) { src = ""; }

                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Src = src;
            }
        },
        methods: {
            Build: function () {
                this.OpenImg(this.Src);
                this.CloseImg();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpTable", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Rows: null
        },
        ctors: {
            init: function () {
                this.Rows = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpElement)).ctor();
            },
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.AddHeaders();
                this.AddRows();
            }
        },
        methods: {
            AddHeaders: function () { },
            AddRows: function () { },
            AddHeaderRow: function (columns) {
                this.Rows.add(new CSharpWebLib.app.bootstrap.BpTableHeaderRow(this.Widget, columns));
            },
            AddRow: function (columns) {
                this.Rows.add(new CSharpWebLib.app.bootstrap.BpTableRow(this.Widget, columns));
            },
            Build: function () {
                var $t;
                this.OpenTable();
                $t = Bridge.getEnumerator(this.Rows);
                try {
                    while ($t.moveNext()) {
                        var row = $t.Current;
                        row.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseTable();
            },
            OpenTable: function () {
                this.CssClass = "table table-bordered table-striped";
                this.OpenTag("table");
            },
            CloseTable: function () {
                this.CloseTag("table");
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpTableCol", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Text: null
        },
        ctors: {
            init: function () {
                this.Text = "";
            },
            ctor: function (widget, text) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Text = text;
            }
        },
        methods: {
            Build: function () {
                this.OpenCol();
                this.Pr(this.Text);
                this.CloseCol();
            },
            OpenCol: function () {
                this.OpenTag("td");
            },
            CloseCol: function () {
                this.CloseTag("td");
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpTableHeaderCol", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Text: null
        },
        ctors: {
            init: function () {
                this.Text = "";
            },
            ctor: function (widget, text) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Text = text;
            }
        },
        methods: {
            Build: function () {
                this.OpenCol();
                this.Pr(this.Text);
                this.CloseCol();
            },
            OpenCol: function () {
                this.OpenTag("th");
            },
            CloseCol: function () {
                this.CloseTag("th");
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpTableHeaderRow", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Cols: null
        },
        ctors: {
            init: function () {
                this.Cols = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpTableHeaderCol)).ctor();
            },
            ctor: function (widget, columns) {
                var $t;
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                $t = Bridge.getEnumerator(columns);
                try {
                    while ($t.moveNext()) {
                        var column = $t.Current;
                        this.AddCol(new CSharpWebLib.app.bootstrap.BpTableHeaderCol(widget, column));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        },
        methods: {
            AddCol: function (col) {
                this.Cols.add(col);
            },
            Build: function () {
                var $t;
                this.OpenRow();
                $t = Bridge.getEnumerator(this.Cols);
                try {
                    while ($t.moveNext()) {
                        var col = $t.Current;
                        col.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseRow();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpTableRow", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Cols: null
        },
        ctors: {
            init: function () {
                this.Cols = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpTableCol)).ctor();
            },
            ctor: function (widget, columns) {
                var $t;
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                $t = Bridge.getEnumerator(columns);
                try {
                    while ($t.moveNext()) {
                        var column = $t.Current;
                        this.AddCol(new CSharpWebLib.app.bootstrap.BpTableCol(widget, column));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        },
        methods: {
            AddCol: function (col) {
                this.Cols.add(col);
            },
            Build: function () {
                var $t;
                this.OpenRow();
                $t = Bridge.getEnumerator(this.Cols);
                try {
                    while ($t.moveNext()) {
                        var col = $t.Current;
                        col.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseRow();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpText", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Text: null
        },
        ctors: {
            init: function () {
                this.Text = "";
            },
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
            },
            $ctor1: function (widget, text) {
                CSharpWebLib.app.bootstrap.BpText.ctor.call(this, widget);
                this.Text = text;
            }
        },
        methods: {
            AddText: function (text) {
                this.Text = (this.Text || "") + (text || "");
                return this;
            },
            AddBold: function (text) {
                return this.AddText(System.String.format("<b>{0}</b>", [text]));
            },
            AddLink: function (url, text) {
                var code = System.String.format("<a href=\"{0}\" target=\"_blank\">{1}</a>", url, text);
                return this.AddText(code);
            },
            AddP: function (text) {
                return this.AddText(System.String.format("<p>{0}</p>", [text]));
            },
            Build: function () {
                this.BuildText();
                this.OpenText();
                this.Pr(this.Text);
                this.CloseText();
            },
            BuildText: function () { },
            OpenText: function () {
                this.CssClass = "card-text";
                this.OpenP();
            },
            CloseText: function () {
                this.CloseP();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.BpVideo", {
        inherits: [CSharpWebLib.app.bootstrap.BpElement],
        fields: {
            Src: null,
            Ratio: null
        },
        ctors: {
            ctor: function (widget, src) {
                if (src === void 0) { src = ""; }

                this.$initialize();
                CSharpWebLib.app.bootstrap.BpElement.ctor.call(this, widget);
                this.Src = src;
                this.Ratio = "4by3";
            }
        },
        methods: {
            Build: function () {
                this.OpenEmbed();
                this.OpenResponsiveIframe(this.Src);
                this.CloseIframe();
                this.CloseEmbed();
            },
            OpenEmbed: function () {
                this.CssClass = System.String.format("embed-responsive embed-responsive-{0}", [this.Ratio]);
                this.OpenDiv();
            },
            CloseEmbed: function () {
                this.CloseDiv();
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.core.Widget", {
        inherits: [CSharpWebLib.qx.ui.core.LayoutItem,CSharpWebLib.qx.interfaces.IEventHandler],
        fields: {
            _backgroundColor: null,
            _contentElement: null,
            _decorator: null,
            _firstAppearance: false,
            _hasResized: false,
            _padding: null,
            _textColor: null
        },
        props: {
            BackgroundColor: {
                get: function () {
                    return this._backgroundColor;
                },
                set: function (value) {
                    this._backgroundColor = value;
                    if (this._backgroundColor.length > 0) {
                        this.NativeObject.setBackgroundColor(this._backgroundColor);
                    }
                }
            },
            Decorator: {
                get: function () {
                    return this._decorator;
                },
                set: function (value) {
                    this._decorator = value;
                    if (this._decorator != null) {
                        this.NativeObject.setDecorator(this._decorator.NativeObject);
                    }
                }
            },
            Enabled: {
                get: function () {
                    return this.NativeObject.getEnabled();
                },
                set: function (value) {
                    this.NativeObject.setEnabled(value);
                }
            },
            HasResized: {
                get: function () {
                    return this._hasResized;
                }
            },
            InnerHeight: {
                get: function () {
                    return this.NativeObject.getInnerSize().height;
                }
            },
            InnerWidth: {
                get: function () {
                    return this.NativeObject.getInnerSize().width;
                }
            },
            Padding: {
                get: function () {
                    return this._padding;
                },
                set: function (value) {
                    this._padding = value;
                    switch (this._padding.length) {
                        case 1: 
                            this.NativeObject.setPadding(this._padding[System.Array.index(0, this._padding)]);
                            break;
                        case 2: 
                            this.NativeObject.setPadding(this._padding[System.Array.index(0, this._padding)], this._padding[System.Array.index(1, this._padding)]);
                            break;
                        case 3: 
                            this.NativeObject.setPadding(this._padding[System.Array.index(0, this._padding)], this._padding[System.Array.index(1, this._padding)], this._padding[System.Array.index(2, this._padding)]);
                            break;
                        case 4: 
                            this.NativeObject.setPadding(this._padding[System.Array.index(0, this._padding)], this._padding[System.Array.index(1, this._padding)], this._padding[System.Array.index(2, this._padding)], this._padding[System.Array.index(3, this._padding)]);
                            break;
                    }
                }
            },
            StyleFontFamily: {
                set: function (value) {
                    this.SetStyle("fontFamily", value);
                }
            },
            StyleFontSize: {
                set: function (value) {
                    this.SetStyle("fontSize", value);
                }
            },
            StyleTextAlign: {
                set: function (value) {
                    this.SetStyle("textAlign", value);
                }
            },
            TextColor: {
                get: function () {
                    return this._textColor;
                },
                set: function (value) {
                    this._textColor = value;
                    if (this._textColor.length > 0) {
                        this.NativeObject.setTextColor(this._textColor);
                    }
                }
            }
        },
        alias: ["HandleEvent", "CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent"],
        ctors: {
            ctor: function (qxClass) {
                if (qxClass === void 0) { qxClass = null; }

                this.$initialize();
                CSharpWebLib.qx.ui.core.LayoutItem.ctor.call(this, qxClass);
                this._firstAppearance = true;
            }
        },
        methods: {
            AddContent: function () { },
            AfterFirstResize: function () {
                this._hasResized = true;
                this.SetStyles();
            },
            AfterInit: function () {
                this.AddContent();
            },
            Decorate: function (decorateImplementor) {
                decorateImplementor.CSharpWebLib$qx$interfaces$IDecorate$Decorate(this);
                return this;
            },
            DefaultBackgroundColor: function () {
                return "";
            },
            DefaultDecorator: function () {
                return null;
            },
            DefaultPadding: function () {
                return System.Array.init([], System.Int32);
            },
            DefaultShow: function () {
                return false;
            },
            DefaultTextColor: function () {
                return "";
            },
            Focus: function () {
                this.NativeObject.focus();
            },
            GetContentElement: function () {
                if (this._contentElement == null) {
                    this._contentElement = new CSharpWebLib.qx.html.Element(this.NativeObject.getContentElement());
                }
                return this._contentElement;
            },
            HandleEvent: function (eventName) { },
            HandlesAppear: function () {
                return false;
            },
            HandlesCustomEvents: function () {
                return false;
            },
            Hide: function () {
                this.NativeObject.hide();
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.LayoutItem.prototype.Init.call(this);
                this._hasResized = false;
                this.BackgroundColor = this.DefaultBackgroundColor();
                this.Decorator = this.DefaultDecorator();
                this.Padding = this.DefaultPadding();
                if (this.HandlesAppear()) {
                    var appearHandler = Bridge.fn.cacheBind(this, this.OnAppear);
                    this.NativeObject.addListener("appear", appearHandler);
                }
                var resizeHandler = Bridge.fn.cacheBind(this, this.OnResize);
                this.NativeObject.addListener("resize", resizeHandler);
                if (this.DefaultShow()) {
                    this.Show();
                }
            },
            QxClass: function () {
                return "qx.ui.core.Widget";
            },
            OnAppear: function () {
                this._firstAppearance = false;
            },
            OnResize: function () {
                if (!this._hasResized) {
                    this.AfterFirstResize();
                }
            },
            ScrollToBottom: function () {
                this.GetContentElement().ScrollToBottom();
            },
            SetStyle: function (key, value) {
                this.GetContentElement().SetStyle(key, value);
            },
            SetStyles: function () { },
            Show: function () {
                this.NativeObject.show();
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.io.request.Xhr", {
        inherits: [CSharpWebLib.qx.io.request.AbstractRequest],
        fields: {
            _method: null
        },
        props: {
            Method: {
                get: function () {
                    return this._method;
                },
                set: function (value) {
                    this._method = value;
                    this.NativeObject.setMethod(this._method);
                }
            }
        },
        methods: {
            QxClass: function () {
                return "qx.io.request.Xhr";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.decoration.Decorator", {
        inherits: [CSharpWebLib.qx.ui.decoration.AbstractDecoration],
        props: {
            BackgroundColor: {
                get: function () {
                    return this.NativeObject.getBackgroundColor();
                },
                set: function (value) {
                    this.NativeObject.setBackgroundColor(value);
                }
            },
            BackgroundImage: {
                get: function () {
                    return this.NativeObject.getBackgroundImage();
                },
                set: function (value) {
                    this.NativeObject.setBackgroundImage(value);
                }
            },
            Color: {
                get: function () {
                    return this.NativeObject.getColor();
                },
                set: function (value) {
                    this.NativeObject.setColor(value);
                }
            },
            ColorBottom: {
                get: function () {
                    return this.NativeObject.getColorBottom();
                },
                set: function (value) {
                    this.NativeObject.setColorBottom(value);
                }
            },
            ColorLeft: {
                get: function () {
                    return this.NativeObject.getColorLeft();
                },
                set: function (value) {
                    this.NativeObject.setColorLeft(value);
                }
            },
            ColorRight: {
                get: function () {
                    return this.NativeObject.getColorRight();
                },
                set: function (value) {
                    this.NativeObject.setColorRight(value);
                }
            },
            ColorTop: {
                get: function () {
                    return this.NativeObject.getColorTop();
                },
                set: function (value) {
                    this.NativeObject.setColorTop(value);
                }
            },
            EndColor: {
                get: function () {
                    return this.NativeObject.getEndColor();
                },
                set: function (value) {
                    this.NativeObject.setEndColor(value);
                }
            },
            EndColorPosition: {
                get: function () {
                    return this.NativeObject.getEndColorPosition();
                },
                set: function (value) {
                    this.NativeObject.setEndColorPosition(value);
                }
            },
            Orientation: {
                get: function () {
                    return this.NativeObject.getOrientation();
                },
                set: function (value) {
                    this.NativeObject.setOrientation(value);
                }
            },
            Radius: {
                get: function () {
                    return this.NativeObject.getRadius();
                },
                set: function (value) {
                    this.NativeObject.setRadius(value);
                }
            },
            StartColor: {
                get: function () {
                    return this.NativeObject.getStartColor();
                },
                set: function (value) {
                    this.NativeObject.setStartColor(value);
                }
            },
            StartColorPosition: {
                get: function () {
                    return this.NativeObject.getStartColorPosition();
                },
                set: function (value) {
                    this.NativeObject.setStartColorPosition(value);
                }
            },
            Width: {
                get: function () {
                    return this.NativeObject.getWidth();
                },
                set: function (value) {
                    this.NativeObject.setWidth(value);
                }
            },
            WidthBottom: {
                get: function () {
                    return this.NativeObject.getWidthBottom();
                },
                set: function (value) {
                    this.NativeObject.setWidthBottom(value);
                }
            },
            WidthLeft: {
                get: function () {
                    return this.NativeObject.getWidthLeft();
                },
                set: function (value) {
                    this.NativeObject.setWidthLeft(value);
                }
            },
            WidthRight: {
                get: function () {
                    return this.NativeObject.getWidthRight();
                },
                set: function (value) {
                    this.NativeObject.setWidthRight(value);
                }
            },
            WidthTop: {
                get: function () {
                    return this.NativeObject.getWidthTop();
                },
                set: function (value) {
                    this.NativeObject.setWidthTop(value);
                }
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.decoration.Decorator";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Atom", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Atom";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Basic", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Basic";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Canvas", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Canvas";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Dock", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Dock";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Flow", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Flow";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Grid", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        fields: {
            _spacingX: 0,
            _spacingY: 0
        },
        props: {
            SpacingX: {
                get: function () {
                    return this._spacingX;
                },
                set: function (value) {
                    this._spacingX = value;
                    if (this._spacingX > 0) {
                        this.NativeObject.setSpacingX(this._spacingX);
                    }
                }
            },
            SpacingY: {
                get: function () {
                    return this._spacingY;
                },
                set: function (value) {
                    this._spacingY = value;
                    if (this._spacingY > 0) {
                        this.NativeObject.setSpacingY(this._spacingY);
                    }
                }
            }
        },
        ctors: {
            ctor: function (spacing) {
                if (spacing === void 0) { spacing = 0; }

                CSharpWebLib.qx.ui.layout.Grid.$ctor1.call(this, spacing, spacing);
            },
            $ctor1: function (spacingX, spacingY) {
                this.$initialize();
                CSharpWebLib.qx.ui.layout.Abstract.ctor.call(this);
                this.SpacingX = spacingX;
                this.SpacingY = spacingY;
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Grid";
            },
            getColumnWidth: function (column) {
                return this.NativeObject.getColumnWidth(column);
            },
            getRowHeight: function (row) {
                return this.NativeObject.getRowHeight(row);
            },
            setColumnWidth: function (column, width) {
                this.NativeObject.setColumnWidth(column, width);
            },
            setRowHeight: function (row, height) {
                this.NativeObject.setRowHeight(row, height);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.Grow", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        methods: {
            QxClass: function () {
                return "qx.ui.layout.Grow";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.HBox", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        fields: {
            _spacing: 0
        },
        props: {
            Spacing: {
                get: function () {
                    return this._spacing;
                },
                set: function (value) {
                    this._spacing = value;
                    if (this._spacing > 0) {
                        this.NativeObject.setSpacing(this._spacing);
                    }
                }
            }
        },
        ctors: {
            ctor: function (spacing) {
                if (spacing === void 0) { spacing = 0; }

                this.$initialize();
                CSharpWebLib.qx.ui.layout.Abstract.ctor.call(this);
                this.Spacing = spacing;
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.layout.HBox";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.layout.VBox", {
        inherits: [CSharpWebLib.qx.ui.layout.Abstract],
        fields: {
            _spacing: 0
        },
        props: {
            Spacing: {
                get: function () {
                    return this._spacing;
                },
                set: function (value) {
                    this._spacing = value;
                    if (this._spacing > 0) {
                        this.NativeObject.setSpacing(this._spacing);
                    }
                }
            }
        },
        ctors: {
            ctor: function (spacing) {
                if (spacing === void 0) { spacing = 0; }

                this.$initialize();
                CSharpWebLib.qx.ui.layout.Abstract.ctor.call(this);
                this.Spacing = spacing;
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.layout.VBox";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.ResizeColumnModel", {
        inherits: [CSharpWebLib.qx.ui.table.BasicColumnModel],
        methods: {
            QxClass: function () {
                return "qx.ui.table.columnmodel.Resize";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.SimpleTableModel", {
        inherits: [CSharpWebLib.qx.ui.table.AbstractTableModel],
        ctors: {
            ctor: function (nameArray, idArray) {
                if (idArray === void 0) { idArray = null; }

                this.$initialize();
                CSharpWebLib.qx.ui.table.AbstractTableModel.ctor.call(this);
                this.SetColumns(nameArray, idArray);
            }
        },
        methods: {
            GetAnchorSelectionIndex: function () {
                return this.NativeObject.getAnchorSelectionIndex();
            },
            GetRowData: function (rowIndex) {
                return this.NativeObject.getRowData(rowIndex);
            },
            SetColumns: function (nameArray, idArray) {
                this.NativeObject.setColumns(nameArray, idArray);
            },
            SetData: function (data) {
                this.NativeObject.setData(data);
            },
            QxClass: function () {
                return "qx.ui.table.model.Simple";
            }
        }
    });

    Bridge.define("CSharpWebLib.app.bootstrap.Bp2Columns", {
        inherits: [CSharpWebLib.app.bootstrap.BpContainer],
        fields: {
            LeftColumn: null,
            RightColumn: null
        },
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpContainer.ctor.call(this, widget);
                this.LeftColumn = new CSharpWebLib.app.bootstrap.BpColumn(widget, 8);
                this.RightColumn = new CSharpWebLib.app.bootstrap.BpColumn(widget, 4);
                this.AddChild(this.LeftColumn);
                this.AddChild(this.RightColumn);
                this.AddLeftChildren();
                this.AddRightChildren();
            }
        },
        methods: {
            Build: function () {
                var $t;
                this.OpenRow$1();
                $t = Bridge.getEnumerator(this.Children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.Build();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.CloseRow$1();
            },
            OpenRow$1: function () {
                this.CssClass = "row";
                this.OpenDiv();
            },
            CloseRow$1: function () {
                this.CloseDiv();
            },
            AddLeftChildren: function () { },
            AddRightChildren: function () { }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.windows.Desktop", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (CSharpWebLib.qx.ui.windows.Desktop._instance == null) {
                            CSharpWebLib.qx.ui.windows.Desktop._instance = new CSharpWebLib.qx.ui.windows.Desktop();
                        }
                        return CSharpWebLib.qx.ui.windows.Desktop._instance;
                    }
                }
            }
        },
        methods: {
            Add: function ($window) {
                this.NativeObject.add($window.NativeObject);
            },
            Remove: function ($window) {
                this.NativeObject.remove($window.NativeObject);
            },
            QxClass: function () {
                return "qx.ui.window.Desktop";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.splitpane.SplitPane", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        statics: {
            methods: {
                Horizontal: function () {
                    return new CSharpWebLib.qx.ui.splitpane.SplitPane("horizontal");
                },
                Vertical: function () {
                    return new CSharpWebLib.qx.ui.splitpane.SplitPane("vertical");
                }
            }
        },
        fields: {
            _orientation: null
        },
        props: {
            Orientation: {
                get: function () {
                    return this._orientation;
                },
                set: function (value) {
                    this._orientation = value;
                    this.NativeObject.setOrientation(this._orientation);
                }
            }
        },
        ctors: {
            ctor: function (orientation) {
                if (orientation === void 0) { orientation = "horizontal"; }

                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
                this.Orientation = orientation;
            }
        },
        methods: {
            Add: function (widget, flex) {
                if (flex === void 0) { flex = 1; }
                this.NativeObject.add(widget.NativeObject, flex);
            },
            QxClass: function () {
                return "qx.ui.splitpane.Pane";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.HtmlEmbed", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _html: null,
            _style: null
        },
        props: {
            Html: {
                get: function () {
                    return this._html;
                },
                set: function (value) {
                    this._html = value;
                    this.RefreshHtml();
                }
            },
            Style: {
                get: function () {
                    return this._style;
                },
                set: function (value) {
                    this._style = value;
                }
            }
        },
        methods: {
            AfterFirstResize: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.AfterFirstResize.call(this);
                var html = this.DefaultHtml();
                if (html != null) {
                    this.Html = html;
                }
            },
            DefaultHtml: function () {
                return null;
            },
            DefaultStyle: function () {
                return null;
            },
            QxClass: function () {
                return "qx.ui.embed.Html";
            },
            RefreshHtml: function () {
                this.NativeObject.setHtml(this.Html);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.StackPanel", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _children: null
        },
        methods: {
            Add: function (child) {
                this.NativeObject.add(child.NativeObject);
                child.Parent = this;
                this._children.add(child);
            },
            Init: function () {
                this._children = new (System.Collections.Generic.List$1(CSharpWebLib.qx.ui.core.LayoutItem)).ctor();
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
            },
            OnResize: function () {
                var $t;
                CSharpWebLib.qx.ui.core.Widget.prototype.OnResize.call(this);
                $t = Bridge.getEnumerator(this._children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.OnParentResize();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            RemoveAll: function () {
                this.NativeObject.removeAll();
            },
            SetSelection$1: function (index) {
                if (index < 0 || index >= this._children.Count) {
                    return;
                }
                this.SetSelection(this._children.getItem(index));
            },
            SetSelection: function (item) {
                this.NativeObject.setSelection(System.Array.init([item.NativeObject], System.Object));
            },
            QxClass: function () {
                return "qx.ui.container.Stack";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.Panel", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _children: null,
            _layout: null
        },
        props: {
            Layout: {
                get: function () {
                    return this._layout;
                },
                set: function (value) {
                    this._layout = value;
                    this.NativeObject.setLayout(this._layout.NativeObject);
                }
            }
        },
        methods: {
            Add$1: function (child, options) {
                this.NativeObject.add(child.NativeObject, options);
                child.Parent = this;
                this._children.add(child);
            },
            Add: function (child, edgeName) {
                this.Add$1(child, { edge: edgeName });
                child.Parent = this;
            },
            AddCenter: function (child) {
                this.Add(child, "center");
            },
            AddEast: function (child) {
                this.Add(child, "east");
            },
            AddFlex: function (child, flexWeight) {
                if (flexWeight === void 0) { flexWeight = 1; }
                this.Add$1(child, { flex: flexWeight });
            },
            AddNorth: function (child) {
                this.Add(child, "north");
            },
            AddSouth: function (child) {
                this.Add(child, "south");
            },
            AddWest: function (child) {
                this.Add(child, "west");
            },
            DefaultHeight: function () {
                return -1;
            },
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.Dock();
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
                this._children = new (System.Collections.Generic.List$1(CSharpWebLib.qx.ui.core.LayoutItem)).ctor();
                if (this.DefaultHeight() >= 0) {
                    this.NativeObject.setHeight(this.DefaultHeight());
                }
                this.Layout = this.DefaultLayout();
            },
            OnResize: function () {
                var $t;
                CSharpWebLib.qx.ui.core.Widget.prototype.OnResize.call(this);
                $t = Bridge.getEnumerator(this._children);
                try {
                    while ($t.moveNext()) {
                        var child = $t.Current;
                        child.OnParentResize();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            RemoveAll: function () {
                this.NativeObject.removeAll();
            },
            QxClass: function () {
                return "qx.ui.container.Composite";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.basic.Atom", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _icon: null,
            _label: null
        },
        props: {
            Center: {
                set: function (value) {
                    this.NativeObject.setCenter(value);
                }
            },
            Gap: {
                set: function (value) {
                    this.NativeObject.setGap(value);
                }
            },
            Icon: {
                get: function () {
                    return this._icon;
                },
                set: function (value) {
                    this._icon = value;
                    this.NativeObject.setIcon(this._icon);
                }
            },
            Label: {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                    this.NativeObject.setLabel(this._label);
                }
            }
        },
        methods: {
            SetRich: function (rich) {
                this.NativeObject.setRich(rich);
            },
            SetTextColor: function (color) {
                this.NativeObject.getLayoutChildren()[0].setTextColor(color);
            },
            QxClass: function () {
                return "qx.ui.basic.Atom";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.basic.Image", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _source: null
        },
        props: {
            Source: {
                get: function () {
                    return this._source;
                },
                set: function (value) {
                    this._source = value;
                    this.NativeObject.setSource(this._source);
                }
            }
        },
        ctors: {
            ctor: function (source) {
                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
                this.Source = source;
            },
            $ctor1: function (source, width, height) {
                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
                this.Source = source;
                this.Width = width;
                this.Height = height;
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.basic.Image";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.basic.Label", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        props: {
            TextAlign: {
                set: function (value) {
                    this.NativeObject.setTextAlign(value);
                }
            },
            Rich: {
                get: function () {
                    return this.NativeObject.getRich();
                },
                set: function (value) {
                    this.NativeObject.setRich(value);
                }
            },
            Value: {
                get: function () {
                    return this.NativeObject.getValue();
                },
                set: function (value) {
                    this.NativeObject.setValue(value);
                }
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.basic.Label";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.Scroll", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _content: null
        },
        props: {
            Content: {
                get: function () {
                    return this._content;
                }
            }
        },
        methods: {
            Add: function (child) {
                this.NativeObject.add(child.NativeObject);
                this._content = child;
            },
            QxClass: function () {
                return "qx.ui.container.Scroll";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.core.scroll.AbstractScrollArea", {
        inherits: [CSharpWebLib.qx.ui.core.Widget]
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.IFrame", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _source: null
        },
        props: {
            Source: {
                get: function () {
                    return this._source;
                },
                set: function (value) {
                    this._source = value;
                    this.NativeObject.setSource(this._source);
                }
            }
        },
        methods: {
            AfterInit: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.AfterInit.call(this);
                var handler = Bridge.fn.cacheBind(this, this.OnLoad);
                this.NativeObject.addListener("load", handler);
            },
            DefaultSource: function () {
                return "";
            },
            OnLoad: function () {
                this.Source = this.DefaultSource();
            },
            QxClass: function () {
                return "qx.ui.embed.Iframe";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.AbstractField", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _value: null
        },
        props: {
            ReadOnly: {
                get: function () {
                    return this.NativeObject.getReadOnly();
                },
                set: function (value) {
                    this.NativeObject.setReadOnly(value);
                }
            },
            Value: {
                get: function () {
                    return this.NativeObject.getValue();
                },
                set: function (value) {
                    this._value = value;
                    this.NativeObject.setValue(this._value);
                }
            }
        },
        methods: {
            Clear: function () {
                this.Value = "";
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
                this.Clear();
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.renderer.AbstractRenderer", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _form: null
        },
        props: {
            Form: {
                get: function () {
                    return this._form;
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
            }
        },
        methods: {
            Init: function () {
                this._form = new CSharpWebLib.qx.ui.form.Form();
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
            },
            CreationArgs: function () {
                return System.Array.init([this._form.NativeObject], System.Object);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.SplitButton", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _menu: null
        },
        props: {
            Label: {
                get: function () {
                    return this.NativeObject.getLabel();
                },
                set: function (value) {
                    this.NativeObject.setLabel(value);
                }
            },
            Menu: {
                get: function () {
                    return this._menu;
                },
                set: function (value) {
                    this._menu = value;
                    this.NativeObject.setMenu(value.NativeObject);
                }
            }
        },
        ctors: {
            ctor: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
                this.Label = label;
                this.Menu = new CSharpWebLib.qx.ui.menu.Menu();
            }
        },
        methods: {
            AddButton: function (label, handler) {
                var button = new CSharpWebLib.qx.ui.menu.MenuButton(label, handler);
                button.Decorator = this.Decorator;
                button.TextColor = this.TextColor;
                this.Menu.Add(button);
                return button;
            },
            QxClass: function () {
                return "qx.ui.form.SplitButton";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.AbstractButton", {
        inherits: [CSharpWebLib.qx.ui.core.Widget]
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.Menu", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        methods: {
            Add: function (item) {
                this.NativeObject.add(item.NativeObject);
                return this;
            },
            QxClass: function () {
                return "qx.ui.menu.Menu";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.Separator", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        methods: {
            QxClass: function () {
                return "qx.ui.menu.Separator";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.toolbar.ToolBar", {
        inherits: [CSharpWebLib.qx.ui.core.Widget,CSharpWebLib.qx.interfaces.IDecorate],
        alias: ["Decorate$1", "CSharpWebLib$qx$interfaces$IDecorate$Decorate"],
        methods: {
            Add: function (child, options) {
                if (options === void 0) { options = null; }
                this.NativeObject.add(child.NativeObject, options);
            },
            AddButton: function (label) {
                var button = new CSharpWebLib.qx.ui.toolbar.ToolbarButton.$ctor2(label, this);
                button.Decorate(this);
                this.Add(button);
                return button;
            },
            AddMenuButton: function (label) {
                var button = new CSharpWebLib.qx.ui.form.Button.$ctor1(label);
                button.Decorate(this);
                this.Add(button);
                return button;
            },
            AddSeparator: function (color) {
                if (color === void 0) { color = null; }
                var separator = new CSharpWebLib.qx.ui.toolbar.Separator(color);
                return separator;
            },
            AddSpacer: function () {
                var widget = new CSharpWebLib.qx.ui.core.Widget();
                widget.Height = 10;
                widget.Width = 10;
                this.Add(widget, { flex: 1 });
                return widget;
            },
            AddSplitButton: function (label) {
                var button = new CSharpWebLib.qx.ui.form.SplitButton(label);
                button.Decorate(this);
                this.Add(button);
                return button;
            },
            Decorate$1: function (widget) { },
            DefaultSpacing: function () {
                return 7;
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
                if (this.DefaultSpacing() > 0) {
                    this.NativeObject.setSpacing(this.DefaultSpacing());
                }
            },
            QxClass: function () {
                return "qx.ui.toolbar.ToolBar";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.table.Table", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _selectionModel: null,
            _tableModel: null,
            ColumnModel: null,
            SelectionHandler: null
        },
        props: {
            ColumnVisibilityButtonVisible: {
                set: function (value) {
                    this.NativeObject.setColumnVisibilityButtonVisible(value);
                }
            },
            Data: {
                set: function (value) {
                    this._tableModel.SetData(value);
                }
            },
            StatusBarVisible: {
                set: function (value) {
                    this.NativeObject.setStatusBarVisible(value);
                }
            },
            ShowCellFocusIndicator: {
                set: function (value) {
                    this.NativeObject.setShowCellFocusIndicator(value);
                }
            },
            TableModel: {
                get: function () {
                    return this._tableModel;
                },
                set: function (value) {
                    this._tableModel = value;
                    this.NativeObject.setTableModel(this._tableModel.NativeObject);
                }
            },
            SelectionModel: {
                get: function () {
                    return this._selectionModel;
                },
                set: function (value) {
                    this._selectionModel = value;
                    this.NativeObject.setSelectionModel(this._selectionModel.NativeObject);
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
            }
        },
        methods: {
            CreationArgs: function () {
                var resizeColumnModel = new CSharpWebLib.qx.ui.table.ResizeColumnModel().NativeObject;
                var fn = function (obj) {
                    return resizeColumnModel;
                };
                var map = { tableColumnModel: fn };
                return System.Array.init([null, map], System.Object);
            },
            DefaultColumnVisibilityButtonVisible: function () {
                return false;
            },
            DefaultColumns: function () {
                return System.Array.init(["Id", "Data"], System.String);
            },
            DefaultIds: function () {
                var $t;
                var ids = new (System.Collections.Generic.List$1(System.String)).ctor();
                $t = Bridge.getEnumerator(this.DefaultColumns());
                try {
                    while ($t.moveNext()) {
                        var col = $t.Current;
                        var id = System.String.replaceAll(col.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
                        ids.add(id);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return ids.ToArray();
            },
            DefaultShowCellFocusIndicator: function () {
                return false;
            },
            DefaultStatusBarVisible: function () {
                return false;
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
                this.ColumnModel = new CSharpWebLib.qx.ui.table.ResizeColumnModel();
                this.SelectionModel = new CSharpWebLib.qx.ui.table.SelectionModel(this);
                this.TableModel = new CSharpWebLib.qx.ui.table.SimpleTableModel(this.DefaultColumns(), this.DefaultIds());
                this.ColumnVisibilityButtonVisible = this.DefaultColumnVisibilityButtonVisible();
                this.ShowCellFocusIndicator = this.DefaultShowCellFocusIndicator();
                this.StatusBarVisible = this.DefaultStatusBarVisible();
            },
            OnChangeSelection: function () {
                if (this.SelectionHandler != null) {
                    var index = this.SelectionModel.GetAnchorSelectionIndex();
                    var rowData = this.TableModel.GetRowData(index);
                    this.SelectionHandler.CSharpWebLib$qx$interfaces$IHandleSelection$HandleSelection(index, rowData);
                }
            },
            SetColumnVisible: function (col, visible) {
                var columnModel = this.NativeObject.getTableColumnModel();
                columnModel.setColumnVisible(col, visible);
            },
            QxClass: function () {
                return "qx.ui.table.Table";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tabview.TabView", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        props: {
            BarPosition: {
                get: function () {
                    return this.NativeObject.getBarPosition();
                },
                set: function (value) {
                    this.NativeObject.setBarPosition(value);
                }
            }
        },
        methods: {
            Add: function (page) {
                this.NativeObject.add(page.NativeObject);
            },
            AddPage: function (label) {
                var $t;
                var page = ($t = new CSharpWebLib.qx.ui.tabview.Page(), $t.Label = label, $t);
                this.Add(page);
                return page;
            },
            AddPage$1: function (label, content) {
                var page = this.AddPage(label);
                page.Content = content;
                return page;
            },
            QxClass: function () {
                return "qx.ui.tabview.TabView";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.toolbar.Separator", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        ctors: {
            ctor: function (color) {
                if (color === void 0) { color = null; }

                this.$initialize();
                CSharpWebLib.qx.ui.core.Widget.ctor.call(this);
                if (color != null) {
                    this.TextColor = color;
                }
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.toolbar.Separator";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tree.core.AbstractItem", {
        inherits: [CSharpWebLib.qx.ui.core.Widget],
        fields: {
            _label: null
        },
        props: {
            Label: {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                    this.NativeObject.setLabel(this._label);
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.windows.Window", {
        inherits: [CSharpWebLib.qx.ui.core.Widget,CSharpWebLib.qx.interfaces.IEventHandler],
        fields: {
            _buttonBar: null,
            _caption: null,
            _contentPadding: 0,
            _delayedCentered: false,
            _delayedLocation: null,
            _layout: null
        },
        props: {
            Caption: {
                get: function () {
                    return this._caption;
                },
                set: function (value) {
                    this._caption = value;
                    this.NativeObject.setCaption(this._caption);
                }
            },
            ContentPadding: {
                get: function () {
                    return this._contentPadding;
                },
                set: function (value) {
                    this._contentPadding = value;
                    this.NativeObject.setContentPadding(this._contentPadding);
                }
            },
            Layout: {
                get: function () {
                    return this._layout;
                },
                set: function (value) {
                    this._layout = value;
                    this.NativeObject.setLayout(this._layout.NativeObject);
                }
            },
            Modal: {
                set: function (value) {
                    this.NativeObject.setModal(value);
                }
            },
            ShowMaximize: {
                get: function () {
                    return this.NativeObject.getShowMaximize();
                },
                set: function (value) {
                    this.NativeObject.setShowMaximize(value);
                }
            },
            ShowMinimize: {
                get: function () {
                    return this.NativeObject.getShowMinimize();
                },
                set: function (value) {
                    this.NativeObject.setShowMinimize(value);
                }
            }
        },
        methods: {
            Add: function (child, options) {
                if (options === void 0) { options = null; }
                this.NativeObject.add(child.NativeObject, options);
            },
            Add$1: function (child, edgeName) {
                this.Add(child, { edge: edgeName });
            },
            AfterFirstResize: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.AfterFirstResize.call(this);
                this.Center(this._delayedCentered);
                this.MoveTo(this._delayedLocation);
            },
            AfterInit: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.AfterInit.call(this);
                if (this.HasButtonBar()) {
                    this.AddButtonBar();
                }
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.Widget.prototype.Init.call(this);
                this.ShowMinimize = false;
                var closeHandler = Bridge.fn.cacheBind(this, this.OnClose);
                this.NativeObject.addListener("close", closeHandler);
                CSharpWebLib.app.viewport.Viewport.Instance.AddWindow(this);
                this.Caption = this.DefaultCaption();
                this.Center(this.DefaultCentered());
                this.ContentPadding = this.DefaultContentPadding();
                this.Layout = this.DefaultLayout();
                if (this.DefaultModal()) {
                    this.Modal = this.DefaultModal();
                }
                if (this.DefaultLocation() != null) {
                    this.MoveTo(this.DefaultLocation());
                }
            },
            AddButtonBar: function () {
                this._buttonBar = this.CreateButtonBar();
                this._buttonBar.AddConfigs$1(this.DefaultButtons());
                this.Add$1(this._buttonBar, "south");
            },
            CreateButtonBar: function () {
                return new CSharpWebLib.qx.ui.widgets.ButtonBar();
            },
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.Dock();
            },
            DefaultModal: function () {
                return false;
            },
            Center: function (centered) {
                this._delayedCentered = centered;
                if (!this._hasResized) {
                    return;
                }
                this.NativeObject.center();
            },
            DefaultButtons: function () {
                return System.Array.init([], CSharpWebLib.util.ButtonConfig);
            },
            DefaultCaption: function () {
                return "Window";
            },
            DefaultCentered: function () {
                return false;
            },
            DefaultContentPadding: function () {
                return 0;
            },
            DefaultHeight: function () {
                return 375;
            },
            DefaultLocation: function () {
                return System.Array.init([], System.Int32);
            },
            DefaultShow: function () {
                return true;
            },
            DefaultWidth: function () {
                return 475;
            },
            HasButtonBar: function () {
                return this.DefaultButtons().length > 0;
            },
            Maximize: function () {
                this.NativeObject.maximize();
            },
            Minimize: function () {
                this.NativeObject.minimize();
            },
            MoveTo: function (location) {
                this._delayedLocation = location;
                if (!this._hasResized) {
                    return;
                }
                if (location.length !== 2) {
                    return;
                }
                this.NativeObject.moveTo(location[System.Array.index(0, location)], location[System.Array.index(1, location)]);
            },
            OnClose: function () {
                CSharpWebLib.app.viewport.Viewport.Instance.RemoveWindow(this);
            },
            QxClass: function () {
                return "qx.ui.window.Window";
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.content.DesktopContent", {
        inherits: [CSharpWebLib.qx.ui.windows.Desktop],
        fields: {
            Windows: null
        },
        ctors: {
            init: function () {
                this.Windows = new (System.Collections.Generic.List$1(System.Object)).ctor();
            }
        },
        methods: {
            DefaultDecorator: function () {
                var decorator = new CSharpWebLib.qx.ui.decoration.Decorator();
                decorator.BackgroundImage = "images/tiles.png";
                return decorator;
            },
            HandlesAppear: function () {
                return true;
            },
            OnAppear: function () {
                var startUp = this._firstAppearance;
                CSharpWebLib.qx.ui.windows.Desktop.prototype.OnAppear.call(this);
            },
            HideAllWindows: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Windows);
                try {
                    while ($t.moveNext()) {
                        var $window = $t.Current;
                        if ($window.hide != null) {
                            $window.hide();
                        } else {
                            if ($window.Widget != null && $window.Widget.hide != null) {
                                $window.Widget.hide();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            ShowAllWindows: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Windows);
                try {
                    while ($t.moveNext()) {
                        var $window = $t.Current;
                        if ($window.show != null) {
                            $window.show();
                        } else {
                            if ($window.Widget != null && $window.Widget.show != null) {
                                $window.Widget.show();
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            AddWindow: function ($window) {
                this.RegisterWindow($window.NativeObject);
            },
            RemoveWindow: function ($window) {
                this.UnRegisterWindow($window.NativeObject);
            },
            RegisterWindow: function ($window) {
                if (!this.Windows.contains($window)) {
                    this.Windows.add($window);
                }
            },
            UnRegisterWindow: function ($window) {
                if (this.Windows.contains($window)) {
                    this.Windows.remove($window);
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.content.StandardContent", {
        inherits: [CSharpWebLib.qx.ui.splitpane.SplitPane],
        fields: {
            NavPanel: null,
            ContentPanel: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.ui.splitpane.SplitPane.ctor.call(this);
                this.ContentPanel = new CSharpWebLib.app.viewport.panels.ContentPanel();
                this.NavPanel = new CSharpWebLib.app.viewport.panels.NavPanel();
                this.AddMenuPanels();
                this.Add(this.NavPanel, 1);
                this.Add(this.ContentPanel, 4);
                this.NavPanel.Render();
                this.ContentPanel.Render();
                this.GetContentElement().AddClass("bootstrap");
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.ScrollableHtml", {
        inherits: [CSharpWebLib.qx.ui.embed.HtmlEmbed],
        methods: {
            DefaultScrollX: function () {
                return true;
            },
            DefaultScrollY: function () {
                return true;
            },
            SetOverflow: function (x, y) {
                if (x) {
                    this.SetStyle("overflow-x", "scroll");
                }
                if (y) {
                    this.SetStyle("overflow-y", "scroll");
                }
            },
            SetStyles: function () {
                CSharpWebLib.qx.ui.embed.HtmlEmbed.prototype.SetStyles.call(this);
                this.SetOverflow(this.DefaultScrollX(), this.DefaultScrollY());
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.ContentPanel", {
        inherits: [CSharpWebLib.qx.ui.container.StackPanel],
        fields: {
            Pages: null
        },
        ctors: {
            init: function () {
                this.Pages = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.qx.ui.core.Widget))();
            }
        },
        methods: {
            AddPage: function (page) {
                this.Add(page);
                this.Pages.set((Bridge.as(page, CSharpWebLib.app.viewport.panels.IPage)).CSharpWebLib$app$viewport$panels$IPage$TagName(), page);
            },
            Render: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Pages.getValues(), CSharpWebLib.qx.ui.core.Widget);
                try {
                    while ($t.moveNext()) {
                        var page = $t.Current;
                        if (Bridge.is(page, CSharpWebLib.app.viewport.panels.IRender)) {
                            (Bridge.as(page, CSharpWebLib.app.viewport.panels.IRender)).CSharpWebLib$app$viewport$panels$IRender$Render();
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            SelectPage: function (tag) {
                var $t;
                var selectedPage = { };
                this.Pages.tryGetValue(tag, selectedPage);
                if (selectedPage.v == null) {
                    System.Console.WriteLine(System.String.format("page miss {0}", tag));
                    $t = Bridge.getEnumerator(this.Pages.getKeys(), System.String);
                    try {
                        while ($t.moveNext()) {
                            var key = $t.Current;
                            System.Console.WriteLine(key);
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                    return;
                }
                this.SetSelection(selectedPage.v);
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.NavPanel", {
        inherits: [CSharpWebLib.qx.ui.container.StackPanel],
        fields: {
            Panels: null,
            SelectedPanel: null
        },
        ctors: {
            init: function () {
                this.Panels = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.app.viewport.panels.NavMenuPanel))();
            }
        },
        methods: {
            AddNav: function (panel) {
                this.SelectedPanel = panel;
                this.Add(panel);
                this.Panels.set(panel.GetTag(), panel);
                panel.AddPages();
            },
            Render: function () {
                var $t;
                $t = Bridge.getEnumerator(this.Panels.getValues(), CSharpWebLib.app.viewport.panels.NavMenuPanel);
                try {
                    while ($t.moveNext()) {
                        var panel = $t.Current;
                        if (Bridge.is(panel, CSharpWebLib.app.viewport.panels.IRender)) {
                            (Bridge.as(panel, CSharpWebLib.app.viewport.panels.IRender)).CSharpWebLib$app$viewport$panels$IRender$Render();
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            SelectPanel: function (tag) {
                var selectedPanel = { };
                this.Panels.tryGetValue(tag, selectedPanel);
                if (selectedPanel.v == null) {
                    return;
                }
                this.SelectedPanel = selectedPanel.v;
                this.SetSelection(selectedPanel.v);
                this.SelectedPanel.ShowDefaultPage();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.QxPage", {
        inherits: [CSharpWebLib.qx.ui.container.Panel,CSharpWebLib.app.viewport.panels.IPage,CSharpWebLib.app.viewport.panels.IRender],
        alias: [
            "Render", "CSharpWebLib$app$viewport$panels$IRender$Render",
            "TagName", "CSharpWebLib$app$viewport$panels$IPage$TagName"
        ],
        methods: {
            Render: function () { },
            TagName: function () {
                return System.String.replaceAll(this.ButtonLabel().toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.Viewport", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        statics: {
            fields: {
                Instance: null
            }
        },
        fields: {
            Content: null,
            Navbar: null
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.container.Panel.prototype.Init.call(this);
                this.Content = this.CreateContent();
                this.Navbar = this.CreateNavbar();
                this.AddNorth(this.Navbar);
                this.AddCenter(this.Content);
            },
            AddWindow: function ($window) {
                this.Content.DesktopContent.AddWindow($window);
            },
            RemoveWindow: function ($window) {
                this.Content.DesktopContent.RemoveWindow($window);
            },
            StartOnWorkspaceLoaded: function () { },
            StartApplication: function (appName) {
                this.SetWorkspaceMode(true);
            },
            SetWorkspaceMode: function (workspaceMode) {
                this.Content.SetWorkspaceMode(workspaceMode);
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.ViewportStack", {
        inherits: [CSharpWebLib.qx.ui.container.StackPanel],
        fields: {
            DesktopContent: null,
            StandardContent: null
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.ui.container.StackPanel.ctor.call(this);
                this.DesktopContent = this.CreateDesktopContent();
                this.StandardContent = this.CreateStandardContent();
                this.Add(this.StandardContent);
                this.Add(this.DesktopContent);
            }
        },
        methods: {
            SetWorkspaceMode: function (desktopMode) {
                if (desktopMode) {
                    this.SetSelection(this.DesktopContent);
                    this.DesktopContent.ShowAllWindows();
                } else {
                    this.DesktopContent.HideAllWindows();
                    this.SetSelection(this.StandardContent);
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.DockPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Panel]
    });

    Bridge.define("CSharpWebLib.qx.ui.container.GamePanel", {
        inherits: [CSharpWebLib.qx.ui.container.Panel,CSharpWebLib.qx.interfaces.ICustomEvent],
        fields: {
            _gameBoard: null,
            _scroll: null
        },
        alias: ["HandleCustomEvent", "CSharpWebLib$qx$interfaces$ICustomEvent$HandleCustomEvent"],
        ctors: {
            ctor: function (size) {
                this.$initialize();
                CSharpWebLib.qx.ui.container.Panel.ctor.call(this);
                this.BuildBoard(size);
            }
        },
        methods: {
            BuildBoard: function (size) {
                this._gameBoard = new CSharpWebLib.qx.ui.widgets.GameBoard(size);
                this._scroll = new CSharpWebLib.qx.ui.container.Scroll();
                this._scroll.Add(this._gameBoard);
                this.AddCenter(this._scroll);
            },
            HandlesCustomEvents: function () {
                return true;
            },
            OnResize: function () {
                CSharpWebLib.qx.ui.container.Panel.prototype.OnResize.call(this);
                var size = (Math.max(this.InnerHeight, this.InnerWidth) - 15) | 0;
                this._gameBoard.ResizeTiles(size);
            },
            Reset: function () {
                this._gameBoard.Reset();
            },
            toString: function () {
                return "GamePanel";
            },
            HandleCustomEvent: function (eventName, fn) {
                switch (eventName) {
                    case "click": 
                        this._gameBoard.SetClickFn(fn);
                        break;
                }
            },
            PerformMethod: function (methodName, args) {
                switch (methodName) {
                    case "clear_tile": 
                        this.PerformClearTile(args);
                        break;
                    case "move_tile_x": 
                        this.PerformMoveTileX(args);
                        break;
                    case "move_tile_y": 
                        this.PerformMoveTileY(args);
                        break;
                    case "reset": 
                        this.Reset();
                        break;
                    case "set_icon": 
                        this.PerformSetTileIcon(args);
                        break;
                    case "set_size": 
                        this.PerformSetSize(args);
                        break;
                    case "set_tile_icon": 
                        this.PerformSetTileIcon(args);
                        break;
                    case "set_tile_tag": 
                        this.PerformSetTileTag(args);
                        break;
                    default: 
                        System.Console.WriteLine(System.String.format("PerformMethod - unknown method: {0}", methodName));
                        break;
                }
                return this;
            },
            PerformClearTile: function (args) {
                if (args.length < 2) {
                    return;
                }
                var column = System.Convert.toInt32(args[System.Array.index(0, args)]);
                var row = System.Convert.toInt32(args[System.Array.index(1, args)]);
                this._gameBoard.ClearTileIcon(column, row);
            },
            PerformMoveTileX: function (args) {
                var fn = null;
                if (args.length < 3) {
                    return;
                }
                var column = System.Convert.toInt32(args[System.Array.index(0, args)]);
                var row = System.Convert.toInt32(args[System.Array.index(1, args)]);
                var x = System.Convert.toInt32(args[System.Array.index(2, args)]);
                var delta = x >= 0 ? 1 : -1;
                fn = Bridge.fn.bind(this, function () {
                    this._gameBoard.MoveTileIcon(column, row, ((column + delta) | 0), row);
                    column = (column + delta) | 0;
                });

            },
            PerformMoveTileY: function (args) {
                var fn = null;
                if (args.length < 3) {
                    return;
                }
                var column = System.Convert.toInt32(args[System.Array.index(0, args)]);
                var row = System.Convert.toInt32(args[System.Array.index(1, args)]);
                var y = System.Convert.toInt32(args[System.Array.index(2, args)]);
                var delta = y >= 0 ? 1 : -1;
                fn = Bridge.fn.bind(this, function () {
                    this._gameBoard.MoveTileIcon(column, row, column, ((row + delta) | 0));
                    row = (row + delta) | 0;
                });

            },
            PerformSetSize: function (args) {
                if (args.length < 1) {
                    return;
                }
                var size = System.Convert.toInt32(args[System.Array.index(0, args)]);
                this._gameBoard.SetSize(size);
            },
            PerformSetTileIcon: function (args) {
                if (args.length < 3) {
                    return;
                }
                var icon = Bridge.toString(args[System.Array.index(0, args)]);
                var column = System.Convert.toInt32(args[System.Array.index(1, args)]);
                var row = System.Convert.toInt32(args[System.Array.index(2, args)]);
                this._gameBoard.SetTileIcon(icon, column, row);
            },
            PerformSetTileTag: function (args) {
                if (args.length < 3) {
                    return;
                }
                var tag = Bridge.toString(args[System.Array.index(0, args)]);
                var column = System.Convert.toInt32(args[System.Array.index(1, args)]);
                var row = System.Convert.toInt32(args[System.Array.index(2, args)]);
                this._gameBoard.SetTileTag(tag, column, row);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.GridPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        methods: {
            AddColumnRow: function (item, column, row) {
                this.Add$1(item, { column: column, row: row });
            },
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.Grid.ctor(2);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.HPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        methods: {
            Add$2: function (child) {
                this.Add(child, null);
            },
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.HBox(this.DefaultSpacing());
            },
            DefaultSpacing: function () {
                return 7;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.container.VPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        methods: {
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.VBox(7);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.NavbarLabel", {
        inherits: [CSharpWebLib.qx.ui.embed.HtmlEmbed],
        methods: {
            DefaultHtml: function () {
                return this.FormatLabelText(this.DefaultText());
            },
            DefaultStyle: function () {
                return "font-family:'BioRhyme',serif;font-size:25px;color:ivory;";
            },
            DefaultHeight: function () {
                return 35;
            },
            DefaultMarginBottom: function () {
                return 6;
            },
            DefaultText: function () {
                return "";
            },
            DefaultWidth: function () {
                return 200;
            },
            FormatLabelText: function (text) {
                var sb = new System.Text.StringBuilder();
                var span_format = "<span style=\"{0}\">{1}</span>";
                sb.appendLine(System.String.format(span_format, this.DefaultStyle(), text));
                return sb.toString();
            },
            SetLabelText: function (text) {
                this.Html = this.FormatLabelText(text);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.Button", {
        inherits: [CSharpWebLib.qx.ui.basic.Atom],
        fields: {
            _clickFn: null,
            _eventName: null,
            _handler: null,
            _lastClicked: null
        },
        props: {
            ClickFn: {
                get: function () {
                    return this._clickFn;
                },
                set: function (value) {
                    this._clickFn = value;
                }
            },
            EventName: {
                get: function () {
                    return this._eventName;
                },
                set: function (value) {
                    this._eventName = value;
                }
            },
            Handler: {
                get: function () {
                    return this._handler;
                },
                set: function (value) {
                    this._handler = value;
                }
            }
        },
        ctors: {
            init: function () {
                this._lastClicked = System.DateTime.getDefaultValue();
            },
            $ctor1: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.basic.Atom.ctor.call(this);
                this.Label = label;
                this.Handler = this;
                this.EventName = System.String.replaceAll(label.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
                this._lastClicked = System.DateTime.getNow();
            },
            $ctor2: function (label, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.basic.Atom.ctor.call(this);
                this.Label = label;
                this.Handler = handler;
                this.EventName = System.String.replaceAll(label.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
            },
            ctor: function (config) {
                this.$initialize();
                CSharpWebLib.qx.ui.basic.Atom.ctor.call(this);
                this.Label = config.Label;
                this.Handler = config.Handler;
                this.EventName = config.EventName;
            }
        },
        methods: {
            AfterInit: function () {
                var handler = Bridge.fn.cacheBind(this, this.HandleClick);
                this.NativeObject.addListener("click", handler);
            },
            HandleClick: function () {
                var now = System.DateTime.getNow();
                var millisecondsSinceLastClicked = (System.DateTime.subdd(now, this._lastClicked)).getTotalMilliseconds();
                if (millisecondsSinceLastClicked > Config.GlobalConstants.BUTTON_DEBOUNCE_THRESHOLD) {
                    this._lastClicked = now;
                    if (Bridge.hasValue(this._clickFn)) {
                        this._clickFn.call();
                    }
                    this.Handler.CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent(this.EventName);
                }
            },
            QxClass: function () {
                return "qx.ui.form.Button";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.renderer.SingleRenderer", {
        inherits: [CSharpWebLib.qx.ui.form.renderer.AbstractRenderer],
        methods: {
            DefaultPadding: function () {
                return System.Array.init([15, 20], System.Int32);
            },
            QxClass: function () {
                return "qx.ui.form.renderer.Single";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.ListBox", {
        inherits: [CSharpWebLib.qx.ui.core.scroll.AbstractScrollArea],
        methods: {
            Add: function (label) {
                var $t;
                var item = ($t = new CSharpWebLib.qx.ui.form.ListItem(), $t.Label = label, $t);
                this.NativeObject.add(item.NativeObject);
            },
            Clear: function () {
                this.NativeObject.removeAll();
                this.NativeObject.setSelection(System.Array.init([], System.Object));
            },
            QxClass: function () {
                return "qx.ui.form.List";
            },
            SelectedLabel: function () {
                var selection = this.NativeObject.getSelection();
                if (Bridge.referenceEquals(selection.length, 0)) {
                    return "";
                }
                return selection[0].getLabel();
            },
            OnChangeSelectionHandler: function (fn) {
                this.AddListener("changeSelection", fn);
            },
            Update: function (labels) {
                var $t;
                this.Clear();
                $t = Bridge.getEnumerator(labels);
                try {
                    while ($t.moveNext()) {
                        var label = $t.Current;
                        this.Add(label);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.ListItem", {
        inherits: [CSharpWebLib.qx.ui.basic.Atom],
        methods: {
            QxClass: function () {
                return "qx.ui.form.ListItem";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.TextField", {
        inherits: [CSharpWebLib.qx.ui.form.AbstractField],
        methods: {
            QxClass: function () {
                return "qx.ui.form.TextField";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.renderer.DoubleRenderer", {
        inherits: [CSharpWebLib.qx.ui.form.renderer.AbstractRenderer],
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.ui.form.renderer.AbstractRenderer.ctor.call(this);

            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.form.renderer.Double";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.TextArea", {
        inherits: [CSharpWebLib.qx.ui.form.AbstractField],
        methods: {
            Newline: function () {
                this.Value = (this.Value || "") + "\n";
            },
            Print: function (msg) {
                this.Value = (this.Value || "") + ((System.String.format("{0}", [msg])) || "");
            },
            PrintLn: function (msg) {
                this.Print(msg);
                this.Newline();
            },
            QxClass: function () {
                return "qx.ui.form.TextArea";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.CheckBox", {
        inherits: [CSharpWebLib.qx.ui.menu.AbstractButton],
        methods: {
            QxClass: function () {
                return "qx.ui.menu.CheckBox";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.MenuButton", {
        inherits: [CSharpWebLib.qx.ui.menu.AbstractButton],
        fields: {
            _eventName: null,
            _handler: null
        },
        props: {
            EventName: {
                get: function () {
                    return this._eventName;
                },
                set: function (value) {
                    this._eventName = value;
                }
            },
            Handler: {
                get: function () {
                    return this._handler;
                },
                set: function (value) {
                    this._handler = value;
                }
            },
            Label: {
                get: function () {
                    return this.NativeObject.getLabel();
                },
                set: function (value) {
                    this.NativeObject.setLabel(value);
                }
            }
        },
        ctors: {
            ctor: function (label, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.menu.AbstractButton.ctor.call(this);
                this.Label = label;
                this.Handler = handler;
                this.EventName = System.String.replaceAll(label.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
            }
        },
        methods: {
            AfterInit: function () {
                var handler = Bridge.fn.cacheBind(this, this.HandleClick);
                this.NativeObject.addListener("click", handler);
            },
            HandleClick: function () {
                this.Handler.CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent(this.EventName);
            },
            QxClass: function () {
                return "qx.ui.menu.Button";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menu.RadioButton", {
        inherits: [CSharpWebLib.qx.ui.menu.AbstractButton],
        methods: {
            QxClass: function () {
                return "qx.ui.menu.AbstractButton";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menubar.MenuBar", {
        inherits: [CSharpWebLib.qx.ui.toolbar.ToolBar],
        methods: {
            QxClass: function () {
                return "qx.ui.menubar.MenuBar";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.popup.Popup", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        statics: {
            methods: {
                ShowMessage: function (message) {
                    var popup = new CSharpWebLib.qx.ui.popup.Popup(message);
                    popup.Show();
                }
            }
        },
        fields: {
            _delayedLocation: null,
            _html: null
        },
        props: {
            AutoHide: {
                set: function (value) {
                    this.NativeObject.setAutoHide(value);
                }
            }
        },
        ctors: {
            ctor: function (message) {
                this.$initialize();
                CSharpWebLib.qx.ui.container.Panel.ctor.call(this);
                this._html.Html = message;
                this.Width = (CSharpWebLib.qx.ui.util.TextMeasure.GetWidth(message, Config.GlobalFonts.PopupFontFamily, Config.GlobalFonts.PopupFontSize) + 14) | 0;
            }
        },
        methods: {
            AfterFirstResize: function () {
                CSharpWebLib.qx.ui.container.Panel.prototype.AfterFirstResize.call(this);
                this.MoveTo(this._delayedLocation);
            },
            DefaultDecorator: function () {
                var $t;
                return ($t = new CSharpWebLib.qx.ui.decoration.Decorator(), $t.Width = 1, $t.Color = Config.GlobalColors.PopupBorder, $t.Radius = 7, $t);
            },
            DefaultHeight: function () {
                return 32;
            },
            DefaultLocation: function () {
                return System.Array.init([5, 45], System.Int32);
            },
            DefaultPadding: function () {
                return System.Array.init([Config.GlobalDimensions.PopupPadding], System.Int32);
            },
            DefaultWidth: function () {
                return 135;
            },
            Init: function () {
                CSharpWebLib.qx.ui.container.Panel.prototype.Init.call(this);
                this._html = new CSharpWebLib.qx.ui.embed.HtmlEmbed();
                this.AddCenter(this._html);
                this.MoveTo(this.DefaultLocation());
            },
            MoveTo: function (location) {
                this._delayedLocation = location;
                if (!this._hasResized) {
                    return;
                }
                if (location.length !== 2) {
                    return;
                }
                this.NativeObject.moveTo(location[System.Array.index(0, location)], location[System.Array.index(1, location)]);
            },
            SetStyles: function () {
                CSharpWebLib.qx.ui.container.Panel.prototype.SetStyles.call(this);
                this._html.BackgroundColor = Config.GlobalColors.PopupBackground;
                this._html.StyleFontSize = Config.GlobalFonts.PopupFontSize;
                this._html.StyleFontFamily = Config.GlobalFonts.PopupFontFamily;
                this._html.StyleTextAlign = Config.GlobalStyles.TextAlignCenter;
            },
            QxClass: function () {
                return "qx.ui.popup.Popup";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tabview.Page", {
        inherits: [CSharpWebLib.qx.ui.container.Panel],
        fields: {
            _label: null
        },
        props: {
            Content: {
                set: function (value) {
                    this.Add(value, null);
                }
            },
            Label: {
                get: function () {
                    return this._label;
                },
                set: function (value) {
                    this._label = value;
                    this.NativeObject.setLabel(this._label);
                }
            }
        },
        methods: {
            DefaultLayout: function () {
                return new CSharpWebLib.qx.ui.layout.Grow();
            },
            QxClass: function () {
                return "qx.ui.tabview.Page";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tree.core.AbstractTreeItem", {
        inherits: [CSharpWebLib.qx.ui.tree.core.AbstractItem],
        methods: {
            Add: function (child) {
                this.NativeObject.add(child.NativeObject);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tree.Tree", {
        inherits: [CSharpWebLib.qx.ui.core.scroll.AbstractScrollArea],
        fields: {
            _root: null
        },
        props: {
            Root: {
                get: function () {
                    return this._root;
                },
                set: function (value) {
                    this._root = value;
                    this.NativeObject.setRoot(this._root.NativeObject);
                }
            }
        },
        methods: {
            BuildNode: function (nodeData) {
                var $t;
                var node;
                if (nodeData.subclasses.length > 0) {
                    node = new CSharpWebLib.qx.ui.tree.TreeFolder();
                    $t = Bridge.getEnumerator(nodeData.subclasses);
                    try {
                        while ($t.moveNext()) {
                            var subnodeData = Bridge.cast($t.Current, System.Object);
                            node.Add(this.BuildNode(subnodeData));
                        }
                    } finally {
                        if (Bridge.is($t, System.IDisposable)) {
                            $t.System$IDisposable$Dispose();
                        }
                    }
                } else {
                    node = new CSharpWebLib.qx.ui.tree.TreeFile();
                }
                node.Label = nodeData.name;
                return node;
            },
            Refresh: function (data) {
                this.Root = this.BuildNode(data);
                this.Root.NativeObject.setOpen(true);
            },
            Init: function () {
                CSharpWebLib.qx.ui.core.scroll.AbstractScrollArea.prototype.Init.call(this);
                this.NativeObject.setRootOpenClose(true);
            },
            QxClass: function () {
                return "qx.ui.tree.Tree";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.virtual.core.Scroller", {
        inherits: [CSharpWebLib.qx.ui.core.scroll.AbstractScrollArea]
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.ImageWidget", {
        inherits: [CSharpWebLib.qx.ui.container.Panel]
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.LoginButton", {
        inherits: [CSharpWebLib.qx.ui.form.SplitButton],
        fields: {
            _handler: null
        },
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.SplitButton.ctor.call(this, "Login");
                this._handler = handler;
                this.Decorate(decorator);
                this.AddMenuButtons();
            }
        },
        methods: {
            AddMenuButtons: function () {
                this.AddButton("Login", this._handler);
                this.AddButton("Register", this._handler);
                this.AddButton("Settings", this._handler);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.NavViewsButton", {
        inherits: [CSharpWebLib.qx.ui.form.SplitButton],
        fields: {
            _handler: null
        },
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.SplitButton.ctor.call(this, "Views");
                this._handler = handler;
                this.Decorate(decorator);
                this.AddMenuButtons();
                this.Hide();
            }
        },
        methods: {
            AddMenuButtons: function () {
                this.AddButton("Launcher", this._handler);
                this.AddButton("Transcript", this._handler);
                this.AddButton("ClassBrowser", this._handler);
                this.AddButton("Console", this._handler);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.PodcastsButton", {
        inherits: [CSharpWebLib.qx.ui.form.SplitButton],
        fields: {
            _handler: null
        },
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.SplitButton.ctor.call(this, "Podcasts");
                this._handler = handler;
                this.Decorate(decorator);
                this.AddMenuButtons();
            }
        },
        methods: {
            AddButton$1: function (name) {
                this.AddButton(name, this._handler);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.VideosButton", {
        inherits: [CSharpWebLib.qx.ui.form.SplitButton],
        fields: {
            _handler: null
        },
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.SplitButton.ctor.call(this, "Videos");
                this._handler = handler;
                this.Decorate(decorator);
                this.AddMenuButtons();
            }
        },
        methods: {
            AddButton$1: function (name) {
                this.AddButton(name, this._handler);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.ViewsButton", {
        inherits: [CSharpWebLib.qx.ui.form.SplitButton],
        fields: {
            _handler: null
        },
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.SplitButton.ctor.call(this, "Views");
                this._handler = handler;
                this.Decorate(decorator);
                this.AddMenuButtons();
            }
        },
        methods: {
            AddButton$1: function (name) {
                this.AddButton(name, this._handler);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.windows.form.SingleFormWindow", {
        inherits: [CSharpWebLib.qx.ui.windows.Window],
        fields: {
            _messages: null,
            _panel: null,
            _renderer: null
        },
        props: {
            Message: {
                set: function (value) {
                    this._messages.Value = value;
                }
            }
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.windows.Window.prototype.Init.call(this);
                this._messages = new CSharpWebLib.qx.ui.basic.Label();
                this._messages.MarginBottom = 5;
                this._messages.TextAlign = "center";
                this._panel = new CSharpWebLib.qx.ui.container.DockPanel();
                this._renderer = new CSharpWebLib.qx.ui.form.renderer.SingleRenderer();
                this._panel.AddCenter(this._renderer);
                this._panel.AddSouth(this._messages);
                this.Add$1(this._panel, "center");
                this.AddFields(this.DefaultNames(), this.DefaultWidgets());
            },
            AddFields: function (names, widgets) {
                var nameArgs = new (System.Collections.Generic.List$1(System.Object)).ctor();
                var widgetArgs = new (System.Collections.Generic.List$1(System.Object)).ctor();
                for (var i = 0; i < names.Count; i = (i + 1) | 0) {
                    nameArgs.add(Bridge.toString(names.getItem(i)));
                    widgetArgs.add(widgets.getItem(i).NativeObject);
                }
                this._renderer.NativeObject.addItems(widgetArgs.ToArray(), nameArgs.ToArray());
            },
            DefaultCaption: function () {
                return "Login Window";
            },
            DefaultNames: function () {
                return new (System.Collections.Generic.List$1(System.String)).ctor();
            },
            DefaultWidgets: function () {
                return new (System.Collections.Generic.List$1(CSharpWebLib.qx.ui.core.Widget)).ctor();
            },
            OnResize: function () {
                CSharpWebLib.qx.ui.windows.Window.prototype.OnResize.call(this);
                this._messages.Width = this.InnerWidth;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.windows.image_viewer.ImageViewerWindow", {
        inherits: [CSharpWebLib.qx.ui.windows.Window],
        fields: {
            _scrollableImage: null
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.windows.Window.prototype.Init.call(this);
                this._scrollableImage = new CSharpWebLib.qx.ui.embed.ScrollableImage(this.DefaultImagePath());
                this.Add$1(this._scrollableImage, "center");
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.BpWidget", {
        inherits: [CSharpWebLib.qx.ui.embed.ScrollableHtml,CSharpWebLib.app.viewport.panels.IRender,CSharpWebLib.app.viewport.panels.IWidget],
        fields: {
            _container: null,
            Panels: null,
            Sb: null
        },
        props: {
            Container: {
                get: function () {
                    if (this._container == null) {
                        this._container = this.CreateContainer();
                    }
                    return this._container;
                }
            }
        },
        alias: [
            "Render", "CSharpWebLib$app$viewport$panels$IRender$Render",
            "GetWidget", "CSharpWebLib$app$viewport$panels$IWidget$GetWidget"
        ],
        ctors: {
            init: function () {
                this.Panels = new (System.Collections.Generic.List$1(CSharpWebLib.app.bootstrap.BpElement)).ctor();
                this.Sb = new System.Text.StringBuilder();
            }
        },
        methods: {
            AddContent: function () {
                CSharpWebLib.qx.ui.embed.ScrollableHtml.prototype.AddContent.call(this);
                this.AddPanels();
            },
            AddPanels: function () { },
            CreateContainer: function () {
                return new CSharpWebLib.app.bootstrap.BpContainer(this);
            },
            Render: function () {
                this.Html = this.Container.Render();
                ;
            },
            GetWidget: function () {
                return this;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.CSharpWebLabel", {
        inherits: [CSharpWebLib.qx.ui.embed.NavbarLabel],
        methods: {
            DefaultMarginTop: function () {
                return 3;
            },
            DefaultStyle: function () {
                return Config.GlobalConstants.CSharpWebLabelStyle;
            },
            DefaultText: function () {
                return Config.GlobalConstants.CSharpWebLabel;
            },
            DefaultWidth: function () {
                return Config.GlobalConstants.CSharpWebLabelWidth;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.NewsPanel", {
        inherits: [CSharpWebLib.qx.ui.embed.ScrollableHtml],
        fields: {
            _writer: null
        },
        methods: {
            DefaultPadding: function () {
                return System.Array.init([7, 12], System.Int32);
            },
            DefaultScrollX: function () {
                return false;
            },
            DefaultStyle: function () {
                return null;
            },
            DefaultWriter: function () {
                return new CSharpWebLib.util.NewsWriter();
            },
            Generate: function () {
                if (this._writer == null) {
                    this._writer = this.DefaultWriter();
                }
                this._writer.Generate();
                this.Html = this._writer.toString();
            },
            SetStyles: function () {
                CSharpWebLib.qx.ui.embed.ScrollableHtml.prototype.SetStyles.call(this);
                this.SetStyle("fontSize", "13px");
                this.SetStyle("fontFamily", "helvetica,arial,verdana,sans-serif");
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.ScrollableImage", {
        inherits: [CSharpWebLib.qx.ui.embed.ScrollableHtml],
        fields: {
            _imageSrc: null
        },
        ctors: {
            ctor: function (imageSrc) {
                this.$initialize();
                CSharpWebLib.qx.ui.embed.ScrollableHtml.ctor.call(this);
                this._imageSrc = imageSrc;
            }
        },
        methods: {
            DefaultHtml: function () {
                return System.String.format("<img src=\"{0}\">", [this._imageSrc]);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.embed.TutorialPanel", {
        inherits: [CSharpWebLib.qx.ui.embed.ScrollableHtml],
        fields: {
            _serverApi: null
        },
        props: {
            TutorialPath: {
                get: function () {
                    return "docs/tutorial";
                }
            }
        },
        ctors: {
            ctor: function (serverApi) {
                this.$initialize();
                CSharpWebLib.qx.ui.embed.ScrollableHtml.ctor.call(this);
                CSharpWebLib.qx.ui.embed.ScrollableHtml.prototype.Init.call(this);
                this._serverApi = serverApi;
                this.LoadHtml();
            }
        },
        methods: {
            DefaultPadding: function () {
                return System.Array.init([7, 12], System.Int32);
            },
            DefaultStyle: function () {
                return null;
            },
            LoadHtml: function () { },
            SetStyles: function () {
                CSharpWebLib.qx.ui.embed.ScrollableHtml.prototype.SetStyles.call(this);
                this.SetStyle("fontSize", "13px");
                this.SetStyle("fontFamily", "helvetica,arial,verdana,sans-serif");
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.FormMenuButton", {
        inherits: [CSharpWebLib.qx.ui.form.Button],
        fields: {
            _menu: null
        },
        props: {
            Menu: {
                get: function () {
                    return this._menu;
                },
                set: function (value) {
                    this._menu = value;
                }
            }
        },
        ctors: {
            ctor: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.Button.$ctor1.call(this, label);
                this.Menu = new CSharpWebLib.qx.ui.menu.Menu();
            }
        },
        methods: {
            AddButton: function (label) {
                var button = new CSharpWebLib.qx.ui.form.FormMenuButton(label);
                this.Menu.Add(button);
                return button;
            },
            QxClass: function () {
                return "qx.ui.form.MenuButton";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.FormPanel", {
        inherits: [CSharpWebLib.qx.ui.form.renderer.SingleRenderer],
        methods: {
            AddFields: function (names, widgets) {
                var nameArgs = new (System.Collections.Generic.List$1(System.Object)).ctor();
                var widgetArgs = new (System.Collections.Generic.List$1(System.Object)).ctor();
                for (var i = 0; i < names.Count; i = (i + 1) | 0) {
                    nameArgs.add(Bridge.toString(names.getItem(i)));
                    widgetArgs.add(widgets.getItem(i).NativeObject);
                }
                this.NativeObject.addItems(widgetArgs.ToArray(), nameArgs.ToArray());
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.PasswordField", {
        inherits: [CSharpWebLib.qx.ui.form.TextField],
        methods: {
            QxClass: function () {
                return "qx.ui.form.PasswordField";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.form.TranscriptPanel", {
        inherits: [CSharpWebLib.qx.ui.form.TextArea],
        methods: {
            Newline: function () {
                CSharpWebLib.qx.ui.form.TextArea.prototype.Newline.call(this);
                this.ScrollToBottom();
            },
            SetStyles: function () {
                this.StyleFontFamily = Config.GlobalFonts.TranscriptFontFamily;
                this.StyleFontSize = Config.GlobalFonts.TranscriptFontSize;
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.toolbar.ToolbarButton", {
        inherits: [CSharpWebLib.qx.ui.form.Button],
        ctors: {
            $ctor1: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.Button.$ctor1.call(this, label);
            },
            $ctor2: function (label, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.Button.$ctor2.call(this, label, handler);
            },
            ctor: function (config) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.Button.ctor.call(this, config);
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.toolbar.Button";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tree.TreeFile", {
        inherits: [CSharpWebLib.qx.ui.tree.core.AbstractTreeItem],
        methods: {
            QxClass: function () {
                return "qx.ui.tree.TreeFile";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.tree.TreeFolder", {
        inherits: [CSharpWebLib.qx.ui.tree.core.AbstractTreeItem],
        methods: {
            QxClass: function () {
                return "qx.ui.tree.TreeFolder";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.ButtonBar", {
        inherits: [CSharpWebLib.qx.ui.container.HPanel,CSharpWebLib.qx.interfaces.IEventHandler],
        fields: {
            _buttons: null,
            _proxyEventHandler: null
        },
        alias: ["HandleEvent", "CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent"],
        ctors: {
            init: function () {
                this._buttons = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.qx.ui.form.Button))();
            },
            ctor: function (proxyEventHandler) {
                if (proxyEventHandler === void 0) { proxyEventHandler = null; }

                this.$initialize();
                CSharpWebLib.qx.ui.container.HPanel.ctor.call(this);
                this._proxyEventHandler = proxyEventHandler;
            }
        },
        methods: {
            AddConfig: function (config) {
                if (config.Flex > 0) {
                    this.AddFlex$1(config.Flex);
                } else {
                    if (config.Width > 0) {
                        this.AddWidth(config.Width);
                    } else {
                        this.AddButton(config);
                    }
                }
            },
            AddConfigs: function () {
                this.AddConfigs$1(this.DefaultButtons());
                this.AdjustButtons();
            },
            AddConfigs$1: function (configs) {
                var $t;
                $t = Bridge.getEnumerator(configs);
                try {
                    while ($t.moveNext()) {
                        var config = $t.Current;
                        this.AddConfig(config);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            AddButton: function (config) {
                var button = new CSharpWebLib.qx.ui.form.Button.ctor(config);
                this._buttons.set(config.EventName, button);
                this.Add$2(button);
            },
            AddFlex$1: function (flex) {
                var $t;
                var widget = ($t = new CSharpWebLib.qx.ui.core.Widget(), $t.Height = 1, $t.Width = 1, $t);
                this.Add$1(widget, { flex: flex });
            },
            AddWidth: function (width) {
                var $t;
                var widget = ($t = new CSharpWebLib.qx.ui.core.Widget(), $t.Height = 1, $t.Width = width, $t);
                this.Add$2(widget);
            },
            AdjustButtons: function () { },
            DefaultBackgroundColor: function () {
                return "#ccc";
            },
            DefaultDecorator: function () {
                var $t;
                return ($t = new CSharpWebLib.qx.ui.decoration.Decorator(), $t.ColorTop = CSharpWebLib.qx.constants.Colors.ColorSlateGray, $t.WidthTop = 1, $t);
            },
            DefaultButtons: function () {
                return System.Array.init([], CSharpWebLib.util.ButtonConfig);
            },
            DefaultPadding: function () {
                return System.Array.init([3, 7], System.Int32);
            },
            GetButton: function (key) {
                var button = { };
                this._buttons.tryGetValue(key, button);
                return button.v;
            },
            HandleEvent: function (eventName) {
                if (this._proxyEventHandler != null) {
                    this._proxyEventHandler.CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent(eventName);
                }
            },
            SetButtonBackgroundColor: function (key, color) {
                var button = this.GetButton(key);
                if (button != null) {
                    button.BackgroundColor = color;
                }
            },
            SetButtonEnabled: function (key, isEnabled) {
                var button = this.GetButton(key);
                if (button != null) {
                    button.Enabled = isEnabled;
                }
            },
            SetButtonEnabledStates: function (buttons, isEnabled) {
                var $t;
                $t = Bridge.getEnumerator(buttons);
                try {
                    while ($t.moveNext()) {
                        var button = $t.Current;
                        this.SetButtonEnabled(button, isEnabled);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            SetButtonLabel: function (key, label) {
                var button = this.GetButton(key);
                if (button != null) {
                    button.Label = label;
                }
            },
            SetButtonVisibilities: function (buttons, isVisible) {
                var $t;
                if (isVisible === void 0) { isVisible = true; }
                $t = Bridge.getEnumerator(buttons);
                try {
                    while ($t.moveNext()) {
                        var button = $t.Current;
                        this.SetButtonVisibility(button, isVisible);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            SetButtonVisibility: function (key, isVisible) {
                var button = this.GetButton(key);
                if (button != null) {
                    if (isVisible) {
                        button.Show();
                    } else {
                        button.Hide();
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.GameBoard", {
        inherits: [CSharpWebLib.qx.ui.container.GridPanel],
        fields: {
            _clickFn: null,
            _tiles: null,
            BoardSize: 0
        },
        ctors: {
            ctor: function (size) {
                this.$initialize();
                CSharpWebLib.qx.ui.container.GridPanel.ctor.call(this);
                this.BoardSize = size;
                this.AddTiles();
            }
        },
        methods: {
            AddTile: function (column, row) {
                var button = new CSharpWebLib.qx.ui.widgets.GameTile.$ctor2("", "white", "charcoal");
                button.SetUserData("tag", "");
                button.SetUserData("column", column);
                button.SetUserData("row", row);
                this.AddColumnRow(button, column, row);
                var tag = this.TileTag(column, row);
                this._tiles.set(tag, button);
                button.ClickFn = Bridge.fn.bind(this, function () {
                    this.OnClick(button);
                });
            },
            AddTiles: function () {
                for (var x = 0; x < this.BoardSize; x = (x + 1) | 0) {
                    for (var y = 0; y < this.BoardSize; y = (y + 1) | 0) {
                        this.AddTile(x, y);
                    }
                }
            },
            TileTag: function (column, row) {
                return System.String.format("col-{0}-row-{1}", Bridge.box(column, System.Int32), Bridge.box(row, System.Int32));
            },
            GetTile: function (column, row) {
                var tag = this.TileTag(column, row);
                if (this._tiles.containsKey(tag)) {
                    return this._tiles.get(tag);
                } else {
                    return null;
                }
            },
            DefaultBackgroundColor: function () {
                return CSharpWebLib.qx.constants.Colors.ColorLighterGray;
            },
            Init: function () {
                CSharpWebLib.qx.ui.container.GridPanel.prototype.Init.call(this);
                this._tiles = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.qx.ui.widgets.GameTile))();
            },
            OnClick: function (btn) {
                var column = btn.GetUserData("column");
                var row = btn.GetUserData("row");
                if (!Bridge.staticEquals(this._clickFn, null)) {
                    var args = System.Array.init([Bridge.box(column, System.Int32), Bridge.box(row, System.Int32)], System.Object);
                    this._clickFn.call.apply(this._clickFn, [null].concat(System.Array.init([args], System.Object)));
                }
            },
            Reset: function () {
                var $t;
                $t = Bridge.getEnumerator(this._tiles.getValues(), CSharpWebLib.qx.ui.widgets.GameTile);
                try {
                    while ($t.moveNext()) {
                        var btn = Bridge.cast($t.Current, CSharpWebLib.qx.ui.form.Button);
                        btn.SetUserData("tag", "");
                        btn.Label = "";
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            ResizeTiles: function (size) {
                var columnWidth = (Bridge.Int.div(size, this.BoardSize)) | 0;
                var rowHeight = (Bridge.Int.div(size, this.BoardSize)) | 0;
                var gridLayout = Bridge.cast(this._layout, CSharpWebLib.qx.ui.layout.Grid);
                for (var i = 0; i < this.BoardSize; i = (i + 1) | 0) {
                    gridLayout.setRowHeight(i, rowHeight);
                    gridLayout.setColumnWidth(i, columnWidth);
                }
            },
            SetClickFn: function (fn) {
                this._clickFn = fn;
            },
            SetSize: function (size) {
                this.BoardSize = size;
                this._tiles.clear();
                this.RemoveAll();
                this.AddTiles();
                this.FireEvent("resize");
            },
            ClearTileIcon: function (column, row) {
                var tile = this.GetTile(column, row);
                if (tile == null) {
                    return;
                }
                tile.Icon = null;
                tile.SetUserData("icon", null);
            },
            MoveTileIcon: function (fromColumn, fromRow, toColumn, toRow) {
                var fromTile = this.GetTile(fromColumn, fromRow);
                var toTile = this.GetTile(toColumn, toRow);
                if (fromTile == null || toTile == null) {
                    return;
                }
                var icon = fromTile.Icon;
                fromTile.Icon = null;
                fromTile.SetUserData("icon", null);
                toTile.Center = true;
                toTile.Gap = 0;
                toTile.Label = null;
                toTile.SetUserData("icon", icon);
                toTile.Icon = icon;
            },
            SetTileIcon: function (name, column, row) {
                var icon = System.String.format("assets/images/{0}", [name]);
                if (!System.String.contains(icon,".")) {
                    icon = (icon || "") + ".jpg";
                }
                var tile = this.GetTile(column, row);
                if (tile == null) {
                    return;
                }
                tile.Center = true;
                tile.Gap = 0;
                tile.Label = null;
                tile.SetUserData("icon", icon);
                tile.Icon = icon;
            },
            SetTileTag: function (tag, column, row) {
                var btn = this.GetTile(column, row);
                btn.SetUserData("tag", tag);
                btn.Label = System.String.format("<h1>{0}</h1>", [tag.toUpperCase()]);
            },
            toString: function () {
                return "a GameBoard";
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.GameTile", {
        inherits: [CSharpWebLib.qx.ui.form.Button],
        ctors: {
            ctor: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.Button.$ctor1.call(this, label);
                this.SetRich(true);
            },
            $ctor1: function (label, backgroundColor) {
                CSharpWebLib.qx.ui.widgets.GameTile.ctor.call(this, label);
                this.BackgroundColor = backgroundColor;
            },
            $ctor2: function (label, backgroundColor, textColor) {
                CSharpWebLib.qx.ui.widgets.GameTile.$ctor1.call(this, label, backgroundColor);
                this.SetTextColor(textColor);
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.widgets.navbar.Navbar", {
        inherits: [CSharpWebLib.qx.ui.menubar.MenuBar],
        fields: {
            _isDesktopMode: false,
            _label: null,
            _logo: null,
            _viewport: null
        },
        alias: ["Decorate$1", "CSharpWebLib$qx$interfaces$IDecorate$Decorate"],
        ctors: {
            ctor: function (viewport) {
                this.$initialize();
                CSharpWebLib.qx.ui.menubar.MenuBar.ctor.call(this);
                this._isDesktopMode = false;
                this._viewport = viewport;
            }
        },
        methods: {
            AddButtons: function () { },
            AddLabel: function () {
                this._label = this.CreateLabel();
                this.Add(this._label);
            },
            AddLogo: function () {
                this._logo = new CSharpWebLib.qx.ui.basic.Image.$ctor1("assets/images/pp_circle_logo.jpg", 35, 35);
                this._logo.MarginTop = 3;
                this.Add(this._logo);
            },
            SetDataMode: function (isDesktopMode) {
                this._isDesktopMode = isDesktopMode;
                this._viewport.SetWorkspaceMode(this._isDesktopMode);
            },
            CreateLabel: function () {
                return new CSharpWebLib.qx.ui.embed.NavbarLabel();
            },
            AddNavbarButton: function (label) {
                var button = this.AddButton(label);
                this.Decorate$1(button);
                return button;
            },
            Decorate$1: function (widget) {
                var decorator = new CSharpWebLib.qx.ui.decoration.Decorator();
                decorator.BackgroundColor = this.DefaultBackgroundColor();
                widget.Decorator = decorator;
                widget.TextColor = CSharpWebLib.qx.constants.Colors.ColorWhite;
            },
            DefaultBackgroundColor: function () {
                return CSharpWebLib.qx.constants.Colors.ColorNavbarBlue;
            },
            DefaultPadding: function () {
                return System.Array.init([0, 25], System.Int32);
            },
            Init: function () {
                CSharpWebLib.qx.ui.menubar.MenuBar.prototype.Init.call(this);
                this.AddLabel();
                this.AddButtons();
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.BpPage", {
        inherits: [CSharpWebLib.app.viewport.panels.BpWidget,CSharpWebLib.app.viewport.panels.IPage]
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.NavMenuPanel", {
        inherits: [CSharpWebLib.app.viewport.panels.BpWidget],
        fields: {
            focusButton: null,
            Buttons: null,
            ContentPanel: null,
            NavPanel: null
        },
        ctors: {
            init: function () {
                this.Buttons = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.app.bootstrap.BpButton))();
            },
            ctor: function (navPanel, contentPanel) {
                this.$initialize();
                CSharpWebLib.app.viewport.panels.BpWidget.ctor.call(this);
                this.NavPanel = navPanel;
                this.ContentPanel = contentPanel;
            }
        },
        methods: {
            AddButton$1: function (name, tag, fn) {
                if (fn === void 0) { fn = null; }
                var button = new CSharpWebLib.app.bootstrap.BpButton(name, this, fn);
                if (this.focusButton == null) {
                    this.focusButton = button;
                }
                this.Buttons.set(tag, button);
                this.Container.AddChild(button);
            },
            AddButton: function (text, tag) {
                var Fn = null;

                Fn = Bridge.fn.bind(this, function () {
                    this.OnButtonClicked(tag);
                });
                this.AddButton$1(text, tag, Fn);
            },
            AddPages: function () { },
            AddPage: function (page) {
                this.AddPageButton(page);
                this.ContentPanel.AddPage(page);
            },
            AddPageButton: function (page) {
                if (!(Bridge.is(page, CSharpWebLib.app.viewport.panels.IPage))) {
                    return;
                }
                this.AddButton((Bridge.as(page, CSharpWebLib.app.viewport.panels.IPage)).CSharpWebLib$app$viewport$panels$IPage$ButtonLabel(), (Bridge.as(page, CSharpWebLib.app.viewport.panels.IPage)).CSharpWebLib$app$viewport$panels$IPage$TagName());
            },
            HandlesAppear: function () {
                return true;
            },
            AddBackButton: function () {
                this.AddButton("Back", "back");
            },
            OnAppear: function () {
                this.Container.MapEvents();
            },
            OnButtonClicked: function (tag) {
                this.Buttons.tryGetValue(tag, Bridge.ref(this, "focusButton"));
                this.SelectNavPanel(tag);
                this.SelectContentPage(tag);
            },
            ShowDefaultPage: function () {
                this.ShowPage(this.GetDefaultPage());
            },
            ShowPage: function (pageName) {
                var tag = this.GetTag();
                var pageKey = System.String.startsWith(pageName, tag) ? pageName : System.String.format("{0}_{1}", tag, pageName);
                this.ContentPanel.SelectPage(pageKey);
            },
            FocusLastButton: function () {
                if (this.focusButton != null && Bridge.is(this.focusButton.Widget, CSharpWebLib.qx.ui.core.Widget)) {
                    (Bridge.as(this.focusButton.Widget, CSharpWebLib.qx.ui.core.Widget)).Focus();
                }
            }
        }
    });

    Bridge.define("CSharpWebLib.qx.ui.menubar.Button", {
        inherits: [CSharpWebLib.qx.ui.form.FormMenuButton],
        ctors: {
            ctor: function (label) {
                this.$initialize();
                CSharpWebLib.qx.ui.form.FormMenuButton.ctor.call(this, label);
            }
        },
        methods: {
            QxClass: function () {
                return "qx.ui.menubar.Button";
            }
        }
    });

    Bridge.define("CSharpWebLib.app.viewport.panels.CardPage", {
        inherits: [CSharpWebLib.app.viewport.panels.BpPage],
        fields: {
            Card: null
        },
        methods: {
            AddPanels: function () {
                this.Card = new CSharpWebLib.app.bootstrap.BpCard(this.PageTitle(), this);
                this.Container.AddChild(this.Card);
                this.AddCardPanels();
            },
            AddCardPanel: function (child) {
                this.Card.Container.AddChild(child);
            },
            AddCardPanelWithSpacer: function (child) {
                this.AddCardPanel(child);
                this.AddCardPanel(new CSharpWebLib.app.bootstrap.BpBr(this, 2));
            },
            AddCardPanels: function () { }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDU2hhcnBXZWJMaWIuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIi4uL0NvbmZpZy9HbG9iYWxDb25zdGFudHMuY3MiLCJhcGkvQ3VzdG9tTWFuYWdlci5jcyIsInF4L2NvcmUvUW9iamVjdC5jcyIsInV0aWwvQmFzZTY0LmNzIiwidXRpbC9CdXR0b25Db25maWcuY3MiLCJ1dGlsL0h0bWxXcml0ZXIuY3MiLCJ1dGlsL0pzb24uY3MiLCJ1dGlsL1BhcnNlVXRpbC5jcyIsInV0aWwvU3RyaW5nVXRpbC5jcyIsInV0aWwvU3R5bGVVdGlsLmNzIiwiYXBwL2Jvb3RzdHJhcC9CcEVsZW1lbnQuY3MiLCJxeC91aS9jb3JlL0xheW91dEl0ZW0uY3MiLCJhcGkvUHJveHlNYW5hZ2VyLmNzIiwicXgvaHRtbC9FbGVtZW50LmNzIiwicXgvaW8vcmVxdWVzdC9BYnN0cmFjdFJlcXVlc3QuY3MiLCJxeC91aS9mb3JtL0Zvcm0uY3MiLCJxeC91aS9tZW51L01hbmFnZXIuY3MiLCJxeC91aS90YWJsZS9BYnN0cmFjdFRhYmxlTW9kZWwuY3MiLCJxeC91aS90YWJsZS9CYXNpY0NvbHVtbk1vZGVsLmNzIiwicXgvdWkvdGFibGUvU2VsZWN0aW9uTW9kZWwuY3MiLCJxeC91aS91dGlsL1RleHRNZWFzdXJlLmNzIiwidXRpbC9OZXdzV3JpdGVyLmNzIiwiYXBwL2Jvb3RzdHJhcC9CcENvbnRhaW5lci5jcyIsImFwcC9ib290c3RyYXAvQnBCci5jcyIsImFwcC9ib290c3RyYXAvQnBCdXR0b24uY3MiLCJhcHAvYm9vdHN0cmFwL0JwQ2FyZC5jcyIsImFwcC9ib290c3RyYXAvQnBDb2RlLmNzIiwiYXBwL2Jvb3RzdHJhcC9CcENvbHVtbi5jcyIsImFwcC9ib290c3RyYXAvQnBJbWcuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGFibGUuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGFibGVDb2wuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGFibGVIZWFkZXJDb2wuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGFibGVIZWFkZXJSb3cuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGFibGVSb3cuY3MiLCJhcHAvYm9vdHN0cmFwL0JwVGV4dC5jcyIsImFwcC9ib290c3RyYXAvQnBWaWRlby5jcyIsInF4L3VpL2NvcmUvV2lkZ2V0LmNzIiwicXgvaW8vcmVxdWVzdC9YaHIuY3MiLCJxeC91aS9kZWNvcmF0aW9uL0RlY29yYXRvci5jcyIsInF4L3VpL2xheW91dC9BdG9tLmNzIiwicXgvdWkvbGF5b3V0L0Jhc2ljLmNzIiwicXgvdWkvbGF5b3V0L0NhbnZhcy5jcyIsInF4L3VpL2xheW91dC9Eb2NrLmNzIiwicXgvdWkvbGF5b3V0L0Zsb3cuY3MiLCJxeC91aS9sYXlvdXQvR3JpZC5jcyIsInF4L3VpL2xheW91dC9Hcm93LmNzIiwicXgvdWkvbGF5b3V0L0hCb3guY3MiLCJxeC91aS9sYXlvdXQvVkJveC5jcyIsInF4L3VpL3RhYmxlL1Jlc2l6ZUNvbHVtbk1vZGVsLmNzIiwicXgvdWkvdGFibGUvU2ltcGxlVGFibGVNb2RlbC5jcyIsImFwcC9ib290c3RyYXAvQnAyQ29sdW1ucy5jcyIsInF4L3VpL3dpbmRvd3MvRGVza3RvcC5jcyIsInF4L3VpL3NwbGl0cGFuZS9TcGxpdFBhbmUuY3MiLCJxeC91aS9lbWJlZC9IdG1sRW1iZWQuY3MiLCJxeC91aS9jb250YWluZXIvU3RhY2tQYW5lbC5jcyIsInF4L3VpL2NvbnRhaW5lci9QYW5lbC5jcyIsInF4L3VpL2Jhc2ljL0F0b20uY3MiLCJxeC91aS9iYXNpYy9JbWFnZS5jcyIsInF4L3VpL2Jhc2ljL0xhYmVsLmNzIiwicXgvdWkvY29udGFpbmVyL1Njcm9sbC5jcyIsInF4L3VpL2VtYmVkL0lGcmFtZS5jcyIsInF4L3VpL2Zvcm0vQWJzdHJhY3RGaWVsZC5jcyIsInF4L3VpL2Zvcm0vcmVuZGVyZXIvQWJzdHJhY3RSZW5kZXJlci5jcyIsInF4L3VpL2Zvcm0vU3BsaXRCdXR0b24uY3MiLCJxeC91aS9tZW51L01lbnUuY3MiLCJxeC91aS9tZW51L1NlcGFyYXRvci5jcyIsInF4L3VpL3Rvb2xiYXIvVG9vbEJhci5jcyIsInF4L3VpL3RhYmxlL1RhYmxlLmNzIiwicXgvdWkvdGFidmlldy9UYWJWaWV3LmNzIiwicXgvdWkvdG9vbGJhci9TZXBhcmF0b3IuY3MiLCJxeC91aS90cmVlL2NvcmUvQWJzdHJhY3RJdGVtLmNzIiwicXgvdWkvd2luZG93cy9XaW5kb3cuY3MiLCJhcHAvdmlld3BvcnQvY29udGVudC9EZXNrdG9wQ29udGVudC5jcyIsImFwcC92aWV3cG9ydC9jb250ZW50L1N0YW5kYXJkQ29udGVudC5jcyIsInF4L3VpL2VtYmVkL1Njcm9sbGFibGVIdG1sLmNzIiwiYXBwL3ZpZXdwb3J0L3BhbmVscy9Db250ZW50UGFuZWwuY3MiLCJhcHAvdmlld3BvcnQvcGFuZWxzL05hdlBhbmVsLmNzIiwiYXBwL3ZpZXdwb3J0L3BhbmVscy9ReFBhZ2UuY3MiLCJhcHAvdmlld3BvcnQvVmlld3BvcnQuY3MiLCJhcHAvdmlld3BvcnQvVmlld3BvcnRTdGFjay5jcyIsInF4L3VpL2NvbnRhaW5lci9HYW1lUGFuZWwuY3MiLCJxeC91aS9jb250YWluZXIvR3JpZFBhbmVsLmNzIiwicXgvdWkvY29udGFpbmVyL0hQYW5lbC5jcyIsInF4L3VpL2NvbnRhaW5lci9WUGFuZWwuY3MiLCJxeC91aS9lbWJlZC9OYXZiYXJMYWJlbC5jcyIsInF4L3VpL2Zvcm0vQnV0dG9uLmNzIiwicXgvdWkvZm9ybS9yZW5kZXJlci9TaW5nbGVSZW5kZXJlci5jcyIsInF4L3VpL2Zvcm0vTGlzdEJveC5jcyIsInF4L3VpL2Zvcm0vTGlzdEl0ZW0uY3MiLCJxeC91aS9mb3JtL1RleHRGaWVsZC5jcyIsInF4L3VpL2Zvcm0vcmVuZGVyZXIvRG91YmxlUmVuZGVyZXIuY3MiLCJxeC91aS9mb3JtL1RleHRBcmVhLmNzIiwicXgvdWkvbWVudS9DaGVja0JveC5jcyIsInF4L3VpL21lbnUvTWVudUJ1dHRvbi5jcyIsInF4L3VpL21lbnUvUmFkaW9CdXR0b24uY3MiLCJxeC91aS9tZW51YmFyL01lbnVCYXIuY3MiLCJxeC91aS9wb3B1cC9Qb3B1cC5jcyIsInF4L3VpL3RhYnZpZXcvUGFnZS5jcyIsInF4L3VpL3RyZWUvY29yZS9BYnN0cmFjdFRyZWVJdGVtLmNzIiwicXgvdWkvdHJlZS9UcmVlLmNzIiwicXgvdWkvd2lkZ2V0cy9uYXZiYXIvTG9naW5CdXR0b24uY3MiLCJxeC91aS93aWRnZXRzL25hdmJhci9OYXZWaWV3c0J1dHRvbi5jcyIsInF4L3VpL3dpZGdldHMvbmF2YmFyL1BvZGNhc3RzQnV0dG9uLmNzIiwicXgvdWkvd2lkZ2V0cy9uYXZiYXIvVmlkZW9zQnV0dG9uLmNzIiwicXgvdWkvd2lkZ2V0cy9uYXZiYXIvVmlld3NCdXR0b24uY3MiLCJxeC91aS93aW5kb3dzL2Zvcm0vU2luZ2xlRm9ybVdpbmRvdy5jcyIsInF4L3VpL3dpbmRvd3MvaW1hZ2Vfdmlld2VyL0ltYWdlVmlld2VyV2luZG93LmNzIiwiYXBwL3ZpZXdwb3J0L3BhbmVscy9CcFdpZGdldC5jcyIsInF4L3VpL2VtYmVkL0NTaGFycFdlYkxhYmVsLmNzIiwicXgvdWkvZW1iZWQvTmV3c1BhbmVsLmNzIiwicXgvdWkvZW1iZWQvU2Nyb2xsYWJsZUltYWdlLmNzIiwicXgvdWkvZW1iZWQvVHV0b3JpYWxQYW5lbC5jcyIsInF4L3VpL2Zvcm0vRm9ybU1lbnVCdXR0b24uY3MiLCJxeC91aS9mb3JtL0Zvcm1QYW5lbC5jcyIsInF4L3VpL2Zvcm0vUGFzc3dvcmRGaWVsZC5jcyIsInF4L3VpL2Zvcm0vVHJhbnNjcmlwdFBhbmVsLmNzIiwicXgvdWkvdG9vbGJhci9Ub29sYmFyQnV0dG9uLmNzIiwicXgvdWkvdHJlZS9UcmVlRmlsZS5jcyIsInF4L3VpL3RyZWUvVHJlZUZvbGRlci5jcyIsInF4L3VpL3dpZGdldHMvQnV0dG9uQmFyLmNzIiwicXgvdWkvd2lkZ2V0cy9HYW1lQm9hcmQuY3MiLCJxeC91aS93aWRnZXRzL0dhbWVUaWxlLmNzIiwicXgvdWkvd2lkZ2V0cy9uYXZiYXIvTmF2YmFyLmNzIiwiYXBwL3ZpZXdwb3J0L3BhbmVscy9OYXZNZW51UGFuZWwuY3MiLCJxeC91aS9tZW51YmFyL0J1dHRvbi5jcyIsImFwcC92aWV3cG9ydC9wYW5lbHMvQ2FyZFBhZ2UuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvREFld0RBLHFCQUFjQSx3Q0FBaUJBLGdEQUF5QkEsdUNBQWdCQTsyREFDakVBLHFCQUFjQSx3Q0FBaUJBLGtEQUEyQkEsdUNBQWdCQTtzREFDL0VBLHFCQUFjQSx3Q0FBaUJBLDZDQUFzQkEsdUNBQWdCQTtzREFDckVBLHFCQUFjQSx3Q0FBaUJBLDZDQUFzQkEsdUNBQWdCQTttREFDeEVBLHFCQUFjQSx3Q0FBaUJBLDBDQUFtQkEsdUNBQWdCQTs7K0NBSXRFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDSm5DQSxJQUFJQSw0Q0FBYUE7NEJBQ2JBLDJDQUFZQSxJQUFJQTs7d0JBQ3BCQSxPQUFPQTs7Ozs7OztnQkFNWEEscUJBQWdDQSwrQkFBQ0E7b0JBRTdCQSxPQUFPQSxrQkFBYUE7O2dCQUV4QkEscUJBQWdDQSwrQkFBQ0EsR0FBR0EsR0FBR0E7b0JBRW5DQSxPQUFPQSxrQkFBYUEsR0FBR0EsR0FBR0E7O2dCQUU5QkEsMEJBQXNDQTtnQkFDdENBLGlCQUF3QkEsK0JBQUNBO29CQUVyQkEsT0FBT0EsY0FBU0E7O2dCQUVwQkEsMEJBQXNDQTtnQkFDdENBLDBCQUFzQ0E7Z0JBQ3RDQSxzQkFBa0NBOztvQ0FHbEJBO2dCQUVoQkEsUUFBUUE7b0JBRUpBO3dCQUNJQSxPQUFPQSxJQUFJQTtvQkFDZkE7d0JBQ0lBLE9BQU9BLElBQUlBOzs7Z0NBSURBO2dCQUVsQkEsSUFBSUEsT0FBT0EsUUFBUUEsbUJBQW1CQTtvQkFDbENBLE9BQU9BOztnQkFDWEEsSUFBSUEsa0JBQWFB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QkE7Ozs7O2dCQUt2Q0E7Ozs7Ozs7Ozs7OztnQkNKUUEsWUFBT0EsSUFBSUEsa0NBQU9BLGtCQUFhQTtnQkFDL0JBLHdCQUFtQkE7Z0JBQ25CQTs7b0NBR3dCQTtnQkFFeEJBLDZCQUF3QkE7OzhDQUdVQTtnQkFFbENBLGtCQUFhQTtnQkFDYkEsa0JBQWFBLElBQUlBLGdDQUFLQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJuYW1lc3BhY2UgQ29uZmlnXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHbG9iYWxDb25zdGFudHNcclxuICAgIHtcclxuICAgICAgICAvLyBmb250c1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgRm9udENvbG9ySXZvcnkgPSBAXCJpdm9yeVwiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgRm9udFNpemUyNVB4ID0gQFwiMzVweFwiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgRm9udEZhbWlseUJpb1JoeW1lU2VyaWYgPSBAXCInQmlvUmh5bWUnLHNlcmlmXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBGb250RmFtaWx5SGFwcHlNb25rZXlCb2xkID0gQFwiJ0hhcHB5IE1vbmtleScsY3Vyc2l2ZVwiO1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBzdHJpbmcgRm9udEZhbWlseVVidW50dU1vbm8gPSBAXCInVWJ1bnR1IE1vbm8nXCI7XHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBGb250RmFtaWx5RnJlZG9rYU9uZSA9IEBcIidGcmVkb2thIE9uZSdcIjtcclxuICAgICAgICBwdWJsaWMgY29uc3Qgc3RyaW5nIEZvbnRGYW1pbHlNYWNvbmRvID0gQFwiJ01hY29uZG8nXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0cmluZyBGb250U3R5bGVGb3JtYXQgPSBAXCJmb250LWZhbWlseTp7MH07Y29sb3I6ezF9O2ZvbnQtc2l6ZTp7Mn07XCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEZvbnRTdHlsZUJpb1JoeW1lSXZvcnkyNSA9IHN0cmluZy5Gb3JtYXQoRm9udFN0eWxlRm9ybWF0LCBGb250RmFtaWx5QmlvUmh5bWVTZXJpZiwgRm9udENvbG9ySXZvcnksIEZvbnRTaXplMjVQeCk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgRm9udFN0eWxlSGFwcHlNb25rZXlCb2xkSXZvcnkyNSA9IHN0cmluZy5Gb3JtYXQoRm9udFN0eWxlRm9ybWF0LCBGb250RmFtaWx5SGFwcHlNb25rZXlCb2xkLCBGb250Q29sb3JJdm9yeSwgRm9udFNpemUyNVB4KTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHN0cmluZyBGb250U3R5bGVVYnVudHVNb25vSXZvcnkyNSA9IHN0cmluZy5Gb3JtYXQoRm9udFN0eWxlRm9ybWF0LCBGb250RmFtaWx5VWJ1bnR1TW9ubywgRm9udENvbG9ySXZvcnksIEZvbnRTaXplMjVQeCk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgRm9udFN0eWxlRnJlZG9rYU9uZUl2b3J5MjUgPSBzdHJpbmcuRm9ybWF0KEZvbnRTdHlsZUZvcm1hdCwgRm9udEZhbWlseUZyZWRva2FPbmUsIEZvbnRDb2xvckl2b3J5LCBGb250U2l6ZTI1UHgpO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RyaW5nIEZvbnRTdHlsZU1hY29uZG9Jdm9yeTI1ID0gc3RyaW5nLkZvcm1hdChGb250U3R5bGVGb3JtYXQsIEZvbnRGYW1pbHlNYWNvbmRvLCBGb250Q29sb3JJdm9yeSwgRm9udFNpemUyNVB4KTtcclxuXHJcbiAgICAgICAgLy8gbGFiZWxzXHJcbiAgICAgICAgcHVibGljIGNvbnN0IHN0cmluZyBDU2hhcnBXZWJMYWJlbCA9IFwiQ1NoYXJwV2ViRXhwcmVzcyBEZW1vXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBzdHJpbmcgQ1NoYXJwV2ViTGFiZWxTdHlsZSA9IEZvbnRTdHlsZU1hY29uZG9Jdm9yeTI1O1xyXG4gICAgICAgIHB1YmxpYyBjb25zdCBpbnQgQ1NoYXJwV2ViTGFiZWxXaWR0aCA9IDM3NTtcclxuXHJcbiAgICAgICAgLy8gYnV0dG9uIGRlYm91bmNlIGxpbWl0XHJcbiAgICAgICAgcHVibGljIGNvbnN0IGludCBCVVRUT05fREVCT1VOQ0VfVEhSRVNIT0xEID0gNTAwOyAvLyBtaWxsaXNlY29uZHNcclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvbnRhaW5lcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwaVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ3VzdG9tTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBkZWxlZ2F0ZSBXaWRnZXQgRm5DcmVhdGVXaWRnZXQoZHluYW1pYyBhcmcpO1xyXG4gICAgICAgIHB1YmxpYyBkZWxlZ2F0ZSBib29sIEZuSGFuZGxlQ3VzdG9tKGR5bmFtaWMgb2JqLCBkeW5hbWljIG5hbWUsIGR5bmFtaWMgZm4pO1xyXG4gICAgICAgIHB1YmxpYyBkZWxlZ2F0ZSBib29sIEZuSXNDdXN0b20oZHluYW1pYyBhcmcpO1xyXG4gICAgICAgIHN0YXRpYyBDdXN0b21NYW5hZ2VyIF9pbnN0YW5jZTtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBDdXN0b21NYW5hZ2VyIEluc3RhbmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBDdXN0b21NYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZuQ3JlYXRlV2lkZ2V0IGNyZWF0ZUN1c3RvbUZuID0gKHgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDcmVhdGVXaWRnZXQoeCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEZuSGFuZGxlQ3VzdG9tIGhhbmRsZUN1c3RvbUZuID0gKG8sIG4sIGYpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBIYW5kbGVDdXN0b20obywgbiwgZik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNjcmlwdC5TZXQoXCJ3aW5kb3cuUHlReENyZWF0ZUN1c3RvbVwiLCBjcmVhdGVDdXN0b21Gbik7XHJcbiAgICAgICAgICAgIEZuSXNDdXN0b20gaXNDdXN0b21GbiA9ICh4KSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSXNDdXN0b20oeCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFNjcmlwdC5TZXQoXCJ3aW5kb3cuUHlReENyZWF0ZUN1c3RvbVwiLCBjcmVhdGVDdXN0b21Gbik7XHJcbiAgICAgICAgICAgIFNjcmlwdC5TZXQoXCJ3aW5kb3cuUHlReEhhbmRsZUN1c3RvbVwiLCBoYW5kbGVDdXN0b21Gbik7XHJcbiAgICAgICAgICAgIFNjcmlwdC5TZXQoXCJ3aW5kb3cuUHlReElzQ3VzdG9tXCIsIGlzQ3VzdG9tRm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgV2lkZ2V0IENyZWF0ZVdpZGdldChzdHJpbmcgbmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIjpib2FyZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2FtZVBhbmVsKDMpO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFdpZGdldCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBJQ3VzdG9tRXZlbnQgQXNDdXN0b20oZHluYW1pYyBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAob2JqID09IG51bGwgfHwgb2JqLmdldFVzZXJEYXRhID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgaWYgKElzQ3VzdG9tVHlwZShvYmopKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iaiBhcyBJQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgICAgIGR5bmFtaWMgb3duZXIgPSBvYmouZ2V0VXNlckRhdGEoXCJ3aWRnZXRfb3duZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChvd25lciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBvd25lciBhcyBJQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEhhbmRsZUN1c3RvbShkeW5hbWljIG9iaiwgZHluYW1pYyBuYW1lLCBkeW5hbWljIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSUN1c3RvbUV2ZW50IGN1c3RvbU9iamVjdCA9IEFzQ3VzdG9tKG9iaik7XHJcbiAgICAgICAgICAgIHN0cmluZyBldmVudE5hbWUgPSBuYW1lIGFzIHN0cmluZztcclxuICAgICAgICAgICAgRm5Wb2lkTiBjdXN0b21GbiA9IGZuIGFzIEZuVm9pZE47XHJcbiAgICAgICAgICAgIGlmIChjdXN0b21PYmplY3QgPT0gbnVsbCB8fCBldmVudE5hbWUgPT0gbnVsbCB8fCBjdXN0b21GbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjdXN0b21PYmplY3QuSGFuZGxlQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCBmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElzQ3VzdG9tKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEFzQ3VzdG9tKG9iaikgIT0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJvb2wgSXNDdXN0b21UeXBlKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiBpcyBJQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LmNvcmVcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIF9xeENsYXNzO1xyXG5cclxuICAgICAgICBwdWJsaWMgUW9iamVjdChzdHJpbmcgcXhDbGFzcyA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcXhDbGFzcyA9IHF4Q2xhc3M7XHJcbiAgICAgICAgICAgIEJhc2VJbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZExpc3RlbmVyKHN0cmluZyBldmVudE5hbWUsIEZuVm9pZCBmbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGRMaXN0ZW5lcihldmVudE5hbWUsIGZuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWZ0ZXJJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc3RyaW5nIEFzU3RyaW5nKG9iamVjdCBvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJ7MH1cIiwgbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEJhc2VJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEluaXQoKTtcclxuICAgICAgICAgICAgQWZ0ZXJJbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBGaXJlRXZlbnQoc3RyaW5nIGV2ZW50TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5maXJlRXZlbnQoZXZlbnROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QgPSBDcmVhdGUoX3F4Q2xhc3MgPz8gUXhDbGFzcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBkeW5hbWljIENyZWF0ZShzdHJpbmcgY2xhc3NOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZHluYW1pYyB3aWRnZXQgPSBTY3JpcHQuQ2FsbDxkeW5hbWljPihcInF4bGliLmFwcC5BcHAuY3JlYXRlV2lkZ2V0XCIsIGNsYXNzTmFtZSwgQ3JlYXRpb25BcmdzKCkpO1xyXG4gICAgICAgICAgICB3aWRnZXQuc2V0VXNlckRhdGEoXCJ3aWRnZXRfb3duZXJcIiwgdGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB3aWRnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBkeW5hbWljW10gQ3JlYXRpb25BcmdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGR5bmFtaWMgTmF0aXZlT2JqZWN0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUGVyZm9ybUFjdGlvbihzdHJpbmcgYWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFBlcmZvcm1BY3Rpb24oYWN0aW9uLCBuZXcgb2JqZWN0W10geyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGJvb2wgUGVyZm9ybUFjdGlvbihzdHJpbmcgYWN0aW9uLCBvYmplY3RbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9QcmludExvZyhzdHJpbmcuRm9ybWF0KFwiUGVyZm9ybUFjdGlvbjogezB9KHsxfSlcIiwgYWN0aW9uLCBhcmdzLkxlbmd0aCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcmludExvZyhwYXJhbXMgZHluYW1pY1tdIG1lc3NhZ2VzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ3aW5kb3cuY29uc29sZS5sb2cuYXBwbHlcIiwgbnVsbCwgbWVzc2FnZXMpO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIHZpcnR1YWwgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC5jb3JlLk9iamVjdFwiO1xyXG59XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0KHN0cmluZyBuYW1lLCBkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyBmdWxsTmFtZSA9IHN0cmluZy5Gb3JtYXQoXCJ3aW5kb3cuezB9XCIsIG5hbWUpO1xyXG4gICAgICAgICAgICBTY3JpcHQuU2V0KGZ1bGxOYW1lLCBvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGR5bmFtaWMgR2V0VXNlckRhdGEoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0VXNlckRhdGEodGFnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFVzZXJEYXRhKHN0cmluZyB0YWcsIGR5bmFtaWMgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0VXNlckRhdGEodGFnLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFdpbmRvd0hlaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGR5bmFtaWMgd2luZG93ID0gU2NyaXB0LkdldChcIndpbmRvd1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2luZG93V2lkdGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkeW5hbWljIHdpbmRvdyA9IFNjcmlwdC5HZXQoXCJ3aW5kb3dcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi51dGlsXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCYXNlNjRcclxuICAgIHtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBzdHJpbmcgRW5jb2RlKHN0cmluZyBwbGFpblRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcGxhaW5UZXh0Qnl0ZXMgPSBFbmNvZGluZy5VVEY4LkdldEJ5dGVzKHBsYWluVGV4dCk7XHJcbiAgICAgICAgICAgIHJldHVybiBDb252ZXJ0LlRvQmFzZTY0U3RyaW5nKHBsYWluVGV4dEJ5dGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgc3RyaW5nIERlY29kZShzdHJpbmcgYmFzZTY0RW5jb2RlZERhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgYmFzZTY0U3RyO1xyXG4gICAgICAgICAgICBpZiAoYmFzZTY0RW5jb2RlZERhdGEuU3RhcnRzV2l0aChcImInXCIpKVxyXG4gICAgICAgICAgICAgICAgYmFzZTY0U3RyID0gYmFzZTY0RW5jb2RlZERhdGEuU3Vic3RyaW5nKDIsIGJhc2U2NEVuY29kZWREYXRhLkxlbmd0aCAtIDMpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBiYXNlNjRTdHIgPSBiYXNlNjRFbmNvZGVkRGF0YTtcclxuICAgICAgICAgICAgdmFyIGJhc2U2NEVuY29kZWRCeXRlcyA9IENvbnZlcnQuRnJvbUJhc2U2NFN0cmluZyhiYXNlNjRTdHIpO1xyXG4gICAgICAgICAgICByZXR1cm4gRW5jb2RpbmcuVVRGOC5HZXRTdHJpbmcoYmFzZTY0RW5jb2RlZEJ5dGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi51dGlsXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQnV0dG9uQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIF9ldmVudE5hbWU7XHJcbiAgICAgICAgaW50IF9mbGV4O1xyXG4gICAgICAgIElFdmVudEhhbmRsZXIgX2hhbmRsZXI7XHJcbiAgICAgICAgc3RyaW5nIF9sYWJlbDtcclxuICAgICAgICBpbnQgX3dpZHRoO1xyXG5cclxuICAgICAgICBwdWJsaWMgQnV0dG9uQ29uZmlnKGludCBmbGV4LCBpbnQgd2lkdGggPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2ZsZXggPSBmbGV4O1xyXG4gICAgICAgICAgICBfd2lkdGggPSB3aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCdXR0b25Db25maWcoc3RyaW5nIGxhYmVsLCBJRXZlbnRIYW5kbGVyIGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICBIYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgRXZlbnROYW1lID0gc3RyaW5nLkZvcm1hdChcIm9uX3swfVwiLCBMYWJlbC5Ub0xvd2VyKCkuUmVwbGFjZSgnICcsICdfJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJ1dHRvbkNvbmZpZyhzdHJpbmcgbGFiZWwsIElFdmVudEhhbmRsZXIgaGFuZGxlciwgc3RyaW5nIGV2ZW50TmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIEhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICBFdmVudE5hbWUgPSBldmVudE5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEV2ZW50TmFtZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZXZlbnROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZXZlbnROYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgRmxleFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZmxleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2ZsZXggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFdmVudEhhbmRsZXIgSGFuZGxlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfaGFuZGxlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbGFiZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9sYWJlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFdpZHRoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF93aWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3dpZHRoID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnV0aWxcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEh0bWxXcml0ZXJcclxuICAgIHtcclxuICAgICAgICBTdHJpbmdCdWlsZGVyIF9zYjtcclxuICAgICAgICBTdGFjazxzdHJpbmc+IF90YWdTdGFjaztcclxuXHJcbiAgICAgICAgcHVibGljIEh0bWxXcml0ZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcclxuICAgICAgICAgICAgX3RhZ1N0YWNrID0gbmV3IFN0YWNrPHN0cmluZz4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIdG1sV3JpdGVyIE5ld2xpbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NiLkFwcGVuZExpbmUoXCI8YnI+XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIdG1sV3JpdGVyIFByKHN0cmluZyBzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NiLkFwcGVuZChzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSHRtbFdyaXRlciBQcmludEJvbGQoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJpbnRTaW1wbGVUYWcoXCJiXCIsIHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEh0bWxXcml0ZXIgUHJpbnRJdGFsaWMoc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJpbnRTaW1wbGVUYWcoXCJpXCIsIHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEh0bWxXcml0ZXIgUHJpbnRMbihzdHJpbmcgcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByKHMpO1xyXG4gICAgICAgICAgICBOZXdsaW5lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEh0bWxXcml0ZXIgUHJpbnRQYXJhZ3JhcGgoc3RyaW5nIHApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJuU2ltcGxlVGFnKFwicFwiLCBwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIdG1sV3JpdGVyIFByaW50UGFyYWdyYXBocyhwYXJhbXMgc3RyaW5nW10gcGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgcCBpbiBwbGlzdClcclxuICAgICAgICAgICAgICAgIFByaW50UGFyYWdyYXBoKHApO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBIdG1sV3JpdGVyIFByaW50U2ltcGxlVGFnKHN0cmluZyB0YWcsIHN0cmluZyBjb250ZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJuU2ltcGxlVGFnKHRhZywgY29udGVudCk7XHJcbiAgICAgICAgICAgIE5ld2xpbmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSHRtbFdyaXRlciBQcm4oc3RyaW5nIHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfc2IuQXBwZW5kTGluZShzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSHRtbFdyaXRlciBQcm5TaW1wbGVUYWcoc3RyaW5nIHRhZywgc3RyaW5nIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgcyA9IHN0cmluZy5Gb3JtYXQoXCI8ezB9PnsxfTwvezB9PlwiLCB0YWcsIGNvbnRlbnQpO1xyXG4gICAgICAgICAgICBQcm4ocyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEh0bWxXcml0ZXIgU3BhY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3NiLkFwcGVuZCgnICcpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9zYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIudXRpbFxyXG57XHJcblxyXG4gICAgc3RhdGljIHB1YmxpYyBjbGFzcyBKc29uXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIGR5bmFtaWMgX25hdGl2ZUpzb24gPSBudWxsO1xyXG5cclxuICAgICAgICBzdGF0aWMgZHluYW1pYyBOYXRpdmVKc29uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9uYXRpdmVKc29uID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgX25hdGl2ZUpzb24gPSBTY3JpcHQuR2V0KFwid2luZG93LkpTT05cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX25hdGl2ZUpzb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgZHluYW1pYyBEZWNvZGUoc3RyaW5nIGpzb25TdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZUpzb24ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBDb25zb2xlLldyaXRlTGluZShcIkpzb24gZGVjb2RlIGVycm9yOiB7MH0gW3sxfV1cIiwgZS5NZXNzYWdlLCBqc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlLk1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgc3RyaW5nIEVuY29kZShkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlSnNvbi5zdHJpbmdpZnkob2JqKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoRXhjZXB0aW9uIGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiSnNvbiBlbmNvZGUgZXJyb3I6IHswfVwiLCBlLk1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUuTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIudXRpbFxyXG57XHJcbiAgIHB1YmxpYyBjbGFzcyBQYXJzZVV0aWxcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgcHVibGljIHN0cmluZ1tdIFBhcnNlQ2xhc3NEZWYoc3RyaW5nIGNsYXNzX2RlZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdGNoIG1hdGNoID0gUmVnZXguTWF0Y2goY2xhc3NfZGVmLCBAXCJjbGFzc1xccysoW0EtWl1bQS1aYS16MC05X10qKVxccypcXChcXHMqKFtBLVpdW0EtWmEtejAtOV9dKilcXHMqXFwpXFxzKlwiKTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoLlN1Y2Nlc3MpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZ1tdIHsgbWF0Y2guR3JvdXBzWzFdLlZhbHVlLCBtYXRjaC5Hcm91cHNbMl0uVmFsdWUgfTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBzdHJpbmdbXSB7IH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5UZXh0LlJlZ3VsYXJFeHByZXNzaW9ucztcclxuXHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnV0aWxcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0cmluZ1V0aWxcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgcHVibGljIHN0cmluZyBBc0FzY2lpKHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlZ2V4LlJlcGxhY2UodGV4dCwgQFwiW15cXHUwMDAwLVxcdTAwN0ZdK1wiLCBzdHJpbmcuRW1wdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi51dGlsXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTdHlsZVV0aWxcclxuICAgIHtcclxuXHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyB2b2lkIFNldENzcyhXaWRnZXQgd2lkZ2V0LCBzdHJpbmcgY3NzU3RyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ3aW5kb3cucXguYm9tLmVsZW1lbnQuU3R5bGUuc2V0Q3NzXCIsIHdpZGdldC5HZXRDb250ZW50RWxlbWVudCgpLk5hdGl2ZU9iamVjdCwgY3NzU3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnBFbGVtZW50IDogSVdpZGdldFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBpbnQgaWRDb3VudGVyID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIEJwRWxlbWVudChJV2lkZ2V0IHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpZGdldCA9IHdpZGdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJV2lkZ2V0IFdpZGdldCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSWQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhhbmRsZXIoc3RyaW5nIGV2ZW50TmFtZSwgRm5Wb2lkIGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFdmVudE1hcFtldmVudE5hbWVdID0gaGFuZGxlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFN0eWxlKHN0cmluZyBuYW1lLCBzdHJpbmcgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ3NzU3R5bGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIENzc1N0eWxlID0gXCJcIjtcclxuICAgICAgICAgICAgQ3NzU3R5bGUgKz0gc3RyaW5nLkZvcm1hdChcInswfTp7MX07XCIsIG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlRGl2KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlVGFnKFwiZGl2XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQ2xvc2VJZnJhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xvc2VUYWcoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgQnBFbGVtZW50IENsb3NlVGFnKHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm4oc3RyaW5nLkZvcm1hdChAXCI8L3swfT5cIiwgdGFnKSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBNYXBFdmVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBTY3JpcHQuQ2FsbDxkeW5hbWljPihcImRvY3VtZW50LmdldEVsZW1lbnRCeUlkXCIsIElkKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcga2V5IGluIEV2ZW50TWFwLktleXMpXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50W2tleV0gPSBFdmVudE1hcFtrZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3Blbkg1KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5UYWcoXCJoNVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlSDUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xvc2VUYWcoXCJoNVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5EaXYoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlblRhZyhcImRpdlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlUHJlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlVGFnKFwicHJlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5QcmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlblRhZyhcInByZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5Cb290c3RyYXBJZnJhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJuKFwiPGlmcmFtZT5cIik7XHJcbiAgICAgICAgICAgIFBybihcIjxodG1sPlwiKTtcclxuICAgICAgICAgICAgUHJuKFwiPGhlYWQ+XCIpO1xyXG4gICAgICAgICAgICBQcm4oQFwiPGxpbmsgaHJlZj1cIlwiaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjUvY3NzL2Jvb3RzdHJhcC5taW4uY3NzXCJcIiByZWw9XCJcInN0eWxlc2hlZXRcIlwiPlwiKTtcclxuICAgICAgICAgICAgUHJuKFwiPC9oZWFkPlwiKTtcclxuICAgICAgICAgICAgUHJuKFwiPGJvZHk+XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQ2xvc2VCb290c3RyYXBJZnJhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJuKFwiPC9ib2R5PlwiKTtcclxuICAgICAgICAgICAgUHJuKFwiPC9odG1sXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlblJlc3BvbnNpdmVJZnJhbWUoc3RyaW5nIHNyYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0cmluZyBodG1sID0gc3RyaW5nLkZvcm1hdChAXCI8aWZyYW1lIGNsYXNzPVwiXCJlbWJlZC1yZXNwb25zaXZlLWl0ZW1cIlwiIHNyYz1cIlwiezB9XCJcIj5cIiwgc3JjKTtcclxuICAgICAgICAgICAgUHIoaHRtbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnBFbGVtZW50IE9wZW5QKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPcGVuVGFnKFwicFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlSW1nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBybihcIj5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnBFbGVtZW50IENsb3NlUCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIHJldHVybiBDbG9zZVRhZyhcInBcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBDbG9zZVJvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVRhZyhcInRyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlblJvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuVGFnKFwidHJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuSW1nKHN0cmluZyBzcmMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgaHRtbCA9IHN0cmluZy5Gb3JtYXQoQFwiPGltZyBjbGFzcz1cIlwiaW1nLWZsdWlkXCJcIiBzcmM9XCJcInswfVwiXCIgXCIsIHNyYyk7XHJcbiAgICAgICAgICAgIFByKGh0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIEJwRWxlbWVudCBPcGVuVGFnKHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgaHRtbCA9IHN0cmluZy5Gb3JtYXQoQFwiPHswfVwiLCB0YWcpO1xyXG4gICAgICAgICAgICBodG1sICs9IHN0cmluZy5Gb3JtYXQoc3RyaW5nLkZvcm1hdChAXCIgaWQ9XCJcInswfVwiXCJcIiwgSWQpKTtcclxuICAgICAgICAgICAgaWYgKENzc0NsYXNzICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9IHN0cmluZy5Gb3JtYXQoQFwiIGNsYXNzPVwiXCJ7MH1cIlwiXCIsIENzc0NsYXNzKTtcclxuICAgICAgICAgICAgaWYgKENzc1N0eWxlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBodG1sICs9IHN0cmluZy5Gb3JtYXQoQFwiIHN0eWxlPVwiXCJ7MH1cIlwiXCIsIENzc1N0eWxlKTtcclxuICAgICAgICAgICAgaWYgKENzc1R5cGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gc3RyaW5nLkZvcm1hdChAXCIgdHlwZT1cIlwiezB9XCJcIlwiLCBDc3NUeXBlKTtcclxuICAgICAgICAgICAgaHRtbCArPSBAXCI+XCI7XHJcbiAgICAgICAgICAgIFBybihodG1sKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcm5Cb2xkKHN0cmluZyBzdHIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm4oc3RyaW5nLkZvcm1hdChcIjxiPnswfTwvYj5cIiwgc3RyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcm5QKHN0cmluZyBzdHIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm4oc3RyaW5nLkZvcm1hdChcIjxwPnswfTwvcD5cIiwgc3RyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcihzdHJpbmcgc3RyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2IuQXBwZW5kKHN0cik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcm4oc3RyaW5nIHN0cilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNiLkFwcGVuZExpbmUoc3RyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1aWxkKCk7XHJcbiAgICAgICAgICAgIEFmdGVyQnVpbGQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIEdldFdpZGdldCgpLlNiLlRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFmdGVyQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcFdpZGdldCBHZXRXaWRnZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFdpZGdldC5HZXRXaWRnZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBEaWN0aW9uYXJ5PHN0cmluZywgRm5Wb2lkPiBFdmVudE1hcCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDc3NDbGFzcyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ3NzU3R5bGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENzc1R5cGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RyaW5nQnVpbGRlciBTYlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBHZXRXaWRnZXQoKS5TYjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0lkPXN0cmluZy5Gb3JtYXQoXCJicC1pZC17MH1cIiwgaWRDb3VudGVyKyspO3ByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsIEZuVm9pZD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0V2ZW50TWFwPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgRm5Wb2lkPigpO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuY29yZVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIExheW91dEl0ZW0gOiBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgaW50IF9oZWlnaHQ7XHJcbiAgICAgICAgaW50IF9tYXJnaW5Cb3R0b207XHJcbiAgICAgICAgaW50IF9tYXJnaW5MZWZ0O1xyXG4gICAgICAgIGludCBfbWFyZ2luUmlnaHQ7XHJcbiAgICAgICAgaW50IF9tYXJnaW5Ub3A7XHJcbiAgICAgICAgTGF5b3V0SXRlbSBfcGFyZW50O1xyXG4gICAgICAgIGludCBfd2lkdGg7XHJcblxyXG4gICAgICAgIHB1YmxpYyBMYXlvdXRJdGVtKHN0cmluZyBxeENsYXNzID0gbnVsbCkgOiBiYXNlKHF4Q2xhc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIHZpcnR1YWwgaW50IERlZmF1bHRIZWlnaHQoKVxyXG57XHJcbiAgICByZXR1cm4gLTE7XHJcbn1wcm90ZWN0ZWQgdmlydHVhbCBpbnQgRGVmYXVsdE1hcmdpbkJvdHRvbSgpXHJcbntcclxuICAgIHJldHVybiAtMTtcclxufXByb3RlY3RlZCB2aXJ0dWFsIGludCBEZWZhdWx0TWFyZ2luTGVmdCgpXHJcbntcclxuICAgIHJldHVybiAtMTtcclxufXByb3RlY3RlZCB2aXJ0dWFsIGludCBEZWZhdWx0TWFyZ2luUmlnaHQoKVxyXG57XHJcbiAgICByZXR1cm4gLTE7XHJcbn1wcm90ZWN0ZWQgdmlydHVhbCBpbnQgRGVmYXVsdE1hcmdpblRvcCgpXHJcbntcclxuICAgIHJldHVybiAtMTtcclxufXByb3RlY3RlZCB2aXJ0dWFsIGludCBEZWZhdWx0V2lkdGgoKVxyXG57XHJcbiAgICByZXR1cm4gLTE7XHJcbn1cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaGVpZ2h0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2hlaWdodCA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRIZWlnaHQoX2hlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKSB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBIZWlnaHQgPSBEZWZhdWx0SGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIFdpZHRoID0gRGVmYXVsdFdpZHRoKCk7XHJcbiAgICAgICAgICAgIE1hcmdpbkJvdHRvbSA9IERlZmF1bHRNYXJnaW5Cb3R0b20oKTtcclxuICAgICAgICAgICAgTWFyZ2luTGVmdCA9IERlZmF1bHRNYXJnaW5MZWZ0KCk7XHJcbiAgICAgICAgICAgIE1hcmdpblJpZ2h0ID0gRGVmYXVsdE1hcmdpblJpZ2h0KCk7XHJcbiAgICAgICAgICAgIE1hcmdpblRvcCA9IERlZmF1bHRNYXJnaW5Ub3AoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgTWFyZ2luQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tYXJnaW5Cb3R0b207XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYXJnaW5Cb3R0b20gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfbWFyZ2luQm90dG9tID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldE1hcmdpbkJvdHRvbShfbWFyZ2luQm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBNYXJnaW5MZWZ0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tYXJnaW5MZWZ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWFyZ2luTGVmdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9tYXJnaW5MZWZ0ID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldE1hcmdpbkxlZnQoX21hcmdpbkxlZnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IE1hcmdpblJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tYXJnaW5SaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21hcmdpblJpZ2h0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX21hcmdpblJpZ2h0ID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldE1hcmdpblJpZ2h0KF9tYXJnaW5SaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgTWFyZ2luVG9wXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tYXJnaW5Ub3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9tYXJnaW5Ub3AgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfbWFyZ2luVG9wID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldE1hcmdpblRvcChfbWFyZ2luVG9wKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBPblBhcmVudFJlc2l6ZSgpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBMYXlvdXRJdGVtIFBhcmVudCB7XHJcbiAgICAgICAgICAgIGdldCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3BhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXQge1xyXG4gICAgICAgICAgICAgICAgX3BhcmVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5jb3JlLkxheW91dEl0ZW1cIjtcclxufVxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGhcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3dpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfd2lkdGggPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0V2lkdGgoX3dpZHRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpbmRvd3M7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5wcm94eVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJveHlNYW5hZ2VyIDogUW9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBQcm94eU1hbmFnZXIgX2luc3RhbmNlO1xyXG4gICAgICAgIERpY3Rpb25hcnk8aW50LCBkeW5hbWljPiBfcHJveHlUYWJsZTtcclxuICAgICAgICBJVm1BcGkgX3ZtQXBpO1xyXG5cclxuICAgICAgICBQcm94eU1hbmFnZXIoKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Byb3h5VGFibGUgPSBuZXcgRGljdGlvbmFyeTxpbnQsIGR5bmFtaWM+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIFByb3h5TWFuYWdlciBJbnN0YW5jZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaW5zdGFuY2UgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBfaW5zdGFuY2UgPSBuZXcgUHJveHlNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcm9jZXNzTWVzc2FnZXMoZHluYW1pYyBtZXNzYWdlcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKGR5bmFtaWMgbWVzc2FnZSBpbiBtZXNzYWdlcylcclxuICAgICAgICAgICAgICAgIFByb2Nlc3NNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQcm9jZXNzTWVzc2FnZShkeW5hbWljIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgYWN0aW9uID0gbWVzc2FnZS5hY3Rpb247XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYnVpbHRpblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIEFjdGlvbkJ1aWx0aW4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3JlYXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQWN0aW9uQ3JlYXRlKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9uX2V2ZW50XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQWN0aW9uT25FdmVudChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZW5kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQWN0aW9uU2VuZChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgUHJpbnRMb2coc3RyaW5nLkZvcm1hdChcImFjdGlvbiBbezB9XSBub3QgZm91bmRcIiwgYWN0aW9uKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQWN0aW9uQnVpbHRpbihkeW5hbWljIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgbWV0aG9kID0gbWVzc2FnZS5tZXRob2Q7XHJcbiAgICAgICAgICAgIGR5bmFtaWNbXSBhcmdzID0gTm9ybWFsaXplQXJncyhtZXNzYWdlLmFyZ3MpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInByaW50XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQnVpbHRpblByaW50KGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBQcmludExvZyhzdHJpbmcuRm9ybWF0KFwiYnVpbHRpbiBtZXRob2QgW3swfV0gbm90IGZvdW5kXCIsIG1ldGhvZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFjdGlvbkNyZWF0ZShkeW5hbWljIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgcHJveHlJZCA9IG1lc3NhZ2UucHJveHlfaWQ7XHJcbiAgICAgICAgICAgIGR5bmFtaWNbXSBhcmdzID0gbWVzc2FnZS5hcmdzO1xyXG4gICAgICAgICAgICBpZiAoYXJncy5MZW5ndGggPCAxKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmcgY3JlYXRlQ2xhc3MgPSBhcmdzWzBdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNyZWF0ZUNsYXNzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwid2luZG93XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgX3Byb3h5VGFibGVbcHJveHlJZF0gPSBuZXcgV2luZG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGR5bmFtaWMgb2JqID0gQ3JlYXRlKGNyZWF0ZUNsYXNzKTtcclxuICAgICAgICAgICAgICAgICAgICBfcHJveHlUYWJsZVtwcm94eUlkXSA9IG9iajtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBY3Rpb25PbkV2ZW50KGR5bmFtaWMgbWVzc2FnZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBwcm94eUlkID0gbWVzc2FnZS5wcm94eV9pZDtcclxuICAgICAgICAgICAgZHluYW1pYyByZWNlaXZlciA9IExvb2t1cEluVGFibGUocHJveHlJZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmcgZXZlbnRfbmFtZSA9IG1lc3NhZ2UuZXZlbnRfbmFtZTtcclxuICAgICAgICAgICAgaW50IGhhbmRsZXJfaWQgPSBtZXNzYWdlLmhhbmRsZXJfaWQ7XHJcbiAgICAgICAgICAgIHN0cmluZyBoYW5kbGVyX2ZuX25hbWUgPSBtZXNzYWdlLmhhbmRsZXJfZm5fbmFtZTtcclxuICAgICAgICAgICAgRm5Wb2lkIGZuID0gKCkgPT5cclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgIE9uRXZlbnQoaGFuZGxlcl9pZCwgaGFuZGxlcl9mbl9uYW1lKTtcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZWNlaXZlci5hZGRMaXN0ZW5lcihldmVudF9uYW1lLCBmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFjdGlvblNlbmQoZHluYW1pYyBtZXNzYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IHByb3h5SWQgPSBtZXNzYWdlLnByb3h5X2lkO1xyXG4gICAgICAgICAgICBkeW5hbWljW10gYXJncyA9IG1lc3NhZ2UuYXJncztcclxuICAgICAgICAgICAgaWYgKGFyZ3MuTGVuZ3RoIDwgMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgYXJncyA9IGFyZ3NbMF07XHJcbiAgICAgICAgICAgIGlmIChhcmdzLkxlbmd0aCA8IDEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHN0cmluZyBtZXRob2QgPSBhcmdzLlNoaWZ0KCkuVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgZHluYW1pYyByZWNlaXZlciA9IExvb2t1cEluVGFibGUocHJveHlJZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWNlaXZlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBkeW5hbWljIGZuID0gcmVjZWl2ZXJbbWV0aG9kXTtcclxuICAgICAgICAgICAgaWYgKGZuID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZuLmFwcGx5KHJlY2VpdmVyLCBOb3JtYWxpemVBcmdzKGFyZ3MpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQnVpbHRpblByaW50KGR5bmFtaWNbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9UcmFuc2NyaXB0V2luZG93IHRyYW5zY3JpcHQgPSBUcmFuc2NyaXB0V2luZG93Lkluc3RhbmNlO1xyXG4gICAgICAgICAgICAvL3RyYW5zY3JpcHQuU2hvdygpO1xyXG4gICAgICAgICAgICAvL2ZvciAoaW50IGkgPSAwOyBpIDwgYXJncy5MZW5ndGggLSAxOyBpKyspXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICB0cmFuc2NyaXB0LlByKGFyZ3NbaV0pO1xyXG4gICAgICAgICAgICAvLyAgICB0cmFuc2NyaXB0LlNwYWNlKCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2lmIChhcmdzLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgIC8vICAgIHRyYW5zY3JpcHQuUHJuKGFyZ3NbYXJncy5MZW5ndGggLSAxXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkeW5hbWljIExvb2t1cEluVGFibGUoaW50IHByb3h5SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkeW5hbWljIHZhbHVlO1xyXG4gICAgICAgICAgICBfcHJveHlUYWJsZS5UcnlHZXRWYWx1ZShwcm94eUlkLCBvdXQgdmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZS5OYXRpdmVPYmplY3QgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5OYXRpdmVPYmplY3Q7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGR5bmFtaWNbXSBOb3JtYWxpemVBcmdzKGR5bmFtaWNbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljPiBhcmdzMiA9IG5ldyBMaXN0PGR5bmFtaWM+KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKGR5bmFtaWMgYXJnIGluIGFyZ3MpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmcucHJveHlfaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBhcmdzMi5BZGQoTG9va3VwSW5UYWJsZShhcmcucHJveHlfaWQpKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBhcmdzMi5BZGQoYXJnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJnczIuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbkV2ZW50KGludCBwcm94eUlkLCBzdHJpbmcgbWV0aG9kTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF92bUFwaS5IYW5kbGVFdmVudChwcm94eUlkLCBtZXRob2ROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFZtQXBpKElWbUFwaSB2bUFwaSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF92bUFwaSA9IHZtQXBpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4Lmh0bWxcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBFbGVtZW50IDogUW9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIGR5bmFtaWMgX2RvbUVsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbGVtZW50KGR5bmFtaWMgZWxlbWVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDbGFzcyhzdHJpbmcgY2xhc3NOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbnN1cmVEb21FbGVtZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfZG9tRWxlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX2RvbUVsZW1lbnQgPSBOYXRpdmVPYmplY3QuZ2V0RG9tRWxlbWVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGR5bmFtaWMgR2V0RG9tRWxlbWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnN1cmVEb21FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBfZG9tRWxlbWVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgR2V0U2Nyb2xsSGVpZ2h0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEVuc3VyZURvbUVsZW1lbnQoKTtcclxuICAgICAgICAgICAgaWYgKF9kb21FbGVtZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9kb21FbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNjcm9sbFRvKGludCBzY3JvbGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBFbnN1cmVEb21FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGlmIChfZG9tRWxlbWVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2RvbUVsZW1lbnQuc2Nyb2xsVG8gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBfZG9tRWxlbWVudC5zY3JvbGxUbygwLCBzY3JvbGwpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIF9kb21FbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2Nyb2xsVG9Cb3R0b20oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2Nyb2xsVG8oR2V0U2Nyb2xsSGVpZ2h0KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0U3R5bGUoc3RyaW5nIGtleSwgZHluYW1pYyB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTdHlsZShrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29yZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LmlvLnJlcXVlc3Rcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBYnN0cmFjdFJlcXVlc3QgOiBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIF9jb250ZW50VHlwZTtcclxuICAgICAgICBkeW5hbWljIF9yZXF1ZXN0RGF0YTtcclxuICAgICAgICBzdHJpbmcgX3VybDtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDb250ZW50VHlwZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY29udGVudFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZW50VHlwZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgX2NvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGR5bmFtaWMgUmVzcG9uc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFJlc3BvbnNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkeW5hbWljIFJlc3BvbnNlSnNvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKc29uLkRlY29kZShSZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFJlc3BvbnNlVGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0UmVzcG9uc2VUZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkeW5hbWljIFJlcXVlc3REYXRhXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZXF1ZXN0RGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3JlcXVlc3REYXRhID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UmVxdWVzdERhdGEoX3JlcXVlc3REYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2VuZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3Quc2VuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBVcmxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3VybDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3VybCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFVybChfdXJsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5mb3JtXHJcbntcclxuXHJcbiAgICBwdWJsaWMgIGNsYXNzIEZvcm0gOiBRb2JqZWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmZvcm0uRm9ybVwiO1xyXG59XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubWVudVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1hbmFnZXIgOiBRb2JqZWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLm1lbnUuTWFuYWdlclwiO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLnRhYmxlXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQWJzdHJhY3RUYWJsZU1vZGVsIDogUW9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgU2V0RGF0YShkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkudGFibGUubW9kZWwuQWJzdHJhY3RcIjtcclxufSAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50YWJsZVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhc2ljQ29sdW1uTW9kZWwgOiBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sdW1uVmlzaWJsZShpbnQgY29sLCBib29sIHZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Q29sdW1uVmlzaWJsZShjb2wsIHZpc2libGUpO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkudGFibGUuY29sdW1ubW9kZWwuQmFzaWNcIjtcclxufSAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50YWJsZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2VsZWN0aW9uTW9kZWwgOiBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgVGFibGUgVGFibGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2VsZWN0aW9uTW9kZWwoVGFibGUgdGFibGUpOmJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFibGUgPSB0YWJsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFmdGVySW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRMaXN0ZW5lcihcImNoYW5nZVNlbGVjdGlvblwiLCAoZ2xvYmFsOjpDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZClPbkNoYW5nZVNlbGVjdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEdldEFuY2hvclNlbGVjdGlvbkluZGV4KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0QW5jaG9yU2VsZWN0aW9uSW5kZXgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25DaGFuZ2VTZWxlY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGFibGUuT25DaGFuZ2VTZWxlY3Rpb24oKTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLnRhYmxlLnNlbGVjdGlvbi5Nb2RlbFwiO1xyXG59ICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS51dGlsXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGV4dE1lYXN1cmUgOiBRb2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIFRleHRNZWFzdXJlIF9pbnN0YW5jZTtcclxuICAgICAgICBkeW5hbWljIF9jYW52YXM7XHJcbiAgICAgICAgZHluYW1pYyBfY3R4O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGludCBHZXRXaWR0aChzdHJpbmcgdGV4dCwgc3RyaW5nIGZvbnRGYW1pbHksIHN0cmluZyBmb250U2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnN0YW5jZS5NZWFzdXJlVGV4dCh0ZXh0LCBmb250RmFtaWx5LCBmb250U2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFRleHRNZWFzdXJlIEluc3RhbmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBUZXh0TWVhc3VyZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRleHRNZWFzdXJlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBTY3JpcHQuQ2FsbDxkeW5hbWljPihcImRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcIiwgXCJjYW52YXNcIik7XHJcbiAgICAgICAgICAgIF9jdHggPSBfY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludCBNZWFzdXJlVGV4dChzdHJpbmcgdGV4dCwgc3RyaW5nIGZvbnRGYW1pbHksIHN0cmluZyBmb250U2l6ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jdHguZm9udCA9IHN0cmluZy5Gb3JtYXQoXCJ7MH0gJ3sxfSdcIiwgZm9udFNpemUsIGZvbnRGYW1pbHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gX2N0eC5tZWFzdXJlVGV4dCh0ZXh0KS53aWR0aDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnV0aWxcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE5ld3NXcml0ZXIgOiBIdG1sV3JpdGVyXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgR2VuZXJhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlTmV3c0l0ZW0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmV3bGluZSgpO1xyXG4gICAgICAgICAgICBOZXdsaW5lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBHZW5lcmF0ZU5ld3NJdGVtKHN0cmluZyBzdWJqZWN0LCBwYXJhbXMgc3RyaW5nW10gcGxpc3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuTmV3c0l0ZW0oc3ViamVjdCwgRGF0ZVRpbWUuTm93KTtcclxuICAgICAgICAgICAgUHJpbnRQYXJhZ3JhcGhzKHBsaXN0KTtcclxuICAgICAgICAgICAgQ2xvc2VOZXdzSXRlbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3Blbk5ld3NJdGVtKHN0cmluZyBzdWJqZWN0LCBEYXRlVGltZSBkYXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJpbnRCb2xkKHN1YmplY3QpO1xyXG4gICAgICAgICAgICBQcmludEl0YWxpYyhkYXRlLlRvU3RyaW5nKFwiZGRkLCBkZCBNTU0geXl5eSBISDptbTpzcyBVVENcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcENvbnRhaW5lciA6IEJwRWxlbWVudFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgQnBDb250YWluZXIoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ2hpbGQoQnBFbGVtZW50IGNoaWxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2hpbGRyZW4uQWRkKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEJ1aWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNoaWxkIGluIENoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuQnVpbGQoKTtcclxuICAgICAgICAgICAgQ2xvc2VDb250YWluZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5Db250YWluZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3NzQ2xhc3MgPSBAXCJjb250YWluZXItZmx1aWRcIjtcclxuICAgICAgICAgICAgQ3NzU3R5bGUgPSBAXCJwYWRkaW5nOiAyNXB4IDEwcHg7XCI7XHJcbiAgICAgICAgICAgIE9wZW5EaXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlQ29udGFpbmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlRGl2KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBNYXBFdmVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNoaWxkIGluIENoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuTWFwRXZlbnRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGlzdDxCcEVsZW1lbnQ+IENoaWxkcmVuIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cbiAgICBcbnByaXZhdGUgTGlzdDxCcEVsZW1lbnQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19DaGlsZHJlbj1uZXcgTGlzdDxCcEVsZW1lbnQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcEJyIDogQnBFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgaW50IF9uO1xyXG5cclxuICAgICAgICBwdWJsaWMgQnBCcihJV2lkZ2V0IHdpZGdldCwgaW50IG4gPSAxKSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX24gPSBuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfbjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgUHJuKFwiPGJyPlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnBCdXR0b24gOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBCdXR0b24oc3RyaW5nIHRleHQsIElXaWRnZXQgd2lkZ2V0LCAgRm5Wb2lkIG9uQ2xpY2sgPSBudWxsKSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgICAgIGlmIChvbkNsaWNrICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBBZGRIYW5kbGVyKFwib25jbGlja1wiLCAoZ2xvYmFsOjpDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZClvbkNsaWNrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGV4dCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEJ1aWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5CdXR0b24oKTtcclxuICAgICAgICAgICAgUHIoVGV4dCk7XHJcbiAgICAgICAgICAgIENsb3NlQnV0dG9uKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuQnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENzc0NsYXNzID0gQFwiYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20gYnRuLWJsb2NrXCI7XHJcbiAgICAgICAgICAgIENzc1R5cGUgPSBAXCJidXR0b25cIjtcclxuICAgICAgICAgICAgT3BlblRhZyhcImJ1dHRvblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlQnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlVGFnKFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJwQ2FyZCA6IEJwRWxlbWVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBCcENhcmQoc3RyaW5nIHRleHQsIElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGl0bGUgPSB0ZXh0O1xyXG4gICAgICAgICAgICBDb250YWluZXIgPSBuZXcgQnBDb250YWluZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEhlYWRlclN0eWxlIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUaXRsZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcENvbnRhaW5lciBDb250YWluZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuQ2FyZCgpO1xyXG4gICAgICAgICAgICBPcGVuQ2FyZEJvZHkoKTtcclxuICAgICAgICAgICAgQnVpbGRUaXRsZSgpO1xyXG4gICAgICAgICAgICBCdWlsZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgQ2xvc2VDYXJkQm9keSgpO1xyXG4gICAgICAgICAgICBDbG9zZUNhcmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWRkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29udGVudEl0ZW0oQnBFbGVtZW50IGl0ZW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250YWluZXIuQWRkQ2hpbGQoaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBCdWlsZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQ29udGVudCgpO1xyXG4gICAgICAgICAgICBDb250YWluZXIuQnVpbGQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIEJ1aWxkVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlblRpdGxlKCk7XHJcbiAgICAgICAgICAgIFByKFRpdGxlKTtcclxuICAgICAgICAgICAgQ2xvc2VUaXRsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlblRpdGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENzc0NsYXNzID0gXCJjYXJkLXRpdGxlXCI7XHJcbiAgICAgICAgICAgIENzc1N0eWxlID0gSGVhZGVyU3R5bGU7XHJcbiAgICAgICAgICAgIE9wZW5INSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQ2xvc2VUaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZUg1KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuQ2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDc3NDbGFzcyA9IEBcImNhcmRcIjtcclxuICAgICAgICAgICAgT3BlbkRpdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlbkNhcmRCb2R5KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENzc0NsYXNzID0gQFwiY2FyZC1ib2R5XCI7XHJcbiAgICAgICAgICAgIE9wZW5EaXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlQ2FyZEJvZHkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xvc2VEaXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlQ2FyZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZURpdigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJwQ29kZSA6IEJwRWxlbWVudFxyXG4gICAge1xyXG4gXHJcbiAgICAgICAgcHVibGljIEJwQ29kZShJV2lkZ2V0IHdpZGdldCwgc3RyaW5nIGNvZGUpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb2RlID0gY29kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ29kZSB7IGdldDsgc2V0OyB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuQ29kZSgpO1xyXG4gICAgICAgICAgICBQcihDb2RlKTtcclxuICAgICAgICAgICAgQ2xvc2VDb2RlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDc3NDbGFzcyA9IFwicHJldHR5cHJpbnRcIjtcclxuICAgICAgICAgICAgT3BlblByZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQ2xvc2VDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlUHJlKCk7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ29kZT1cIlwiO31cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcENvbHVtbiA6IEJwRWxlbWVudFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgQnBDb2x1bW4oSVdpZGdldCB3aWRnZXQsIGludCB3aWR0aCA9IDYpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJwQ29sdW1uIEFkZENoaWxkKEJwRWxlbWVudCBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENoaWxkcmVuLkFkZChjaGlsZCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEJ1aWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5Db2x1bW4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNoaWxkIGluIENoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQuQnVpbGQoKTtcclxuICAgICAgICAgICAgQ2xvc2VDb2x1bW4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5Db2x1bW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3NzQ2xhc3MgPSBzdHJpbmcuRm9ybWF0KEBcImNvbC1tZC17MH1cIiwgV2lkdGgpO1xyXG4gICAgICAgICAgICBPcGVuRGl2KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBDbG9zZUNvbHVtbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZURpdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgTWFwRXZlbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjaGlsZCBpbiBDaGlsZHJlbilcclxuICAgICAgICAgICAgICAgIGNoaWxkLk1hcEV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8QnBFbGVtZW50PiBDaGlsZHJlbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8QnBFbGVtZW50PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ2hpbGRyZW49bmV3IExpc3Q8QnBFbGVtZW50PigpO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnBJbWcgOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBJbWcoSVdpZGdldCB3aWRnZXQsIHN0cmluZyBzcmMgPSBcIlwiKSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3JjID0gc3JjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuSW1nKFNyYyk7XHJcbiAgICAgICAgICAgIENsb3NlSW1nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFNyYyB7IGdldDsgc2V0OyB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJwVGFibGUgOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBUYWJsZShJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZEhlYWRlcnMoKTtcclxuICAgICAgICAgICAgQWRkUm93cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBBZGRIZWFkZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZFJvd3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEhlYWRlclJvdyhzdHJpbmdbXSBjb2x1bW5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUm93cy5BZGQobmV3IEJwVGFibGVIZWFkZXJSb3coV2lkZ2V0LCBjb2x1bW5zKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRSb3coc3RyaW5nW10gY29sdW1ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJvd3MuQWRkKG5ldyBCcFRhYmxlUm93KFdpZGdldCwgY29sdW1ucykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlblRhYmxlKCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciByb3cgaW4gUm93cylcclxuICAgICAgICAgICAgICAgIHJvdy5CdWlsZCgpO1xyXG4gICAgICAgICAgICBDbG9zZVRhYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuVGFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ3NzQ2xhc3MgPSBcInRhYmxlIHRhYmxlLWJvcmRlcmVkIHRhYmxlLXN0cmlwZWRcIjtcclxuICAgICAgICAgICAgT3BlblRhZyhcInRhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQ2xvc2VUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVRhZyhcInRhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8QnBFbGVtZW50PiBSb3dzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIExpc3Q8QnBFbGVtZW50PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUm93cz1uZXcgTGlzdDxCcEVsZW1lbnQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcFRhYmxlQ29sIDogQnBFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEJwVGFibGVDb2woSVdpZGdldCB3aWRnZXQsIHN0cmluZyB0ZXh0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuQ29sKCk7XHJcbiAgICAgICAgICAgIFByKFRleHQpO1xyXG4gICAgICAgICAgICBDbG9zZUNvbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlbkNvbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuVGFnKFwidGRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBDbG9zZUNvbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVRhZyhcInRkXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUZXh0IHsgZ2V0OyBzZXQ7IH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1RleHQ9XCJcIjt9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJwVGFibGVIZWFkZXJDb2wgOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBUYWJsZUhlYWRlckNvbChJV2lkZ2V0IHdpZGdldCwgc3RyaW5nIHRleHQpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0ID0gdGV4dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEJ1aWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5Db2woKTtcclxuICAgICAgICAgICAgUHIoVGV4dCk7XHJcbiAgICAgICAgICAgIENsb3NlQ29sKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBPcGVuQ29sKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5UYWcoXCJ0aFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlQ29sKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENsb3NlVGFnKFwidGhcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRleHQgeyBnZXQ7IHNldDsgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVGV4dD1cIlwiO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEJwVGFibGVIZWFkZXJSb3cgOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBUYWJsZUhlYWRlclJvdyhJV2lkZ2V0IHdpZGdldCwgc3RyaW5nW10gY29sdW1ucykgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjb2x1bW4gaW4gY29sdW1ucylcclxuICAgICAgICAgICAgICAgIEFkZENvbChuZXcgQnBUYWJsZUhlYWRlckNvbCh3aWRnZXQsIGNvbHVtbikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29sKEJwVGFibGVIZWFkZXJDb2wgY29sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29scy5BZGQoY29sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEJ1aWxkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9wZW5Sb3coKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGNvbCBpbiBDb2xzKVxyXG4gICAgICAgICAgICAgICAgY29sLkJ1aWxkKCk7XHJcbiAgICAgICAgICAgIENsb3NlUm93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTGlzdDxCcFRhYmxlSGVhZGVyQ29sPiBDb2xzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIExpc3Q8QnBUYWJsZUhlYWRlckNvbD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NvbHM9bmV3IExpc3Q8QnBUYWJsZUhlYWRlckNvbD4oKTt9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcFRhYmxlUm93IDogQnBFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEJwVGFibGVSb3coSVdpZGdldCB3aWRnZXQsIHN0cmluZ1tdIGNvbHVtbnMpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY29sdW1uIGluIGNvbHVtbnMpXHJcbiAgICAgICAgICAgICAgICBBZGRDb2wobmV3IEJwVGFibGVDb2wod2lkZ2V0LCBjb2x1bW4pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvbChCcFRhYmxlQ29sIGNvbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbHMuQWRkKGNvbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcGVuUm93KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBjb2wgaW4gQ29scylcclxuICAgICAgICAgICAgICAgIGNvbC5CdWlsZCgpO1xyXG4gICAgICAgICAgICBDbG9zZVJvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8QnBUYWJsZUNvbD4gQ29scyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBMaXN0PEJwVGFibGVDb2w+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Db2xzPW5ldyBMaXN0PEJwVGFibGVDb2w+KCk7fVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBCcFRleHQgOiBCcEVsZW1lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQnBUZXh0KElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcFRleHQoSVdpZGdldCB3aWRnZXQsIHN0cmluZyB0ZXh0KSA6IHRoaXMod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFRleHQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnBUZXh0IEFkZFRleHQoc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0ICs9IHRleHQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJwVGV4dCBBZGRCb2xkKHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEFkZFRleHQoc3RyaW5nLkZvcm1hdChcIjxiPnswfTwvYj5cIiwgdGV4dCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJwVGV4dCBBZGRMaW5rKHN0cmluZyB1cmwsIHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvZGUgPSBzdHJpbmcuRm9ybWF0KEBcIjxhIGhyZWY9XCJcInswfVwiXCIgdGFyZ2V0PVwiXCJfYmxhbmtcIlwiPnsxfTwvYT5cIiwgdXJsLCB0ZXh0KTtcclxuICAgICAgICAgICAgcmV0dXJuIEFkZFRleHQoY29kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnBUZXh0IEFkZFAoc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQWRkVGV4dChzdHJpbmcuRm9ybWF0KFwiPHA+ezB9PC9wPlwiLCB0ZXh0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBCdWlsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCdWlsZFRleHQoKTtcclxuICAgICAgICAgICAgT3BlblRleHQoKTtcclxuICAgICAgICAgICAgUHIoVGV4dCk7XHJcbiAgICAgICAgICAgIENsb3NlVGV4dCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBCdWlsZFRleHQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5UZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENzc0NsYXNzID0gXCJjYXJkLXRleHRcIjtcclxuICAgICAgICAgICAgT3BlblAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlVGV4dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZVAoKTtcclxuICAgICAgICB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19UZXh0PVwiXCI7fVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnBWaWRlbyA6IEJwRWxlbWVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBCcFZpZGVvKElXaWRnZXQgd2lkZ2V0LCBzdHJpbmcgc3JjID0gXCJcIikgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNyYyA9IHNyYztcclxuICAgICAgICAgICAgUmF0aW8gPSBcIjRieTNcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlbkVtYmVkKCk7XHJcbiAgICAgICAgICAgIE9wZW5SZXNwb25zaXZlSWZyYW1lKFNyYyk7XHJcbiAgICAgICAgICAgIENsb3NlSWZyYW1lKCk7XHJcbiAgICAgICAgICAgIENsb3NlRW1iZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9wZW5FbWJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDc3NDbGFzcyA9IHN0cmluZy5Gb3JtYXQoQFwiZW1iZWQtcmVzcG9uc2l2ZSBlbWJlZC1yZXNwb25zaXZlLXswfVwiLCBSYXRpbyk7XHJcbiAgICAgICAgICAgIE9wZW5EaXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIENsb3NlRW1iZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xvc2VEaXYoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3JjIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBSYXRpbyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5odG1sO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmRlY29yYXRpb247XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmVcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBXaWRnZXQgOiBMYXlvdXRJdGVtLCBJRXZlbnRIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIHN0cmluZyBfYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIEVsZW1lbnQgX2NvbnRlbnRFbGVtZW50O1xyXG4gICAgICAgIERlY29yYXRvciBfZGVjb3JhdG9yO1xyXG4gICAgICAgIHByb3RlY3RlZCBib29sIF9maXJzdEFwcGVhcmFuY2U7XHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgX2hhc1Jlc2l6ZWQ7XHJcbiAgICAgICAgcHJvdGVjdGVkIGludFtdIF9wYWRkaW5nO1xyXG4gICAgICAgIHN0cmluZyBfdGV4dENvbG9yO1xyXG5cclxuICAgICAgICBwdWJsaWMgV2lkZ2V0KHN0cmluZyBxeENsYXNzID0gbnVsbCkgOiBiYXNlKHF4Q2xhc3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZmlyc3RBcHBlYXJhbmNlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWRkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZnRlckZpcnN0UmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9oYXNSZXNpemVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgU2V0U3R5bGVzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZnRlckluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBCYWNrZ3JvdW5kQ29sb3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2JhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2JhY2tncm91bmRDb2xvciA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKF9iYWNrZ3JvdW5kQ29sb3IuTGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0QmFja2dyb3VuZENvbG9yKF9iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgV2lkZ2V0IERlY29yYXRlKElEZWNvcmF0ZSBkZWNvcmF0ZUltcGxlbWVudG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZGVjb3JhdGVJbXBsZW1lbnRvci5EZWNvcmF0ZSh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRGVjb3JhdG9yIERlY29yYXRvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZGVjb3JhdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZGVjb3JhdG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2RlY29yYXRvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXREZWNvcmF0b3IoX2RlY29yYXRvci5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBzdHJpbmcgRGVmYXVsdEJhY2tncm91bmRDb2xvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIERlY29yYXRvciBEZWZhdWx0RGVjb3JhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgaW50W10gRGVmYXVsdFBhZGRpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbnRbXSB7IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBib29sIERlZmF1bHRTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHN0cmluZyBEZWZhdWx0VGV4dENvbG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgRW5hYmxlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0RW5hYmxlZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0RW5hYmxlZCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEZvY3VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVsZW1lbnQgR2V0Q29udGVudEVsZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9jb250ZW50RWxlbWVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX2NvbnRlbnRFbGVtZW50ID0gbmV3IEVsZW1lbnQoTmF0aXZlT2JqZWN0LmdldENvbnRlbnRFbGVtZW50KCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbnRlbnRFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIGJvb2wgSGFuZGxlc0FwcGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBib29sIEhhbmRsZXNDdXN0b21FdmVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgSGFzUmVzaXplZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfaGFzUmVzaXplZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxucHVibGljIHZvaWQgSGlkZSgpXHJcbntcclxuICAgIE5hdGl2ZU9iamVjdC5oaWRlKCk7XHJcbn1cclxuICAgICAgICBwdWJsaWMgaW50IElubmVySGVpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRJbm5lclNpemUoKS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgSW5uZXJXaWR0aFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0SW5uZXJTaXplKCkud2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIF9oYXNSZXNpemVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIEJhY2tncm91bmRDb2xvciA9IERlZmF1bHRCYWNrZ3JvdW5kQ29sb3IoKTtcclxuICAgICAgICAgICAgRGVjb3JhdG9yID0gRGVmYXVsdERlY29yYXRvcigpO1xyXG4gICAgICAgICAgICBQYWRkaW5nID0gRGVmYXVsdFBhZGRpbmcoKTtcclxuICAgICAgICAgICAgaWYgKEhhbmRsZXNBcHBlYXIoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgRm5Wb2lkIGFwcGVhckhhbmRsZXIgPSBPbkFwcGVhcjtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGRMaXN0ZW5lcihcImFwcGVhclwiLCBhcHBlYXJIYW5kbGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBGblZvaWQgcmVzaXplSGFuZGxlciA9IE9uUmVzaXplO1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkTGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgICAgIGlmIChEZWZhdWx0U2hvdygpKVxyXG4gICAgICAgICAgICAgICAgU2hvdygpO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuY29yZS5XaWRnZXRcIjtcclxufVxyXG4gICAgICAgIHByb3RlY3RlZCBpbnRbXSBQYWRkaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wYWRkaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfcGFkZGluZyA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChfcGFkZGluZy5MZW5ndGgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UGFkZGluZyhfcGFkZGluZ1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFBhZGRpbmcoX3BhZGRpbmdbMF0sIF9wYWRkaW5nWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UGFkZGluZyhfcGFkZGluZ1swXSwgX3BhZGRpbmdbMV0sIF9wYWRkaW5nWzJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UGFkZGluZyhfcGFkZGluZ1swXSwgX3BhZGRpbmdbMV0sIF9wYWRkaW5nWzJdLCBfcGFkZGluZ1szXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9maXJzdEFwcGVhcmFuY2UgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgT25SZXNpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfaGFzUmVzaXplZClcclxuICAgICAgICAgICAgICAgIEFmdGVyRmlyc3RSZXNpemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNjcm9sbFRvQm90dG9tKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdldENvbnRlbnRFbGVtZW50KCkuU2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFN0eWxlKHN0cmluZyBrZXksIGR5bmFtaWMgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHZXRDb250ZW50RWxlbWVudCgpLlNldFN0eWxlKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBTZXRTdHlsZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbnB1YmxpYyB2b2lkIFNob3coKVxyXG57XHJcbiAgICBOYXRpdmVPYmplY3Quc2hvdygpO1xyXG59XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3R5bGVGb250RmFtaWx5XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0U3R5bGUoXCJmb250RmFtaWx5XCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTdHlsZUZvbnRTaXplXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0U3R5bGUoXCJmb250U2l6ZVwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU3R5bGVUZXh0QWxpZ25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXRTdHlsZShcInRleHRBbGlnblwiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGV4dENvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0Q29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF90ZXh0Q29sb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfdGV4dENvbG9yLkxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFRleHRDb2xvcihfdGV4dENvbG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXguaW8ucmVxdWVzdFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFhociA6IEFic3RyYWN0UmVxdWVzdFxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBfbWV0aG9kO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE1ldGhvZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbWV0aG9kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWV0aG9kID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0TWV0aG9kKF9tZXRob2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC5pby5yZXF1ZXN0LlhoclwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZGVjb3JhdGlvblxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIERlY29yYXRvciA6IEFic3RyYWN0RGVjb3JhdGlvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJhY2tncm91bmRDb2xvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0QmFja2dyb3VuZENvbG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRCYWNrZ3JvdW5kQ29sb3IodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJhY2tncm91bmRJbWFnZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0QmFja2dyb3VuZEltYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRCYWNrZ3JvdW5kSW1hZ2UodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRDb2xvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Q29sb3IodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yQm90dG9tXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRDb2xvckJvdHRvbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Q29sb3JCb3R0b20odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yTGVmdFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0Q29sb3JMZWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRDb2xvckxlZnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yUmlnaHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldENvbG9yUmlnaHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldENvbG9yUmlnaHQodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yVG9wXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRDb2xvclRvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Q29sb3JUb3AodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEVuZENvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRFbmRDb2xvcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0RW5kQ29sb3IodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEVuZENvbG9yUG9zaXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldEVuZENvbG9yUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldEVuZENvbG9yUG9zaXRpb24odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE9yaWVudGF0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRPcmllbnRhdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0T3JpZW50YXRpb24odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5kZWNvcmF0aW9uLkRlY29yYXRvclwiO1xyXG59XHJcbiAgICAgICAgcHVibGljIGludCBSYWRpdXNcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFJhZGl1cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UmFkaXVzKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTdGFydENvbG9yXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRTdGFydENvbG9yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTdGFydENvbG9yKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBTdGFydENvbG9yUG9zaXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFN0YXJ0Q29sb3JQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U3RhcnRDb2xvclBvc2l0aW9uKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0V2lkdGgoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFdpZHRoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aEJvdHRvbVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0V2lkdGhCb3R0b20oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFdpZHRoQm90dG9tKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aExlZnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFdpZHRoTGVmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0V2lkdGhMZWZ0KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aFJpZ2h0XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRXaWR0aFJpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRXaWR0aFJpZ2h0KHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aFRvcFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0V2lkdGhUb3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFdpZHRoVG9wKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0XHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQXRvbSA6IEFic3RyYWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmxheW91dC5BdG9tXCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJhc2ljIDogQWJzdHJhY3RcclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubGF5b3V0LkJhc2ljXCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIENhbnZhcyA6IEFic3RyYWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmxheW91dC5DYW52YXNcIjtcclxufSAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0XHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgRG9jayA6IEFic3RyYWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmxheW91dC5Eb2NrXCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEZsb3cgOiBBYnN0cmFjdFxyXG4gICAge1xyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5sYXlvdXQuRmxvd1wiO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5sYXlvdXRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBHcmlkIDogQWJzdHJhY3RcclxuICAgIHtcclxuICAgICAgICBpbnQgX3NwYWNpbmdYO1xyXG4gICAgICAgIGludCBfc3BhY2luZ1k7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHcmlkKGludCBzcGFjaW5nID0gMCkgOiB0aGlzKHNwYWNpbmcsIHNwYWNpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdyaWQoaW50IHNwYWNpbmdYLCBpbnQgc3BhY2luZ1kpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTcGFjaW5nWCA9IHNwYWNpbmdYO1xyXG4gICAgICAgICAgICBTcGFjaW5nWSA9IHNwYWNpbmdZO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubGF5b3V0LkdyaWRcIjtcclxufVxyXG4gICAgICAgIHB1YmxpYyBpbnQgZ2V0Q29sdW1uV2lkdGgoaW50IGNvbHVtbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0Q29sdW1uV2lkdGgoY29sdW1uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgZ2V0Um93SGVpZ2h0KGludCByb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFJvd0hlaWdodChyb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgc2V0Q29sdW1uV2lkdGgoaW50IGNvbHVtbiwgaW50IHdpZHRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldENvbHVtbldpZHRoKGNvbHVtbiwgd2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgc2V0Um93SGVpZ2h0KGludCByb3csIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Um93SGVpZ2h0KHJvdywgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgU3BhY2luZ1hcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3NwYWNpbmdYO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc3BhY2luZ1ggPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfc3BhY2luZ1ggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTcGFjaW5nWChfc3BhY2luZ1gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IFNwYWNpbmdZXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zcGFjaW5nWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3NwYWNpbmdZID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NwYWNpbmdZID4gMClcclxuICAgICAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U3BhY2luZ1koX3NwYWNpbmdZKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0XHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgR3JvdyA6IEFic3RyYWN0XHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmxheW91dC5Hcm93XCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEhCb3ggOiBBYnN0cmFjdFxyXG4gICAge1xyXG4gICAgICAgIGludCBfc3BhY2luZztcclxuXHJcbiAgICAgICAgcHVibGljIEhCb3goaW50IHNwYWNpbmcgPSAwKSB7XHJcbiAgICAgICAgICAgIFNwYWNpbmcgPSBzcGFjaW5nO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubGF5b3V0LkhCb3hcIjtcclxufVxyXG4gICAgICAgIHB1YmxpYyBpbnQgU3BhY2luZyB7XHJcbiAgICAgICAgICAgIGdldCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3NwYWNpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IHtcclxuICAgICAgICAgICAgICAgIF9zcGFjaW5nID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3NwYWNpbmcgPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTcGFjaW5nKF9zcGFjaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5sYXlvdXRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBWQm94IDogQWJzdHJhY3RcclxuICAgIHtcclxuICAgICAgICBpbnQgX3NwYWNpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWQm94KGludCBzcGFjaW5nID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNwYWNpbmcgPSBzcGFjaW5nO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubGF5b3V0LlZCb3hcIjtcclxufVxyXG4gICAgICAgIHB1YmxpYyBpbnQgU3BhY2luZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfc3BhY2luZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3NwYWNpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChfc3BhY2luZyA+IDApXHJcbiAgICAgICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFNwYWNpbmcoX3NwYWNpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLnRhYmxlXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgUmVzaXplQ29sdW1uTW9kZWwgOiBCYXNpY0NvbHVtbk1vZGVsXHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLnRhYmxlLmNvbHVtbm1vZGVsLlJlc2l6ZVwiO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50YWJsZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2ltcGxlVGFibGVNb2RlbCA6IEFic3RyYWN0VGFibGVNb2RlbFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgU2ltcGxlVGFibGVNb2RlbChzdHJpbmdbXSBuYW1lQXJyYXksIHN0cmluZ1tdIGlkQXJyYXkgPSBudWxsKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0Q29sdW1ucyhuYW1lQXJyYXksIGlkQXJyYXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGludCBHZXRBbmNob3JTZWxlY3Rpb25JbmRleCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldEFuY2hvclNlbGVjdGlvbkluZGV4KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZHluYW1pYyBHZXRSb3dEYXRhKGludCByb3dJbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0Um93RGF0YShyb3dJbmRleCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRDb2x1bW5zKHN0cmluZ1tdIG5hbWVBcnJheSwgc3RyaW5nW10gaWRBcnJheSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRDb2x1bW5zKG5hbWVBcnJheSwgaWRBcnJheSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBTZXREYXRhKGR5bmFtaWMgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXREYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkudGFibGUubW9kZWwuU2ltcGxlXCI7XHJcbn1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnAyQ29sdW1ucyA6IEJwQ29udGFpbmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEJwQ29sdW1uIExlZnRDb2x1bW4geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBCcENvbHVtbiBSaWdodENvbHVtbiB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcDJDb2x1bW5zKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGVmdENvbHVtbiA9IG5ldyBCcENvbHVtbih3aWRnZXQsIDgpO1xyXG4gICAgICAgICAgICBSaWdodENvbHVtbiA9IG5ldyBCcENvbHVtbih3aWRnZXQsIDQpO1xyXG4gICAgICAgICAgICBBZGRDaGlsZChMZWZ0Q29sdW1uKTtcclxuICAgICAgICAgICAgQWRkQ2hpbGQoUmlnaHRDb2x1bW4pO1xyXG4gICAgICAgICAgICBBZGRMZWZ0Q2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgQWRkUmlnaHRDaGlsZHJlbigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQnVpbGQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3BlblJvdygpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgY2hpbGQgaW4gQ2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5CdWlsZCgpO1xyXG4gICAgICAgICAgICBDbG9zZVJvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgT3BlblJvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDc3NDbGFzcyA9IEBcInJvd1wiO1xyXG4gICAgICAgICAgICBPcGVuRGl2KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBDbG9zZVJvdygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbG9zZURpdigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZGRMZWZ0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWRkUmlnaHRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLndpbmRvd3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIERlc2t0b3AgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgRGVza3RvcCBfaW5zdGFuY2UgPSBudWxsO1xyXG5cclxuICAgICAgICBzdGF0aWMgcHVibGljIERlc2t0b3AgSW5zdGFuY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2luc3RhbmNlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgX2luc3RhbmNlID0gbmV3IERlc2t0b3AoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChXaW5kb3cgd2luZG93KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZCh3aW5kb3cuTmF0aXZlT2JqZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbW92ZShXaW5kb3cgd2luZG93KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnJlbW92ZSh3aW5kb3cuTmF0aXZlT2JqZWN0KTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLndpbmRvdy5EZXNrdG9wXCI7XHJcbn0gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5zcGxpdHBhbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNwbGl0UGFuZSA6IFdpZGdldFxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBfb3JpZW50YXRpb247XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU3BsaXRQYW5lIEhvcml6b250YWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGxpdFBhbmUoXCJob3Jpem9udGFsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBTcGxpdFBhbmUgVmVydGljYWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTcGxpdFBhbmUoXCJ2ZXJ0aWNhbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGxpdFBhbmUoc3RyaW5nIG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKFdpZGdldCB3aWRnZXQsIGludCBmbGV4ID0gMSkge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkKHdpZGdldC5OYXRpdmVPYmplY3QsIGZsZXgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBPcmllbnRhdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfb3JpZW50YXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9vcmllbnRhdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldE9yaWVudGF0aW9uKF9vcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLnNwbGl0cGFuZS5QYW5lXCI7XHJcbn1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIdG1sRW1iZWQgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgX2h0bWw7XHJcbiAgICAgICAgc3RyaW5nIF9zdHlsZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWZ0ZXJGaXJzdFJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFmdGVyRmlyc3RSZXNpemUoKTtcclxuICAgICAgICAgICAgc3RyaW5nIGh0bWwgPSBEZWZhdWx0SHRtbCgpO1xyXG4gICAgICAgICAgICBpZiAoaHRtbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgSHRtbCA9IGh0bWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBzdHJpbmcgRGVmYXVsdEh0bWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBzdHJpbmcgRGVmYXVsdFN0eWxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBIdG1sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9odG1sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaHRtbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgUmVmcmVzaEh0bWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuLy9wcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuLy97XHJcbi8vICAgIGJhc2UuSW5pdCgpO1xyXG4vLyAgICBTZXRTdHlsZXMoKTtcclxuLy8gICAgSHRtbCA9IERlZmF1bHRIdG1sKCk7XHJcbi8vfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5lbWJlZC5IdG1sXCI7XHJcbn1cclxuICAgICAgICB2b2lkIFJlZnJlc2hIdG1sKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRIdG1sKEh0bWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTdHlsZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfc3R5bGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zdHlsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFN0YWNrUGFuZWwgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBMaXN0PExheW91dEl0ZW0+IF9jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQWRkKExheW91dEl0ZW0gY2hpbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkKGNoaWxkLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIGNoaWxkLlBhcmVudCA9IHRoaXM7XHJcbiAgICAgICAgICAgIF9jaGlsZHJlbi5BZGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY2hpbGRyZW4gPSBuZXcgTGlzdDxMYXlvdXRJdGVtPigpO1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIE9uUmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25SZXNpemUoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoTGF5b3V0SXRlbSBjaGlsZCBpbiBfY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5PblBhcmVudFJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgUmVtb3ZlQWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFNlbGVjdGlvbihpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IF9jaGlsZHJlbi5Db3VudClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgU2V0U2VsZWN0aW9uKF9jaGlsZHJlbltpbmRleF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0U2VsZWN0aW9uKExheW91dEl0ZW0gaXRlbSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTZWxlY3Rpb24obmV3IGR5bmFtaWNbXSB7IGl0ZW0uTmF0aXZlT2JqZWN0IH0pO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuY29udGFpbmVyLlN0YWNrXCI7XHJcbn0gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXJcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBQYW5lbCA6IFdpZGdldFxyXG4gICAge1xyXG4gICAgICAgIExpc3Q8TGF5b3V0SXRlbT4gX2NoaWxkcmVuO1xyXG4gICAgICAgIHByb3RlY3RlZCBBYnN0cmFjdCBfbGF5b3V0O1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGQoTGF5b3V0SXRlbSBjaGlsZCwgZHluYW1pYyBvcHRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZChjaGlsZC5OYXRpdmVPYmplY3QsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBjaGlsZC5QYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICBfY2hpbGRyZW4uQWRkKGNoaWxkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZChMYXlvdXRJdGVtIGNoaWxkLCBzdHJpbmcgZWRnZU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoY2hpbGQsIG5ldyB7IGVkZ2UgPSBlZGdlTmFtZSB9KTtcclxuICAgICAgICAgICAgY2hpbGQuUGFyZW50ID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENlbnRlcihMYXlvdXRJdGVtIGNoaWxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKGNoaWxkLCBcImNlbnRlclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEVhc3QoTGF5b3V0SXRlbSBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChjaGlsZCwgXCJlYXN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkRmxleChMYXlvdXRJdGVtIGNoaWxkLCBpbnQgZmxleFdlaWdodCA9IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoY2hpbGQsIG5ldyB7IGZsZXggPSBmbGV4V2VpZ2h0IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkTm9ydGgoTGF5b3V0SXRlbSBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChjaGlsZCwgXCJub3J0aFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFNvdXRoKExheW91dEl0ZW0gY2hpbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoY2hpbGQsIFwic291dGhcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRXZXN0KExheW91dEl0ZW0gY2hpbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGQoY2hpbGQsIFwid2VzdFwiKTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdEhlaWdodCgpXHJcbntcclxuICAgIHJldHVybiAtMTtcclxufVxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIEFic3RyYWN0IERlZmF1bHRMYXlvdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb2NrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBfY2hpbGRyZW4gPSBuZXcgTGlzdDxMYXlvdXRJdGVtPigpO1xyXG4gICAgICAgICAgICBpZiAoRGVmYXVsdEhlaWdodCgpID49IDApXHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0SGVpZ2h0KERlZmF1bHRIZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIExheW91dCA9IERlZmF1bHRMYXlvdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBBYnN0cmFjdCBMYXlvdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xheW91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xheW91dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldExheW91dChfbGF5b3V0Lk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIE9uUmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuT25SZXNpemUoKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoTGF5b3V0SXRlbSBjaGlsZCBpbiBfY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5PblBhcmVudFJlc2l6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgUmVtb3ZlQWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5yZW1vdmVBbGwoKTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmNvbnRhaW5lci5Db21wb3NpdGVcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5iYXNpY1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEF0b20gOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgX2ljb247XHJcbiAgICAgICAgc3RyaW5nIF9sYWJlbDtcclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldENlbnRlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBpbnQgR2FwXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldEdhcCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgSWNvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9pY29uOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaWNvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldEljb24oX2ljb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2xhYmVsOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbGFiZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRMYWJlbChfbGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRSaWNoKGJvb2wgcmljaClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRSaWNoKHJpY2gpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0VGV4dENvbG9yKHN0cmluZyBjb2xvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwidGhpcy5OYXRpdmVPYmplY3QuZ2V0TGF5b3V0Q2hpbGRyZW4oKVswXS5zZXRUZXh0Q29sb3JcIiwgY29sb3IpO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuYmFzaWMuQXRvbVwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5iYXNpY1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEltYWdlIDogV2lkZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIF9zb3VyY2U7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJbWFnZShzdHJpbmcgc291cmNlKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU291cmNlID0gc291cmNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEltYWdlKHN0cmluZyBzb3VyY2UsIGludCB3aWR0aCwgaW50IGhlaWdodCkgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTb3VyY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfc291cmNlOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc291cmNlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U291cmNlKF9zb3VyY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5iYXNpYy5JbWFnZVwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5iYXNpY1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTGFiZWwgOiBXaWRnZXRcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBUZXh0QWxpZ25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0VGV4dEFsaWduKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmljaFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0UmljaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0UmljaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmJhc2ljLkxhYmVsXCI7XHJcbn0gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXJcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTY3JvbGwgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBMYXlvdXRJdGVtIF9jb250ZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoTGF5b3V0SXRlbSBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGQoY2hpbGQuTmF0aXZlT2JqZWN0KTtcclxuICAgICAgICAgICAgX2NvbnRlbnQgPSBjaGlsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBMYXlvdXRJdGVtIENvbnRlbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2NvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmNvbnRhaW5lci5TY3JvbGxcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBJRnJhbWUgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgX3NvdXJjZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWZ0ZXJJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQWZ0ZXJJbml0KCk7XHJcbiAgICAgICAgICAgIEZuVm9pZCBoYW5kbGVyID0gT25Mb2FkO1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkTGlzdGVuZXIoXCJsb2FkXCIsIGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgc3RyaW5nIERlZmF1bHRTb3VyY2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIE9uTG9hZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTb3VyY2UgPSBEZWZhdWx0U291cmNlKCk7XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5lbWJlZC5JZnJhbWVcIjtcclxufVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgU291cmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zb3VyY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zb3VyY2UgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTb3VyY2UoX3NvdXJjZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFic3RyYWN0RmllbGQgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgX3ZhbHVlO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBDbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmVhZE9ubHlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFJlYWRPbmx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRSZWFkT25seSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVmFsdWVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFZhbHVlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFZhbHVlKF92YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybS5yZW5kZXJlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQWJzdHJhY3RSZW5kZXJlciA6IFdpZGdldFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBGb3JtIF9mb3JtO1xyXG5cclxuICAgICAgICBwdWJsaWMgQWJzdHJhY3RSZW5kZXJlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZm9ybSA9IG5ldyBGb3JtKCk7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGR5bmFtaWNbXSBDcmVhdGlvbkFyZ3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBkeW5hbWljW10geyBfZm9ybS5OYXRpdmVPYmplY3QgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGb3JtIEZvcm1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2Zvcm07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5tZW51O1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFNwbGl0QnV0dG9uIDogV2lkZ2V0XHJcbiAgICB7XHJcblxyXG4gICAgICAgIE1lbnUgX21lbnU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTcGxpdEJ1dHRvbihzdHJpbmcgbGFiZWwpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYWJlbCA9IGxhYmVsO1xyXG4gICAgICAgICAgICBNZW51ID0gbmV3IE1lbnUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZW51QnV0dG9uIEFkZEJ1dHRvbihzdHJpbmcgbGFiZWwsIElFdmVudEhhbmRsZXIgaGFuZGxlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1lbnVCdXR0b24gYnV0dG9uID0gbmV3IE1lbnVCdXR0b24obGFiZWwsIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICBidXR0b24uRGVjb3JhdG9yID0gRGVjb3JhdG9yO1xyXG4gICAgICAgICAgICBidXR0b24uVGV4dENvbG9yID0gVGV4dENvbG9yO1xyXG4gICAgICAgICAgICBNZW51LkFkZChidXR0b24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBMYWJlbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBOYXRpdmVPYmplY3QuZ2V0TGFiZWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldExhYmVsKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1lbnUgTWVudVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbWVudTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21lbnUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRNZW51KHZhbHVlLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmZvcm0uU3BsaXRCdXR0b25cIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubWVudVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTWVudSA6IFdpZGdldFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgTWVudSBBZGQoTGF5b3V0SXRlbSBpdGVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZChpdGVtLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubWVudS5NZW51XCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLm1lbnVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNlcGFyYXRvciA6IFdpZGdldFxyXG4gICAge1xyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5tZW51LlNlcGFyYXRvclwiO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkudG9vbGJhclxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRvb2xCYXIgOiBXaWRnZXQsIElEZWNvcmF0ZVxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoTGF5b3V0SXRlbSBjaGlsZCwgZHluYW1pYyBvcHRpb25zID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGQoY2hpbGQuTmF0aXZlT2JqZWN0LCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb29sYmFyQnV0dG9uIEFkZEJ1dHRvbihzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUb29sYmFyQnV0dG9uIGJ1dHRvbiA9IG5ldyBUb29sYmFyQnV0dG9uKGxhYmVsLCB0aGlzKTtcclxuICAgICAgICAgICAgYnV0dG9uLkRlY29yYXRlKHRoaXMpO1xyXG4gICAgICAgICAgICBBZGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCdXR0b24gQWRkTWVudUJ1dHRvbihzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCdXR0b24gYnV0dG9uID0gbmV3IEJ1dHRvbihsYWJlbCk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5EZWNvcmF0ZSh0aGlzKTtcclxuICAgICAgICAgICAgQWRkKGJ1dHRvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2VwYXJhdG9yIEFkZFNlcGFyYXRvcihzdHJpbmcgY29sb3IgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VwYXJhdG9yIHNlcGFyYXRvciA9IG5ldyBTZXBhcmF0b3IoY29sb3IpO1xyXG4gICAgICAgICAgICAvL0FkZChzZXBhcmF0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VwYXJhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFdpZGdldCBBZGRTcGFjZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2lkZ2V0IHdpZGdldCA9IG5ldyBXaWRnZXQoKTtcclxuICAgICAgICAgICAgd2lkZ2V0LkhlaWdodCA9IDEwO1xyXG4gICAgICAgICAgICB3aWRnZXQuV2lkdGggPSAxMDtcclxuICAgICAgICAgICAgQWRkKHdpZGdldCwgbmV3IHsgZmxleCA9IDEgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB3aWRnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3BsaXRCdXR0b24gQWRkU3BsaXRCdXR0b24oc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3BsaXRCdXR0b24gYnV0dG9uID0gbmV3IFNwbGl0QnV0dG9uKGxhYmVsKTtcclxuICAgICAgICAgICAgYnV0dG9uLkRlY29yYXRlKHRoaXMpO1xyXG4gICAgICAgICAgICBBZGQoYnV0dG9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIGJ1dHRvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgRGVjb3JhdGUoV2lkZ2V0IHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBpbnQgRGVmYXVsdFNwYWNpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBpZiAoRGVmYXVsdFNwYWNpbmcoKSA+IDApXHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U3BhY2luZyhEZWZhdWx0U3BhY2luZygpKTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLnRvb2xiYXIuVG9vbEJhclwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLnRhYmxlXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVGFibGUgOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBTZWxlY3Rpb25Nb2RlbCBfc2VsZWN0aW9uTW9kZWw7XHJcbiAgICAgICAgU2ltcGxlVGFibGVNb2RlbCBfdGFibGVNb2RlbDtcclxuXHJcbiAgICAgICAgcHVibGljIFRhYmxlKCkgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQmFzaWNDb2x1bW5Nb2RlbCBDb2x1bW5Nb2RlbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBJSGFuZGxlU2VsZWN0aW9uIFNlbGVjdGlvbkhhbmRsZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBDb2x1bW5WaXNpYmlsaXR5QnV0dG9uVmlzaWJsZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRDb2x1bW5WaXNpYmlsaXR5QnV0dG9uVmlzaWJsZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBkeW5hbWljW10gQ3JlYXRpb25BcmdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXNpemVDb2x1bW5Nb2RlbCA9IG5ldyBSZXNpemVDb2x1bW5Nb2RlbCgpLk5hdGl2ZU9iamVjdDtcclxuICAgICAgICAgICAgRm5WYWx1ZUEgZm4gPSBvYmogPT4geyByZXR1cm4gcmVzaXplQ29sdW1uTW9kZWw7IH07XHJcbiAgICAgICAgICAgIGR5bmFtaWMgbWFwID0gbmV3XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhYmxlQ29sdW1uTW9kZWwgPSBmblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGR5bmFtaWNbXSB7IG51bGwsIG1hcCB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGR5bmFtaWMgRGF0YVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF90YWJsZU1vZGVsLlNldERhdGEodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYm9vbCBEZWZhdWx0Q29sdW1uVmlzaWJpbGl0eUJ1dHRvblZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgc3RyaW5nW10gRGVmYXVsdENvbHVtbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdHJpbmdbXSB7IFwiSWRcIiwgXCJEYXRhXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzdHJpbmdbXSBEZWZhdWx0SWRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8c3RyaW5nPiBpZHMgPSBuZXcgTGlzdDxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBjb2wgaW4gRGVmYXVsdENvbHVtbnMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIGlkID0gY29sLlRvTG93ZXIoKS5SZXBsYWNlKCcgJywgJ18nKTtcclxuICAgICAgICAgICAgICAgIGlkcy5BZGQoaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpZHMuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgRGVmYXVsdFNob3dDZWxsRm9jdXNJbmRpY2F0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgRGVmYXVsdFN0YXR1c0JhclZpc2libGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgQ29sdW1uTW9kZWwgPSBuZXcgUmVzaXplQ29sdW1uTW9kZWwoKTtcclxuICAgICAgICAgICAgU2VsZWN0aW9uTW9kZWwgPSBuZXcgU2VsZWN0aW9uTW9kZWwodGhpcyk7XHJcbiAgICAgICAgICAgIFRhYmxlTW9kZWwgPSBuZXcgU2ltcGxlVGFibGVNb2RlbChEZWZhdWx0Q29sdW1ucygpLCBEZWZhdWx0SWRzKCkpO1xyXG4gICAgICAgICAgICBDb2x1bW5WaXNpYmlsaXR5QnV0dG9uVmlzaWJsZSA9IERlZmF1bHRDb2x1bW5WaXNpYmlsaXR5QnV0dG9uVmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBTaG93Q2VsbEZvY3VzSW5kaWNhdG9yID0gRGVmYXVsdFNob3dDZWxsRm9jdXNJbmRpY2F0b3IoKTtcclxuICAgICAgICAgICAgU3RhdHVzQmFyVmlzaWJsZSA9IERlZmF1bHRTdGF0dXNCYXJWaXNpYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBPbkNoYW5nZVNlbGVjdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoU2VsZWN0aW9uSGFuZGxlciAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaW5kZXggPSBTZWxlY3Rpb25Nb2RlbC5HZXRBbmNob3JTZWxlY3Rpb25JbmRleCgpO1xyXG4gICAgICAgICAgICAgICAgZHluYW1pYyByb3dEYXRhID0gVGFibGVNb2RlbC5HZXRSb3dEYXRhKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIFNlbGVjdGlvbkhhbmRsZXIuSGFuZGxlU2VsZWN0aW9uKGluZGV4LCByb3dEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q29sdW1uVmlzaWJsZShpbnQgY29sLCBib29sIHZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkeW5hbWljIGNvbHVtbk1vZGVsID0gTmF0aXZlT2JqZWN0LmdldFRhYmxlQ29sdW1uTW9kZWwoKTtcclxuICAgICAgICAgICAgY29sdW1uTW9kZWwuc2V0Q29sdW1uVmlzaWJsZShjb2wsIHZpc2libGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgU3RhdHVzQmFyVmlzaWJsZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTdGF0dXNCYXJWaXNpYmxlKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgU2hvd0NlbGxGb2N1c0luZGljYXRvclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRTaG93Q2VsbEZvY3VzSW5kaWNhdG9yKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNpbXBsZVRhYmxlTW9kZWwgVGFibGVNb2RlbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGFibGVNb2RlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3RhYmxlTW9kZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRUYWJsZU1vZGVsKF90YWJsZU1vZGVsLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZWxlY3Rpb25Nb2RlbCBTZWxlY3Rpb25Nb2RlbFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfc2VsZWN0aW9uTW9kZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9zZWxlY3Rpb25Nb2RlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldFNlbGVjdGlvbk1vZGVsKF9zZWxlY3Rpb25Nb2RlbC5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50YWJsZS5UYWJsZVwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkudGFidmlld1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGFiVmlldyA6IFdpZGdldFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoUGFnZSBwYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZChwYWdlLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUGFnZSBBZGRQYWdlKHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBhZ2UgcGFnZSA9IG5ldyBQYWdlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExhYmVsID0gbGFiZWxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgQWRkKHBhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQYWdlIEFkZFBhZ2Uoc3RyaW5nIGxhYmVsLCBMYXlvdXRJdGVtIGNvbnRlbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQYWdlIHBhZ2UgPSBBZGRQYWdlKGxhYmVsKTtcclxuICAgICAgICAgICAgcGFnZS5Db250ZW50ID0gY29udGVudDtcclxuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEJhclBvc2l0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRCYXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0QmFyUG9zaXRpb24odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50YWJ2aWV3LlRhYlZpZXdcIjtcclxufVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50b29sYmFyXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgU2VwYXJhdG9yIDogV2lkZ2V0XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXBhcmF0b3Ioc3RyaW5nIGNvbG9yID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChjb2xvciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgVGV4dENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50b29sYmFyLlNlcGFyYXRvclwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50cmVlLmNvcmVcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBBYnN0cmFjdEl0ZW0gOiBXaWRnZXRcclxuICAgIHtcclxuICAgICAgICBzdHJpbmcgX2xhYmVsO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xhYmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0TGFiZWwoX2xhYmVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpZGdldHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi51dGlsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS53aW5kb3dzXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgV2luZG93IDogV2lkZ2V0LCBJRXZlbnRIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgQnV0dG9uQmFyIF9idXR0b25CYXI7XHJcbiAgICAgICAgc3RyaW5nIF9jYXB0aW9uO1xyXG4gICAgICAgIGludCBfY29udGVudFBhZGRpbmc7XHJcbiAgICAgICAgYm9vbCBfZGVsYXllZENlbnRlcmVkO1xyXG4gICAgICAgIGludFtdIF9kZWxheWVkTG9jYXRpb247XHJcbiAgICAgICAgQWJzdHJhY3QgX2xheW91dDtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKExheW91dEl0ZW0gY2hpbGQsIGR5bmFtaWMgb3B0aW9ucyA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkKGNoaWxkLk5hdGl2ZU9iamVjdCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoTGF5b3V0SXRlbSBjaGlsZCwgc3RyaW5nIGVkZ2VOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKGNoaWxkLCBuZXcgeyBlZGdlID0gZWRnZU5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZnRlckZpcnN0UmVzaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQWZ0ZXJGaXJzdFJlc2l6ZSgpO1xyXG4gICAgICAgICAgICBDZW50ZXIoX2RlbGF5ZWRDZW50ZXJlZCk7XHJcbiAgICAgICAgICAgIE1vdmVUbyhfZGVsYXllZExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFmdGVySW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFmdGVySW5pdCgpO1xyXG4gICAgICAgICAgICBpZiAoSGFzQnV0dG9uQmFyKCkpXHJcbiAgICAgICAgICAgICAgICBBZGRCdXR0b25CYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIFNob3dNaW5pbWl6ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBGblZvaWQgY2xvc2VIYW5kbGVyID0gT25DbG9zZTtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LmFkZExpc3RlbmVyKFwiY2xvc2VcIiwgY2xvc2VIYW5kbGVyKTtcclxuICAgICAgICAgICAgVmlld3BvcnQuSW5zdGFuY2UuQWRkV2luZG93KHRoaXMpO1xyXG4gICAgICAgICAgICBDYXB0aW9uID0gRGVmYXVsdENhcHRpb24oKTtcclxuICAgICAgICAgICAgQ2VudGVyKERlZmF1bHRDZW50ZXJlZCgpKTtcclxuICAgICAgICAgICAgQ29udGVudFBhZGRpbmcgPSBEZWZhdWx0Q29udGVudFBhZGRpbmcoKTtcclxuICAgICAgICAgICAgTGF5b3V0ID0gRGVmYXVsdExheW91dCgpO1xyXG4gICAgICAgICAgICBpZiAoRGVmYXVsdE1vZGFsKCkpXHJcbiAgICAgICAgICAgICAgICBNb2RhbCA9IERlZmF1bHRNb2RhbCgpO1xyXG4gICAgICAgICAgICBpZiAoRGVmYXVsdExvY2F0aW9uKCkgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIE1vdmVUbyhEZWZhdWx0TG9jYXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZEJ1dHRvbkJhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfYnV0dG9uQmFyID0gQ3JlYXRlQnV0dG9uQmFyKCk7XHJcbiAgICAgICAgICAgIF9idXR0b25CYXIuQWRkQ29uZmlncyhEZWZhdWx0QnV0dG9ucygpKTtcclxuICAgICAgICAgICAgQWRkKF9idXR0b25CYXIsIFwic291dGhcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBCdXR0b25CYXIgQ3JlYXRlQnV0dG9uQmFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQmFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBBYnN0cmFjdCBEZWZhdWx0TGF5b3V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRG9jaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgYm9vbCBEZWZhdWx0TW9kYWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDYXB0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2NhcHRpb247IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jYXB0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Q2FwdGlvbihfY2FwdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENlbnRlcihib29sIGNlbnRlcmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2RlbGF5ZWRDZW50ZXJlZCA9IGNlbnRlcmVkO1xyXG4gICAgICAgICAgICBpZiAoIV9oYXNSZXNpemVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuY2VudGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IENvbnRlbnRQYWRkaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gX2NvbnRlbnRQYWRkaW5nOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29udGVudFBhZGRpbmcgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRDb250ZW50UGFkZGluZyhfY29udGVudFBhZGRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBCdXR0b25Db25maWdbXSBEZWZhdWx0QnV0dG9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZ1tdIHsgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHN0cmluZyBEZWZhdWx0Q2FwdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJXaW5kb3dcIjtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCB2aXJ0dWFsIGJvb2wgRGVmYXVsdENlbnRlcmVkKClcclxue1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59cHJvdGVjdGVkIHZpcnR1YWwgaW50IERlZmF1bHRDb250ZW50UGFkZGluZygpXHJcbntcclxuICAgIHJldHVybiAwO1xyXG59cHJvdGVjdGVkIG92ZXJyaWRlIGludCBEZWZhdWx0SGVpZ2h0KClcclxue1xyXG4gICAgcmV0dXJuIDM3NTtcclxufVxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIGludFtdIERlZmF1bHRMb2NhdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBib29sIERlZmF1bHRTaG93KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIGludCBEZWZhdWx0V2lkdGgoKVxyXG57XHJcbiAgICByZXR1cm4gNDc1O1xyXG59XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgYm9vbCBIYXNCdXR0b25CYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERlZmF1bHRCdXR0b25zKCkuTGVuZ3RoID4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBBYnN0cmFjdCBMYXlvdXRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xheW91dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2xheW91dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnNldExheW91dChfbGF5b3V0Lk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1heGltaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5tYXhpbWl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgTW9kYWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0TW9kYWwodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNaW5pbWl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QubWluaW1pemUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVUbyhpbnRbXSBsb2NhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9kZWxheWVkTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCFfaGFzUmVzaXplZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLkxlbmd0aCAhPSAyKSByZXR1cm47XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5tb3ZlVG8obG9jYXRpb25bMF0sIGxvY2F0aW9uWzFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIE9uQ2xvc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmlld3BvcnQuSW5zdGFuY2UuUmVtb3ZlV2luZG93KHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgU2hvd01heGltaXplXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFNob3dNYXhpbWl6ZSgpOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U2hvd01heGltaXplKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgU2hvd01pbmltaXplXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXQgeyByZXR1cm4gTmF0aXZlT2JqZWN0LmdldFNob3dNaW5pbWl6ZSgpOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U2hvd01pbmltaXplKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkud2luZG93LldpbmRvd1wiO1xyXG59XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5kZWNvcmF0aW9uO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2luZG93cztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5jb250ZW50XHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEZXNrdG9wQ29udGVudCA6IERlc2t0b3BcclxuICAgIHtcclxuICAgICAgICBMaXN0PGR5bmFtaWM+IFdpbmRvd3MgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGVjb3JhdG9yIERlZmF1bHREZWNvcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGVjb3JhdG9yIGRlY29yYXRvciA9IG5ldyBEZWNvcmF0b3IoKTtcclxuICAgICAgICAgICAgZGVjb3JhdG9yLkJhY2tncm91bmRJbWFnZSA9IFwiaW1hZ2VzL3RpbGVzLnBuZ1wiO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGJvb2wgSGFuZGxlc0FwcGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIE9uQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJvb2wgc3RhcnRVcCA9IF9maXJzdEFwcGVhcmFuY2U7XHJcbiAgICAgICAgICAgIGJhc2UuT25BcHBlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEhpZGVBbGxXaW5kb3dzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciB3aW5kb3cgaW4gV2luZG93cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5oaWRlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpbmRvdy5XaWRnZXQgIT0gbnVsbCAmJiB3aW5kb3cuV2lkZ2V0LmhpZGUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuV2lkZ2V0LmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0FsbFdpbmRvd3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHdpbmRvdyBpbiBXaW5kb3dzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LnNob3cgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAod2luZG93LldpZGdldCAhPSBudWxsICYmIHdpbmRvdy5XaWRnZXQuc2hvdyAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5XaWRnZXQuc2hvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRXaW5kb3coV2luZG93IHdpbmRvdylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyV2luZG93KHdpbmRvdy5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlV2luZG93KFdpbmRvdyB3aW5kb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBVblJlZ2lzdGVyV2luZG93KHdpbmRvdy5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJXaW5kb3coZHluYW1pYyB3aW5kb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIVdpbmRvd3MuQ29udGFpbnMod2luZG93KSlcclxuICAgICAgICAgICAgICAgIFdpbmRvd3MuQWRkKHdpbmRvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVblJlZ2lzdGVyV2luZG93KGR5bmFtaWMgd2luZG93KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFdpbmRvd3MuQ29udGFpbnMod2luZG93KSlcclxuICAgICAgICAgICAgICAgIFdpbmRvd3MuUmVtb3ZlKHdpbmRvdyk7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlICAgICAgICAgTGlzdDxkeW5hbWljPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fV2luZG93cz1uZXcgTGlzdDxkeW5hbWljPigpO31cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5zcGxpdHBhbmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5jb250ZW50XHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBTdGFuZGFyZENvbnRlbnQgOiBTcGxpdFBhbmVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgTmF2UGFuZWwgTmF2UGFuZWwgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIENvbnRlbnRQYW5lbCBDb250ZW50UGFuZWwgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFuZGFyZENvbnRlbnQoKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGVudFBhbmVsID0gbmV3IENvbnRlbnRQYW5lbCgpO1xyXG4gICAgICAgICAgICBOYXZQYW5lbCA9IG5ldyBOYXZQYW5lbCgpO1xyXG4gICAgICAgICAgICBBZGRNZW51UGFuZWxzKCk7XHJcbiAgICAgICAgICAgIEFkZChOYXZQYW5lbCwgMSk7XHJcbiAgICAgICAgICAgIEFkZChDb250ZW50UGFuZWwsIDQpO1xyXG4gICAgICAgICAgICBOYXZQYW5lbC5SZW5kZXIoKTtcclxuICAgICAgICAgICAgQ29udGVudFBhbmVsLlJlbmRlcigpO1xyXG4gICAgICAgICAgICBHZXRDb250ZW50RWxlbWVudCgpLkFkZENsYXNzKFwiYm9vdHN0cmFwXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgQWRkTWVudVBhbmVscygpO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmVtYmVkXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBTY3JvbGxhYmxlSHRtbCA6IEh0bWxFbWJlZFxyXG4gICAge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBib29sIERlZmF1bHRTY3JvbGxYKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgYm9vbCBEZWZhdWx0U2Nyb2xsWSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIFNldE92ZXJmbG93KGJvb2wgeCwgYm9vbCB5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHgpXHJcbiAgICAgICAgICAgICAgICBTZXRTdHlsZShcIm92ZXJmbG93LXhcIiwgXCJzY3JvbGxcIik7XHJcbiAgICAgICAgICAgIGlmICh5KVxyXG4gICAgICAgICAgICAgICAgU2V0U3R5bGUoXCJvdmVyZmxvdy15XCIsIFwic2Nyb2xsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgU2V0U3R5bGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuU2V0U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIFNldE92ZXJmbG93KERlZmF1bHRTY3JvbGxYKCksIERlZmF1bHRTY3JvbGxZKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvbnRhaW5lcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENvbnRlbnRQYW5lbCA6IFN0YWNrUGFuZWxcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIERpY3Rpb25hcnk8c3RyaW5nLCBXaWRnZXQ+IFBhZ2VzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRQYWdlKFdpZGdldCBwYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkKHBhZ2UpO1xyXG4gICAgICAgICAgICBQYWdlc1socGFnZSBhcyBJUGFnZSkuVGFnTmFtZSgpXSA9IHBhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBhZ2UgaW4gUGFnZXMuVmFsdWVzKVxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2UgaXMgSVJlbmRlcilcclxuICAgICAgICAgICAgICAgICAgICAocGFnZSBhcyBJUmVuZGVyKS5SZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNlbGVjdFBhZ2Uoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbldpZGdldCBzZWxlY3RlZFBhZ2U7XG4gICAgICAgICAgICBQYWdlcy5UcnlHZXRWYWx1ZSh0YWcsIG91dCBzZWxlY3RlZFBhZ2UpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRQYWdlID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwicGFnZSBtaXNzIHswfVwiLCB0YWcpO1xyXG4gICAgICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIGtleSBpbiBQYWdlcy5LZXlzKVxyXG4gICAgICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKGtleSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TZXRTZWxlY3Rpb24oc2VsZWN0ZWRQYWdlKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBEaWN0aW9uYXJ5PHN0cmluZywgV2lkZ2V0PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUGFnZXM9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBXaWRnZXQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBOYXZQYW5lbCA6IFN0YWNrUGFuZWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRGljdGlvbmFyeTxzdHJpbmcsIE5hdk1lbnVQYW5lbD4gUGFuZWxzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTmF2TWVudVBhbmVsIFNlbGVjdGVkUGFuZWwgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGROYXYoTmF2TWVudVBhbmVsIHBhbmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VsZWN0ZWRQYW5lbCA9IHBhbmVsO1xyXG4gICAgICAgICAgICBBZGQocGFuZWwpO1xyXG4gICAgICAgICAgICBQYW5lbHMuU2V0KHBhbmVsLkdldFRhZygpLCBwYW5lbCk7XHJcbiAgICAgICAgICAgIHBhbmVsLkFkZFBhZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIHBhbmVsIGluIFBhbmVscy5WYWx1ZXMpXHJcbiAgICAgICAgICAgICAgICBpZiAocGFuZWwgaXMgSVJlbmRlcilcclxuICAgICAgICAgICAgICAgICAgICAocGFuZWwgYXMgSVJlbmRlcikuUmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZWxlY3RQYW5lbChzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuTmF2TWVudVBhbmVsIHNlbGVjdGVkUGFuZWw7XG4gICAgICAgICAgICBQYW5lbHMuVHJ5R2V0VmFsdWUodGFnLCBvdXQgc2VsZWN0ZWRQYW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFBhbmVsID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFNlbGVjdGVkUGFuZWwgPSBzZWxlY3RlZFBhbmVsO1xyXG4gICAgICAgICAgICBTZXRTZWxlY3Rpb24oc2VsZWN0ZWRQYW5lbCk7XHJcbiAgICAgICAgICAgIFNlbGVjdGVkUGFuZWwuU2hvd0RlZmF1bHRQYWdlKCk7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLCBOYXZNZW51UGFuZWw+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19QYW5lbHM9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBOYXZNZW51UGFuZWw+KCk7fVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFF4UGFnZSA6IFBhbmVsLCBJUGFnZSwgSVJlbmRlclxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgc3RyaW5nIEJ1dHRvbkxhYmVsKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgUGFnZVRpdGxlKCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBzdHJpbmcgVGFnTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQnV0dG9uTGFiZWwoKS5Ub0xvd2VyKCkuUmVwbGFjZSgnICcsICdfJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS53aWRnZXRzLm5hdmJhcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydFxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVmlld3BvcnQgOiBQYW5lbFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgVmlld3BvcnRTdGFjayBDb250ZW50IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgTmF2YmFyIE5hdmJhciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWaWV3cG9ydCBJbnN0YW5jZSB7IGdldDsgcHJvdGVjdGVkIHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBDb250ZW50ID0gQ3JlYXRlQ29udGVudCgpO1xyXG4gICAgICAgICAgICBOYXZiYXIgPSBDcmVhdGVOYXZiYXIoKTtcclxuICAgICAgICAgICAgQWRkTm9ydGgoTmF2YmFyKTtcclxuICAgICAgICAgICAgQWRkQ2VudGVyKENvbnRlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkV2luZG93KFdpbmRvdyB3aW5kb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZW50LkRlc2t0b3BDb250ZW50LkFkZFdpbmRvdyh3aW5kb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVtb3ZlV2luZG93KFdpbmRvdyB3aW5kb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZW50LkRlc2t0b3BDb250ZW50LlJlbW92ZVdpbmRvdyh3aW5kb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnRPbldvcmtzcGFjZUxvYWRlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU3RhcnRBcHBsaWNhdGlvbihzdHJpbmcgYXBwTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldFdvcmtzcGFjZU1vZGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRXb3Jrc3BhY2VNb2RlKGJvb2wgd29ya3NwYWNlTW9kZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRlbnQuU2V0V29ya3NwYWNlTW9kZSh3b3Jrc3BhY2VNb2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBWaWV3cG9ydFN0YWNrIENyZWF0ZUNvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IE5hdmJhciBDcmVhdGVOYXZiYXIoKTtcclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LmNvbnRlbnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydFxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgVmlld3BvcnRTdGFjayA6IFN0YWNrUGFuZWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRGVza3RvcENvbnRlbnQgRGVza3RvcENvbnRlbnQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBTdGFuZGFyZENvbnRlbnQgU3RhbmRhcmRDb250ZW50IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFZpZXdwb3J0U3RhY2soKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGVza3RvcENvbnRlbnQgPSBDcmVhdGVEZXNrdG9wQ29udGVudCgpO1xyXG4gICAgICAgICAgICBTdGFuZGFyZENvbnRlbnQgPSBDcmVhdGVTdGFuZGFyZENvbnRlbnQoKTtcclxuICAgICAgICAgICAgQWRkKFN0YW5kYXJkQ29udGVudCk7XHJcbiAgICAgICAgICAgIEFkZChEZXNrdG9wQ29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgRGVza3RvcENvbnRlbnQgQ3JlYXRlRGVza3RvcENvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IFN0YW5kYXJkQ29udGVudCBDcmVhdGVTdGFuZGFyZENvbnRlbnQoKTtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0V29ya3NwYWNlTW9kZShib29sIGRlc2t0b3BNb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGRlc2t0b3BNb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTZXRTZWxlY3Rpb24oRGVza3RvcENvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgRGVza3RvcENvbnRlbnQuU2hvd0FsbFdpbmRvd3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERlc2t0b3BDb250ZW50LkhpZGVBbGxXaW5kb3dzKCk7XHJcbiAgICAgICAgICAgICAgICBTZXRTZWxlY3Rpb24oU3RhbmRhcmRDb250ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS53aWRnZXRzO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmNvbnRhaW5lclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZVBhbmVsIDogUGFuZWwsIElDdXN0b21FdmVudFxyXG4gICAge1xyXG4gICAgICAgIEdhbWVCb2FyZCBfZ2FtZUJvYXJkO1xyXG4gICAgICAgIFNjcm9sbCBfc2Nyb2xsO1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZVBhbmVsKGludCBzaXplKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnVpbGRCb2FyZChzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIEJ1aWxkQm9hcmQoaW50IHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZChzaXplKTtcclxuICAgICAgICAgICAgX3Njcm9sbCA9IG5ldyBTY3JvbGwoKTtcclxuICAgICAgICAgICAgX3Njcm9sbC5BZGQoX2dhbWVCb2FyZCk7XHJcbiAgICAgICAgICAgIEFkZENlbnRlcihfc2Nyb2xsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBib29sIEhhbmRsZXNDdXN0b21FdmVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBPblJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uUmVzaXplKCk7XHJcbiAgICAgICAgICAgIGludCBzaXplID0gTWF0aC5NYXgoSW5uZXJIZWlnaHQsIElubmVyV2lkdGgpIC0gMTU7XHJcbiAgICAgICAgICAgIF9nYW1lQm9hcmQuUmVzaXplVGlsZXMoc2l6ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2FtZUJvYXJkLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkdhbWVQYW5lbFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSGFuZGxlQ3VzdG9tRXZlbnQoc3RyaW5nIGV2ZW50TmFtZSwgRm5Wb2lkTiBmbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnROYW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xpY2tcIjpcclxuICAgICAgICAgICAgICAgICAgICBfZ2FtZUJvYXJkLlNldENsaWNrRm4oKGdsb2JhbDo6Q1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cy5GblZvaWROKWZuKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9iamVjdCBQZXJmb3JtTWV0aG9kKHN0cmluZyBtZXRob2ROYW1lLCBkeW5hbWljW10gYXJncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobWV0aG9kTmFtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNsZWFyX3RpbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICBQZXJmb3JtQ2xlYXJUaWxlKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1vdmVfdGlsZV94XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgUGVyZm9ybU1vdmVUaWxlWChhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtb3ZlX3RpbGVfeVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIFBlcmZvcm1Nb3ZlVGlsZVkoYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVzZXRcIjpcclxuICAgICAgICAgICAgICAgICAgICBSZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNldF9pY29uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgUGVyZm9ybVNldFRpbGVJY29uKGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNldF9zaXplXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgUGVyZm9ybVNldFNpemUoYXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2V0X3RpbGVfaWNvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIFBlcmZvcm1TZXRUaWxlSWNvbihhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZXRfdGlsZV90YWdcIjpcclxuICAgICAgICAgICAgICAgICAgICBQZXJmb3JtU2V0VGlsZVRhZyhhcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJQZXJmb3JtTWV0aG9kIC0gdW5rbm93biBtZXRob2Q6IHswfVwiLCBtZXRob2ROYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBQZXJmb3JtQ2xlYXJUaWxlKG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5MZW5ndGggPCAyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpbnQgY29sdW1uID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMF0pO1xyXG4gICAgICAgICAgICBpbnQgcm93ID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICBfZ2FtZUJvYXJkLkNsZWFyVGlsZUljb24oY29sdW1uLCByb3cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQZXJmb3JtTW92ZVRpbGVYKG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG5TeXN0ZW0uQWN0aW9uIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhcmdzLkxlbmd0aCA8IDMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGludCBjb2x1bW4gPSBDb252ZXJ0LlRvSW50MzIoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIGludCByb3cgPSBDb252ZXJ0LlRvSW50MzIoYXJnc1sxXSk7XHJcbiAgICAgICAgICAgIGludCB4ID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMl0pO1xyXG4gICAgICAgICAgICBpbnQgZGVsdGEgPSB4ID49IDAgPyAxIDogLTE7XHJcbmZuID0gKCkgPT5cclxue1xyXG4gICAgX2dhbWVCb2FyZC5Nb3ZlVGlsZUljb24oY29sdW1uLCByb3csIGNvbHVtbiArIGRlbHRhLCByb3cpO1xyXG4gICAgY29sdW1uICs9IGRlbHRhO1xyXG59XHJcblxyXG47XG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9TY2hlZHVsZXIuQW5pbWF0ZShmbiwgTWF0aC5BYnMoeCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQZXJmb3JtTW92ZVRpbGVZKG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG5TeXN0ZW0uQWN0aW9uIGZuID0gbnVsbDtcbiAgICAgICAgICAgIGlmIChhcmdzLkxlbmd0aCA8IDMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGludCBjb2x1bW4gPSBDb252ZXJ0LlRvSW50MzIoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIGludCByb3cgPSBDb252ZXJ0LlRvSW50MzIoYXJnc1sxXSk7XHJcbiAgICAgICAgICAgIGludCB5ID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMl0pO1xyXG4gICAgICAgICAgICBpbnQgZGVsdGEgPSB5ID49IDAgPyAxIDogLTE7XHJcbmZuID0gKCkgPT5cclxue1xyXG4gICAgX2dhbWVCb2FyZC5Nb3ZlVGlsZUljb24oY29sdW1uLCByb3csIGNvbHVtbiwgcm93ICsgZGVsdGEpO1xyXG4gICAgcm93ICs9IGRlbHRhO1xyXG59XHJcblxyXG47XG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9TY2hlZHVsZXIuQW5pbWF0ZShmbiwgTWF0aC5BYnMoeSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBQZXJmb3JtU2V0U2l6ZShvYmplY3RbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuTGVuZ3RoIDwgMSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaW50IHNpemUgPSBDb252ZXJ0LlRvSW50MzIoYXJnc1swXSk7XHJcbiAgICAgICAgICAgIF9nYW1lQm9hcmQuU2V0U2l6ZShzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgUGVyZm9ybVNldFRpbGVJY29uKG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5MZW5ndGggPCAzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmcgaWNvbiA9IGFyZ3NbMF0uVG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgaW50IGNvbHVtbiA9IENvbnZlcnQuVG9JbnQzMihhcmdzWzFdKTtcclxuICAgICAgICAgICAgaW50IHJvdyA9IENvbnZlcnQuVG9JbnQzMihhcmdzWzJdKTtcclxuICAgICAgICAgICAgX2dhbWVCb2FyZC5TZXRUaWxlSWNvbihpY29uLCBjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFBlcmZvcm1TZXRUaWxlVGFnKG9iamVjdFtdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5MZW5ndGggPCAzKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBzdHJpbmcgdGFnID0gYXJnc1swXS5Ub1N0cmluZygpO1xyXG4gICAgICAgICAgICBpbnQgY29sdW1uID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICBpbnQgcm93ID0gQ29udmVydC5Ub0ludDMyKGFyZ3NbMl0pO1xyXG4gICAgICAgICAgICBfZ2FtZUJvYXJkLlNldFRpbGVUYWcodGFnLCBjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdyaWRQYW5lbCA6IFBhbmVsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQ29sdW1uUm93KExheW91dEl0ZW0gaXRlbSwgaW50IGNvbHVtbiwgaW50IHJvdylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChpdGVtLCBuZXcgeyBjb2x1bW4sIHJvdyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBBYnN0cmFjdCBEZWZhdWx0TGF5b3V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3JpZCgyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkubGF5b3V0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXJcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBIUGFuZWwgOiBQYW5lbFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoTGF5b3V0SXRlbSBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZChjaGlsZCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgQWJzdHJhY3QgRGVmYXVsdExheW91dCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEhCb3goRGVmYXVsdFNwYWNpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBpbnQgRGVmYXVsdFNwYWNpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvbnRhaW5lcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuY29udGFpbmVyXHJcbntcclxuICAgIFxyXG4gICAgcHVibGljIGNsYXNzIFZQYW5lbCA6IFBhbmVsXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIEFic3RyYWN0IERlZmF1bHRMYXlvdXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWQm94KDcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5lbWJlZFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTmF2YmFyTGFiZWwgOiBIdG1sRW1iZWRcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRIdG1sKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBGb3JtYXRMYWJlbFRleHQoRGVmYXVsdFRleHQoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRTdHlsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQFwiZm9udC1mYW1pbHk6J0Jpb1JoeW1lJyxzZXJpZjtmb250LXNpemU6MjVweDtjb2xvcjppdm9yeTtcIjtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdEhlaWdodCgpXHJcbntcclxuICAgIHJldHVybiAzNTtcclxufXByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdE1hcmdpbkJvdHRvbSgpXHJcbntcclxuICAgIHJldHVybiA2O1xyXG59cHJvdGVjdGVkIHZpcnR1YWwgc3RyaW5nIERlZmF1bHRUZXh0KClcclxue1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbn1wcm90ZWN0ZWQgb3ZlcnJpZGUgaW50IERlZmF1bHRXaWR0aCgpXHJcbntcclxuICAgIHJldHVybiAyMDA7XHJcbn1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEZvcm1hdExhYmVsVGV4dChzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICBzdHJpbmcgc3Bhbl9mb3JtYXQgPSBcIjxzcGFuIHN0eWxlPVxcXCJ7MH1cXFwiPnsxfTwvc3Bhbj5cIjtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShzdHJpbmcuRm9ybWF0KHNwYW5fZm9ybWF0LCBEZWZhdWx0U3R5bGUoKSwgdGV4dCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldExhYmVsVGV4dChzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEh0bWwgPSBGb3JtYXRMYWJlbFRleHQodGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENvbmZpZztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5iYXNpYztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJ1dHRvbiA6IEF0b21cclxuICAgIHtcclxuICAgICAgICBGblZvaWQgX2NsaWNrRm47XHJcbiAgICAgICAgc3RyaW5nIF9ldmVudE5hbWU7XHJcbiAgICAgICAgSUV2ZW50SGFuZGxlciBfaGFuZGxlcjtcclxuICAgICAgICBEYXRlVGltZSBfbGFzdENsaWNrZWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCdXR0b24oc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgSGFuZGxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIEV2ZW50TmFtZSA9IGxhYmVsLlRvTG93ZXIoKS5SZXBsYWNlKCcgJywgJ18nKTtcclxuICAgICAgICAgICAgX2xhc3RDbGlja2VkID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJ1dHRvbihzdHJpbmcgbGFiZWwsIElFdmVudEhhbmRsZXIgaGFuZGxlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgICAgIEhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICBFdmVudE5hbWUgPSBsYWJlbC5Ub0xvd2VyKCkuUmVwbGFjZSgnICcsICdfJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnV0dG9uKEJ1dHRvbkNvbmZpZyBjb25maWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYWJlbCA9IGNvbmZpZy5MYWJlbDtcclxuICAgICAgICAgICAgSGFuZGxlciA9IGNvbmZpZy5IYW5kbGVyO1xyXG4gICAgICAgICAgICBFdmVudE5hbWUgPSBjb25maWcuRXZlbnROYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWZ0ZXJJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZuVm9pZCBoYW5kbGVyID0gSGFuZGxlQ2xpY2s7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZuVm9pZCBDbGlja0ZuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jbGlja0ZuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY2xpY2tGbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEV2ZW50TmFtZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfZXZlbnROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZXZlbnROYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgSGFuZGxlQ2xpY2soKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0ZVRpbWUgbm93ID0gRGF0ZVRpbWUuTm93O1xyXG4gICAgICAgICAgICBkb3VibGUgbWlsbGlzZWNvbmRzU2luY2VMYXN0Q2xpY2tlZCA9IChub3cgLSBfbGFzdENsaWNrZWQpLlRvdGFsTWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICBpZiAobWlsbGlzZWNvbmRzU2luY2VMYXN0Q2xpY2tlZCA+IEdsb2JhbENvbnN0YW50cy5CVVRUT05fREVCT1VOQ0VfVEhSRVNIT0xEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbGFzdENsaWNrZWQgPSBub3c7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2NsaWNrRm4gaXMgRm5Wb2lkKVxyXG4gICAgICAgICAgICAgICAgICAgIF9jbGlja0ZuLkNhbGwoKTtcclxuICAgICAgICAgICAgICAgIEhhbmRsZXIuSGFuZGxlRXZlbnQoRXZlbnROYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIElFdmVudEhhbmRsZXIgSGFuZGxlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfaGFuZGxlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2hhbmRsZXIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5CdXR0b25cIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm0ucmVuZGVyZXJcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBTaW5nbGVSZW5kZXJlciA6IEFic3RyYWN0UmVuZGVyZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGludFtdIERlZmF1bHRQYWRkaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgaW50W10geyAxNSwgMjAgfTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmZvcm0ucmVuZGVyZXIuU2luZ2xlXCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmUuc2Nyb2xsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5mb3JtXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTGlzdEJveCA6IEFic3RyYWN0U2Nyb2xsQXJlYVxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGQoc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdEl0ZW0gaXRlbSA9IG5ldyBMaXN0SXRlbVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBMYWJlbCA9IGxhYmVsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5hZGQoaXRlbS5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQ2xlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmF0aXZlT2JqZWN0LnJlbW92ZUFsbCgpO1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0U2VsZWN0aW9uKG5ldyBkeW5hbWljW10geyB9KTtcclxuICAgICAgICB9XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLmZvcm0uTGlzdFwiO1xyXG59XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTZWxlY3RlZExhYmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGR5bmFtaWMgc2VsZWN0aW9uID0gTmF0aXZlT2JqZWN0LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PSAwKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGlvblswXS5nZXRMYWJlbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgT25DaGFuZ2VTZWxlY3Rpb25IYW5kbGVyKEZuVm9pZCBmbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZExpc3RlbmVyKFwiY2hhbmdlU2VsZWN0aW9uXCIsIChnbG9iYWw6OkNTaGFycFdlYkxpYi5xeC5jb25zdGFudHMuRm5Wb2lkKWZuKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShzdHJpbmdbXSBsYWJlbHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbGVhcigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgbGFiZWwgaW4gbGFiZWxzKVxyXG4gICAgICAgICAgICAgICAgQWRkKGxhYmVsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuYmFzaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm1cclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBMaXN0SXRlbSA6IEF0b21cclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5MaXN0SXRlbVwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHRGaWVsZCA6IEFic3RyYWN0RmllbGRcclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5UZXh0RmllbGRcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm0ucmVuZGVyZXJcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBEb3VibGVSZW5kZXJlciA6IEFic3RyYWN0UmVuZGVyZXJcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIERvdWJsZVJlbmRlcmVyKCkgOiBiYXNlKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5yZW5kZXJlci5Eb3VibGVcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm1cclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0QXJlYSA6IEFic3RyYWN0RmllbGQvLywgSVRyYW5zY3JpcHRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIE5ld2xpbmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmFsdWUgKz0gXCJcXG5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFByaW50KG9iamVjdCBtc2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWYWx1ZSArPSBzdHJpbmcuRm9ybWF0KFwiezB9XCIsIG1zZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQcmludExuKG9iamVjdCBtc2cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcmludChtc2cpO1xyXG4gICAgICAgICAgICBOZXdsaW5lKCk7XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5mb3JtLlRleHRBcmVhXCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5tZW51XHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgQ2hlY2tCb3ggOiBBYnN0cmFjdEJ1dHRvblxyXG4gICAge1xyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5tZW51LkNoZWNrQm94XCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubWVudVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIE1lbnVCdXR0b24gOiBBYnN0cmFjdEJ1dHRvblxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBfZXZlbnROYW1lO1xyXG4gICAgICAgIElFdmVudEhhbmRsZXIgX2hhbmRsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNZW51QnV0dG9uKHN0cmluZyBsYWJlbCwgSUV2ZW50SGFuZGxlciBoYW5kbGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGFiZWwgPSBsYWJlbDtcclxuICAgICAgICAgICAgSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgICAgIEV2ZW50TmFtZSA9IGxhYmVsLlRvTG93ZXIoKS5SZXBsYWNlKCcgJywgJ18nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFmdGVySW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGblZvaWQgaGFuZGxlciA9IEhhbmRsZUNsaWNrO1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkTGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXZlbnROYW1lXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9ldmVudE5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9ldmVudE5hbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBIYW5kbGVDbGljaygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIYW5kbGVyLkhhbmRsZUV2ZW50KEV2ZW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSUV2ZW50SGFuZGxlciBIYW5kbGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9oYW5kbGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaGFuZGxlciA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIExhYmVsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE5hdGl2ZU9iamVjdC5nZXRMYWJlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0TGFiZWwodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5tZW51LkJ1dHRvblwiO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5tZW51XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSYWRpb0J1dHRvbiA6IEFic3RyYWN0QnV0dG9uXHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLm1lbnUuQWJzdHJhY3RCdXR0b25cIjtcclxufSAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS50b29sYmFyO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5tZW51YmFyXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTWVudUJhciA6IFRvb2xCYXJcclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubWVudWJhci5NZW51QmFyXCI7XHJcbn0gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDb25maWc7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5kZWNvcmF0aW9uO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS51dGlsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5wb3B1cFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUG9wdXAgOiBQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIGludFtdIF9kZWxheWVkTG9jYXRpb247XHJcbiAgICAgICAgSHRtbEVtYmVkIF9odG1sO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgU2hvd01lc3NhZ2Uoc3RyaW5nIG1lc3NhZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQb3B1cCBwb3B1cCA9IG5ldyBQb3B1cChtZXNzYWdlKTtcclxuICAgICAgICAgICAgcG9wdXAuU2hvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUG9wdXAoc3RyaW5nIG1lc3NhZ2UpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaHRtbC5IdG1sID0gbWVzc2FnZTtcclxuICAgICAgICAgICAgV2lkdGggPSBUZXh0TWVhc3VyZS5HZXRXaWR0aChtZXNzYWdlLCBHbG9iYWxGb250cy5Qb3B1cEZvbnRGYW1pbHksIEdsb2JhbEZvbnRzLlBvcHVwRm9udFNpemUpICsgR2xvYmFsRGltZW5zaW9ucy5Qb3B1cFBhZGRpbmcgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWZ0ZXJGaXJzdFJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkFmdGVyRmlyc3RSZXNpemUoKTtcclxuICAgICAgICAgICAgTW92ZVRvKF9kZWxheWVkTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgQXV0b0hpZGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0QXV0b0hpZGUodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGVjb3JhdG9yIERlZmF1bHREZWNvcmF0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEZWNvcmF0b3JcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgV2lkdGggPSAxLFxyXG4gICAgICAgICAgICAgICAgQ29sb3IgPSBHbG9iYWxDb2xvcnMuUG9wdXBCb3JkZXIsXHJcbiAgICAgICAgICAgICAgICBSYWRpdXMgPSA3XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgaW50IERlZmF1bHRIZWlnaHQoKVxyXG57XHJcbiAgICByZXR1cm4gMzI7XHJcbn1cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBpbnRbXSBEZWZhdWx0TG9jYXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbnRbXSB7IDUsIDQ1IH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW50W10gRGVmYXVsdFBhZGRpbmcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBpbnRbXSB7IEdsb2JhbERpbWVuc2lvbnMuUG9wdXBQYWRkaW5nIH07XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgaW50IERlZmF1bHRXaWR0aCgpXHJcbntcclxuICAgIHJldHVybiAxMzU7XHJcbn1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBfaHRtbCA9IG5ldyBIdG1sRW1iZWQoKTtcclxuICAgICAgICAgICAgQWRkQ2VudGVyKF9odG1sKTtcclxuICAgICAgICAgICAgTW92ZVRvKERlZmF1bHRMb2NhdGlvbigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE1vdmVUbyhpbnRbXSBsb2NhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9kZWxheWVkTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICAgICAgaWYgKCFfaGFzUmVzaXplZClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLkxlbmd0aCAhPSAyKSByZXR1cm47XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5tb3ZlVG8obG9jYXRpb25bMF0sIGxvY2F0aW9uWzFdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFNldFN0eWxlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLlNldFN0eWxlcygpO1xyXG4gICAgICAgICAgICBfaHRtbC5CYWNrZ3JvdW5kQ29sb3IgPSBHbG9iYWxDb2xvcnMuUG9wdXBCYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICBfaHRtbC5TdHlsZUZvbnRTaXplID0gR2xvYmFsRm9udHMuUG9wdXBGb250U2l6ZTtcclxuICAgICAgICAgICAgX2h0bWwuU3R5bGVGb250RmFtaWx5ID0gR2xvYmFsRm9udHMuUG9wdXBGb250RmFtaWx5O1xyXG4gICAgICAgICAgICBfaHRtbC5TdHlsZVRleHRBbGlnbiA9IEdsb2JhbFN0eWxlcy5UZXh0QWxpZ25DZW50ZXI7XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS5wb3B1cC5Qb3B1cFwiO1xyXG59ICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29udGFpbmVyO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkudGFidmlld1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBhZ2UgOiBQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIHN0cmluZyBfbGFiZWw7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBBYnN0cmFjdCBEZWZhdWx0TGF5b3V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR3JvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIExheW91dEl0ZW0gQ29udGVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFkZCh2YWx1ZSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTGFiZWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xhYmVsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbGFiZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRMYWJlbChfbGFiZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50YWJ2aWV3LlBhZ2VcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLnRyZWUuY29yZVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFic3RyYWN0VHJlZUl0ZW0gOiBBYnN0cmFjdEl0ZW1cclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkKEFic3RyYWN0VHJlZUl0ZW0gY2hpbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkKGNoaWxkLk5hdGl2ZU9iamVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmUuc2Nyb2xsO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkudHJlZS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50cmVlXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVHJlZSA6IEFic3RyYWN0U2Nyb2xsQXJlYVxyXG4gICAge1xyXG4gICAgICAgIEFic3RyYWN0VHJlZUl0ZW0gX3Jvb3Q7XHJcblxyXG4gICAgICAgIEFic3RyYWN0VHJlZUl0ZW0gQnVpbGROb2RlKGR5bmFtaWMgbm9kZURhdGEpIHtcclxuICAgICAgICAgICAgQWJzdHJhY3RUcmVlSXRlbSBub2RlO1xyXG4gICAgICAgICAgICBpZiAobm9kZURhdGEuc3ViY2xhc3Nlcy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IFRyZWVGb2xkZXIoKTtcclxuICAgICAgICAgICAgICAgIGZvcmVhY2ggKGR5bmFtaWMgc3Vibm9kZURhdGEgaW4gbm9kZURhdGEuc3ViY2xhc3NlcylcclxuICAgICAgICAgICAgICAgICAgICBub2RlLkFkZChCdWlsZE5vZGUoc3Vibm9kZURhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIG5vZGUgPSBuZXcgVHJlZUZpbGUoKTtcclxuICAgICAgICAgICAgbm9kZS5MYWJlbCA9IG5vZGVEYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBSZWZyZXNoKGR5bmFtaWMgZGF0YSkge1xyXG4gICAgICAgICAgICBSb290ID0gQnVpbGROb2RlKGRhdGEpO1xyXG4gICAgICAgICAgICBSb290Lk5hdGl2ZU9iamVjdC5zZXRPcGVuKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIE5hdGl2ZU9iamVjdC5zZXRSb290T3BlbkNsb3NlKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFic3RyYWN0VHJlZUl0ZW0gUm9vdCB7XHJcbiAgICAgICAgICAgIGdldCB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3Jvb3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IHtcclxuICAgICAgICAgICAgICAgIF9yb290ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBOYXRpdmVPYmplY3Quc2V0Um9vdChfcm9vdC5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50cmVlLlRyZWVcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm07XHJcbnVzaW5nIENTaGFycFdlYkxpYi51dGlsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS53aWRnZXRzLm5hdmJhclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTG9naW5CdXR0b24gOiBTcGxpdEJ1dHRvblxyXG4gICAge1xyXG4gICAgICAgIElFdmVudEhhbmRsZXIgX2hhbmRsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBMb2dpbkJ1dHRvbihJRGVjb3JhdGUgZGVjb3JhdG9yLCBJRXZlbnRIYW5kbGVyIGhhbmRsZXIpIDogYmFzZShcIkxvZ2luXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgICAgIERlY29yYXRlKGRlY29yYXRvcik7XHJcbiAgICAgICAgICAgIEFkZE1lbnVCdXR0b25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZE1lbnVCdXR0b25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIkxvZ2luXCIsIF9oYW5kbGVyKTtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKFwiUmVnaXN0ZXJcIiwgX2hhbmRsZXIpO1xyXG4gICAgICAgICAgICBBZGRCdXR0b24oXCJTZXR0aW5nc1wiLCBfaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLndpZGdldHMubmF2YmFyXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBOYXZWaWV3c0J1dHRvbiA6IFNwbGl0QnV0dG9uXHJcbiAgICB7XHJcbiAgICAgICAgSUV2ZW50SGFuZGxlciBfaGFuZGxlcjtcclxuXHJcbiAgICAgICAgcHVibGljIE5hdlZpZXdzQnV0dG9uKElEZWNvcmF0ZSBkZWNvcmF0b3IsIElFdmVudEhhbmRsZXIgaGFuZGxlcikgOiBiYXNlKFwiVmlld3NcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcclxuICAgICAgICAgICAgRGVjb3JhdGUoZGVjb3JhdG9yKTtcclxuICAgICAgICAgICAgQWRkTWVudUJ1dHRvbnMoKTtcclxuICAgICAgICAgICAgSGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBZGRNZW51QnV0dG9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRCdXR0b24oXCJMYXVuY2hlclwiLCBfaGFuZGxlcik7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIlRyYW5zY3JpcHRcIiwgX2hhbmRsZXIpO1xyXG4gICAgICAgICAgICBBZGRCdXR0b24oXCJDbGFzc0Jyb3dzZXJcIiwgX2hhbmRsZXIpO1xyXG4gICAgICAgICAgICBBZGRCdXR0b24oXCJDb25zb2xlXCIsIF9oYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtO1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXJcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFBvZGNhc3RzQnV0dG9uIDogU3BsaXRCdXR0b25cclxuICAgIHtcclxuICAgICAgICBJRXZlbnRIYW5kbGVyIF9oYW5kbGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgUG9kY2FzdHNCdXR0b24oSURlY29yYXRlIGRlY29yYXRvciwgSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IGJhc2UoXCJQb2RjYXN0c1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICBEZWNvcmF0ZShkZWNvcmF0b3IpO1xyXG4gICAgICAgICAgICBBZGRNZW51QnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQnV0dG9uKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKG5hbWUsIF9oYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIEFkZE1lbnVCdXR0b25zKCk7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtO1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXJcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFZpZGVvc0J1dHRvbiA6IFNwbGl0QnV0dG9uXHJcbiAgICB7XHJcbiAgICAgICAgSUV2ZW50SGFuZGxlciBfaGFuZGxlcjtcclxuXHJcbiAgICAgICAgcHVibGljIFZpZGVvc0J1dHRvbihJRGVjb3JhdGUgZGVjb3JhdG9yLCBJRXZlbnRIYW5kbGVyIGhhbmRsZXIpIDogYmFzZShcIlZpZGVvc1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICBEZWNvcmF0ZShkZWNvcmF0b3IpO1xyXG4gICAgICAgICAgICBBZGRNZW51QnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQnV0dG9uKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKG5hbWUsIF9oYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIEFkZE1lbnVCdXR0b25zKCk7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtO1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXJcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIFZpZXdzQnV0dG9uIDogU3BsaXRCdXR0b25cclxuICAgIHtcclxuICAgICAgICBJRXZlbnRIYW5kbGVyIF9oYW5kbGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgVmlld3NCdXR0b24oSURlY29yYXRlIGRlY29yYXRvciwgSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IGJhc2UoXCJWaWV3c1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG4gICAgICAgICAgICBEZWNvcmF0ZShkZWNvcmF0b3IpO1xyXG4gICAgICAgICAgICBBZGRNZW51QnV0dG9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQWRkQnV0dG9uKHN0cmluZyBuYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKG5hbWUsIF9oYW5kbGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIEFkZE1lbnVCdXR0b25zKCk7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuYmFzaWM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybS5yZW5kZXJlcjtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLndpbmRvd3MuZm9ybVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2luZ2xlRm9ybVdpbmRvdyA6IFdpbmRvd1xyXG4gICAge1xyXG4gICAgICAgIExhYmVsIF9tZXNzYWdlcztcclxuICAgICAgICBEb2NrUGFuZWwgX3BhbmVsO1xyXG4gICAgICAgIFNpbmdsZVJlbmRlcmVyIF9yZW5kZXJlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgX21lc3NhZ2VzID0gbmV3IExhYmVsKCk7XHJcbiAgICAgICAgICAgIF9tZXNzYWdlcy5NYXJnaW5Cb3R0b20gPSA1O1xyXG4gICAgICAgICAgICBfbWVzc2FnZXMuVGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgX3BhbmVsID0gbmV3IERvY2tQYW5lbCgpO1xyXG4gICAgICAgICAgICBfcmVuZGVyZXIgPSBuZXcgU2luZ2xlUmVuZGVyZXIoKTtcclxuICAgICAgICAgICAgX3BhbmVsLkFkZENlbnRlcihfcmVuZGVyZXIpO1xyXG4gICAgICAgICAgICBfcGFuZWwuQWRkU291dGgoX21lc3NhZ2VzKTtcclxuICAgICAgICAgICAgQWRkKF9wYW5lbCwgXCJjZW50ZXJcIik7XHJcbiAgICAgICAgICAgIEFkZEZpZWxkcyhEZWZhdWx0TmFtZXMoKSwgRGVmYXVsdFdpZGdldHMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFkZEZpZWxkcyhMaXN0PHN0cmluZz4gbmFtZXMsIExpc3Q8V2lkZ2V0PiB3aWRnZXRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljPiBuYW1lQXJncyA9IG5ldyBMaXN0PGR5bmFtaWM+KCk7XHJcbiAgICAgICAgICAgIExpc3Q8ZHluYW1pYz4gd2lkZ2V0QXJncyA9IG5ldyBMaXN0PGR5bmFtaWM+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmFtZXMuQ291bnQ7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbmFtZUFyZ3MuQWRkKG5hbWVzW2ldLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgd2lkZ2V0QXJncy5BZGQod2lkZ2V0c1tpXS5OYXRpdmVPYmplY3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9yZW5kZXJlci5OYXRpdmVPYmplY3QuYWRkSXRlbXMod2lkZ2V0QXJncy5Ub0FycmF5KCksIG5hbWVBcmdzLlRvQXJyYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRDYXB0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxvZ2luIFdpbmRvd1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgTGlzdDxzdHJpbmc+IERlZmF1bHROYW1lcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpc3Q8c3RyaW5nPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgTGlzdDxXaWRnZXQ+IERlZmF1bHRXaWRnZXRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGlzdDxXaWRnZXQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBPblJlc2l6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLk9uUmVzaXplKCk7XHJcbiAgICAgICAgICAgIF9tZXNzYWdlcy5XaWR0aCA9IElubmVyV2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE1lc3NhZ2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbWVzc2FnZXMuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmVtYmVkO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS53aW5kb3dzLmltYWdlX3ZpZXdlclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgSW1hZ2VWaWV3ZXJXaW5kb3cgOiBXaW5kb3dcclxuICAgIHtcclxuICAgICAgICBTY3JvbGxhYmxlSW1hZ2UgX3Njcm9sbGFibGVJbWFnZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHN0cmluZyBEZWZhdWx0SW1hZ2VQYXRoKCk7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIF9zY3JvbGxhYmxlSW1hZ2UgPSBuZXcgU2Nyb2xsYWJsZUltYWdlKERlZmF1bHRJbWFnZVBhdGgoKSk7XHJcbiAgICAgICAgICAgIEFkZChfc2Nyb2xsYWJsZUltYWdlLCBcImNlbnRlclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWQ7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQnBXaWRnZXQgOiBTY3JvbGxhYmxlSHRtbCwgSVJlbmRlciwgSVdpZGdldFxyXG4gICAge1xyXG4gICAgICAgIEJwQ29udGFpbmVyIF9jb250YWluZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5BZGRDb250ZW50KCk7XHJcbiAgICAgICAgICAgIEFkZFBhbmVscygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIExpc3Q8QnBFbGVtZW50PiBQYW5lbHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFkZFBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJwQ29udGFpbmVyIENvbnRhaW5lclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfY29udGFpbmVyID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRhaW5lciA9IENyZWF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb250YWluZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIEJwQ29udGFpbmVyIENyZWF0ZUNvbnRhaW5lcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJwQ29udGFpbmVyKHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0cmluZ0J1aWxkZXIgU2IgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBIdG1sID0gQ29udGFpbmVyLlJlbmRlcigpOyA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQnBXaWRnZXQgR2V0V2lkZ2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlIExpc3Q8QnBFbGVtZW50PiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUGFuZWxzPW5ldyBMaXN0PEJwRWxlbWVudD4oKTtwcml2YXRlIFN0cmluZ0J1aWxkZXIgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1NiPW5ldyBTdHJpbmdCdWlsZGVyKCk7fVxyXG59XHJcbiIsInVzaW5nIENvbmZpZztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWRcclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBDU2hhcnBXZWJMYWJlbCA6IE5hdmJhckxhYmVsXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGludCBEZWZhdWx0TWFyZ2luVG9wKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBEZWZhdWx0U3R5bGUoKVxyXG57XHJcbiAgICByZXR1cm4gR2xvYmFsQ29uc3RhbnRzLkNTaGFycFdlYkxhYmVsU3R5bGU7XHJcbn1wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRUZXh0KClcclxue1xyXG4gICAgcmV0dXJuIEdsb2JhbENvbnN0YW50cy5DU2hhcnBXZWJMYWJlbDtcclxufXByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdFdpZHRoKClcclxue1xyXG4gICAgcmV0dXJuIEdsb2JhbENvbnN0YW50cy5DU2hhcnBXZWJMYWJlbFdpZHRoO1xyXG59ICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmVtYmVkXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgTmV3c1BhbmVsIDogU2Nyb2xsYWJsZUh0bWxcclxuICAgIHtcclxuICAgICAgICBOZXdzV3JpdGVyIF93cml0ZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnRbXSBEZWZhdWx0UGFkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgNywgMTIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBib29sIERlZmF1bHRTY3JvbGxYKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRGVmYXVsdFN0eWxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgTmV3c1dyaXRlciBEZWZhdWx0V3JpdGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTmV3c1dyaXRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBHZW5lcmF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3dyaXRlciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX3dyaXRlciA9IERlZmF1bHRXcml0ZXIoKTtcclxuICAgICAgICAgICAgX3dyaXRlci5HZW5lcmF0ZSgpO1xyXG4gICAgICAgICAgICBIdG1sID0gX3dyaXRlci5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgU2V0U3R5bGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuU2V0U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIFNldFN0eWxlKFwiZm9udFNpemVcIiwgXCIxM3B4XCIpO1xyXG4gICAgICAgICAgICBTZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgXCJoZWx2ZXRpY2EsYXJpYWwsdmVyZGFuYSxzYW5zLXNlcmlmXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNjcm9sbGFibGVJbWFnZSA6IFNjcm9sbGFibGVIdG1sXHJcbiAgICB7XHJcbiAgICAgICAgc3RyaW5nIF9pbWFnZVNyYztcclxuXHJcbiAgICAgICAgcHVibGljIFNjcm9sbGFibGVJbWFnZShzdHJpbmcgaW1hZ2VTcmMpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaW1hZ2VTcmMgPSBpbWFnZVNyYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRGVmYXVsdEh0bWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmluZy5Gb3JtYXQoXCI8aW1nIHNyYz1cXFwiezB9XFxcIj5cIiwgX2ltYWdlU3JjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5lbWJlZFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFR1dG9yaWFsUGFuZWwgOiBTY3JvbGxhYmxlSHRtbFxyXG4gICAge1xyXG4gICAgICAgIElTZXJ2ZXJBcGkgX3NlcnZlckFwaTtcclxuXHJcbiAgICAgICAgcHVibGljIFR1dG9yaWFsUGFuZWwoSVNlcnZlckFwaSBzZXJ2ZXJBcGkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgX3NlcnZlckFwaSA9IHNlcnZlckFwaTtcclxuICAgICAgICAgICAgTG9hZEh0bWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnRbXSBEZWZhdWx0UGFkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgNywgMTIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRGVmYXVsdFN0eWxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBMb2FkSHRtbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0h0bWwgPSBcIlwiO1xyXG4gICAgICAgICAgICAvL3ZvaWQgZm4oZHluYW1pYyBodG1sKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgSHRtbCArPSBodG1sO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9fc2VydmVyQXBpLkdldEh0bWwoVHV0b3JpYWxQYXRoLCBcIm92ZXJ2aWV3Lmh0bWxcIiwgZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgU2V0U3R5bGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuU2V0U3R5bGVzKCk7XHJcbiAgICAgICAgICAgIFNldFN0eWxlKFwiZm9udFNpemVcIiwgXCIxM3B4XCIpO1xyXG4gICAgICAgICAgICBTZXRTdHlsZShcImZvbnRGYW1pbHlcIiwgXCJoZWx2ZXRpY2EsYXJpYWwsdmVyZGFuYSxzYW5zLXNlcmlmXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RyaW5nIFR1dG9yaWFsUGF0aFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImRvY3MvdHV0b3JpYWxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLm1lbnU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm1cclxue1xyXG5cclxuICAgIHB1YmxpYyBjbGFzcyBGb3JtTWVudUJ1dHRvbiA6IEJ1dHRvblxyXG4gICAge1xyXG4gICAgICAgIE1lbnUgX21lbnU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBGb3JtTWVudUJ1dHRvbihzdHJpbmcgbGFiZWwpIDogYmFzZShsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1lbnUgPSBuZXcgTWVudSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEZvcm1NZW51QnV0dG9uIEFkZEJ1dHRvbihzdHJpbmcgbGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGb3JtTWVudUJ1dHRvbiBidXR0b24gPSBuZXcgRm9ybU1lbnVCdXR0b24obGFiZWwpO1xyXG4gICAgICAgICAgICBNZW51LkFkZChidXR0b24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE1lbnUgTWVudVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbWVudTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX21lbnUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5NZW51QnV0dG9uXCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtLnJlbmRlcmVyO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRm9ybVBhbmVsIDogU2luZ2xlUmVuZGVyZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRGaWVsZHMoTGlzdDxzdHJpbmc+IG5hbWVzLCBMaXN0PFdpZGdldD4gd2lkZ2V0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8ZHluYW1pYz4gbmFtZUFyZ3MgPSBuZXcgTGlzdDxkeW5hbWljPigpO1xyXG4gICAgICAgICAgICBMaXN0PGR5bmFtaWM+IHdpZGdldEFyZ3MgPSBuZXcgTGlzdDxkeW5hbWljPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWVzLkNvdW50OyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5hbWVBcmdzLkFkZChuYW1lc1tpXS5Ub1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHdpZGdldEFyZ3MuQWRkKHdpZGdldHNbaV0uTmF0aXZlT2JqZWN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QuYWRkSXRlbXMod2lkZ2V0QXJncy5Ub0FycmF5KCksIG5hbWVBcmdzLlRvQXJyYXkoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkuZm9ybVxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFBhc3N3b3JkRmllbGQgOiBUZXh0RmllbGRcclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkuZm9ybS5QYXNzd29yZEZpZWxkXCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ29uZmlnO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS5mb3JtXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUcmFuc2NyaXB0UGFuZWwgOiBUZXh0QXJlYVxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBOZXdsaW5lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuTmV3bGluZSgpO1xyXG4gICAgICAgICAgICBTY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgU2V0U3R5bGVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0eWxlRm9udEZhbWlseSA9IEdsb2JhbEZvbnRzLlRyYW5zY3JpcHRGb250RmFtaWx5O1xyXG4gICAgICAgICAgICBTdHlsZUZvbnRTaXplID0gR2xvYmFsRm9udHMuVHJhbnNjcmlwdEZvbnRTaXplO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm07XHJcbnVzaW5nIENTaGFycFdlYkxpYi51dGlsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50b29sYmFyXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVG9vbGJhckJ1dHRvbiA6IEJ1dHRvblxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUb29sYmFyQnV0dG9uKHN0cmluZyBsYWJlbCkgOiBiYXNlKGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUb29sYmFyQnV0dG9uKHN0cmluZyBsYWJlbCwgSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IGJhc2UobGFiZWwsIGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRvb2xiYXJCdXR0b24oQnV0dG9uQ29uZmlnIGNvbmZpZykgOiBiYXNlKGNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIFF4Q2xhc3MoKVxyXG57XHJcbiAgICByZXR1cm4gXCJxeC51aS50b29sYmFyLkJ1dHRvblwiO1xyXG59XHJcbiAgICB9XHJcblxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS50cmVlLmNvcmU7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLnRyZWVcclxue1xyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xhc3MgVHJlZUZpbGUgOiBBYnN0cmFjdFRyZWVJdGVtXHJcbiAgICB7XHJcbnByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgUXhDbGFzcygpXHJcbntcclxuICAgIHJldHVybiBcInF4LnVpLnRyZWUuVHJlZUZpbGVcIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkudHJlZS5jb3JlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS50cmVlXHJcbntcclxuXHJcbiAgICBwdWJsaWMgY2xhc3MgVHJlZUZvbGRlciA6IEFic3RyYWN0VHJlZUl0ZW1cclxuICAgIHtcclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkudHJlZS5UcmVlRm9sZGVyXCI7XHJcbn1cclxuICAgIH1cclxuXHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZGVjb3JhdGlvbjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmZvcm07XHJcbnVzaW5nIENTaGFycFdlYkxpYi51dGlsO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0c1xyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJ1dHRvbkJhciA6IEhQYW5lbCwgSUV2ZW50SGFuZGxlclxyXG4gICAge1xyXG4gICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBCdXR0b24+IF9idXR0b25zID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBCdXR0b24+KCk7XHJcbiAgICAgICAgcHJvdGVjdGVkIElFdmVudEhhbmRsZXIgX3Byb3h5RXZlbnRIYW5kbGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgQnV0dG9uQmFyKElFdmVudEhhbmRsZXIgcHJveHlFdmVudEhhbmRsZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Byb3h5RXZlbnRIYW5kbGVyID0gcHJveHlFdmVudEhhbmRsZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZENvbmZpZyhCdXR0b25Db25maWcgY29uZmlnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5GbGV4ID4gMClcclxuICAgICAgICAgICAgICAgIEFkZEZsZXgoY29uZmlnLkZsZXgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcuV2lkdGggPiAwKVxyXG4gICAgICAgICAgICAgICAgQWRkV2lkdGgoY29uZmlnLldpZHRoKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgQWRkQnV0dG9uKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRDb25maWdzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZENvbmZpZ3MoRGVmYXVsdEJ1dHRvbnMoKSk7XHJcbiAgICAgICAgICAgIEFkanVzdEJ1dHRvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZENvbmZpZ3MoQnV0dG9uQ29uZmlnW10gY29uZmlncylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEJ1dHRvbkNvbmZpZyBjb25maWcgaW4gY29uZmlncylcclxuICAgICAgICAgICAgICAgIEFkZENvbmZpZyhjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBZGRCdXR0b24oQnV0dG9uQ29uZmlnIGNvbmZpZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1dHRvbiBidXR0b24gPSBuZXcgQnV0dG9uKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIF9idXR0b25zW2NvbmZpZy5FdmVudE5hbWVdID0gYnV0dG9uO1xyXG4gICAgICAgICAgICBBZGQoYnV0dG9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQWRkRmxleChpbnQgZmxleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpZGdldCB3aWRnZXQgPSBuZXcgV2lkZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhlaWdodCA9IDEsXHJcbiAgICAgICAgICAgICAgICBXaWR0aCA9IDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgQWRkKHdpZGdldCwgbmV3IHsgZmxleCA9IGZsZXggfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZFdpZHRoKGludCB3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpZGdldCB3aWRnZXQgPSBuZXcgV2lkZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEhlaWdodCA9IDEsXHJcbiAgICAgICAgICAgICAgICBXaWR0aCA9IHdpZHRoXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEFkZCh3aWRnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZGp1c3RCdXR0b25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRCYWNrZ3JvdW5kQ29sb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiI2NjY1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERlY29yYXRvciBEZWZhdWx0RGVjb3JhdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGVjb3JhdG9yKCkgeyBDb2xvclRvcCA9IENvbG9ycy5Db2xvclNsYXRlR3JheSwgV2lkdGhUb3AgPSAxIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBCdXR0b25Db25maWdbXSBEZWZhdWx0QnV0dG9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZ1tdIHsgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnRbXSBEZWZhdWx0UGFkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgMywgNyB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEJ1dHRvbiBHZXRCdXR0b24oc3RyaW5nIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1dHRvbiBidXR0b247XHJcbiAgICAgICAgICAgIF9idXR0b25zLlRyeUdldFZhbHVlKGtleSwgb3V0IGJ1dHRvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBidXR0b247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9wcm94eUV2ZW50SGFuZGxlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX3Byb3h5RXZlbnRIYW5kbGVyLkhhbmRsZUV2ZW50KGV2ZW50TmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCdXR0b25CYWNrZ3JvdW5kQ29sb3Ioc3RyaW5nIGtleSwgc3RyaW5nIGNvbG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnV0dG9uIGJ1dHRvbiA9IEdldEJ1dHRvbihrZXkpO1xyXG4gICAgICAgICAgICBpZiAoYnV0dG9uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBidXR0b24uQmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCdXR0b25FbmFibGVkKHN0cmluZyBrZXksIGJvb2wgaXNFbmFibGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnV0dG9uIGJ1dHRvbiA9IEdldEJ1dHRvbihrZXkpO1xyXG4gICAgICAgICAgICBpZiAoYnV0dG9uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBidXR0b24uRW5hYmxlZCA9IGlzRW5hYmxlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJ1dHRvbkVuYWJsZWRTdGF0ZXMoc3RyaW5nW10gYnV0dG9ucywgYm9vbCBpc0VuYWJsZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgYnV0dG9uIGluIGJ1dHRvbnMpXHJcbiAgICAgICAgICAgICAgICBTZXRCdXR0b25FbmFibGVkKGJ1dHRvbiwgaXNFbmFibGVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEJ1dHRvbkxhYmVsKHN0cmluZyBrZXksIHN0cmluZyBsYWJlbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1dHRvbiBidXR0b24gPSBHZXRCdXR0b24oa2V5KTtcclxuICAgICAgICAgICAgaWYgKGJ1dHRvbiAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgYnV0dG9uLkxhYmVsID0gbGFiZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCdXR0b25WaXNpYmlsaXRpZXMoc3RyaW5nW10gYnV0dG9ucywgYm9vbCBpc1Zpc2libGUgPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIGJ1dHRvbiBpbiBidXR0b25zKVxyXG4gICAgICAgICAgICAgICAgU2V0QnV0dG9uVmlzaWJpbGl0eShidXR0b24sIGlzVmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRCdXR0b25WaXNpYmlsaXR5KHN0cmluZyBrZXksIGJvb2wgaXNWaXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnV0dG9uIGJ1dHRvbiA9IEdldEJ1dHRvbihrZXkpO1xyXG4gICAgICAgICAgICBpZiAoYnV0dG9uICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWaXNpYmxlKSBidXR0b24uU2hvdygpOyBlbHNlIGJ1dHRvbi5IaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29udGFpbmVyO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmxheW91dDtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLnF4LnVpLndpZGdldHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVCb2FyZCA6IEdyaWRQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIEZuVm9pZE4gX2NsaWNrRm47XHJcbiAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIEdhbWVUaWxlPiBfdGlsZXM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lQm9hcmQoaW50IHNpemUpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCb2FyZFNpemUgPSBzaXplO1xyXG4gICAgICAgICAgICBBZGRUaWxlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBZGRUaWxlKGludCBjb2x1bW4sIGludCByb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lVGlsZSBidXR0b24gPSBuZXcgR2FtZVRpbGUoXCJcIiwgXCJ3aGl0ZVwiLCBcImNoYXJjb2FsXCIpO1xyXG4gICAgICAgICAgICBidXR0b24uU2V0VXNlckRhdGEoXCJ0YWdcIiwgXCJcIik7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5TZXRVc2VyRGF0YShcImNvbHVtblwiLCBjb2x1bW4pO1xyXG4gICAgICAgICAgICBidXR0b24uU2V0VXNlckRhdGEoXCJyb3dcIiwgcm93KTtcclxuICAgICAgICAgICAgQWRkQ29sdW1uUm93KGJ1dHRvbiwgY29sdW1uLCByb3cpO1xyXG4gICAgICAgICAgICBzdHJpbmcgdGFnID0gVGlsZVRhZyhjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgICAgIF90aWxlc1t0YWddID0gYnV0dG9uO1xyXG4gICAgICAgICAgICBidXR0b24uQ2xpY2tGbiA9ICgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE9uQ2xpY2soYnV0dG9uKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQWRkVGlsZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBCb2FyZFNpemU7IHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBCb2FyZFNpemU7IHkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZGRUaWxlKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgaW50IEJvYXJkU2l6ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHN0cmluZyBUaWxlVGFnKGludCBjb2x1bW4sIGludCByb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nLkZvcm1hdChcImNvbC17MH0tcm93LXsxfVwiLCBjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBHYW1lVGlsZSBHZXRUaWxlKGludCBjb2x1bW4sIGludCByb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdHJpbmcgdGFnID0gVGlsZVRhZyhjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgICAgIGlmIChfdGlsZXMuQ29udGFpbnNLZXkodGFnKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGlsZXNbdGFnXTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRCYWNrZ3JvdW5kQ29sb3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbG9ycy5Db2xvckxpZ2h0ZXJHcmF5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgX3RpbGVzID0gbmV3IERpY3Rpb25hcnk8c3RyaW5nLCBHYW1lVGlsZT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25DbGljayhCdXR0b24gYnRuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGNvbHVtbiA9IGJ0bi5HZXRVc2VyRGF0YShcImNvbHVtblwiKTtcclxuICAgICAgICAgICAgaW50IHJvdyA9IGJ0bi5HZXRVc2VyRGF0YShcInJvd1wiKTtcclxuICAgICAgICAgICAgaWYgKF9jbGlja0ZuICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdFtdIGFyZ3MgPSBuZXcgb2JqZWN0W10geyBjb2x1bW4sIHJvdyB9O1xyXG4gICAgICAgICAgICAgICAgX2NsaWNrRm4uQ2FsbChudWxsLCBuZXcgb2JqZWN0W10geyBhcmdzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChCdXR0b24gYnRuIGluIF90aWxlcy5WYWx1ZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5TZXRVc2VyRGF0YShcInRhZ1wiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5MYWJlbCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2l6ZVRpbGVzKGludCBzaXplKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGNvbHVtbldpZHRoID0gc2l6ZSAvIEJvYXJkU2l6ZTtcclxuICAgICAgICAgICAgaW50IHJvd0hlaWdodCA9IHNpemUgLyBCb2FyZFNpemU7XHJcbiAgICAgICAgICAgIEdyaWQgZ3JpZExheW91dCA9IChHcmlkKV9sYXlvdXQ7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgQm9hcmRTaXplOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdyaWRMYXlvdXQuc2V0Um93SGVpZ2h0KGksIHJvd0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBncmlkTGF5b3V0LnNldENvbHVtbldpZHRoKGksIGNvbHVtbldpZHRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0Q2xpY2tGbihGblZvaWROIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NsaWNrRm4gPSBmbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFNpemUoaW50IHNpemUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCb2FyZFNpemUgPSBzaXplO1xyXG4gICAgICAgICAgICBfdGlsZXMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgUmVtb3ZlQWxsKCk7XHJcbiAgICAgICAgICAgIEFkZFRpbGVzKCk7XHJcbiAgICAgICAgICAgIEZpcmVFdmVudChcInJlc2l6ZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyVGlsZUljb24oaW50IGNvbHVtbiwgaW50IHJvdylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVUaWxlIHRpbGUgPSBHZXRUaWxlKGNvbHVtbiwgcm93KTtcclxuICAgICAgICAgICAgaWYgKHRpbGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGlsZS5JY29uID0gbnVsbDtcclxuICAgICAgICAgICAgdGlsZS5TZXRVc2VyRGF0YShcImljb25cIiwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBNb3ZlVGlsZUljb24oaW50IGZyb21Db2x1bW4sIGludCBmcm9tUm93LCBpbnQgdG9Db2x1bW4sIGludCB0b1JvdylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVUaWxlIGZyb21UaWxlID0gR2V0VGlsZShmcm9tQ29sdW1uLCBmcm9tUm93KTtcclxuICAgICAgICAgICAgR2FtZVRpbGUgdG9UaWxlID0gR2V0VGlsZSh0b0NvbHVtbiwgdG9Sb3cpO1xyXG4gICAgICAgICAgICBpZiAoZnJvbVRpbGUgPT0gbnVsbCB8fCB0b1RpbGUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgc3RyaW5nIGljb24gPSBmcm9tVGlsZS5JY29uO1xyXG4gICAgICAgICAgICBmcm9tVGlsZS5JY29uID0gbnVsbDtcclxuICAgICAgICAgICAgZnJvbVRpbGUuU2V0VXNlckRhdGEoXCJpY29uXCIsIG51bGwpO1xyXG4gICAgICAgICAgICB0b1RpbGUuQ2VudGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdG9UaWxlLkdhcCA9IDA7XHJcbiAgICAgICAgICAgIHRvVGlsZS5MYWJlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRvVGlsZS5TZXRVc2VyRGF0YShcImljb25cIiwgaWNvbik7XHJcbiAgICAgICAgICAgIHRvVGlsZS5JY29uID0gaWNvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFRpbGVJY29uKHN0cmluZyBuYW1lLCBpbnQgY29sdW1uLCBpbnQgcm93KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIGljb24gPSBzdHJpbmcuRm9ybWF0KFwiYXNzZXRzL2ltYWdlcy97MH1cIiwgbmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghaWNvbi5Db250YWlucyhcIi5cIikpXHJcbiAgICAgICAgICAgICAgICBpY29uICs9IFwiLmpwZ1wiO1xyXG4gICAgICAgICAgICBHYW1lVGlsZSB0aWxlID0gR2V0VGlsZShjb2x1bW4sIHJvdyk7XHJcbiAgICAgICAgICAgIGlmICh0aWxlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRpbGUuQ2VudGVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGlsZS5HYXAgPSAwO1xyXG4gICAgICAgICAgICB0aWxlLkxhYmVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGlsZS5TZXRVc2VyRGF0YShcImljb25cIiwgaWNvbik7XHJcbiAgICAgICAgICAgIHRpbGUuSWNvbiA9IGljb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRUaWxlVGFnKHN0cmluZyB0YWcsIGludCBjb2x1bW4sIGludCByb3cpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lVGlsZSBidG4gPSBHZXRUaWxlKGNvbHVtbiwgcm93KTtcclxuICAgICAgICAgICAgYnRuLlNldFVzZXJEYXRhKFwidGFnXCIsIHRhZyk7XHJcbiAgICAgICAgICAgIGJ0bi5MYWJlbCA9IHN0cmluZy5Gb3JtYXQoXCI8aDE+ezB9PC9oMT5cIiwgdGFnLlRvVXBwZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImEgR2FtZUJvYXJkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5xeC51aS53aWRnZXRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lVGlsZSA6IEJ1dHRvblxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZVRpbGUoc3RyaW5nIGxhYmVsKSA6IGJhc2UobGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXRSaWNoKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdhbWVUaWxlKHN0cmluZyBsYWJlbCwgc3RyaW5nIGJhY2tncm91bmRDb2xvcikgOiB0aGlzKGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdhbWVUaWxlKHN0cmluZyBsYWJlbCwgc3RyaW5nIGJhY2tncm91bmRDb2xvciwgc3RyaW5nIHRleHRDb2xvcikgOiB0aGlzKGxhYmVsLCBiYWNrZ3JvdW5kQ29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXRUZXh0Q29sb3IodGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb25zdGFudHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5iYXNpYztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5kZWNvcmF0aW9uO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZW1iZWQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5tZW51YmFyO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkudG9vbGJhcjtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXJcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIE5hdmJhciA6IE1lbnVCYXJcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgYm9vbCBfaXNEZXNrdG9wTW9kZTtcclxuICAgICAgICBOYXZiYXJMYWJlbCBfbGFiZWw7XHJcbiAgICAgICAgSW1hZ2UgX2xvZ287XHJcbiAgICAgICAgVmlld3BvcnQgX3ZpZXdwb3J0O1xyXG5cclxuICAgICAgICBwdWJsaWMgTmF2YmFyKFZpZXdwb3J0IHZpZXdwb3J0KSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lzRGVza3RvcE1vZGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgX3ZpZXdwb3J0ID0gdmlld3BvcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFkZEJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQWRkTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xhYmVsID0gQ3JlYXRlTGFiZWwoKTtcclxuICAgICAgICAgICAgQWRkKF9sYWJlbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZExvZ28oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2xvZ28gPSBuZXcgSW1hZ2UoXCJhc3NldHMvaW1hZ2VzL3BwX2NpcmNsZV9sb2dvLmpwZ1wiLCAzNSwgMzUpO1xyXG4gICAgICAgICAgICBfbG9nby5NYXJnaW5Ub3AgPSAzO1xyXG4gICAgICAgICAgICBBZGQoX2xvZ28pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgU2V0RGF0YU1vZGUoYm9vbCBpc0Rlc2t0b3BNb2RlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2lzRGVza3RvcE1vZGUgPSBpc0Rlc2t0b3BNb2RlO1xyXG4gICAgICAgICAgICBfdmlld3BvcnQuU2V0V29ya3NwYWNlTW9kZShfaXNEZXNrdG9wTW9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBOYXZiYXJMYWJlbCBDcmVhdGVMYWJlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE5hdmJhckxhYmVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgVG9vbGJhckJ1dHRvbiBBZGROYXZiYXJCdXR0b24oc3RyaW5nIGxhYmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVG9vbGJhckJ1dHRvbiBidXR0b24gPSBBZGRCdXR0b24obGFiZWwpO1xyXG4gICAgICAgICAgICBEZWNvcmF0ZShidXR0b24pO1xyXG4gICAgICAgICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRGVjb3JhdGUoV2lkZ2V0IHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERlY29yYXRvciBkZWNvcmF0b3IgPSBuZXcgRGVjb3JhdG9yKCk7XHJcbiAgICAgICAgICAgIGRlY29yYXRvci5CYWNrZ3JvdW5kQ29sb3IgPSBEZWZhdWx0QmFja2dyb3VuZENvbG9yKCk7XHJcbiAgICAgICAgICAgIHdpZGdldC5EZWNvcmF0b3IgPSBkZWNvcmF0b3I7XHJcbiAgICAgICAgICAgIHdpZGdldC5UZXh0Q29sb3IgPSBDb2xvcnMuQ29sb3JXaGl0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRGVmYXVsdEJhY2tncm91bmRDb2xvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ29sb3JzLkNvbG9yTmF2YmFyQmx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnRbXSBEZWZhdWx0UGFkZGluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgMCwgMjUgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIEFkZExhYmVsKCk7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29yZTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIE5hdk1lbnVQYW5lbCA6IEJwV2lkZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgQnBCdXR0b24gZm9jdXNCdXR0b247XHJcblxyXG4gICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBCcEJ1dHRvbj4gQnV0dG9ucyB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBOYXZNZW51UGFuZWwoTmF2UGFuZWwgbmF2UGFuZWwsIENvbnRlbnRQYW5lbCBjb250ZW50UGFuZWwpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXZQYW5lbCA9IG5hdlBhbmVsO1xyXG4gICAgICAgICAgICBDb250ZW50UGFuZWwgPSBjb250ZW50UGFuZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZEJ1dHRvbihzdHJpbmcgbmFtZSwgc3RyaW5nIHRhZywgRm5Wb2lkIGZuID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQnV0dG9uIGJ1dHRvbiA9IG5ldyBCcEJ1dHRvbihuYW1lLCB0aGlzLCBmbik7XHJcbiAgICAgICAgICAgIGlmIChmb2N1c0J1dHRvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgZm9jdXNCdXR0b24gPSBidXR0b247XHJcbiAgICAgICAgICAgIEJ1dHRvbnMuU2V0KHRhZywgYnV0dG9uKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLkFkZENoaWxkKGJ1dHRvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRCdXR0b24oc3RyaW5nIHRleHQsIHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG5TeXN0ZW0uQWN0aW9uIEZuID0gbnVsbDtcbiAgICAgICAgICAgIFxyXG5GbiA9ICgpID0+XHJcbntcclxuICAgIE9uQnV0dG9uQ2xpY2tlZCh0YWcpO1xyXG59XHJcblxyXG47XG4gICAgICAgICAgICBBZGRCdXR0b24odGV4dCwgdGFnLCAoZ2xvYmFsOjpDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZClGbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEFkZFBhZ2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRQYWdlKFdpZGdldCBwYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkUGFnZUJ1dHRvbihwYWdlKTtcclxuICAgICAgICAgICAgQ29udGVudFBhbmVsLkFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRQYWdlQnV0dG9uKFdpZGdldCBwYWdlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCEocGFnZSBpcyBJUGFnZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbigocGFnZSBhcyBJUGFnZSkuQnV0dG9uTGFiZWwoKSwgKHBhZ2UgYXMgSVBhZ2UpLlRhZ05hbWUoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgQ29udGVudFBhbmVsIENvbnRlbnRQYW5lbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBOYXZQYW5lbCBOYXZQYW5lbCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBib29sIEhhbmRsZXNBcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRCYWNrQnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIkJhY2tcIiwgXCJiYWNrXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25BcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGFpbmVyLk1hcEV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbkJ1dHRvbkNsaWNrZWQoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1dHRvbnMuVHJ5R2V0VmFsdWUodGFnLCBvdXQgZm9jdXNCdXR0b24pO1xyXG4gICAgICAgICAgICBTZWxlY3ROYXZQYW5lbCh0YWcpO1xyXG4gICAgICAgICAgICBTZWxlY3RDb250ZW50UGFnZSh0YWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2hvd0RlZmF1bHRQYWdlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNob3dQYWdlKEdldERlZmF1bHRQYWdlKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgU2hvd1BhZ2Uoc3RyaW5nIHBhZ2VOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RyaW5nIHRhZyA9IEdldFRhZygpO1xyXG4gICAgICAgICAgICBzdHJpbmcgcGFnZUtleSA9IHBhZ2VOYW1lLlN0YXJ0c1dpdGgodGFnKSA/IHBhZ2VOYW1lIDogc3RyaW5nLkZvcm1hdChcInswfV97MX1cIiwgdGFnLCBwYWdlTmFtZSk7XHJcbiAgICAgICAgICAgIENvbnRlbnRQYW5lbC5TZWxlY3RQYWdlKHBhZ2VLZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRm9jdXNMYXN0QnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChmb2N1c0J1dHRvbiAhPSBudWxsICYmIGZvY3VzQnV0dG9uLldpZGdldCBpcyBXaWRnZXQpXHJcbiAgICAgICAgICAgICAgICAoZm9jdXNCdXR0b24uV2lkZ2V0IGFzIFdpZGdldCkuRm9jdXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBzdHJpbmcgR2V0RGVmYXVsdFBhZ2UoKTtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IHN0cmluZyBHZXRUYWcoKTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IHZvaWQgU2VsZWN0TmF2UGFuZWwoc3RyaW5nIHRhZyk7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCB2b2lkIFNlbGVjdENvbnRlbnRQYWdlKHN0cmluZyB0YWcpO1xyXG5cbiAgICBcbnByaXZhdGUgXHJcbiAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIEJwQnV0dG9uPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQnV0dG9ucz1uZXcgRGljdGlvbmFyeTxzdHJpbmcsIEJwQnV0dG9uPigpO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIucXgudWkubWVudWJhclxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEJ1dHRvbiA6IEZvcm1NZW51QnV0dG9uXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBCdXR0b24oc3RyaW5nIGxhYmVsKSA6IGJhc2UobGFiZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBReENsYXNzKClcclxue1xyXG4gICAgcmV0dXJuIFwicXgudWkubWVudWJhci5CdXR0b25cIjtcclxufVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcDtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHNcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIENhcmRQYWdlIDogQnBQYWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkUGFuZWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhcmQgPSBuZXcgQnBDYXJkKFBhZ2VUaXRsZSgpLCB0aGlzKTtcclxuICAgICAgICAgICAgQ29udGFpbmVyLkFkZENoaWxkKENhcmQpO1xyXG4gICAgICAgICAgICBBZGRDYXJkUGFuZWxzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRDYXJkUGFuZWwoQnBFbGVtZW50IGNoaWxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FyZC5Db250YWluZXIuQWRkQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgQWRkQ2FyZFBhbmVsV2l0aFNwYWNlcihCcEVsZW1lbnQgY2hpbGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRDYXJkUGFuZWwoY2hpbGQpO1xyXG4gICAgICAgICAgICBBZGRDYXJkUGFuZWwobmV3IEJwQnIodGhpcywgMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZGRDYXJkUGFuZWxzKClcclxuICAgICAgICB7ICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBCcENhcmQgQ2FyZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdCn0K
