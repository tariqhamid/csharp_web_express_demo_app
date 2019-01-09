/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("CSharpWebApp", function ($asm, globals) {
    "use strict";

    Bridge.define("CSharpWebApp.App", {
        statics: {
            methods: {
                Start: function (root) {
                    CSharpWebApp.app.Application.Instance.Start(root);
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.api.ServerApi", {
        statics: {
            fields: {
                Instance: null
            },
            ctors: {
                init: function () {
                    this.Instance = new CSharpWebApp.app.api.ServerApi();
                }
            },
            methods: {
                GetClients: function (fn) {
                    CSharpWebApp.app.api.ServerApi.Send("clients", fn);
                },
                GetProducts: function (fn) {
                    CSharpWebApp.app.api.ServerApi.Send("products", fn);
                },
                GetOrders: function (fn) {
                    CSharpWebApp.app.api.ServerApi.Send("orders", fn);
                },
                Send: function (path, fn) {
                    var $t;
                    var xhr = ($t = new CSharpWebLib.qx.io.request.Xhr(), $t.Method = "GET", $t.Url = System.String.format("/data/{0}.json", [path]), $t);
                    xhr.AddListener("success", function () {
                        CSharpWebApp.app.api.ServerApi.OnSuccess(xhr, fn);
                    });
                    xhr.Send();
                },
                OnSuccess: function (xhr, fn) {
                    var response = xhr.Response;
                    if (Bridge.hasValue(fn)) {
                        fn(response);
                    }
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.Application", {
        inherits: [CSharpWebLib.qx.core.Qobject],
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (CSharpWebApp.app.Application._instance == null) {
                            CSharpWebApp.app.Application._instance = new CSharpWebApp.app.Application();
                        }
                        return CSharpWebApp.app.Application._instance;
                    }
                }
            }
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                CSharpWebLib.qx.core.Qobject.ctor.call(this);
            }
        },
        methods: {
            Init: function () {
                this.NativeObject = qxlib.app.App.getInstance();
            },
            Start: function (root) {
                var viewport = CSharpWebApp.app.ui.viewport.ApplicationViewport.CreateViewport();
                root.add(viewport.NativeObject, { top: 0, right: 0, bottom: 0, left: 0 });
                CSharpWebApp.app.data.DataManager.LoadData();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.AbstractDataRecord", {
        fields: {
            Id: 0,
            RawData: null
        },
        ctors: {
            init: function () {
                this.Id = -1;
            }
        },
        methods: {
            SetData: function (data) {
                this.RawData = data;
                this.BuildFields();
            },
            GetSelectedData: function (ids) {
                return System.Array.init([], System.Object);
            },
            BuildFields: function () {
                if (this.IsJavaScriptNumber(this.RawData.id)) {
                    this.Id = this.RawData.id;
                }
            },
            IsJavaScriptNumber: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptNumber(obj);
            },
            IsJavaScriptObject: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptObject(obj);
            },
            IsJavaScriptString: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptString(obj);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.DataManager", {
        statics: {
            fields: {
                Clients: null,
                Products: null,
                Orders: null
            },
            ctors: {
                init: function () {
                    this.Clients = new CSharpWebApp.app.data.ClientDataCollection();
                    this.Products = new CSharpWebApp.app.data.ProductDataCollection();
                    this.Orders = new CSharpWebApp.app.data.OrderDataCollection();
                }
            },
            methods: {
                LoadData: function () {
                    CSharpWebApp.app.data.DataManager.LoadClients();
                    CSharpWebApp.app.data.DataManager.LoadProducts();
                    CSharpWebApp.app.data.DataManager.LoadOrders();
                },
                LoadClients: function () {
                    var fn = null;

                    fn = function (data) {
                        CSharpWebApp.app.data.DataManager.Clients.LoadData(data);
                    };
                    CSharpWebApp.app.api.ServerApi.GetClients(fn);
                },
                LoadProducts: function () {
                    var fn = null;

                    fn = function (data) {
                        CSharpWebApp.app.data.DataManager.Products.LoadData(data);
                    };
                    CSharpWebApp.app.api.ServerApi.GetProducts(fn);
                },
                LoadOrders: function () {
                    var fn = null;

                    fn = function (data) {
                        CSharpWebApp.app.data.DataManager.Orders.LoadData(data);
                    };
                    CSharpWebApp.app.api.ServerApi.GetOrders(fn);
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.DataUtil", {
        statics: {
            methods: {
                IsJavaScriptNumber: function (obj) {
                    return CSharpWebApp.app.data.DataUtil.CheckJavaScriptType(obj, "number");
                },
                IsJavaScriptObject: function (obj) {
                    return CSharpWebApp.app.data.DataUtil.CheckJavaScriptType(obj, "object");
                },
                IsJavaScriptString: function (obj) {
                    return CSharpWebApp.app.data.DataUtil.CheckJavaScriptType(obj, "string");
                },
                CheckJavaScriptType: function (obj, type) {
                    return Bridge.referenceEquals(typeof(obj), type);
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.viewport.ApplicationViewport", {
        inherits: [CSharpWebLib.app.viewport.Viewport],
        statics: {
            methods: {
                CreateViewport: function () {
                    if (CSharpWebLib.app.viewport.Viewport.Instance == null) {
                        CSharpWebLib.app.viewport.Viewport.Instance = new CSharpWebApp.app.ui.viewport.ApplicationViewport();
                    }
                    return CSharpWebLib.app.viewport.Viewport.Instance;
                }
            }
        },
        methods: {
            HandlesAppear: function () {
                return true;
            },
            OnAppear: function () { },
            CreateNavbar: function () {
                return new CSharpWebApp.app.ui.widgets.app.ApplicationNavbar(this);
            },
            CreateContent: function () {
                return new CSharpWebApp.app.ui.viewport.ApplicationViewportStack();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.viewport.ApplicationViewportStack", {
        inherits: [CSharpWebLib.app.viewport.ViewportStack],
        methods: {
            CreateDesktopContent: function () {
                return new CSharpWebApp.app.ui.viewport.content.ApplicationDesktopContent();
            },
            CreateStandardContent: function () {
                return new CSharpWebApp.app.ui.viewport.content.ApplicationStandardContent();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.viewport.content.ApplicationDesktopContent", {
        inherits: [CSharpWebLib.app.viewport.content.DesktopContent]
    });

    Bridge.define("CSharpWebApp.app.ui.viewport.content.ApplicationStandardContent", {
        inherits: [CSharpWebLib.app.viewport.content.StandardContent],
        methods: {
            AddMenuPanels: function () {
                this.NavPanel.AddNav(new CSharpWebApp.app.viewport.pages.home.HomeMenuPanel(this.NavPanel, this.ContentPanel));
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.widgets.app.ApplicationNavbar", {
        inherits: [CSharpWebLib.qx.ui.widgets.navbar.Navbar],
        fields: {
            _workspaceModeButton: null,
            _viewsButton: null
        },
        alias: ["HandleEvent", "CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent"],
        ctors: {
            ctor: function (viewport) {
                this.$initialize();
                CSharpWebLib.qx.ui.widgets.navbar.Navbar.ctor.call(this, viewport);
            }
        },
        methods: {
            AddButtons: function () {
                this._workspaceModeButton = this.AddNavbarButton("Website Mode");
                this._viewsButton = new CSharpWebApp.app.ui.widgets.app.ApplicationViewsButton(this, this);
                this._viewsButton.Hide();
                this.Add(this._viewsButton);
                this.AddNavbarButton("Forum");
                this.AddSpacer();
            },
            CreateLabel: function () {
                return new CSharpWebLib.qx.ui.embed.CSharpWebLabel();
            },
            DefaultHeight: function () {
                return 55;
            },
            HandleEvent: function (eventName) {
                switch (eventName) {
                    case "browse_clients": 
                        this.OnBrowseClients();
                        break;
                    case "browse_orders": 
                        this.OnBrowseOrders();
                        break;
                    case "browse_products": 
                        this.OnBrowseProducts();
                        break;
                    case "website_mode": 
                        this.OnWebsiteMode();
                        break;
                    case "forum": 
                        this.OnForum();
                        break;
                    case "my_new_button": 
                        this.OnMyNewButton();
                        break;
                }
            },
            OnMyNewButton: function () {
                var win = new CSharpWebLib.qx.ui.windows.Window();
                win.Caption = "MY NEW BUTTON WINDOW2";
            },
            OnBrowseClients: function () {
                new CSharpWebApp.app.ui.windows.data.clients.ClientsWindow();
            },
            OnBrowseProducts: function () {
                new CSharpWebApp.app.ui.windows.data.products.ProductsWindow();
            },
            OnBrowseOrders: function () {
                new CSharpWebApp.app.ui.windows.data.orders.OrdersWindow();
            },
            OnWebsiteMode: function () {
                this.SetDataMode(!this._isDesktopMode);
                if (this._isDesktopMode) {
                    this._viewsButton.Show();
                } else {
                    this._viewsButton.Hide();
                }
                this._workspaceModeButton.Label = this._isDesktopMode ? "Desktop Mode" : "Website Mode";
            },
            OnLauncher: function () {
                new CSharpWebApp.app.ui.windows.launcher.LauncherWindow();
            },
            OnForum: function () {
                window.open("http://csharpwebexpress.freeforums.net/", "_blank");
            },
            OnDownload: function () {
                window.open("https://store.csharpwebexpress.com/", "_blank");
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.widgets.app.ApplicationViewsButton", {
        inherits: [CSharpWebLib.qx.ui.widgets.navbar.ViewsButton],
        ctors: {
            ctor: function (decorator, handler) {
                this.$initialize();
                CSharpWebLib.qx.ui.widgets.navbar.ViewsButton.ctor.call(this, decorator, handler);
            }
        },
        methods: {
            AddMenuButtons: function () {
                this.AddButton$1("Browse Clients");
                this.AddButton$1("Browse Products");
                this.AddButton$1("Browse Orders");
                this.AddButton$1("MY NEW BUTTON");
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.DataTable", {
        inherits: [CSharpWebLib.qx.ui.table.Table,CSharpWebLib.qx.interfaces.IHandleSelection],
        fields: {
            DataCollection: null,
            RecordSelectionHandler: null
        },
        alias: ["HandleSelection", "CSharpWebLib$qx$interfaces$IHandleSelection$HandleSelection"],
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.table.Table.prototype.Init.call(this);
                this.SelectionHandler = this;
            },
            DefaultColumns: function () {
                return System.Array.init(["Name"], System.String);
            },
            SetDataFromCollection: function (dataCollection) {
                this.DataCollection = dataCollection;
                this.Data = this.DataCollection.GetSelectedData(this.DefaultIds());
            },
            HandleSelection: function (selectedIndex, rowData) {
                if (this.DataCollection == null) {
                    return;
                }
                var selectedRecord;
                if (rowData != null && rowData.length != null && rowData.length > 0) {
                    selectedRecord = this.DataCollection.GetRecordAtKey(rowData[0]);
                } else {
                    selectedRecord = this.DataCollection.GetRecordAtIndex(selectedIndex);
                }
                if (selectedRecord == null) {
                    return;
                }
                if (this.RecordSelectionHandler != null) {
                    this.RecordSelectionHandler.CSharpWebApp$app$ui$windows$data$IHandleSelectedRecord$HandleSelectedRecord(selectedRecord);
                }
            },
            HandlesAppear: function () {
                return true;
            },
            OnAppear: function () {
                this.SetColumnVisible(0, false);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.DataDetailPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Scroll],
        fields: {
            FormPanel: null,
            NamesList: null,
            WidgetsList: null,
            FieldMap: null
        },
        ctors: {
            init: function () {
                this.FormPanel = new CSharpWebLib.qx.ui.form.FormPanel();
                this.NamesList = new (System.Collections.Generic.List$1(System.String)).ctor();
                this.WidgetsList = new (System.Collections.Generic.List$1(CSharpWebLib.qx.ui.core.Widget)).ctor();
                this.FieldMap = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebLib.qx.ui.core.Widget))();
            }
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.container.Scroll.prototype.Init.call(this);
                this.Add(this.FormPanel);
                this.AddFields();
            },
            BuildFields: function () { },
            AddFields: function () {
                this.BuildFields();
                this.FormPanel.AddFields(this.NamesList, this.WidgetsList);
            },
            AddTextField: function (name, tag) {
                if (tag === void 0) { tag = null; }
                this.NamesList.add(name);
                var widget = new CSharpWebLib.qx.ui.form.TextField();
                this.WidgetsList.add(widget);
                if (tag == null) {
                    tag = System.String.replaceAll(name.toLowerCase(), String.fromCharCode(32), String.fromCharCode(95));
                }
                this.FieldMap.set(tag, widget);
            },
            SetTextFieldValue: function (tag, text) {
                var widget = { };
                this.FieldMap.tryGetValue(tag, widget);
                if (widget.v == null || Bridge.as(widget.v, CSharpWebLib.qx.ui.form.TextField) == null) {
                    return;
                }
                (Bridge.as(widget.v, CSharpWebLib.qx.ui.form.TextField)).Value = text;
            },
            Update: function (record) {
                window.console.log("Data Detail Update", Bridge.toString(record));
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.DataListPanel", {
        inherits: [CSharpWebLib.qx.ui.container.Scroll],
        fields: {
            List: null
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.container.Scroll.prototype.Init.call(this);
                this.List = this.CreateDataTable();
                this.Add(this.List);
            },
            CreateDataTable: function () {
                return new CSharpWebApp.app.ui.windows.data.DataTable();
            },
            RefreshFromCollection: function (collection) {
                this.List.SetDataFromCollection(collection);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.IHandleSelectedRecord", {
        $kind: "interface"
    });

    Bridge.define("CSharpWebApp.app.ui.windows.launcher.LauncherWindow", {
        inherits: [CSharpWebLib.qx.ui.windows.Window],
        methods: {
            DefaultCaption: function () {
                return "Launcher";
            },
            DefaultLocation: function () {
                return System.Array.init([Config.GlobalDimensions.TranscriptLeftInset, Config.GlobalDimensions.TranscriptTopInset], System.Int32);
            },
            DefaultHeight: function () {
                return 275;
            },
            DefaultWidth: function () {
                return 175;
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.contact.ContactPage", {
        inherits: [CSharpWebLib.app.viewport.panels.CardPage],
        alias: [
            "ButtonLabel", "CSharpWebLib$app$viewport$panels$IPage$ButtonLabel",
            "PageTitle", "CSharpWebLib$app$viewport$panels$IPage$PageTitle",
            "TagName", "CSharpWebLib$app$viewport$panels$IPage$TagName"
        ],
        methods: {
            ButtonLabel: function () {
                return "Contact";
            },
            PageTitle: function () {
                return "Contact";
            },
            TagName: function () {
                return "contact";
            },
            AddCardPanels: function () { }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.contact.panels.ContactPageHeadlinePanel", {
        inherits: [CSharpWebLib.app.bootstrap.Bp2Columns],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.Bp2Columns.ctor.call(this, widget);
            }
        },
        methods: {
            AddLeftChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("CSharpWebExpress", this.Widget);
                this.LeftColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                text.AddP("CSharpWebExpress is an exciting new technology that allows building sophisticated Web application using only CSharp programming.");
                card.AddContentItem(text);
            },
            AddRightChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("News", this.Widget);
                this.RightColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                card.AddContentItem(text);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.featured_code_sample.HomePageFeaturedCodeSamplePanel", {
        inherits: [CSharpWebLib.app.bootstrap.BpCard],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpCard.ctor.call(this, "CSharp Code Sample", widget);
            }
        },
        methods: {
            AddContent: function () {
                this.AddContentItem(new CSharpWebLib.app.bootstrap.BpCode(this.Widget, this.BuildCode()));
            },
            BuildCode: function () {
                var sb = new System.Text.StringBuilder();
                sb.appendLine("// This is the code which creates the sample that you are seeing.");
                sb.appendLine("// BpCard is a class representing Bootstrap card element.");
                sb.appendLine("// BpCode is a class representing a styled source code element.");
                sb.appendLine();
                sb.appendLine("using CSharpWebExpress.app.bootstrap;");
                sb.appendLine("using CSharpWebExpress.app.viewport.panels;");
                sb.appendLine("using System.Text;");
                sb.appendLine();
                sb.appendLine("namespace CSharpWebExpress.app.viewport.pages.home.featured_code_sample");
                sb.appendLine("{");
                sb.appendLine("public class HomePageFeaturedCodeSamplePanel : BpCard");
                sb.appendLine("        public HomePageFeaturedCodeSamplePanel(IWidget widget) : base(\"CSharp Code Sample\", widget)");
                sb.appendLine("        {");
                sb.appendLine("        }");
                sb.appendLine();
                sb.appendLine("        protected override void AddContent()");
                sb.appendLine("        {");
                sb.appendLine("            AddContentItem(new BpCode(Widget, BuildCode()));");
                sb.appendLine("        }");
                sb.appendLine();
                sb.appendLine("        string BuildCode()");
                sb.appendLine("        {");
                sb.appendLine("            StringBuilder sb = new StringBuilder();");
                sb.appendLine("            sb.AppendLine(\"// This is the code which creates the sample that you are seeing.\");");
                sb.appendLine("            sb.AppendLine(\"// BpCard is a class representing Bootstrap styled HTML element.\");");
                sb.appendLine("            sb.AppendLine(\"// BpCode is a class representing a styled source code element.\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            sb.AppendLine(\"using CSharpWebExpress.app.bootstrap;\");");
                sb.appendLine("            sb.AppendLine(\"using CSharpWebExpress.app.viewport.panels;\");");
                sb.appendLine("            sb.AppendLine(\"using System.Text;\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            sb.AppendLine(\"namespace CSharpWebExpress.app.viewport.pages.home.featured_code_sample\");");
                sb.appendLine("            sb.AppendLine(\"{\");");
                sb.appendLine("            sb.AppendLine(\"public class HomePageFeaturedCodeSamplePanel : BpCard\");");
                sb.appendLine("            sb.AppendLine(\"        public HomePageFeaturedCodeSamplePanel(IWidget widget) : base(\"CSharp Code Sample\", widget)\");");
                sb.appendLine("            sb.AppendLine(\"        {\");");
                sb.appendLine("            sb.AppendLine(\"        }\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            sb.AppendLine(\"        protected override void AddContent()\");");
                sb.appendLine("            sb.AppendLine(\"        {\");");
                sb.appendLine("            sb.AppendLine(\"            AddContentItem(new BpCode(Widget, BuildCode()));\");");
                sb.appendLine("            sb.AppendLine(\"        }\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            sb.AppendLine(\"        string BuildCode()\");");
                sb.appendLine("            sb.AppendLine(\"        {\");");
                sb.appendLine("            sb.AppendLine(\"            StringBuilder sb = new StringBuilder();\");");
                sb.appendLine("            sb.AppendLine(\"            //...... this code .....\"");
                sb.appendLine("            sb.AppendLine(\"            return sb.ToString();\");");
                sb.appendLine("            sb.AppendLine(\"        }\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            sb.AppendLine(\"    }\");");
                sb.appendLine("            sb.AppendLine(\"}\");");
                sb.appendLine("            sb.AppendLine();");
                sb.appendLine("            return sb.ToString();");
                sb.appendLine("        }");
                sb.appendLine();
                sb.appendLine("    }");
                sb.appendLine("}");
                sb.appendLine();
                return sb.toString();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.featured_video.HomePageCSharpExpressVideoHolder", {
        inherits: [CSharpWebLib.app.bootstrap.Bp2Columns],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.Bp2Columns.ctor.call(this, widget);
            }
        },
        methods: {
            AddLeftChildren: function () {
                var video = new CSharpWebLib.app.bootstrap.BpVideo(this.Widget, "https://www.youtube.com/embed/hvrQoXWEpAA");
                this.LeftColumn.AddChild(video);
            },
            AddRightChildren: function () {
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                this.RightColumn.AddChild(text);
                text.AddBold("CSharpWebExpress Build and Deploy").AddP("This is a short video (3m46s) showing the addition of a new object to an existing application.").AddP("All the coding is done using CSharp in MS Visual Studio.").AddP("When the solution is rebuilt, all of the application's HTML5 codebase is rebuilt automatically.");
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.featured_video.HomePageFeaturedVideoPanel", {
        inherits: [CSharpWebLib.app.bootstrap.BpCard],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpCard.ctor.call(this, "CSharpWebExpress Demo", widget);
            }
        },
        methods: {
            AddContent: function () {
                this.AddContentItem(new CSharpWebApp.app.viewport.pages.home.featured_video.HomePageCSharpExpressVideoHolder(this.Widget));
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.headline.HomePageHeadlinePanels", {
        inherits: [CSharpWebLib.app.bootstrap.Bp2Columns],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.Bp2Columns.ctor.call(this, widget);
            }
        },
        methods: {
            AddLeftChildren: function () {
                this.LeftColumn.AddChild(new CSharpWebLib.blocks.viewport.pages.home.headline.panels.left.HomePageLeftInfoCard(this.Widget));
            },
            AddRightChildren: function () {
                this.AddRightChild(new CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightDownloadsCard(this.Widget));
                this.AddRightChild(new CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightVideosCard(this.Widget));
                this.AddRightChild(new CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightLinksCard(this.Widget));
            },
            AddRightChild: function (child) {
                this.RightColumn.AddChild(child).AddChild(new CSharpWebLib.app.bootstrap.BpBr(this.Widget));
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.HomeMenuPanel", {
        inherits: [CSharpWebLib.app.viewport.panels.NavMenuPanel],
        ctors: {
            ctor: function (navPanel, contentPanel) {
                this.$initialize();
                CSharpWebLib.app.viewport.panels.NavMenuPanel.ctor.call(this, navPanel, contentPanel);
            }
        },
        methods: {
            AddPages: function () {
                this.AddPage(new CSharpWebApp.app.viewport.pages.home.HomePage());
                this.AddPage(new CSharpWebApp.app.viewport.pages.overview.OverviewPage());
                this.AddPage(new CSharpWebApp.app.viewport.pages.technology.TechnologyPage());
                this.AddPage(new CSharpWebApp.app.viewport.pages.contact.ContactPage());
            },
            GetDefaultPage: function () {
                return "home";
            },
            GetTag: function () {
                return "home";
            },
            SelectNavPanel: function (tag) { },
            SelectContentPage: function (tag) {
                switch (tag) {
                    case "home": 
                    case "overview": 
                    case "technology": 
                    case "contact": 
                        this.ContentPanel.SelectPage(tag);
                        break;
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.home.HomePage", {
        inherits: [CSharpWebLib.app.viewport.panels.CardPage],
        alias: [
            "ButtonLabel", "CSharpWebLib$app$viewport$panels$IPage$ButtonLabel",
            "PageTitle", "CSharpWebLib$app$viewport$panels$IPage$PageTitle",
            "TagName", "CSharpWebLib$app$viewport$panels$IPage$TagName"
        ],
        methods: {
            ButtonLabel: function () {
                return "Home";
            },
            PageTitle: function () {
                return "Home";
            },
            TagName: function () {
                return "home";
            },
            AddCardPanels: function () {
                this.AddCardPanelWithSpacer(new CSharpWebApp.app.viewport.pages.home.headline.HomePageHeadlinePanels(this));
                this.AddCardPanelWithSpacer(new CSharpWebApp.app.viewport.pages.home.featured_code_sample.HomePageFeaturedCodeSamplePanel(this));
                this.AddCardPanelWithSpacer(new CSharpWebApp.app.viewport.pages.home.featured_video.HomePageFeaturedVideoPanel(this));
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.overview.OverviewPage", {
        inherits: [CSharpWebLib.app.viewport.panels.CardPage],
        alias: [
            "ButtonLabel", "CSharpWebLib$app$viewport$panels$IPage$ButtonLabel",
            "PageTitle", "CSharpWebLib$app$viewport$panels$IPage$PageTitle",
            "TagName", "CSharpWebLib$app$viewport$panels$IPage$TagName"
        ],
        methods: {
            ButtonLabel: function () {
                return "Overview";
            },
            PageTitle: function () {
                return "Overview";
            },
            TagName: function () {
                return "overview";
            },
            AddCardPanels: function () { }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.overview.panels.OverviewPageHeadlinePanel", {
        inherits: [CSharpWebLib.app.bootstrap.Bp2Columns],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.Bp2Columns.ctor.call(this, widget);
            }
        },
        methods: {
            AddLeftChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("CSharpWebExpress", this.Widget);
                this.LeftColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                text.AddP("CSharpWebExpress is an exciting new technology that allows building sophisticated Web application using only CSharp programming.");
                card.AddContentItem(text);
            },
            AddRightChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("News", this.Widget);
                this.RightColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                card.AddContentItem(text);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.technology.panels.TechnologyPageHeadlinePanel", {
        inherits: [CSharpWebLib.app.bootstrap.Bp2Columns],
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.Bp2Columns.ctor.call(this, widget);
            }
        },
        methods: {
            AddLeftChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("CSharpWebExpress", this.Widget);
                this.LeftColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                text.AddP("CSharpWebExpress is an exciting new technology that allows building sophisticated Web application using only CSharp programming.");
                card.AddContentItem(text);
            },
            AddRightChildren: function () {
                var card = new CSharpWebLib.app.bootstrap.BpCard("News", this.Widget);
                this.RightColumn.AddChild(card);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                card.AddContentItem(text);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.viewport.pages.technology.TechnologyPage", {
        inherits: [CSharpWebLib.app.viewport.panels.CardPage],
        alias: [
            "ButtonLabel", "CSharpWebLib$app$viewport$panels$IPage$ButtonLabel",
            "PageTitle", "CSharpWebLib$app$viewport$panels$IPage$PageTitle",
            "TagName", "CSharpWebLib$app$viewport$panels$IPage$TagName"
        ],
        methods: {
            ButtonLabel: function () {
                return "Technology";
            },
            PageTitle: function () {
                return "Technology";
            },
            TagName: function () {
                return "technology";
            },
            AddCardPanels: function () { }
        }
    });

    Bridge.define("CSharpWebLib.blocks.viewport.pages.home.headline.panels.left.HomePageLeftInfoCard", {
        inherits: [CSharpWebLib.app.bootstrap.BpCard],
        statics: {
            fields: {
                title: null
            },
            ctors: {
                init: function () {
                    this.title = "Welcome to CSharpWebExpress";
                }
            }
        },
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpCard.ctor.call(this, CSharpWebLib.blocks.viewport.pages.home.headline.panels.left.HomePageLeftInfoCard.title, widget);
                var text = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                text.AddP("CSharpWebExpress is a technology for building sophisticated Web applications using only the CSharp programming language.").AddP("There is no need to use HTML, CSS, or JavaScript although code snippets may be included when appropriate.").AddP("The navigation buttons at the left select display panels in this center content area. At the top is a Mode select button which shows either \"Website Mode\" or \"Desktop Mode\" - you can toggle the mode by clicking.").AddP("Desktop mode uses windows which are similar to desktop GUI's. The \"Views\" selection button at the top opens new windows. See the brief video below for a demonstration.").AddP("This site was created using Microsoft's Visual Studio 2017 Community Edition with all coding for the application done in CSharp. The total development time (single developer) for the demo application was about two days including server deployment (Ruby-on-Rails) to Heroku.").AddP("Thank you for visiting the demo site.").AddP("-- Peter Fisk, creator of CSharpWebExpress");
                this.AddContentItem(text);
            }
        }
    });

    Bridge.define("CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard", {
        inherits: [CSharpWebLib.app.bootstrap.BpCard],
        ctors: {
            ctor: function (text, widget) {
                this.$initialize();
                CSharpWebLib.app.bootstrap.BpCard.ctor.call(this, text, widget);
            }
        },
        methods: {
            AddLink: function (url, text) {
                var bptext = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                bptext.AddLink(url, text);
                this.AddContentItem(bptext);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.AbstractDataCollection", {
        inherits: [System.Collections.Generic.List$1(CSharpWebApp.app.data.AbstractDataRecord)],
        methods: {
            LoadData: function (data) {
                var $t;
                if (!this.IsJavaScriptObject(data) || !this.IsJavaScriptNumber(data.length)) {
                    return;
                }
                $t = Bridge.getEnumerator(data);
                try {
                    while ($t.moveNext()) {
                        var itemData = $t.Current;
                        this.AddDataItem(itemData);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            GetSelectedData: function (ids) {
                var $t;
                var selectedData = new (System.Collections.Generic.List$1(System.Array.type(System.Object))).ctor();
                $t = Bridge.getEnumerator(this);
                try {
                    while ($t.moveNext()) {
                        var dataRecord = $t.Current;
                        selectedData.add(dataRecord.GetSelectedData(ids));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return selectedData.ToArray();
            },
            AddDataItem: function (data) { },
            GetRecordAtKey: function (key) {
                return null;
            },
            GetRecordAtIndex: function (index) {
                if (index < 0 || index >= this.Count) {
                    return null;
                }
                return this.getItem(index);
            },
            IsJavaScriptNumber: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptNumber(obj);
            },
            IsJavaScriptObject: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptObject(obj);
            },
            IsJavaScriptString: function (obj) {
                return CSharpWebApp.app.data.DataUtil.IsJavaScriptString(obj);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.ClientDataRecord", {
        inherits: [CSharpWebApp.app.data.AbstractDataRecord],
        fields: {
            Address: null,
            Cell: null,
            City: null,
            Email: null,
            Name: null,
            Phone: null,
            State: null,
            UUID: null,
            Zip: null
        },
        ctors: {
            init: function () {
                this.Address = "";
                this.Cell = "";
                this.City = "";
                this.Email = "";
                this.Name = "";
                this.Phone = "";
                this.State = "";
                this.UUID = "";
                this.Zip = "";
            },
            ctor: function (data) {
                this.$initialize();
                CSharpWebApp.app.data.AbstractDataRecord.ctor.call(this);
                this.SetData(data);
            }
        },
        methods: {
            GetSelectedData: function (ids) {
                var $t;
                var data = new (System.Collections.Generic.List$1(System.Object)).ctor();
                $t = Bridge.getEnumerator(ids);
                try {
                    while ($t.moveNext()) {
                        var id = $t.Current;
                        switch (id) {
                            case "city": 
                                data.add(this.City);
                                break;
                            case "name": 
                                data.add(this.Name);
                                break;
                            case "uuid": 
                                data.add(this.UUID);
                                break;
                            default: 
                                data.add("---");
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return data.ToArray();
            },
            BuildFields: function () {
                CSharpWebApp.app.data.AbstractDataRecord.prototype.BuildFields.call(this);
                if (this.IsJavaScriptString(this.RawData.address)) {
                    this.Address = this.RawData.address;
                }
                if (this.IsJavaScriptString(this.RawData.cell)) {
                    this.Cell = this.RawData.cell;
                }
                if (this.IsJavaScriptString(this.RawData.city)) {
                    this.City = this.RawData.city;
                }
                if (this.IsJavaScriptString(this.RawData.email)) {
                    this.Email = this.RawData.email;
                }
                if (this.IsJavaScriptString(this.RawData.name)) {
                    this.Name = this.RawData.name;
                }
                if (this.IsJavaScriptString(this.RawData.phone)) {
                    this.Phone = this.RawData.phone;
                }
                if (this.IsJavaScriptString(this.RawData.state)) {
                    this.State = this.RawData.state;
                }
                if (this.IsJavaScriptString(this.RawData.client_uuid)) {
                    this.UUID = this.RawData.client_uuid;
                }
                if (this.IsJavaScriptString(this.RawData.zip)) {
                    this.Zip = this.RawData.zip;
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.OrderDataRecord", {
        inherits: [CSharpWebApp.app.data.AbstractDataRecord],
        fields: {
            ClientUUID: null,
            DateTime: null,
            ProductUUID: null,
            Quantity: 0,
            UUID: null
        },
        ctors: {
            init: function () {
                this.DateTime = System.DateTime.getDefaultValue();
                this.ClientUUID = "";
                this.DateTime = System.DateTime.getNow();
                this.ProductUUID = "";
                this.Quantity = 0;
                this.UUID = "";
            },
            ctor: function (data) {
                this.$initialize();
                CSharpWebApp.app.data.AbstractDataRecord.ctor.call(this);
                this.SetData(data);
            }
        },
        methods: {
            GetSelectedData: function (ids) {
                var $t;
                var data = new (System.Collections.Generic.List$1(System.Object)).ctor();
                $t = Bridge.getEnumerator(ids);
                try {
                    while ($t.moveNext()) {
                        var id = $t.Current;
                        switch (id) {
                            case "date": 
                                data.add(System.DateTime.format(System.DateTime.getDate(this.DateTime), "yyyy-MMM-dd"));
                                break;
                            case "client_name": 
                                data.add(this.GetClientName());
                                break;
                            case "product_name": 
                                data.add(this.GetProductName());
                                break;
                            case "uuid": 
                                data.add(this.UUID);
                                break;
                            default: 
                                data.add(id);
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return data.ToArray();
            },
            GetProductName: function () {
                return CSharpWebApp.app.data.DataManager.Products.ProductNameForUUID(this.ProductUUID);
            },
            GetClientName: function () {
                return CSharpWebApp.app.data.DataManager.Clients.ClientNameForUUID(this.ClientUUID);
            },
            GetPrice: function () {
                return CSharpWebApp.app.data.DataManager.Products.ProductPriceForUUID(this.ProductUUID);
            },
            GetTotal: function () {
                return this.GetPrice() * this.Quantity;
            },
            BuildFields: function () {
                CSharpWebApp.app.data.AbstractDataRecord.prototype.BuildFields.call(this);
                if (this.IsJavaScriptString(this.RawData.client_uuid)) {
                    this.ClientUUID = this.RawData.client_uuid;
                }
                if (this.IsJavaScriptString(this.RawData.date_str)) {
                    this.DateTime = System.Convert.toDateTime(this.RawData.date_str);
                }
                if (this.IsJavaScriptString(this.RawData.product_uuid)) {
                    this.ProductUUID = this.RawData.product_uuid;
                }
                if (this.IsJavaScriptNumber(this.RawData.quantity)) {
                    this.Quantity = this.RawData.quantity;
                }
                if (this.IsJavaScriptString(this.RawData.order_uuid)) {
                    this.UUID = this.RawData.order_uuid;
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.ProductDataRecord", {
        inherits: [CSharpWebApp.app.data.AbstractDataRecord],
        fields: {
            Color: null,
            Department: null,
            Material: null,
            Name: null,
            Price: 0,
            PromotionCode: null,
            UUID: null
        },
        ctors: {
            init: function () {
                this.Color = "";
                this.Department = "";
                this.Material = "";
                this.Name = "";
                this.Price = 0;
                this.PromotionCode = "";
                this.UUID = "";
            },
            ctor: function (data) {
                this.$initialize();
                CSharpWebApp.app.data.AbstractDataRecord.ctor.call(this);
                this.SetData(data);
            }
        },
        methods: {
            GetSelectedData: function (ids) {
                var $t;
                var data = new (System.Collections.Generic.List$1(System.Object)).ctor();
                $t = Bridge.getEnumerator(ids);
                try {
                    while ($t.moveNext()) {
                        var id = $t.Current;
                        switch (id) {
                            case "product_name": 
                                data.add(this.Name);
                                break;
                            case "uuid": 
                                data.add(this.UUID);
                                break;
                            default: 
                                data.add(id);
                                break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                return data.ToArray();
            },
            BuildFields: function () {
                CSharpWebApp.app.data.AbstractDataRecord.prototype.BuildFields.call(this);
                if (this.IsJavaScriptString(this.RawData.color)) {
                    this.Color = this.RawData.color;
                }
                if (this.IsJavaScriptString(this.RawData.department)) {
                    this.Department = this.RawData.department;
                }
                if (this.IsJavaScriptString(this.RawData.material)) {
                    this.Material = this.RawData.material;
                }
                if (this.IsJavaScriptString(this.RawData.product_name)) {
                    this.Name = this.RawData.product_name;
                }
                if (this.IsJavaScriptNumber(this.RawData.price)) {
                    this.Price = this.RawData.price;
                }
                if (this.IsJavaScriptString(this.RawData.promotion_code)) {
                    this.PromotionCode = this.RawData.promotion_code;
                }
                if (this.IsJavaScriptString(this.RawData.product_uuid)) {
                    this.UUID = this.RawData.product_uuid;
                }
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.clients.ClientsDataTable", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataTable],
        methods: {
            DefaultColumns: function () {
                return System.Array.init(["UUID", "Name", "City"], System.String);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.clients.ClientsDetailPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataDetailPanel],
        methods: {
            BuildFields: function () {
                this.AddTextField("Name");
                this.AddTextField("Address");
                this.AddTextField("City");
                this.AddTextField("State");
                this.AddTextField("Zip");
                this.AddTextField("Phone");
                this.AddTextField("Cell");
                this.AddTextField("Email");
                this.AddTextField("Client UUID");
            },
            Update: function (record) {
                var clientRecord;
                if (!(((clientRecord = Bridge.as(record, CSharpWebApp.app.data.ClientDataRecord))) != null)) {
                    return;
                }
                this.SetTextFieldValue("name", clientRecord.Name);
                this.SetTextFieldValue("address", clientRecord.Address);
                this.SetTextFieldValue("city", clientRecord.City);
                this.SetTextFieldValue("state", clientRecord.State);
                this.SetTextFieldValue("zip", clientRecord.Zip);
                this.SetTextFieldValue("phone", clientRecord.Phone);
                this.SetTextFieldValue("cell", clientRecord.Cell);
                this.SetTextFieldValue("email", clientRecord.Email);
                this.SetTextFieldValue("client_uuid", clientRecord.UUID);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.clients.ClientsListPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataListPanel],
        methods: {
            CreateDataTable: function () {
                return new CSharpWebApp.app.ui.windows.data.clients.ClientsDataTable();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.DataWindow", {
        inherits: [CSharpWebLib.qx.ui.windows.Window,CSharpWebApp.app.ui.windows.data.IHandleSelectedRecord],
        fields: {
            DataListPanel: null,
            DataDetailPanel: null,
            Split: null
        },
        alias: [
            "HandleEvent", "CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent",
            "HandleSelectedRecord", "CSharpWebApp$app$ui$windows$data$IHandleSelectedRecord$HandleSelectedRecord"
        ],
        ctors: {
            init: function () {
                this.Split = CSharpWebLib.qx.ui.splitpane.SplitPane.Horizontal();
            }
        },
        methods: {
            Init: function () {
                CSharpWebLib.qx.ui.windows.Window.prototype.Init.call(this);
                this.DataListPanel = this.BuildListPanel();
                this.DataDetailPanel = this.BuildDetailPanel();
                this.Split.Add(this.DataListPanel);
                this.Split.Add(this.DataDetailPanel);
                this.Add$1(this.Split, "center");
                this.AddListeners();
                this.DataListPanel.List.RecordSelectionHandler = this;
            },
            AddListeners: function () {

            },
            OnAppear: function () {
                this.Refresh();
            },
            HandlesAppear: function () {
                return true;
            },
            HandleEvent: function (eventName) {
                switch (eventName) {
                    case "on_refresh": 
                        this.Refresh();
                        break;
                }
            },
            Refresh: function () { },
            BuildDetailPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.DataDetailPanel();
            },
            BuildListPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.DataListPanel();
            },
            HandleSelectedRecord: function (record) {
                this.DataDetailPanel.Update(record);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.orders.OrdersDataTable", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataTable],
        methods: {
            DefaultColumns: function () {
                return System.Array.init(["UUID", "Date", "Client Name", "Product Name"], System.String);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.orders.OrdersDetailPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataDetailPanel],
        methods: {
            BuildFields: function () {
                this.AddTextField("Client");
                this.AddTextField("Product");
                this.AddTextField("Date");
                this.AddTextField("Quantity");
                this.AddTextField("Price Each");
                this.AddTextField("Total");
                this.AddTextField("Order UUID");
                this.AddTextField("Client UUID");
                this.AddTextField("Product UUID");
            },
            Update: function (record) {
                var orderRecord;
                if (!(((orderRecord = Bridge.as(record, CSharpWebApp.app.data.OrderDataRecord))) != null)) {
                    return;
                }
                this.SetTextFieldValue("client", orderRecord.GetClientName());
                this.SetTextFieldValue("product", orderRecord.GetProductName());
                this.SetTextFieldValue("date", System.DateTime.format(orderRecord.DateTime, "yyyy-MMM-dd HH:mm:ss"));
                this.SetTextFieldValue("quantity", System.String.format("{0}", [Bridge.box(orderRecord.Quantity, System.Int32)]));
                this.SetTextFieldValue("price_each", System.String.format("${0:F2}", [Bridge.box(orderRecord.GetPrice(), System.Double, System.Double.format, System.Double.getHashCode)]));
                this.SetTextFieldValue("total", System.String.format("${0:F2}", [Bridge.box(orderRecord.GetTotal(), System.Double, System.Double.format, System.Double.getHashCode)]));
                this.SetTextFieldValue("order_uuid", orderRecord.UUID);
                this.SetTextFieldValue("client_uuid", orderRecord.ClientUUID);
                this.SetTextFieldValue("product_uuid", orderRecord.ProductUUID);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.orders.OrdersListPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataListPanel],
        methods: {
            CreateDataTable: function () {
                return new CSharpWebApp.app.ui.windows.data.orders.OrdersDataTable();
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.products.ProductsDataTable", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataTable],
        methods: {
            DefaultColumns: function () {
                return System.Array.init(["UUID", "Product Name"], System.String);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.products.ProductsDetailPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataDetailPanel],
        methods: {
            BuildFields: function () {
                this.AddTextField("Name");
                this.AddTextField("Department");
                this.AddTextField("Material");
                this.AddTextField("Color");
                this.AddTextField("Price");
                this.AddTextField("Promotion Code");
                this.AddTextField("Product UUID");
            },
            Update: function (record) {
                var productRecord;
                if (!(((productRecord = Bridge.as(record, CSharpWebApp.app.data.ProductDataRecord))) != null)) {
                    return;
                }
                this.SetTextFieldValue("name", productRecord.Name);
                this.SetTextFieldValue("department", productRecord.Department);
                this.SetTextFieldValue("material", productRecord.Material);
                this.SetTextFieldValue("color", productRecord.Color);
                this.SetTextFieldValue("price", System.String.format("${0:F2}", [Bridge.box(productRecord.Price, System.Double, System.Double.format, System.Double.getHashCode)]));
                this.SetTextFieldValue("promotion_code", productRecord.PromotionCode);
                this.SetTextFieldValue("product_uuid", productRecord.UUID);
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.products.ProductsListPanel", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataListPanel],
        methods: {
            CreateDataTable: function () {
                return new CSharpWebApp.app.ui.windows.data.products.ProductsDataTable();
            }
        }
    });

    Bridge.define("CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightDownloadsCard", {
        inherits: [CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard],
        statics: {
            fields: {
                title: null,
                demoRailsUrl: null
            },
            ctors: {
                init: function () {
                    this.title = "Downloads 2019-Jan-07";
                    this.demoRailsUrl = "https://github.com/pdfisk/csharp_web_express_demo_server";
                }
            }
        },
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard.ctor.call(this, CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightDownloadsCard.title, widget);
                this.AddDownloadLink(CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightDownloadsCard.demoRailsUrl, "Demo Rails Server");
            }
        },
        methods: {
            AddDownloadLink: function (url, text) {
                var bptext = new CSharpWebLib.app.bootstrap.BpText.ctor(this.Widget);
                bptext.AddLink(url, text);
                this.AddContentItem(bptext);
            }
        }
    });

    Bridge.define("CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightLinksCard", {
        inherits: [CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard],
        statics: {
            fields: {
                title: null,
                blogUrl: null
            },
            ctors: {
                init: function () {
                    this.title = "Links";
                    this.blogUrl = "https://csharpwebexpress.quora.com/";
                }
            }
        },
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard.ctor.call(this, CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightLinksCard.title, widget);
                this.AddLink(CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightLinksCard.blogUrl, "CSharpWebExpress Blog");
            }
        }
    });

    Bridge.define("CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightVideosCard", {
        inherits: [CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard],
        statics: {
            fields: {
                title: null,
                demoUrl: null,
                newWindowUrl: null
            },
            ctors: {
                init: function () {
                    this.title = "Videos";
                    this.demoUrl = "https://www.youtube.com/watch?v=XGpnPtL4WIU";
                    this.newWindowUrl = "https://www.youtube.com/watch?v=hvrQoXWEpAA";
                }
            }
        },
        ctors: {
            ctor: function (widget) {
                this.$initialize();
                CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightCard.ctor.call(this, CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightVideosCard.title, widget);
                this.AddLink(CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightVideosCard.demoUrl, "Demo Application (no sound)");
                this.AddLink(CSharpWebLib.blocks.viewport.pages.home.headline.panels.right.HomePageRightVideosCard.newWindowUrl, "Update and Deploy to Heroku (3m46s total elapsed time)");
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.ClientDataCollection", {
        inherits: [CSharpWebApp.app.data.AbstractDataCollection],
        fields: {
            ClientMap: null
        },
        ctors: {
            init: function () {
                this.ClientMap = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebApp.app.data.ClientDataRecord))();
            }
        },
        methods: {
            AddDataItem: function (itemData) {
                if (!this.IsJavaScriptObject(itemData)) {
                    return;
                }
                var clientRecord = new CSharpWebApp.app.data.ClientDataRecord(itemData);
                this.ClientMap.set(clientRecord.UUID, clientRecord);
                this.add(clientRecord);
            },
            GetRecordAtKey: function (key) {
                return this.ClientRecordForUUID(key);
            },
            ClientRecordForUUID: function (uuid) {
                if (this.ClientMap.containsKey(uuid)) {
                    return this.ClientMap.get(uuid);
                }
                return null;
            },
            ClientNameForUUID: function (uuid) {
                var record = this.ClientRecordForUUID(uuid);
                if (record == null) {
                    return "---";
                }
                return record.Name;
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.OrderDataCollection", {
        inherits: [CSharpWebApp.app.data.AbstractDataCollection],
        fields: {
            OrderMap: null
        },
        ctors: {
            init: function () {
                this.OrderMap = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebApp.app.data.OrderDataRecord))();
            }
        },
        methods: {
            AddDataItem: function (itemData) {
                if (!this.IsJavaScriptObject(itemData)) {
                    return;
                }
                var orderRecord = new CSharpWebApp.app.data.OrderDataRecord(itemData);
                this.OrderMap.set(orderRecord.UUID, orderRecord);
                this.add(orderRecord);
            },
            GetRecordAtKey: function (key) {
                return this.OrderRecordForUUID(key);
            },
            OrderRecordForUUID: function (uuid) {
                if (this.OrderMap.containsKey(uuid)) {
                    return this.OrderMap.get(uuid);
                }
                return null;
            }
        }
    });

    Bridge.define("CSharpWebApp.app.data.ProductDataCollection", {
        inherits: [CSharpWebApp.app.data.AbstractDataCollection],
        fields: {
            ProductMap: null
        },
        ctors: {
            init: function () {
                this.ProductMap = new (System.Collections.Generic.Dictionary$2(System.String,CSharpWebApp.app.data.ProductDataRecord))();
            }
        },
        methods: {
            AddDataItem: function (itemData) {
                if (!this.IsJavaScriptObject(itemData)) {
                    return;
                }
                var productRecord = new CSharpWebApp.app.data.ProductDataRecord(itemData);
                this.ProductMap.set(productRecord.UUID, productRecord);
                this.add(productRecord);
            },
            ProductRecordForUUID: function (uuid) {
                if (this.ProductMap.containsKey(uuid)) {
                    return this.ProductMap.get(uuid);
                }
                return null;
            },
            ProductNameForUUID: function (uuid) {
                var record = this.ProductRecordForUUID(uuid);
                if (record == null) {
                    return "---";
                }
                return record.Name;
            },
            GetRecordAtKey: function (key) {
                return this.ProductRecordForUUID(key);
            },
            ProductPriceForUUID: function (uuid) {
                var record = this.ProductRecordForUUID(uuid);
                if (record == null) {
                    return 0;
                }
                return record.Price;
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.clients.ClientsWindow", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataWindow],
        alias: ["HandleEvent", "CSharpWebLib$qx$interfaces$IEventHandler$HandleEvent"],
        methods: {
            DefaultButtons: function () {
                return System.Array.init([this.ButtonRefresh()], CSharpWebLib.util.ButtonConfig);
            },
            HandleEvent: function (eventName) {
                switch (eventName) {
                    case "on_show_orders": 
                        this.ShowOrders();
                        break;
                    default: 
                        CSharpWebApp.app.ui.windows.data.DataWindow.prototype.HandleEvent.call(this, eventName);
                        break;
                }
            },
            Refresh: function () {
                this.DataListPanel.RefreshFromCollection(CSharpWebApp.app.data.DataManager.Clients);
            },
            ShowOrders: function () {
                window.console.log("ShowOrders");
            },
            ButtonRefresh: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Refresh", this);
            },
            ButtonShowOrders: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Show Orders", this);
            },
            BuildDetailPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.clients.ClientsDetailPanel();
            },
            BuildListPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.clients.ClientsListPanel();
            },
            DefaultCaption: function () {
                return "Clients";
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.orders.OrdersWindow", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataWindow],
        methods: {
            DefaultButtons: function () {
                return System.Array.init([this.ButtonRefresh()], CSharpWebLib.util.ButtonConfig);
            },
            BuildDetailPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.orders.OrdersDetailPanel();
            },
            BuildListPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.orders.OrdersListPanel();
            },
            Refresh: function () {
                this.DataListPanel.RefreshFromCollection(CSharpWebApp.app.data.DataManager.Orders);
            },
            ButtonRefresh: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Refresh", this);
            },
            ButtonShowClient: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Show Client", this);
            },
            ButtonShowProduct: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Show Product", this);
            },
            DefaultCaption: function () {
                return "Orders";
            }
        }
    });

    Bridge.define("CSharpWebApp.app.ui.windows.data.products.ProductsWindow", {
        inherits: [CSharpWebApp.app.ui.windows.data.DataWindow],
        methods: {
            DefaultButtons: function () {
                return System.Array.init([this.ButtonRefresh()], CSharpWebLib.util.ButtonConfig);
            },
            BuildDetailPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.products.ProductsDetailPanel();
            },
            BuildListPanel: function () {
                return new CSharpWebApp.app.ui.windows.data.products.ProductsListPanel();
            },
            ButtonRefresh: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Refresh", this);
            },
            Refresh: function () {
                this.DataListPanel.RefreshFromCollection(CSharpWebApp.app.data.DataManager.Products);
            },
            ButtonShowOrders: function () {
                return new CSharpWebLib.util.ButtonConfig.$ctor1("Show Orders", this);
            },
            DefaultCaption: function () {
                return "Products";
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDU2hhcnBXZWJBcHAuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIndlYl91aS9BcHAuY3MiLCJhcHAvYXBpL1NlcnZlckFwaS5jcyIsImFwcC9BcHBsaWNhdGlvbi5jcyIsImFwcC9kYXRhL0Fic3RyYWN0RGF0YVJlY29yZC5jcyIsImFwcC9kYXRhL0RhdGFNYW5hZ2VyLmNzIiwiYXBwL2RhdGEvRGF0YVV0aWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvQXBwbGljYXRpb25WaWV3cG9ydC5jcyIsImFwcC91aS92aWV3cG9ydC9BcHBsaWNhdGlvblZpZXdwb3J0U3RhY2suY3MiLCJhcHAvdWkvdmlld3BvcnQvY29udGVudC9BcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudC5jcyIsImFwcC91aS93aWRnZXRzL2FwcC9BcHBsaWNhdGlvbk5hdmJhci5jcyIsImFwcC91aS93aWRnZXRzL2FwcC9BcHBsaWNhdGlvblZpZXdzQnV0dG9uLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9EYXRhVGFibGUuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL0RhdGFEZXRhaWxQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvRGF0YUxpc3RQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2xhdW5jaGVyL0xhdW5jaGVyV2luZG93LmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2NvbnRhY3QvQ29udGFjdFBhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvY29udGFjdC9wYW5lbHMvRG93bmxvYWRzUGFnZUhlYWRsaW5lUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9mZWF0dXJlZF9jb2RlX3NhbXBsZS9Ib21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2hvbWUvZmVhdHVyZWRfdmlkZW8vSG9tZVBhZ2VGZWF0dXJlZFZpZGVvSG9sZGVyLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2hvbWUvZmVhdHVyZWRfdmlkZW8vSG9tZVBhZ2VGZWF0dXJlZFZpZGVvUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvSG9tZVBhZ2VIZWFkbGluZVBhbmVscy5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL0hvbWVNZW51UGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9Ib21lUGFnZS5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9vdmVydmlldy9PdmVydmlld1BhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvb3ZlcnZpZXcvcGFuZWxzL092ZXJ2aWV3UGFnZUhlYWRsaW5lUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvdGVjaG5vbG9neS9wYW5lbHMvVGVjaG5vbG9neVBhZ2VIZWFkbGluZVBhbmVsLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL3RlY2hub2xvZ3kvVGVjaG5vbG9neVBhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvbGVmdC9Ib21lUGFnZUxlZnRJbmZvQ2FyZC5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL2hlYWRsaW5lL3BhbmVscy9yaWdodC9Ib21lUGFnZVJpZ2h0Q2FyZC5jcyIsImFwcC9kYXRhL0Fic3RyYWN0RGF0YUNvbGxlY3Rpb24uY3MiLCJhcHAvZGF0YS9DbGllbnREYXRhUmVjb3JkLmNzIiwiYXBwL2RhdGEvT3JkZXJEYXRhUmVjb3JkLmNzIiwiYXBwL2RhdGEvUHJvZHVjdERhdGFSZWNvcmQuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL2NsaWVudHMvQ2xpZW50c0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvY2xpZW50cy9DbGllbnRzRGV0YWlsUGFuZWwuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL2NsaWVudHMvQ2xpZW50c0xpc3RQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvRGF0YVdpbmRvdy5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvb3JkZXJzL09yZGVyc0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvb3JkZXJzL09yZGVyc0RldGFpbFBhbmVsLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9vcmRlcnMvT3JkZXJzTGlzdFBhbmVsLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9wcm9kdWN0cy9Qcm9kdWN0c0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvcHJvZHVjdHMvUHJvZHVjdHNEZXRhaWxQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvcHJvZHVjdHMvUHJvZHVjdHNMaXN0UGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvcmlnaHQvSG9tZVBhZ2VSaWdodERvd25sb2Fkc0NhcmQuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvcmlnaHQvSG9tZVBhZ2VSaWdodExpbmtzQ2FyZC5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL2hlYWRsaW5lL3BhbmVscy9yaWdodC9Ib21lUGFnZVJpZ2h0VmlkZW9zQ2FyZC5jcyIsImFwcC9kYXRhL0NsaWVudERhdGFDb2xsZWN0aW9uLmNzIiwiYXBwL2RhdGEvT3JkZXJEYXRhQ29sbGVjdGlvbi5jcyIsImFwcC9kYXRhL1Byb2R1Y3REYXRhQ29sbGVjdGlvbi5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvY2xpZW50cy9DbGllbnRzV2luZG93LmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9vcmRlcnMvT3JkZXJzV2luZG93LmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9wcm9kdWN0cy9Qcm9kdWN0c1dpbmRvdy5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7aUNBT2lDQTtvQkFFckJBLDRDQUEyQkE7Ozs7Ozs7Ozs7Ozs7b0ND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LElBQUlBOzs7Z0JBS1hBLE9BQU9BLElBQUlBLGlEQUF3QkE7OztnQkFLbkNBLHlDQUFvQ0E7OztnQkFLcENBLE9BQU9BLElBQUlBLHFEQUE0QkE7OztnQkFLdkNBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdGFydChkeW5hbWljIHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvbi5JbnN0YW5jZS5TdGFydChyb290KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmlvLnJlcXVlc3Q7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5hcGlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNlcnZlckFwaVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU2VydmVyQXBpIEluc3RhbmNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgR2V0Q2xpZW50cyhGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VuZChcImNsaWVudHNcIiwgKEZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEdldFByb2R1Y3RzKEZuVm9pZEEgZm4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZW5kKFwicHJvZHVjdHNcIiwgKEZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEdldE9yZGVycyhGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VuZChcIm9yZGVyc1wiLCAoRm5Wb2lkQSlmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBTZW5kKHN0cmluZyBwYXRoLCBGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWGhyIHhociA9IG5ldyBYaHJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWV0aG9kID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCIvZGF0YS97MH0uanNvblwiLCBwYXRoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIuQWRkTGlzdGVuZXIoXCJzdWNjZXNzXCIsIChDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZCkoKCkgPT4geyBPblN1Y2Nlc3MoeGhyLCAoRm5Wb2lkQSlmbik7IH0pKTtcclxuICAgICAgICAgICAgeGhyLlNlbmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uU3VjY2VzcyhYaHIgeGhyLCBGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZHluYW1pYyByZXNwb25zZSA9IHhoci5SZXNwb25zZTtcclxuICAgICAgICAgICAgaWYgKGZuIGlzIEZuVm9pZEEpXHJcbiAgICAgICAgICAgICAgICBmbihyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIHN0YXRpYyBTZXJ2ZXJBcGkgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0luc3RhbmNlPW5ldyBTZXJ2ZXJBcGkoKTt9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcGxpY2F0aW9uIDogUW9iamVjdFxyXG4gICAge1xyXG5cclxuICAgICAgICBzdGF0aWMgQXBwbGljYXRpb24gX2luc3RhbmNlID0gbnVsbDtcclxuICAgICAgICBBcHBsaWNhdGlvbigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFwcGxpY2F0aW9uIEluc3RhbmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBBcHBsaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QgPSBTY3JpcHQuQ2FsbDxkeW5hbWljPihcInF4bGliLmFwcC5BcHAuZ2V0SW5zdGFuY2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydChkeW5hbWljIHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWaWV3cG9ydCB2aWV3cG9ydCA9IEFwcGxpY2F0aW9uVmlld3BvcnQuQ3JlYXRlVmlld3BvcnQoKTtcclxuICAgICAgICAgICAgcm9vdC5hZGQodmlld3BvcnQuTmF0aXZlT2JqZWN0LCBuZXcgeyB0b3AgPSAwLCByaWdodCA9IDAsIGJvdHRvbSA9IDAsIGxlZnQgPSAwIH0pO1xyXG4gICAgICAgICAgICBEYXRhTWFuYWdlci5Mb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3REYXRhUmVjb3JkXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGludCBJZCB7IGdldDsgc2V0OyB9IFxyXG4gICAgICAgIHByb3RlY3RlZCBkeW5hbWljIFJhd0RhdGEgeyBnZXQ7IHNldCA7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgU2V0RGF0YShkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSYXdEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgQnVpbGRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBkeW5hbWljW10geyB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBCdWlsZEZpZWxkcygpIHtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdE51bWJlcihSYXdEYXRhLmlkKSlcclxuICAgICAgICAgICAgICAgIElkID0gUmF3RGF0YS5pZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE51bWJlcihkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHROdW1iZXIob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE9iamVjdChkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdFN0cmluZyhkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRTdHJpbmcob2JqKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0lkPS0xO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmFwaTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEYXRhTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ2xpZW50RGF0YUNvbGxlY3Rpb24gQ2xpZW50cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFByb2R1Y3REYXRhQ29sbGVjdGlvbiBQcm9kdWN0cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9yZGVyRGF0YUNvbGxlY3Rpb24gT3JkZXJzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9hZERhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9hZENsaWVudHMoKTtcclxuICAgICAgICAgICAgTG9hZFByb2R1Y3RzKCk7XHJcbiAgICAgICAgICAgIExvYWRPcmRlcnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIExvYWRDbGllbnRzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIENsaWVudHMuTG9hZERhdGEoZGF0YSk7XHJcbn1cclxuXHJcbjtcbiAgICAgICAgICAgIFNlcnZlckFwaS5HZXRDbGllbnRzKChDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgTG9hZFByb2R1Y3RzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIFByb2R1Y3RzLkxvYWREYXRhKGRhdGEpO1xyXG59XHJcblxyXG47XG4gICAgICAgICAgICBTZXJ2ZXJBcGkuR2V0UHJvZHVjdHMoKENTaGFycFdlYkxpYi5xeC5jb25zdGFudHMuRm5Wb2lkQSlmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBMb2FkT3JkZXJzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIE9yZGVycy5Mb2FkRGF0YShkYXRhKTtcclxufVxyXG5cclxuO1xuICAgICAgICAgICAgU2VydmVyQXBpLkdldE9yZGVycygoQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cy5GblZvaWRBKWZuKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBzdGF0aWMgQ2xpZW50RGF0YUNvbGxlY3Rpb24gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NsaWVudHM9bmV3IENsaWVudERhdGFDb2xsZWN0aW9uKCk7cHJpdmF0ZSBzdGF0aWMgUHJvZHVjdERhdGFDb2xsZWN0aW9uIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9kdWN0cz1uZXcgUHJvZHVjdERhdGFDb2xsZWN0aW9uKCk7cHJpdmF0ZSBzdGF0aWMgT3JkZXJEYXRhQ29sbGVjdGlvbiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT3JkZXJzPW5ldyBPcmRlckRhdGFDb2xsZWN0aW9uKCk7fVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEYXRhVXRpbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc0phdmFTY3JpcHROdW1iZXIoZHluYW1pYyBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hlY2tKYXZhU2NyaXB0VHlwZShvYmosIFwibnVtYmVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzSmF2YVNjcmlwdE9iamVjdChkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGVja0phdmFTY3JpcHRUeXBlKG9iaiwgXCJvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNKYXZhU2NyaXB0U3RyaW5nKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoZWNrSmF2YVNjcmlwdFR5cGUob2JqLCBcInN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBib29sIENoZWNrSmF2YVNjcmlwdFR5cGUoZHluYW1pYyBvYmosIHN0cmluZyB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5DYWxsPHN0cmluZz4oXCJ0eXBlb2ZcIiwgb2JqKSA9PSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0O1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXI7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2lkZ2V0cy5hcHA7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS52aWV3cG9ydFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFwcGxpY2F0aW9uVmlld3BvcnQgOiBWaWV3cG9ydFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZpZXdwb3J0IENyZWF0ZVZpZXdwb3J0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgSW5zdGFuY2UgPSBuZXcgQXBwbGljYXRpb25WaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gSW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYm9vbCBIYW5kbGVzQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25BcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBOYXZiYXIgQ3JlYXRlTmF2YmFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25OYXZiYXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgVmlld3BvcnRTdGFjayBDcmVhdGVDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25WaWV3cG9ydFN0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0LmNvbnRlbnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQuY29udGVudDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBsaWNhdGlvblZpZXdwb3J0U3RhY2sgOiBWaWV3cG9ydFN0YWNrXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERlc2t0b3BDb250ZW50IENyZWF0ZURlc2t0b3BDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25EZXNrdG9wQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIFN0YW5kYXJkQ29udGVudCBDcmVhdGVTdGFuZGFyZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LmNvbnRlbnQ7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0LmNvbnRlbnRcclxue1xyXG4gICAgcHVibGljICBjbGFzcyBBcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudCA6IFN0YW5kYXJkQ29udGVudFxyXG4gICAge1xyXG4gICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgIHZvaWQgQWRkTWVudVBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXZQYW5lbC5BZGROYXYobmV3IEhvbWVNZW51UGFuZWwoTmF2UGFuZWwsIENvbnRlbnRQYW5lbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLmNsaWVudHM7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLm9yZGVycztcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEucHJvZHVjdHM7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5sYXVuY2hlcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmVtYmVkO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkudG9vbGJhcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpZGdldHMubmF2YmFyO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2luZG93cztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpZGdldHMuYXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBsaWNhdGlvbk5hdmJhciA6IE5hdmJhclxyXG4gICAge1xyXG4gICAgICAgIFRvb2xiYXJCdXR0b24gX3dvcmtzcGFjZU1vZGVCdXR0b247XHJcbiAgICAgICAgQXBwbGljYXRpb25WaWV3c0J1dHRvbiBfdmlld3NCdXR0b247XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcHBsaWNhdGlvbk5hdmJhcihWaWV3cG9ydCB2aWV3cG9ydCkgOiBiYXNlKHZpZXdwb3J0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZEJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3dvcmtzcGFjZU1vZGVCdXR0b24gPSBBZGROYXZiYXJCdXR0b24oXCJXZWJzaXRlIE1vZGVcIik7XHJcbiAgICAgICAgICAgIF92aWV3c0J1dHRvbiA9IG5ldyBBcHBsaWNhdGlvblZpZXdzQnV0dG9uKHRoaXMsIHRoaXMpO1xyXG4gICAgICAgICAgICBfdmlld3NCdXR0b24uSGlkZSgpO1xyXG4gICAgICAgICAgICBBZGQoX3ZpZXdzQnV0dG9uKTtcclxuICAgICAgICAgICAgQWRkTmF2YmFyQnV0dG9uKFwiRm9ydW1cIik7XHJcbiAgICAgICAgICAgIEFkZFNwYWNlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIE5hdmJhckxhYmVsIENyZWF0ZUxhYmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ1NoYXJwV2ViTGFiZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdEhlaWdodCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gNTU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJicm93c2VfY2xpZW50c1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uQnJvd3NlQ2xpZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJyb3dzZV9vcmRlcnNcIjpcclxuICAgICAgICAgICAgICAgICAgICBPbkJyb3dzZU9yZGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJyb3dzZV9wcm9kdWN0c1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uQnJvd3NlUHJvZHVjdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWJzaXRlX21vZGVcIjpcclxuICAgICAgICAgICAgICAgICAgICBPbldlYnNpdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZm9ydW1cIjpcclxuICAgICAgICAgICAgICAgICAgICBPbkZvcnVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibXlfbmV3X2J1dHRvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uTXlOZXdCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbk15TmV3QnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB3aW4gPSBuZXcgV2luZG93KCk7XHJcbiAgICAgICAgICAgIHdpbi5DYXB0aW9uID0gXCJNWSBORVcgQlVUVE9OIFdJTkRPVzJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25Ccm93c2VDbGllbnRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5ldyBDbGllbnRzV2luZG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIE9uQnJvd3NlUHJvZHVjdHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmV3IFByb2R1Y3RzV2luZG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIE9uQnJvd3NlT3JkZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5ldyBPcmRlcnNXaW5kb3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25XZWJzaXRlTW9kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXREYXRhTW9kZSghX2lzRGVza3RvcE1vZGUpO1xyXG4gICAgICAgICAgICBpZiAoX2lzRGVza3RvcE1vZGUpXHJcbiAgICAgICAgICAgICAgICBfdmlld3NCdXR0b24uU2hvdygpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfdmlld3NCdXR0b24uSGlkZSgpO1xyXG4gICAgICAgICAgICBfd29ya3NwYWNlTW9kZUJ1dHRvbi5MYWJlbCA9IF9pc0Rlc2t0b3BNb2RlID8gXCJEZXNrdG9wIE1vZGVcIiA6IFwiV2Vic2l0ZSBNb2RlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIE9uTGF1bmNoZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBuZXcgTGF1bmNoZXJXaW5kb3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25Gb3J1bSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTY3JpcHQuQ2FsbChcIndpbmRvdy5vcGVuXCIsIFwiaHR0cDovL2NzaGFycHdlYmV4cHJlc3MuZnJlZWZvcnVtcy5uZXQvXCIsIFwiX2JsYW5rXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbkRvd25sb2FkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwid2luZG93Lm9wZW5cIiwgXCJodHRwczovL3N0b3JlLmNzaGFycHdlYmV4cHJlc3MuY29tL1wiLCBcIl9ibGFua1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5xeC5pbnRlcmZhY2VzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXI7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aWRnZXRzLmFwcFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwbGljYXRpb25WaWV3c0J1dHRvbiA6IFZpZXdzQnV0dG9uXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEFwcGxpY2F0aW9uVmlld3NCdXR0b24oSURlY29yYXRlIGRlY29yYXRvciwgSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IGJhc2UoZGVjb3JhdG9yLCBoYW5kbGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZE1lbnVCdXR0b25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIkJyb3dzZSBDbGllbnRzXCIpO1xyXG4gICAgICAgICAgICBBZGRCdXR0b24oXCJCcm93c2UgUHJvZHVjdHNcIik7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIkJyb3dzZSBPcmRlcnNcIik7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIk1ZIE5FVyBCVVRUT05cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS50YWJsZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGF0YVRhYmxlIDogVGFibGUsIElIYW5kbGVTZWxlY3Rpb25cclxuICAgIHtcclxuICAgICAgICBBYnN0cmFjdERhdGFDb2xsZWN0aW9uIERhdGFDb2xsZWN0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgSUhhbmRsZVNlbGVjdGVkUmVjb3JkIFJlY29yZFNlbGVjdGlvbkhhbmRsZXIgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBTZWxlY3Rpb25IYW5kbGVyID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmdbXSBEZWZhdWx0Q29sdW1ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZ1tdIHsgXCJOYW1lXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldERhdGFGcm9tQ29sbGVjdGlvbihBYnN0cmFjdERhdGFDb2xsZWN0aW9uIGRhdGFDb2xsZWN0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YUNvbGxlY3Rpb24gPSBkYXRhQ29sbGVjdGlvbjtcclxuICAgICAgICAgICAgRGF0YSA9IERhdGFDb2xsZWN0aW9uLkdldFNlbGVjdGVkRGF0YShEZWZhdWx0SWRzKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSGFuZGxlU2VsZWN0aW9uKGludCBzZWxlY3RlZEluZGV4LCBkeW5hbWljIHJvd0RhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoRGF0YUNvbGxlY3Rpb24gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgQWJzdHJhY3REYXRhUmVjb3JkIHNlbGVjdGVkUmVjb3JkO1xyXG4gICAgICAgICAgICBpZiAocm93RGF0YSAhPSBudWxsICYmIHJvd0RhdGEubGVuZ3RoICE9IG51bGwgJiYgcm93RGF0YS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWNvcmQgPSBEYXRhQ29sbGVjdGlvbi5HZXRSZWNvcmRBdEtleShyb3dEYXRhWzBdKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSZWNvcmQgPSBEYXRhQ29sbGVjdGlvbi5HZXRSZWNvcmRBdEluZGV4KHNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRSZWNvcmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKFJlY29yZFNlbGVjdGlvbkhhbmRsZXIgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIFJlY29yZFNlbGVjdGlvbkhhbmRsZXIuSGFuZGxlU2VsZWN0ZWRSZWNvcmQoc2VsZWN0ZWRSZWNvcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGJvb2wgSGFuZGxlc0FwcGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIE9uQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldENvbHVtblZpc2libGUoMCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuZm9ybTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFEZXRhaWxQYW5lbCA6IFNjcm9sbFxyXG4gICAge1xyXG4gICAgICAgIEZvcm1QYW5lbCBGb3JtUGFuZWwgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIExpc3Q8c3RyaW5nPiBOYW1lc0xpc3QgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIExpc3Q8V2lkZ2V0PiBXaWRnZXRzTGlzdCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIFdpZGdldD4gRmllbGRNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBBZGQoRm9ybVBhbmVsKTtcclxuICAgICAgICAgICAgQWRkRmllbGRzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCdWlsZEZpZWxkcygpO1xyXG4gICAgICAgICAgICBGb3JtUGFuZWwuQWRkRmllbGRzKE5hbWVzTGlzdCwgV2lkZ2V0c0xpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRUZXh0RmllbGQoc3RyaW5nIG5hbWUsIHN0cmluZyB0YWcgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTmFtZXNMaXN0LkFkZChuYW1lKTtcclxuICAgICAgICAgICAgV2lkZ2V0IHdpZGdldCA9IG5ldyBUZXh0RmllbGQoKTtcclxuICAgICAgICAgICAgV2lkZ2V0c0xpc3QuQWRkKHdpZGdldCk7XHJcbiAgICAgICAgICAgIGlmICh0YWcgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRhZyA9IG5hbWUuVG9Mb3dlcigpLlJlcGxhY2UoJyAnLCAnXycpO1xyXG4gICAgICAgICAgICBGaWVsZE1hcFt0YWddID0gd2lkZ2V0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgU2V0VGV4dEZpZWxkVmFsdWUoc3RyaW5nIHRhZywgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXaWRnZXQgd2lkZ2V0O1xyXG4gICAgICAgICAgICBGaWVsZE1hcC5UcnlHZXRWYWx1ZSh0YWcsIG91dCB3aWRnZXQpO1xyXG4gICAgICAgICAgICBpZiAod2lkZ2V0ID09IG51bGwgfHwgd2lkZ2V0IGFzIFRleHRGaWVsZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAod2lkZ2V0IGFzIFRleHRGaWVsZCkuVmFsdWUgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoQWJzdHJhY3REYXRhUmVjb3JkIHJlY29yZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwid2luZG93LmNvbnNvbGUubG9nXCIsIFwiRGF0YSBEZXRhaWwgVXBkYXRlXCIsIHJlY29yZC5Ub1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgICAgICAgICBGb3JtUGFuZWwgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0Zvcm1QYW5lbD1uZXcgRm9ybVBhbmVsKCk7cHJpdmF0ZSAgICAgICAgIExpc3Q8c3RyaW5nPiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTmFtZXNMaXN0PW5ldyBMaXN0PHN0cmluZz4oKTtwcml2YXRlICAgICAgICAgTGlzdDxXaWRnZXQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19XaWRnZXRzTGlzdD1uZXcgTGlzdDxXaWRnZXQ+KCk7cHJpdmF0ZSAgICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBXaWRnZXQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19GaWVsZE1hcD1uZXcgRGljdGlvbmFyeTxzdHJpbmcsIFdpZGdldD4oKTt9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkuY29udGFpbmVyO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEYXRhTGlzdFBhbmVsIDogU2Nyb2xsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIERhdGFUYWJsZSBMaXN0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdCgpO1xyXG4gICAgICAgICAgICBMaXN0ID0gQ3JlYXRlRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgICAgIEFkZChMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIERhdGFUYWJsZSBDcmVhdGVEYXRhVGFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhVGFibGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlZnJlc2hGcm9tQ29sbGVjdGlvbihBYnN0cmFjdERhdGFDb2xsZWN0aW9uIGNvbGxlY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0LlNldERhdGFGcm9tQ29sbGVjdGlvbihjb2xsZWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ29uZmlnO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2luZG93cztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MubGF1bmNoZXJcclxue1xyXG4gICAgcHVibGljIGNsYXNzIExhdW5jaGVyV2luZG93IDogV2luZG93XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBEZWZhdWx0Q2FwdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJMYXVuY2hlclwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGludFtdIERlZmF1bHRMb2NhdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGludFtdIHsgR2xvYmFsRGltZW5zaW9ucy5UcmFuc2NyaXB0TGVmdEluc2V0LCBHbG9iYWxEaW1lbnNpb25zLlRyYW5zY3JpcHRUb3BJbnNldCB9O1xyXG4gICAgICAgIH1cclxucHJvdGVjdGVkIG92ZXJyaWRlIGludCBEZWZhdWx0SGVpZ2h0KClcclxue1xyXG4gICAgcmV0dXJuIDI3NTtcclxufXByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdFdpZHRoKClcclxue1xyXG4gICAgcmV0dXJuIDE3NTtcclxufVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuY29udGFjdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29udGFjdFBhZ2UgOiBDYXJkUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQnV0dG9uTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQ29udGFjdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBQYWdlVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQ29udGFjdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUYWdOYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImNvbnRhY3RcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENhcmRQYW5lbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5jb250YWN0LnBhbmVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29udGFjdFBhZ2VIZWFkbGluZVBhbmVsIDogQnAyQ29sdW1uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBDb250YWN0UGFnZUhlYWRsaW5lUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkTGVmdENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQ2FyZCBjYXJkID0gbmV3IEJwQ2FyZChAXCJDU2hhcnBXZWJFeHByZXNzXCIsIFdpZGdldCk7XHJcbiAgICAgICAgICAgIExlZnRDb2x1bW4uQWRkQ2hpbGQoY2FyZCk7XHJcbiAgICAgICAgICAgIEJwVGV4dCB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgIC5BZGRQKEBcIkNTaGFycFdlYkV4cHJlc3MgaXMgYW4gZXhjaXRpbmcgbmV3IHRlY2hub2xvZ3kgdGhhdCBhbGxvd3MgYnVpbGRpbmcgc29waGlzdGljYXRlZCBXZWIgYXBwbGljYXRpb24gdXNpbmcgb25seSBDU2hhcnAgcHJvZ3JhbW1pbmcuXCIpO1xyXG4gICAgICAgICAgICBjYXJkLkFkZENvbnRlbnRJdGVtKHRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkUmlnaHRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcENhcmQgY2FyZCA9IG5ldyBCcENhcmQoQFwiTmV3c1wiLCBXaWRnZXQpO1xyXG4gICAgICAgICAgICBSaWdodENvbHVtbi5BZGRDaGlsZChjYXJkKTtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIGNhcmQuQWRkQ29udGVudEl0ZW0odGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGlzIGlzIHRoZSBjb2RlIHdoaWNoIGNyZWF0ZXMgdGhlIHNhbXBsZSB0aGF0IHlvdSBhcmUgc2VlaW5nLlxyXG4vLyBCcENhcmQgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgQm9vdHN0cmFwIGNhcmQgZWxlbWVudC5cclxuLy8gQnBDb2RlIGlzIGEgY2xhc3MgcmVwcmVzZW50aW5nIGEgc3R5bGVkIHNvdXJjZSBjb2RlIGVsZW1lbnQuXHJcblxyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF9jb2RlX3NhbXBsZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2VGZWF0dXJlZENvZGVTYW1wbGVQYW5lbCA6IEJwQ2FyZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UoXCJDU2hhcnAgQ29kZSBTYW1wbGVcIiwgd2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQ29udGVudEl0ZW0obmV3IEJwQ29kZShXaWRnZXQsIEJ1aWxkQ29kZSgpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdHJpbmcgQnVpbGRDb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIi8vIFRoaXMgaXMgdGhlIGNvZGUgd2hpY2ggY3JlYXRlcyB0aGUgc2FtcGxlIHRoYXQgeW91IGFyZSBzZWVpbmcuXCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIi8vIEJwQ2FyZCBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBCb290c3RyYXAgY2FyZCBlbGVtZW50LlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIvLyBCcENvZGUgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgYSBzdHlsZWQgc291cmNlIGNvZGUgZWxlbWVudC5cIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJ1c2luZyBDU2hhcnBXZWJFeHByZXNzLmFwcC5ib290c3RyYXA7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcInVzaW5nIENTaGFycFdlYkV4cHJlc3MuYXBwLnZpZXdwb3J0LnBhbmVscztcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwidXNpbmcgU3lzdGVtLlRleHQ7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwibmFtZXNwYWNlIENTaGFycFdlYkV4cHJlc3MuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuZmVhdHVyZWRfY29kZV9zYW1wbGVcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwie1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJwdWJsaWMgY2xhc3MgSG9tZVBhZ2VGZWF0dXJlZENvZGVTYW1wbGVQYW5lbCA6IEJwQ2FyZFwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIHB1YmxpYyBIb21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UoXCJcIkNTaGFycCBDb2RlIFNhbXBsZVwiXCIsIHdpZGdldClcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgfVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ29udGVudCgpXCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAge1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBBZGRDb250ZW50SXRlbShuZXcgQnBDb2RlKFdpZGdldCwgQnVpbGRDb2RlKCkpKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB9XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICBzdHJpbmcgQnVpbGRDb2RlKClcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIFN0cmluZ0J1aWxkZXIgc2IgPSBuZXcgU3RyaW5nQnVpbGRlcigpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIvLyBUaGlzIGlzIHRoZSBjb2RlIHdoaWNoIGNyZWF0ZXMgdGhlIHNhbXBsZSB0aGF0IHlvdSBhcmUgc2VlaW5nLlwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIvLyBCcENhcmQgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgQm9vdHN0cmFwIHN0eWxlZCBIVE1MIGVsZW1lbnQuXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIi8vIEJwQ29kZSBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBhIHN0eWxlZCBzb3VyY2UgY29kZSBlbGVtZW50LlwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcInVzaW5nIENTaGFycFdlYkV4cHJlc3MuYXBwLmJvb3RzdHJhcDtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwidXNpbmcgQ1NoYXJwV2ViRXhwcmVzcy5hcHAudmlld3BvcnQucGFuZWxzO1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCJ1c2luZyBTeXN0ZW0uVGV4dDtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCJuYW1lc3BhY2UgQ1NoYXJwV2ViRXhwcmVzcy5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF9jb2RlX3NhbXBsZVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCJ7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcInB1YmxpYyBjbGFzcyBIb21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsIDogQnBDYXJkXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgcHVibGljIEhvbWVQYWdlRmVhdHVyZWRDb2RlU2FtcGxlUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZShcIlwiQ1NoYXJwIENvZGUgU2FtcGxlXCJcIiwgd2lkZ2V0KVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIHtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICB9XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRDb250ZW50KClcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICB7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgICAgIEFkZENvbnRlbnRJdGVtKG5ldyBCcENvZGUoV2lkZ2V0LCBCdWlsZENvZGUoKSkpO1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIH1cIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIHN0cmluZyBCdWlsZENvZGUoKVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIHtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgICAgIC8vLi4uLi4uIHRoaXMgY29kZSAuLi4uLlwiXCJcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICAgICAgcmV0dXJuIHNiLlRvU3RyaW5nKCk7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgfVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICB9XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIn1cIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB9XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgIH1cIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwifVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuZmVhdHVyZWRfdmlkZW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlQ1NoYXJwRXhwcmVzc1ZpZGVvSG9sZGVyIDogQnAyQ29sdW1uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZUNTaGFycEV4cHJlc3NWaWRlb0hvbGRlcihJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRMZWZ0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBWaWRlbyB2aWRlbyA9IG5ldyBCcFZpZGVvKFdpZGdldCwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9odnJRb1hXRXBBQVwiKTtcclxuICAgICAgICAgICAgTGVmdENvbHVtbi5BZGRDaGlsZCh2aWRlbyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRSaWdodENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwVGV4dCB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICBSaWdodENvbHVtbi5BZGRDaGlsZCh0ZXh0KTtcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAuQWRkQm9sZChAXCJDU2hhcnBXZWJFeHByZXNzIEJ1aWxkIGFuZCBEZXBsb3lcIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiVGhpcyBpcyBhIHNob3J0IHZpZGVvICgzbTQ2cykgc2hvd2luZyB0aGUgYWRkaXRpb24gb2YgYSBuZXcgb2JqZWN0IHRvIGFuIGV4aXN0aW5nIGFwcGxpY2F0aW9uLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJBbGwgdGhlIGNvZGluZyBpcyBkb25lIHVzaW5nIENTaGFycCBpbiBNUyBWaXN1YWwgU3R1ZGlvLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJXaGVuIHRoZSBzb2x1dGlvbiBpcyByZWJ1aWx0LCBhbGwgb2YgdGhlIGFwcGxpY2F0aW9uJ3MgSFRNTDUgY29kZWJhc2UgaXMgcmVidWlsdCBhdXRvbWF0aWNhbGx5LlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuZmVhdHVyZWRfdmlkZW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlRmVhdHVyZWRWaWRlb1BhbmVsIDogQnBDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlRmVhdHVyZWRWaWRlb1BhbmVsKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UoXCJDU2hhcnBXZWJFeHByZXNzIERlbW9cIiwgd2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQ29udGVudEl0ZW0obmV3IEhvbWVQYWdlQ1NoYXJwRXhwcmVzc1ZpZGVvSG9sZGVyKFdpZGdldCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYmxvY2tzLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmUucGFuZWxzLmxlZnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMucmlnaHQ7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lLmhlYWRsaW5lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZUhlYWRsaW5lUGFuZWxzIDogQnAyQ29sdW1uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZUhlYWRsaW5lUGFuZWxzKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZExlZnRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMZWZ0Q29sdW1uLkFkZENoaWxkKG5ldyBIb21lUGFnZUxlZnRJbmZvQ2FyZChXaWRnZXQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZFJpZ2h0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkUmlnaHRDaGlsZChuZXcgSG9tZVBhZ2VSaWdodERvd25sb2Fkc0NhcmQoV2lkZ2V0KSk7XHJcbiAgICAgICAgICAgIEFkZFJpZ2h0Q2hpbGQobmV3IEhvbWVQYWdlUmlnaHRWaWRlb3NDYXJkKFdpZGdldCkpO1xyXG4gICAgICAgICAgICBBZGRSaWdodENoaWxkKG5ldyBIb21lUGFnZVJpZ2h0TGlua3NDYXJkKFdpZGdldCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBZGRSaWdodENoaWxkKEJwRWxlbWVudCBjaGlsZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJpZ2h0Q29sdW1uXHJcbiAgICAgICAgICAgICAgICAuQWRkQ2hpbGQoY2hpbGQpXHJcbiAgICAgICAgICAgICAgICAuQWRkQ2hpbGQobmV3IEJwQnIoV2lkZ2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmNvbnRhY3Q7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMub3ZlcnZpZXc7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMudGVjaG5vbG9neTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lTWVudVBhbmVsIDogTmF2TWVudVBhbmVsXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVNZW51UGFuZWwoTmF2UGFuZWwgbmF2UGFuZWwsIENvbnRlbnRQYW5lbCBjb250ZW50UGFuZWwpIDogYmFzZShuYXZQYW5lbCwgY29udGVudFBhbmVsKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEFkZFBhZ2VzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZFBhZ2UobmV3IEhvbWVQYWdlKCkpO1xyXG4gICAgICAgICAgICBBZGRQYWdlKG5ldyBPdmVydmlld1BhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZFBhZ2UobmV3IFRlY2hub2xvZ3lQYWdlKCkpO1xyXG4gICAgICAgICAgICBBZGRQYWdlKG5ldyBDb250YWN0UGFnZSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgR2V0RGVmYXVsdFBhZ2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBHZXRUYWcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgU2VsZWN0TmF2UGFuZWwoc3RyaW5nIHRhZylcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBTZWxlY3RDb250ZW50UGFnZShzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0YWcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJob21lXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwib3ZlcnZpZXdcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZWNobm9sb2d5XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29udGFjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIENvbnRlbnRQYW5lbC5TZWxlY3RQYWdlKHRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF9jb2RlX3NhbXBsZTtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lLmZlYXR1cmVkX3ZpZGVvO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2UgOiBDYXJkUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQnV0dG9uTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiSG9tZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBQYWdlVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiSG9tZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUYWdOYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcImhvbWVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENhcmRQYW5lbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQ2FyZFBhbmVsV2l0aFNwYWNlcihuZXcgSG9tZVBhZ2VIZWFkbGluZVBhbmVscyh0aGlzKSk7XHJcbiAgICAgICAgICAgIEFkZENhcmRQYW5lbFdpdGhTcGFjZXIobmV3IEhvbWVQYWdlRmVhdHVyZWRDb2RlU2FtcGxlUGFuZWwodGhpcykpO1xyXG4gICAgICAgICAgICBBZGRDYXJkUGFuZWxXaXRoU3BhY2VyKG5ldyBIb21lUGFnZUZlYXR1cmVkVmlkZW9QYW5lbCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLm92ZXJ2aWV3XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPdmVydmlld1BhZ2UgOiBDYXJkUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQnV0dG9uTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiT3ZlcnZpZXdcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgUGFnZVRpdGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk92ZXJ2aWV3XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRhZ05hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwib3ZlcnZpZXdcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENhcmRQYW5lbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLm92ZXJ2aWV3LnBhbmVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT3ZlcnZpZXdQYWdlSGVhZGxpbmVQYW5lbCA6IEJwMkNvbHVtbnNcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgT3ZlcnZpZXdQYWdlSGVhZGxpbmVQYW5lbChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRMZWZ0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBDYXJkIGNhcmQgPSBuZXcgQnBDYXJkKEBcIkNTaGFycFdlYkV4cHJlc3NcIiwgV2lkZ2V0KTtcclxuICAgICAgICAgICAgTGVmdENvbHVtbi5BZGRDaGlsZChjYXJkKTtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLkFkZFAoQFwiQ1NoYXJwV2ViRXhwcmVzcyBpcyBhbiBleGNpdGluZyBuZXcgdGVjaG5vbG9neSB0aGF0IGFsbG93cyBidWlsZGluZyBzb3BoaXN0aWNhdGVkIFdlYiBhcHBsaWNhdGlvbiB1c2luZyBvbmx5IENTaGFycCBwcm9ncmFtbWluZy5cIik7XHJcbiAgICAgICAgICAgIGNhcmQuQWRkQ29udGVudEl0ZW0odGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRSaWdodENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQ2FyZCBjYXJkID0gbmV3IEJwQ2FyZChAXCJOZXdzXCIsIFdpZGdldCk7XHJcbiAgICAgICAgICAgIFJpZ2h0Q29sdW1uLkFkZENoaWxkKGNhcmQpO1xyXG4gICAgICAgICAgICBCcFRleHQgdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgY2FyZC5BZGRDb250ZW50SXRlbSh0ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy50ZWNobm9sb2d5LnBhbmVsc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGVjaG5vbG9neVBhZ2VIZWFkbGluZVBhbmVsIDogQnAyQ29sdW1uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBUZWNobm9sb2d5UGFnZUhlYWRsaW5lUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkTGVmdENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQ2FyZCBjYXJkID0gbmV3IEJwQ2FyZChAXCJDU2hhcnBXZWJFeHByZXNzXCIsIFdpZGdldCk7XHJcbiAgICAgICAgICAgIExlZnRDb2x1bW4uQWRkQ2hpbGQoY2FyZCk7XHJcbiAgICAgICAgICAgIEJwVGV4dCB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgIC5BZGRQKEBcIkNTaGFycFdlYkV4cHJlc3MgaXMgYW4gZXhjaXRpbmcgbmV3IHRlY2hub2xvZ3kgdGhhdCBhbGxvd3MgYnVpbGRpbmcgc29waGlzdGljYXRlZCBXZWIgYXBwbGljYXRpb24gdXNpbmcgb25seSBDU2hhcnAgcHJvZ3JhbW1pbmcuXCIpO1xyXG4gICAgICAgICAgICBjYXJkLkFkZENvbnRlbnRJdGVtKHRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkUmlnaHRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcENhcmQgY2FyZCA9IG5ldyBCcENhcmQoQFwiTmV3c1wiLCBXaWRnZXQpO1xyXG4gICAgICAgICAgICBSaWdodENvbHVtbi5BZGRDaGlsZChjYXJkKTtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIGNhcmQuQWRkQ29udGVudEl0ZW0odGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLnRlY2hub2xvZ3lcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRlY2hub2xvZ3lQYWdlIDogQ2FyZFBhZ2VcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEJ1dHRvbkxhYmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlRlY2hub2xvZ3lcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgUGFnZVRpdGxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlRlY2hub2xvZ3lcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVGFnTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZWNobm9sb2d5XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRDYXJkUGFuZWxzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmJsb2Nrcy52aWV3cG9ydC5wYWdlcy5ob21lLmhlYWRsaW5lLnBhbmVscy5sZWZ0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZUxlZnRJbmZvQ2FyZCA6IEJwQ2FyZFxyXG4gICAge1xyXG4gICAgICAgY29uc3Qgc3RyaW5nIHRpdGxlID0gQFwiV2VsY29tZSB0byBDU2hhcnBXZWJFeHByZXNzXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZUxlZnRJbmZvQ2FyZChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHRpdGxlLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcFRleHQgdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAuQWRkUChAXCJDU2hhcnBXZWJFeHByZXNzIGlzIGEgdGVjaG5vbG9neSBmb3IgYnVpbGRpbmcgc29waGlzdGljYXRlZCBXZWIgYXBwbGljYXRpb25zIHVzaW5nIG9ubHkgdGhlIENTaGFycCBwcm9ncmFtbWluZyBsYW5ndWFnZS5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiVGhlcmUgaXMgbm8gbmVlZCB0byB1c2UgSFRNTCwgQ1NTLCBvciBKYXZhU2NyaXB0IGFsdGhvdWdoIGNvZGUgc25pcHBldHMgbWF5IGJlIGluY2x1ZGVkIHdoZW4gYXBwcm9wcmlhdGUuXCIpXHJcbiAgICAgICAgICAgIC5BZGRQKEBcIlRoZSBuYXZpZ2F0aW9uIGJ1dHRvbnMgYXQgdGhlIGxlZnQgc2VsZWN0IGRpc3BsYXkgcGFuZWxzIGluIHRoaXMgY2VudGVyIGNvbnRlbnQgYXJlYS4gQXQgdGhlIHRvcCBpcyBhIE1vZGUgc2VsZWN0IGJ1dHRvbiB3aGljaCBzaG93cyBlaXRoZXIgXCJcIldlYnNpdGUgTW9kZVwiXCIgb3IgXCJcIkRlc2t0b3AgTW9kZVwiXCIgLSB5b3UgY2FuIHRvZ2dsZSB0aGUgbW9kZSBieSBjbGlja2luZy5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiRGVza3RvcCBtb2RlIHVzZXMgd2luZG93cyB3aGljaCBhcmUgc2ltaWxhciB0byBkZXNrdG9wIEdVSSdzLiBUaGUgXCJcIlZpZXdzXCJcIiBzZWxlY3Rpb24gYnV0dG9uIGF0IHRoZSB0b3Agb3BlbnMgbmV3IHdpbmRvd3MuIFNlZSB0aGUgYnJpZWYgdmlkZW8gYmVsb3cgZm9yIGEgZGVtb25zdHJhdGlvbi5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiVGhpcyBzaXRlIHdhcyBjcmVhdGVkIHVzaW5nIE1pY3Jvc29mdCdzIFZpc3VhbCBTdHVkaW8gMjAxNyBDb21tdW5pdHkgRWRpdGlvbiB3aXRoIGFsbCBjb2RpbmcgZm9yIHRoZSBhcHBsaWNhdGlvbiBkb25lIGluIENTaGFycC4gVGhlIHRvdGFsIGRldmVsb3BtZW50IHRpbWUgKHNpbmdsZSBkZXZlbG9wZXIpIGZvciB0aGUgZGVtbyBhcHBsaWNhdGlvbiB3YXMgYWJvdXQgdHdvIGRheXMgaW5jbHVkaW5nIHNlcnZlciBkZXBsb3ltZW50IChSdWJ5LW9uLVJhaWxzKSB0byBIZXJva3UuXCIpXHJcbiAgICAgICAgICAgIC5BZGRQKEBcIlRoYW5rIHlvdSBmb3IgdmlzaXRpbmcgdGhlIGRlbW8gc2l0ZS5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiLS0gUGV0ZXIgRmlzaywgY3JlYXRvciBvZiBDU2hhcnBXZWJFeHByZXNzXCIpO1xyXG4gICAgICAgICAgICBBZGRDb250ZW50SXRlbSh0ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMucmlnaHRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlUmlnaHRDYXJkIDogQnBDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlUmlnaHRDYXJkKHN0cmluZyB0ZXh0LCBJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHRleHQsIHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBBZGRMaW5rKHN0cmluZyB1cmwsIHN0cmluZyB0ZXh0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJwdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgYnB0ZXh0LkFkZExpbmsodXJsLCB0ZXh0KTtcclxuICAgICAgICAgICAgQWRkQ29udGVudEl0ZW0oYnB0ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3REYXRhQ29sbGVjdGlvbiA6IExpc3Q8QWJzdHJhY3REYXRhUmVjb3JkPlxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyB2b2lkIExvYWREYXRhKGR5bmFtaWMgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghSXNKYXZhU2NyaXB0T2JqZWN0KGRhdGEpIHx8ICFJc0phdmFTY3JpcHROdW1iZXIoZGF0YS5sZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgaXRlbURhdGEgaW4gZGF0YSlcclxuICAgICAgICAgICAgICAgIEFkZERhdGFJdGVtKGl0ZW1EYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljW10+IHNlbGVjdGVkRGF0YSA9IG5ldyBMaXN0PGR5bmFtaWNbXT4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGRhdGFSZWNvcmQgaW4gdGhpcylcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YS5BZGQoZGF0YVJlY29yZC5HZXRTZWxlY3RlZERhdGEoaWRzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZERhdGEuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBBZGREYXRhSXRlbShkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgQWJzdHJhY3REYXRhUmVjb3JkIEdldFJlY29yZEF0S2V5KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBYnN0cmFjdERhdGFSZWNvcmQgR2V0UmVjb3JkQXRJbmRleChpbnQgaW5kZXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IENvdW50KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzW2luZGV4XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE51bWJlcihkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHROdW1iZXIob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE9iamVjdChkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdFN0cmluZyhkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRTdHJpbmcob2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbGllbnREYXRhUmVjb3JkIDogQWJzdHJhY3REYXRhUmVjb3JkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIENsaWVudERhdGFSZWNvcmQoZHluYW1pYyBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0RGF0YShkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBkeW5hbWljW10gR2V0U2VsZWN0ZWREYXRhKHN0cmluZ1tdIGlkcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8ZHluYW1pYz4gZGF0YSA9IG5ldyBMaXN0PGR5bmFtaWM+KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2goc3RyaW5nIGlkIGluIGlkcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjaXR5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKENpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInV1aWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoVVVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKFwiLS0tXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5Ub0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkJ1aWxkRmllbGRzKCk7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5hZGRyZXNzKSlcclxuICAgICAgICAgICAgICAgIEFkZHJlc3MgPSBSYXdEYXRhLmFkZHJlc3M7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5jZWxsKSlcclxuICAgICAgICAgICAgICAgIENlbGwgPSBSYXdEYXRhLmNlbGw7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5jaXR5KSlcclxuICAgICAgICAgICAgICAgIENpdHkgPSBSYXdEYXRhLmNpdHk7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5lbWFpbCkpXHJcbiAgICAgICAgICAgICAgICBFbWFpbCA9IFJhd0RhdGEuZW1haWw7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5uYW1lKSlcclxuICAgICAgICAgICAgICAgIE5hbWUgPSBSYXdEYXRhLm5hbWU7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5waG9uZSkpXHJcbiAgICAgICAgICAgICAgICBQaG9uZSA9IFJhd0RhdGEucGhvbmU7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5zdGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBTdGF0ZSA9IFJhd0RhdGEuc3RhdGU7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5jbGllbnRfdXVpZCkpXHJcbiAgICAgICAgICAgICAgICBVVUlEID0gUmF3RGF0YS5jbGllbnRfdXVpZDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLnppcCkpXHJcbiAgICAgICAgICAgICAgICBaaXAgPSBSYXdEYXRhLnppcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQWRkcmVzcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENlbGwgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDaXR5IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRW1haWwgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUGhvbmUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBTdGF0ZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFVVSUQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBaaXAgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxuXHJcbiAgICBcbnByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19BZGRyZXNzPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NlbGw9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ2l0eT1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19FbWFpbD1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19OYW1lPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1Bob25lPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1N0YXRlPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1VVSUQ9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fWmlwPVwiXCI7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPcmRlckRhdGFSZWNvcmQgOiBBYnN0cmFjdERhdGFSZWNvcmRcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIE9yZGVyRGF0YVJlY29yZChkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXREYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljPiBkYXRhID0gbmV3IExpc3Q8ZHluYW1pYz4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIGlkIGluIGlkcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChEYXRlVGltZS5EYXRlLlRvU3RyaW5nKFwieXl5eS1NTU0tZGRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2xpZW50X25hbWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoR2V0Q2xpZW50TmFtZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb2R1Y3RfbmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChHZXRQcm9kdWN0TmFtZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInV1aWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoVVVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuVG9BcnJheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBHZXRQcm9kdWN0TmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0YU1hbmFnZXIuUHJvZHVjdHMuUHJvZHVjdE5hbWVGb3JVVUlEKFByb2R1Y3RVVUlEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgcHVibGljIHN0cmluZyBHZXRDbGllbnROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhTWFuYWdlci5DbGllbnRzLkNsaWVudE5hbWVGb3JVVUlEKENsaWVudFVVSUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBHZXRQcmljZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRGF0YU1hbmFnZXIuUHJvZHVjdHMuUHJvZHVjdFByaWNlRm9yVVVJRChQcm9kdWN0VVVJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIEdldFRvdGFsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBHZXRQcmljZSgpICogUXVhbnRpdHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkJ1aWxkRmllbGRzKCk7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5jbGllbnRfdXVpZCkpXHJcbiAgICAgICAgICAgICAgICBDbGllbnRVVUlEID0gUmF3RGF0YS5jbGllbnRfdXVpZDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmRhdGVfc3RyKSlcclxuICAgICAgICAgICAgICAgIERhdGVUaW1lID0gQ29udmVydC5Ub0RhdGVUaW1lKFJhd0RhdGEuZGF0ZV9zdHIpO1xyXG4gICAgICAgICAgICBpZiAoSXNKYXZhU2NyaXB0U3RyaW5nKFJhd0RhdGEucHJvZHVjdF91dWlkKSlcclxuICAgICAgICAgICAgICAgIFByb2R1Y3RVVUlEID0gUmF3RGF0YS5wcm9kdWN0X3V1aWQ7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHROdW1iZXIoUmF3RGF0YS5xdWFudGl0eSkpXHJcbiAgICAgICAgICAgICAgICBRdWFudGl0eSA9IFJhd0RhdGEucXVhbnRpdHk7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5vcmRlcl91dWlkKSlcclxuICAgICAgICAgICAgICAgIFVVSUQgPSBSYXdEYXRhLm9yZGVyX3V1aWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENsaWVudFVVSUQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIERhdGVUaW1lIERhdGVUaW1lIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUHJvZHVjdFVVSUQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGludCBRdWFudGl0eSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFVVSUQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxuICAgIFxucHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NsaWVudFVVSUQ9XCJcIjtwcml2YXRlIERhdGVUaW1lIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19EYXRlVGltZT1EYXRlVGltZS5Ob3c7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1Byb2R1Y3RVVUlEPVwiXCI7cHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1F1YW50aXR5PTA7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1VVSUQ9XCJcIjt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9kdWN0RGF0YVJlY29yZCA6IEFic3RyYWN0RGF0YVJlY29yZFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBQcm9kdWN0RGF0YVJlY29yZChkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXREYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljPiBkYXRhID0gbmV3IExpc3Q8ZHluYW1pYz4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoc3RyaW5nIGlkIGluIGlkcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvZHVjdF9uYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXVpZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5Ub0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkJ1aWxkRmllbGRzKCk7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5jb2xvcikpXHJcbiAgICAgICAgICAgICAgICBDb2xvciA9IFJhd0RhdGEuY29sb3I7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5kZXBhcnRtZW50KSlcclxuICAgICAgICAgICAgICAgIERlcGFydG1lbnQgPSBSYXdEYXRhLmRlcGFydG1lbnQ7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5tYXRlcmlhbCkpXHJcbiAgICAgICAgICAgICAgICBNYXRlcmlhbCA9IFJhd0RhdGEubWF0ZXJpYWw7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5wcm9kdWN0X25hbWUpKVxyXG4gICAgICAgICAgICAgICAgTmFtZSA9IFJhd0RhdGEucHJvZHVjdF9uYW1lO1xyXG4gICAgICAgICAgICBpZiAoSXNKYXZhU2NyaXB0TnVtYmVyKFJhd0RhdGEucHJpY2UpKVxyXG4gICAgICAgICAgICAgICAgUHJpY2UgPSBSYXdEYXRhLnByaWNlO1xyXG4gICAgICAgICAgICBpZiAoSXNKYXZhU2NyaXB0U3RyaW5nKFJhd0RhdGEucHJvbW90aW9uX2NvZGUpKVxyXG4gICAgICAgICAgICAgICAgUHJvbW90aW9uQ29kZSA9IFJhd0RhdGEucHJvbW90aW9uX2NvZGU7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5wcm9kdWN0X3V1aWQpKVxyXG4gICAgICAgICAgICAgICAgVVVJRCA9IFJhd0RhdGEucHJvZHVjdF91dWlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBDb2xvciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIERlcGFydG1lbnQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBNYXRlcmlhbCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIGRvdWJsZSBQcmljZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFByb21vdGlvbkNvZGUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBVVUlEIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cbiAgICBcbnByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Db2xvcj1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19EZXBhcnRtZW50PVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX01hdGVyaWFsPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX05hbWU9XCJcIjtwcml2YXRlIGRvdWJsZSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUHJpY2U9MDtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUHJvbW90aW9uQ29kZT1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19VVUlEPVwiXCI7fVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5jbGllbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbGllbnRzRGF0YVRhYmxlIDogRGF0YVRhYmxlXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmdbXSBEZWZhdWx0Q29sdW1ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZ1tdIHsgXCJVVUlEXCIsIFwiTmFtZVwiLCBcIkNpdHlcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLmNsaWVudHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsaWVudHNEZXRhaWxQYW5lbCA6IERhdGFEZXRhaWxQYW5lbFxyXG4gICAge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJOYW1lXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJBZGRyZXNzXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJDaXR5XCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJTdGF0ZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiWmlwXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJQaG9uZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiQ2VsbFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiRW1haWxcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkNsaWVudCBVVUlEXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEFic3RyYWN0RGF0YVJlY29yZCByZWNvcmQpXHJcbiAgICAgICAge1xyXG5DbGllbnREYXRhUmVjb3JkIGNsaWVudFJlY29yZDsgICAgICAgICAgICBpZiAoISgoY2xpZW50UmVjb3JkID0gcmVjb3JkIGFzIENsaWVudERhdGFSZWNvcmQpICE9IG51bGwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcIm5hbWVcIiwgY2xpZW50UmVjb3JkLk5hbWUpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImFkZHJlc3NcIiwgY2xpZW50UmVjb3JkLkFkZHJlc3MpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImNpdHlcIiwgY2xpZW50UmVjb3JkLkNpdHkpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInN0YXRlXCIsIGNsaWVudFJlY29yZC5TdGF0ZSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiemlwXCIsIGNsaWVudFJlY29yZC5aaXApO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInBob25lXCIsIGNsaWVudFJlY29yZC5QaG9uZSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiY2VsbFwiLCBjbGllbnRSZWNvcmQuQ2VsbCk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiZW1haWxcIiwgY2xpZW50UmVjb3JkLkVtYWlsKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJjbGllbnRfdXVpZFwiLCBjbGllbnRSZWNvcmQuVVVJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEuY2xpZW50c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2xpZW50c0xpc3RQYW5lbCA6IERhdGFMaXN0UGFuZWxcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGF0YVRhYmxlIENyZWF0ZURhdGFUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENsaWVudHNEYXRhVGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5zcGxpdHBhbmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS53aW5kb3dzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBEYXRhV2luZG93IDogV2luZG93LCBJSGFuZGxlU2VsZWN0ZWRSZWNvcmRcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHVibGljIERhdGFMaXN0UGFuZWwgRGF0YUxpc3RQYW5lbCB7IGdldDsgcHJvdGVjdGVkIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBEYXRhRGV0YWlsUGFuZWwgRGF0YURldGFpbFBhbmVsIHsgZ2V0OyBwcm90ZWN0ZWQgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIERhdGFMaXN0UGFuZWwgPSBCdWlsZExpc3RQYW5lbCgpO1xyXG4gICAgICAgICAgICBEYXRhRGV0YWlsUGFuZWwgPSBCdWlsZERldGFpbFBhbmVsKCk7XHJcbiAgICAgICAgICAgIFNwbGl0LkFkZChEYXRhTGlzdFBhbmVsKTtcclxuICAgICAgICAgICAgU3BsaXQuQWRkKERhdGFEZXRhaWxQYW5lbCk7XHJcbiAgICAgICAgICAgIEFkZChTcGxpdCwgXCJjZW50ZXJcIik7XHJcbiAgICAgICAgICAgIEFkZExpc3RlbmVycygpO1xyXG4gICAgICAgICAgICBEYXRhTGlzdFBhbmVsLkxpc3QuUmVjb3JkU2VsZWN0aW9uSGFuZGxlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFkZExpc3RlbmVycygpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIE9uQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFJlZnJlc2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBib29sIEhhbmRsZXNBcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvbl9yZWZyZXNoXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgUmVmcmVzaCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIERhdGFEZXRhaWxQYW5lbCBCdWlsZERldGFpbFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YURldGFpbFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCBEYXRhTGlzdFBhbmVsIEJ1aWxkTGlzdFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YUxpc3RQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBIYW5kbGVTZWxlY3RlZFJlY29yZChBYnN0cmFjdERhdGFSZWNvcmQgcmVjb3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YURldGFpbFBhbmVsLlVwZGF0ZShyZWNvcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIFNwbGl0UGFuZSBTcGxpdCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXG4gICAgXG5wcml2YXRlIFNwbGl0UGFuZSBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU3BsaXQ9U3BsaXRQYW5lLkhvcml6b250YWwoKTt9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLm9yZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT3JkZXJzRGF0YVRhYmxlIDogRGF0YVRhYmxlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZ1tdIERlZmF1bHRDb2x1bW5zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3RyaW5nW10geyBcIlVVSURcIiwgXCJEYXRlXCIsIFwiQ2xpZW50IE5hbWVcIiwgXCJQcm9kdWN0IE5hbWVcIiB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEub3JkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPcmRlcnNEZXRhaWxQYW5lbCA6IERhdGFEZXRhaWxQYW5lbFxyXG4gICAge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJDbGllbnRcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlByb2R1Y3RcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkRhdGVcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlF1YW50aXR5XCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJQcmljZSBFYWNoXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJUb3RhbFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiT3JkZXIgVVVJRFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiQ2xpZW50IFVVSURcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlByb2R1Y3QgVVVJRFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShBYnN0cmFjdERhdGFSZWNvcmQgcmVjb3JkKVxyXG4gICAgICAgIHtcclxuT3JkZXJEYXRhUmVjb3JkIG9yZGVyUmVjb3JkOyAgICAgICAgICAgIGlmICghKChvcmRlclJlY29yZCA9IHJlY29yZCBhcyBPcmRlckRhdGFSZWNvcmQpICE9IG51bGwpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImNsaWVudFwiLCBvcmRlclJlY29yZC5HZXRDbGllbnROYW1lKCkpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInByb2R1Y3RcIiwgb3JkZXJSZWNvcmQuR2V0UHJvZHVjdE5hbWUoKSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiZGF0ZVwiLCBvcmRlclJlY29yZC5EYXRlVGltZS5Ub1N0cmluZyhcInl5eXktTU1NLWRkIEhIOm1tOnNzXCIpKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJxdWFudGl0eVwiLCBzdHJpbmcuRm9ybWF0KFwiezB9XCIsIG9yZGVyUmVjb3JkLlF1YW50aXR5KSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwicHJpY2VfZWFjaFwiLCBzdHJpbmcuRm9ybWF0KFwiJHswOkYyfVwiLCBvcmRlclJlY29yZC5HZXRQcmljZSgpKSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwidG90YWxcIiwgc3RyaW5nLkZvcm1hdChcIiR7MDpGMn1cIiwgb3JkZXJSZWNvcmQuR2V0VG90YWwoKSkpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcIm9yZGVyX3V1aWRcIiwgb3JkZXJSZWNvcmQuVVVJRCk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiY2xpZW50X3V1aWRcIiwgb3JkZXJSZWNvcmQuQ2xpZW50VVVJRCk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwicHJvZHVjdF91dWlkXCIsIG9yZGVyUmVjb3JkLlByb2R1Y3RVVUlEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLm9yZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT3JkZXJzTGlzdFBhbmVsIDogRGF0YUxpc3RQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhVGFibGUgQ3JlYXRlRGF0YVRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3JkZXJzRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5wcm9kdWN0c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvZHVjdHNEYXRhVGFibGUgOiBEYXRhVGFibGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nW10gRGVmYXVsdENvbHVtbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdHJpbmdbXSB7XCJVVUlEXCIsIFwiUHJvZHVjdCBOYW1lXCIgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5HbG9iYWxpemF0aW9uO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLnByb2R1Y3RzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9kdWN0c0RldGFpbFBhbmVsIDogRGF0YURldGFpbFBhbmVsXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQnVpbGRGaWVsZHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiTmFtZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiRGVwYXJ0bWVudFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiTWF0ZXJpYWxcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkNvbG9yXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJQcmljZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiUHJvbW90aW9uIENvZGVcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlByb2R1Y3QgVVVJRFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShBYnN0cmFjdERhdGFSZWNvcmQgcmVjb3JkKVxyXG4gICAgICAgIHtcclxuUHJvZHVjdERhdGFSZWNvcmQgcHJvZHVjdFJlY29yZDsgICAgICAgICAgICBpZiAoISgocHJvZHVjdFJlY29yZCA9IHJlY29yZCBhcyBQcm9kdWN0RGF0YVJlY29yZCkgIT0gbnVsbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwibmFtZVwiLCBwcm9kdWN0UmVjb3JkLk5hbWUpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImRlcGFydG1lbnRcIiwgcHJvZHVjdFJlY29yZC5EZXBhcnRtZW50KTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJtYXRlcmlhbFwiLCBwcm9kdWN0UmVjb3JkLk1hdGVyaWFsKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJjb2xvclwiLCBwcm9kdWN0UmVjb3JkLkNvbG9yKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJwcmljZVwiLCBzdHJpbmcuRm9ybWF0KFwiJHswOkYyfVwiLCBwcm9kdWN0UmVjb3JkLlByaWNlKSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwicHJvbW90aW9uX2NvZGVcIiwgcHJvZHVjdFJlY29yZC5Qcm9tb3Rpb25Db2RlKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJwcm9kdWN0X3V1aWRcIiwgcHJvZHVjdFJlY29yZC5VVUlEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLnByb2R1Y3RzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9kdWN0c0xpc3RQYW5lbCA6IERhdGFMaXN0UGFuZWxcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGF0YVRhYmxlIENyZWF0ZURhdGFUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2R1Y3RzRGF0YVRhYmxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYmxvY2tzLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmUucGFuZWxzLnJpZ2h0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZVJpZ2h0RG93bmxvYWRzQ2FyZCA6IEhvbWVQYWdlUmlnaHRDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nIHRpdGxlID0gQFwiRG93bmxvYWRzIDIwMTktSmFuLTA3XCI7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nIGRlbW9SYWlsc1VybCA9IEBcImh0dHBzOi8vZ2l0aHViLmNvbS9wZGZpc2svY3NoYXJwX3dlYl9leHByZXNzX2RlbW9fc2VydmVyXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZVJpZ2h0RG93bmxvYWRzQ2FyZChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHRpdGxlLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGREb3dubG9hZExpbmsoZGVtb1JhaWxzVXJsLCBcIkRlbW8gUmFpbHMgU2VydmVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBBZGREb3dubG9hZExpbmsoc3RyaW5nIHVybCwgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICBicHRleHQuQWRkTGluayh1cmwsIHRleHQpO1xyXG4gICAgICAgICAgICBBZGRDb250ZW50SXRlbShicHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYmxvY2tzLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmUucGFuZWxzLnJpZ2h0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZVJpZ2h0TGlua3NDYXJkIDogSG9tZVBhZ2VSaWdodENhcmRcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdHJpbmcgdGl0bGUgPSBAXCJMaW5rc1wiO1xyXG4gICAgICAgIGNvbnN0IHN0cmluZyBibG9nVXJsID0gQFwiaHR0cHM6Ly9jc2hhcnB3ZWJleHByZXNzLnF1b3JhLmNvbS9cIjtcclxuXHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlUmlnaHRMaW5rc0NhcmQoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh0aXRsZSwgd2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkTGluayhibG9nVXJsLCBcIkNTaGFycFdlYkV4cHJlc3MgQmxvZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMucmlnaHRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlUmlnaHRWaWRlb3NDYXJkIDogSG9tZVBhZ2VSaWdodENhcmRcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdHJpbmcgdGl0bGUgPSBAXCJWaWRlb3NcIjtcclxuICAgICAgICBjb25zdCBzdHJpbmcgZGVtb1VybCA9IEBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9WEdwblB0TDRXSVVcIjtcclxuICAgICAgICBjb25zdCBzdHJpbmcgbmV3V2luZG93VXJsID0gQFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1odnJRb1hXRXBBQVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVBhZ2VSaWdodFZpZGVvc0NhcmQoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh0aXRsZSwgd2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkTGluayhkZW1vVXJsLCBcIkRlbW8gQXBwbGljYXRpb24gKG5vIHNvdW5kKVwiKTtcclxuICAgICAgICAgICAgQWRkTGluayhuZXdXaW5kb3dVcmwsIFwiVXBkYXRlIGFuZCBEZXBsb3kgdG8gSGVyb2t1ICgzbTQ2cyB0b3RhbCBlbGFwc2VkIHRpbWUpXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbGllbnREYXRhQ29sbGVjdGlvbiA6IEFic3RyYWN0RGF0YUNvbGxlY3Rpb25cclxuICAgIHtcclxuICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgQ2xpZW50RGF0YVJlY29yZD4gQ2xpZW50TWFwIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkRGF0YUl0ZW0oZHluYW1pYyBpdGVtRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghSXNKYXZhU2NyaXB0T2JqZWN0KGl0ZW1EYXRhKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgQ2xpZW50RGF0YVJlY29yZCBjbGllbnRSZWNvcmQgPSBuZXcgQ2xpZW50RGF0YVJlY29yZChpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgIENsaWVudE1hcFtjbGllbnRSZWNvcmQuVVVJRF0gPSBjbGllbnRSZWNvcmQ7XHJcbiAgICAgICAgICAgIEFkZChjbGllbnRSZWNvcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEFic3RyYWN0RGF0YVJlY29yZCBHZXRSZWNvcmRBdEtleShzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENsaWVudFJlY29yZEZvclVVSUQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDbGllbnREYXRhUmVjb3JkIENsaWVudFJlY29yZEZvclVVSUQoc3RyaW5nIHV1aWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoQ2xpZW50TWFwLkNvbnRhaW5zS2V5KHV1aWQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIENsaWVudE1hcFt1dWlkXTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENsaWVudE5hbWVGb3JVVUlEKHN0cmluZyB1dWlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2xpZW50RGF0YVJlY29yZCByZWNvcmQgPSBDbGllbnRSZWNvcmRGb3JVVUlEKHV1aWQpO1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCItLS1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5OYW1lO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlICAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIENsaWVudERhdGFSZWNvcmQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19DbGllbnRNYXA9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBDbGllbnREYXRhUmVjb3JkPigpO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9yZGVyRGF0YUNvbGxlY3Rpb24gOiBBYnN0cmFjdERhdGFDb2xsZWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIE9yZGVyRGF0YVJlY29yZD4gT3JkZXJNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGREYXRhSXRlbShkeW5hbWljIGl0ZW1EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFJc0phdmFTY3JpcHRPYmplY3QoaXRlbURhdGEpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBPcmRlckRhdGFSZWNvcmQgb3JkZXJSZWNvcmQgPSBuZXcgT3JkZXJEYXRhUmVjb3JkKGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgT3JkZXJNYXBbb3JkZXJSZWNvcmQuVVVJRF0gPSBvcmRlclJlY29yZDtcclxuICAgICAgICAgICAgQWRkKG9yZGVyUmVjb3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBBYnN0cmFjdERhdGFSZWNvcmQgR2V0UmVjb3JkQXRLZXkoc3RyaW5nIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBPcmRlclJlY29yZEZvclVVSUQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPcmRlckRhdGFSZWNvcmQgT3JkZXJSZWNvcmRGb3JVVUlEKHN0cmluZyB1dWlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9yZGVyTWFwLkNvbnRhaW5zS2V5KHV1aWQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9yZGVyTWFwW3V1aWRdO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSAgICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBPcmRlckRhdGFSZWNvcmQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19PcmRlck1hcD1uZXcgRGljdGlvbmFyeTxzdHJpbmcsIE9yZGVyRGF0YVJlY29yZD4oKTt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9kdWN0RGF0YUNvbGxlY3Rpb24gOiBBYnN0cmFjdERhdGFDb2xsZWN0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIFByb2R1Y3REYXRhUmVjb3JkPiBQcm9kdWN0TWFwIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkRGF0YUl0ZW0oZHluYW1pYyBpdGVtRGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghSXNKYXZhU2NyaXB0T2JqZWN0KGl0ZW1EYXRhKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgUHJvZHVjdERhdGFSZWNvcmQgcHJvZHVjdFJlY29yZCA9IG5ldyBQcm9kdWN0RGF0YVJlY29yZChpdGVtRGF0YSk7XHJcbiAgICAgICAgICAgIFByb2R1Y3RNYXBbcHJvZHVjdFJlY29yZC5VVUlEXSA9IHByb2R1Y3RSZWNvcmQ7XHJcbiAgICAgICAgICAgIEFkZChwcm9kdWN0UmVjb3JkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQcm9kdWN0RGF0YVJlY29yZCBQcm9kdWN0UmVjb3JkRm9yVVVJRChzdHJpbmcgdXVpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChQcm9kdWN0TWFwLkNvbnRhaW5zS2V5KHV1aWQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb2R1Y3RNYXBbdXVpZF07XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQcm9kdWN0TmFtZUZvclVVSUQoc3RyaW5nIHV1aWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIFByb2R1Y3REYXRhUmVjb3JkIHJlY29yZCA9IFByb2R1Y3RSZWNvcmRGb3JVVUlEKHV1aWQpO1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCItLS1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5OYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEFic3RyYWN0RGF0YVJlY29yZCBHZXRSZWNvcmRBdEtleShzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb2R1Y3RSZWNvcmRGb3JVVUlEKGtleSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFByb2R1Y3RQcmljZUZvclVVSUQoc3RyaW5nIHV1aWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQcm9kdWN0RGF0YVJlY29yZCByZWNvcmQgPSBQcm9kdWN0UmVjb3JkRm9yVVVJRCh1dWlkKTtcclxuICAgICAgICAgICAgaWYgKHJlY29yZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIHJldHVybiByZWNvcmQuUHJpY2U7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgUHJvZHVjdERhdGFSZWNvcmQ+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9kdWN0TWFwPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgUHJvZHVjdERhdGFSZWNvcmQ+KCk7fVxyXG59XHJcblxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEuY2xpZW50c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2xpZW50c1dpbmRvdyA6IERhdGFXaW5kb3dcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIEJ1dHRvbkNvbmZpZ1tdIERlZmF1bHRCdXR0b25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnW10ge1xyXG4gICAgICAgICAgICAgICAgQnV0dG9uUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvbl9zaG93X29yZGVyc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIFNob3dPcmRlcnMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZS5IYW5kbGVFdmVudChldmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBSZWZyZXNoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGFMaXN0UGFuZWwuUmVmcmVzaEZyb21Db2xsZWN0aW9uKERhdGFNYW5hZ2VyLkNsaWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBTaG93T3JkZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwid2luZG93LmNvbnNvbGUubG9nXCIsIFwiU2hvd09yZGVyc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1dHRvbkNvbmZpZyBCdXR0b25SZWZyZXNoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiUmVmcmVzaFwiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1dHRvbkNvbmZpZyBCdXR0b25TaG93T3JkZXJzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiU2hvdyBPcmRlcnNcIiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGF0YURldGFpbFBhbmVsIEJ1aWxkRGV0YWlsUGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRzRGV0YWlsUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhTGlzdFBhbmVsIEJ1aWxkTGlzdFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2xpZW50c0xpc3RQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBEZWZhdWx0Q2FwdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDbGllbnRzXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi51dGlsO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLm9yZGVyc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT3JkZXJzV2luZG93IDogRGF0YVdpbmRvd1xyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBCdXR0b25Db25maWdbXSBEZWZhdWx0QnV0dG9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZ1tdIHtcclxuICAgICAgICAgICAgICAgIEJ1dHRvblJlZnJlc2goKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFEZXRhaWxQYW5lbCBCdWlsZERldGFpbFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3JkZXJzRGV0YWlsUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhTGlzdFBhbmVsIEJ1aWxkTGlzdFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3JkZXJzTGlzdFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBSZWZyZXNoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERhdGFMaXN0UGFuZWwuUmVmcmVzaEZyb21Db2xsZWN0aW9uKERhdGFNYW5hZ2VyLk9yZGVycyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXR0b25Db25maWcgQnV0dG9uUmVmcmVzaCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZyhcIlJlZnJlc2hcIiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXR0b25Db25maWcgQnV0dG9uU2hvd0NsaWVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZyhcIlNob3cgQ2xpZW50XCIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnV0dG9uQ29uZmlnIEJ1dHRvblNob3dQcm9kdWN0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiU2hvdyBQcm9kdWN0XCIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBEZWZhdWx0Q2FwdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJPcmRlcnNcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEucHJvZHVjdHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2R1Y3RzV2luZG93IDogRGF0YVdpbmRvd1xyXG4gICAge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgQnV0dG9uQ29uZmlnW10gRGVmYXVsdEJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWdbXSB7XHJcbiAgICAgICAgICAgICAgICBCdXR0b25SZWZyZXNoKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhRGV0YWlsUGFuZWwgQnVpbGREZXRhaWxQYW5lbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb2R1Y3RzRGV0YWlsUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhTGlzdFBhbmVsIEJ1aWxkTGlzdFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvZHVjdHNMaXN0UGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1dHRvbkNvbmZpZyBCdXR0b25SZWZyZXNoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiUmVmcmVzaFwiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YUxpc3RQYW5lbC5SZWZyZXNoRnJvbUNvbGxlY3Rpb24oRGF0YU1hbmFnZXIuUHJvZHVjdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnV0dG9uQ29uZmlnIEJ1dHRvblNob3dPcmRlcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWcoXCJTaG93IE9yZGVyc1wiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmcgRGVmYXVsdENhcHRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiUHJvZHVjdHNcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdCn0K
