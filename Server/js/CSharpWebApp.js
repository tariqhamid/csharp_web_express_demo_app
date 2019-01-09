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
                    var xhr = ($t = new CSharpWebLib.qx.io.request.Xhr(), $t.Method = "GET", $t.Url = System.String.format("/api/{0}", [path]), $t);
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
                win.Caption = "MY NEW BUTTON WINDOW";
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDU2hhcnBXZWJBcHAuanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIndlYl91aS9BcHAuY3MiLCJhcHAvYXBpL1NlcnZlckFwaS5jcyIsImFwcC9BcHBsaWNhdGlvbi5jcyIsImFwcC9kYXRhL0Fic3RyYWN0RGF0YVJlY29yZC5jcyIsImFwcC9kYXRhL0RhdGFNYW5hZ2VyLmNzIiwiYXBwL2RhdGEvRGF0YVV0aWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvQXBwbGljYXRpb25WaWV3cG9ydC5jcyIsImFwcC91aS92aWV3cG9ydC9BcHBsaWNhdGlvblZpZXdwb3J0U3RhY2suY3MiLCJhcHAvdWkvdmlld3BvcnQvY29udGVudC9BcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudC5jcyIsImFwcC91aS93aWRnZXRzL2FwcC9BcHBsaWNhdGlvbk5hdmJhci5jcyIsImFwcC91aS93aWRnZXRzL2FwcC9BcHBsaWNhdGlvblZpZXdzQnV0dG9uLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9EYXRhVGFibGUuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL0RhdGFEZXRhaWxQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvRGF0YUxpc3RQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2xhdW5jaGVyL0xhdW5jaGVyV2luZG93LmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2NvbnRhY3QvQ29udGFjdFBhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvY29udGFjdC9wYW5lbHMvRG93bmxvYWRzUGFnZUhlYWRsaW5lUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9mZWF0dXJlZF9jb2RlX3NhbXBsZS9Ib21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2hvbWUvZmVhdHVyZWRfdmlkZW8vSG9tZVBhZ2VGZWF0dXJlZFZpZGVvSG9sZGVyLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL2hvbWUvZmVhdHVyZWRfdmlkZW8vSG9tZVBhZ2VGZWF0dXJlZFZpZGVvUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvSG9tZVBhZ2VIZWFkbGluZVBhbmVscy5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL0hvbWVNZW51UGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9Ib21lUGFnZS5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9vdmVydmlldy9PdmVydmlld1BhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvb3ZlcnZpZXcvcGFuZWxzL092ZXJ2aWV3UGFnZUhlYWRsaW5lUGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvdGVjaG5vbG9neS9wYW5lbHMvVGVjaG5vbG9neVBhZ2VIZWFkbGluZVBhbmVsLmNzIiwiYXBwL3VpL3ZpZXdwb3J0L3BhZ2VzL3RlY2hub2xvZ3kvVGVjaG5vbG9neVBhZ2UuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvbGVmdC9Ib21lUGFnZUxlZnRJbmZvQ2FyZC5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL2hlYWRsaW5lL3BhbmVscy9yaWdodC9Ib21lUGFnZVJpZ2h0Q2FyZC5jcyIsImFwcC9kYXRhL0Fic3RyYWN0RGF0YUNvbGxlY3Rpb24uY3MiLCJhcHAvZGF0YS9DbGllbnREYXRhUmVjb3JkLmNzIiwiYXBwL2RhdGEvT3JkZXJEYXRhUmVjb3JkLmNzIiwiYXBwL2RhdGEvUHJvZHVjdERhdGFSZWNvcmQuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL2NsaWVudHMvQ2xpZW50c0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvY2xpZW50cy9DbGllbnRzRGV0YWlsUGFuZWwuY3MiLCJhcHAvdWkvd2luZG93cy9kYXRhL2NsaWVudHMvQ2xpZW50c0xpc3RQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvRGF0YVdpbmRvdy5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvb3JkZXJzL09yZGVyc0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvb3JkZXJzL09yZGVyc0RldGFpbFBhbmVsLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9vcmRlcnMvT3JkZXJzTGlzdFBhbmVsLmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9wcm9kdWN0cy9Qcm9kdWN0c0RhdGFUYWJsZS5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvcHJvZHVjdHMvUHJvZHVjdHNEZXRhaWxQYW5lbC5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvcHJvZHVjdHMvUHJvZHVjdHNMaXN0UGFuZWwuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvcmlnaHQvSG9tZVBhZ2VSaWdodERvd25sb2Fkc0NhcmQuY3MiLCJhcHAvdWkvdmlld3BvcnQvcGFnZXMvaG9tZS9oZWFkbGluZS9wYW5lbHMvcmlnaHQvSG9tZVBhZ2VSaWdodExpbmtzQ2FyZC5jcyIsImFwcC91aS92aWV3cG9ydC9wYWdlcy9ob21lL2hlYWRsaW5lL3BhbmVscy9yaWdodC9Ib21lUGFnZVJpZ2h0VmlkZW9zQ2FyZC5jcyIsImFwcC9kYXRhL0NsaWVudERhdGFDb2xsZWN0aW9uLmNzIiwiYXBwL2RhdGEvT3JkZXJEYXRhQ29sbGVjdGlvbi5jcyIsImFwcC9kYXRhL1Byb2R1Y3REYXRhQ29sbGVjdGlvbi5jcyIsImFwcC91aS93aW5kb3dzL2RhdGEvY2xpZW50cy9DbGllbnRzV2luZG93LmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9vcmRlcnMvT3JkZXJzV2luZG93LmNzIiwiYXBwL3VpL3dpbmRvd3MvZGF0YS9wcm9kdWN0cy9Qcm9kdWN0c1dpbmRvdy5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7aUNBT2lDQTtvQkFFckJBLDRDQUEyQkE7Ozs7Ozs7Ozs7Ozs7b0ND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LElBQUlBOzs7Z0JBS1hBLE9BQU9BLElBQUlBLGlEQUF3QkE7OztnQkFLbkNBLHlDQUFvQ0E7OztnQkFLcENBLE9BQU9BLElBQUlBLHFEQUE0QkE7OztnQkFLdkNBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBTdGFydChkeW5hbWljIHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBcHBsaWNhdGlvbi5JbnN0YW5jZS5TdGFydChyb290KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LmlvLnJlcXVlc3Q7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5hcGlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNlcnZlckFwaVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgU2VydmVyQXBpIEluc3RhbmNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgR2V0Q2xpZW50cyhGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VuZChcImNsaWVudHNcIiwgKEZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEdldFByb2R1Y3RzKEZuVm9pZEEgZm4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZW5kKFwicHJvZHVjdHNcIiwgKEZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIEdldE9yZGVycyhGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2VuZChcIm9yZGVyc1wiLCAoRm5Wb2lkQSlmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBTZW5kKHN0cmluZyBwYXRoLCBGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWGhyIHhociA9IG5ldyBYaHJcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWV0aG9kID0gXCJHRVRcIixcclxuICAgICAgICAgICAgICAgIFVybCA9IHN0cmluZy5Gb3JtYXQoXCIvYXBpL3swfVwiLCBwYXRoKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIuQWRkTGlzdGVuZXIoXCJzdWNjZXNzXCIsIChDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZCkoKCkgPT4geyBPblN1Y2Nlc3MoeGhyLCAoRm5Wb2lkQSlmbik7IH0pKTtcclxuICAgICAgICAgICAgeGhyLlNlbmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIE9uU3VjY2VzcyhYaHIgeGhyLCBGblZvaWRBIGZuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZHluYW1pYyByZXNwb25zZSA9IHhoci5SZXNwb25zZTtcclxuICAgICAgICAgICAgaWYgKGZuIGlzIEZuVm9pZEEpXHJcbiAgICAgICAgICAgICAgICBmbihyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cblxyXG4gICAgXG5wcml2YXRlIHN0YXRpYyBTZXJ2ZXJBcGkgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0luc3RhbmNlPW5ldyBTZXJ2ZXJBcGkoKTt9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC5jb3JlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0O1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHBcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcGxpY2F0aW9uIDogUW9iamVjdFxyXG4gICAge1xyXG5cclxuICAgICAgICBzdGF0aWMgQXBwbGljYXRpb24gX2luc3RhbmNlID0gbnVsbDtcclxuICAgICAgICBBcHBsaWNhdGlvbigpIHsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEFwcGxpY2F0aW9uIEluc3RhbmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBBcHBsaWNhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXRpdmVPYmplY3QgPSBTY3JpcHQuQ2FsbDxkeW5hbWljPihcInF4bGliLmFwcC5BcHAuZ2V0SW5zdGFuY2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTdGFydChkeW5hbWljIHJvb3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWaWV3cG9ydCB2aWV3cG9ydCA9IEFwcGxpY2F0aW9uVmlld3BvcnQuQ3JlYXRlVmlld3BvcnQoKTtcclxuICAgICAgICAgICAgcm9vdC5hZGQodmlld3BvcnQuTmF0aXZlT2JqZWN0LCBuZXcgeyB0b3AgPSAwLCByaWdodCA9IDAsIGJvdHRvbSA9IDAsIGxlZnQgPSAwIH0pO1xyXG4gICAgICAgICAgICBEYXRhTWFuYWdlci5Mb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3REYXRhUmVjb3JkXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIGludCBJZCB7IGdldDsgc2V0OyB9IFxyXG4gICAgICAgIHByb3RlY3RlZCBkeW5hbWljIFJhd0RhdGEgeyBnZXQ7IHNldCA7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZvaWQgU2V0RGF0YShkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSYXdEYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgQnVpbGRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBkeW5hbWljW10geyB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBCdWlsZEZpZWxkcygpIHtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdE51bWJlcihSYXdEYXRhLmlkKSlcclxuICAgICAgICAgICAgICAgIElkID0gUmF3RGF0YS5pZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE51bWJlcihkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHROdW1iZXIob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdE9iamVjdChkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRPYmplY3Qob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBib29sIElzSmF2YVNjcmlwdFN0cmluZyhkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhVXRpbC5Jc0phdmFTY3JpcHRTdHJpbmcob2JqKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBpbnQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0lkPS0xO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmFwaTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEYXRhTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ2xpZW50RGF0YUNvbGxlY3Rpb24gQ2xpZW50cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFByb2R1Y3REYXRhQ29sbGVjdGlvbiBQcm9kdWN0cyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9yZGVyRGF0YUNvbGxlY3Rpb24gT3JkZXJzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTG9hZERhdGEoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTG9hZENsaWVudHMoKTtcclxuICAgICAgICAgICAgTG9hZFByb2R1Y3RzKCk7XHJcbiAgICAgICAgICAgIExvYWRPcmRlcnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB2b2lkIExvYWRDbGllbnRzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIENsaWVudHMuTG9hZERhdGEoZGF0YSk7XHJcbn1cclxuXHJcbjtcbiAgICAgICAgICAgIFNlcnZlckFwaS5HZXRDbGllbnRzKChDU2hhcnBXZWJMaWIucXguY29uc3RhbnRzLkZuVm9pZEEpZm4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHZvaWQgTG9hZFByb2R1Y3RzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIFByb2R1Y3RzLkxvYWREYXRhKGRhdGEpO1xyXG59XHJcblxyXG47XG4gICAgICAgICAgICBTZXJ2ZXJBcGkuR2V0UHJvZHVjdHMoKENTaGFycFdlYkxpYi5xeC5jb25zdGFudHMuRm5Wb2lkQSlmbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdm9pZCBMb2FkT3JkZXJzKClcclxuICAgICAgICB7XHJcblN5c3RlbS5BY3Rpb248ZHluYW1pYz4gZm4gPSBudWxsO1xuICAgICAgICAgICAgXHJcbmZuID0gKGRhdGEpID0+XHJcbntcclxuICAgIE9yZGVycy5Mb2FkRGF0YShkYXRhKTtcclxufVxyXG5cclxuO1xuICAgICAgICAgICAgU2VydmVyQXBpLkdldE9yZGVycygoQ1NoYXJwV2ViTGliLnF4LmNvbnN0YW50cy5GblZvaWRBKWZuKTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBzdGF0aWMgQ2xpZW50RGF0YUNvbGxlY3Rpb24gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NsaWVudHM9bmV3IENsaWVudERhdGFDb2xsZWN0aW9uKCk7cHJpdmF0ZSBzdGF0aWMgUHJvZHVjdERhdGFDb2xsZWN0aW9uIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9kdWN0cz1uZXcgUHJvZHVjdERhdGFDb2xsZWN0aW9uKCk7cHJpdmF0ZSBzdGF0aWMgT3JkZXJEYXRhQ29sbGVjdGlvbiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fT3JkZXJzPW5ldyBPcmRlckRhdGFDb2xsZWN0aW9uKCk7fVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBEYXRhVXRpbFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBJc0phdmFTY3JpcHROdW1iZXIoZHluYW1pYyBvYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2hlY2tKYXZhU2NyaXB0VHlwZShvYmosIFwibnVtYmVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIElzSmF2YVNjcmlwdE9iamVjdChkeW5hbWljIG9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBDaGVja0phdmFTY3JpcHRUeXBlKG9iaiwgXCJvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgSXNKYXZhU2NyaXB0U3RyaW5nKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIENoZWNrSmF2YVNjcmlwdFR5cGUob2JqLCBcInN0cmluZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBib29sIENoZWNrSmF2YVNjcmlwdFR5cGUoZHluYW1pYyBvYmosIHN0cmluZyB0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5DYWxsPHN0cmluZz4oXCJ0eXBlb2ZcIiwgb2JqKSA9PSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0O1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2lkZ2V0cy5uYXZiYXI7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2lkZ2V0cy5hcHA7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS52aWV3cG9ydFxyXG57XHJcblxyXG4gICAgcHVibGljIGNsYXNzIEFwcGxpY2F0aW9uVmlld3BvcnQgOiBWaWV3cG9ydFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZpZXdwb3J0IENyZWF0ZVZpZXdwb3J0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChJbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgSW5zdGFuY2UgPSBuZXcgQXBwbGljYXRpb25WaWV3cG9ydCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gSW5zdGFuY2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYm9vbCBIYW5kbGVzQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25BcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBOYXZiYXIgQ3JlYXRlTmF2YmFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25OYXZiYXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgVmlld3BvcnRTdGFjayBDcmVhdGVDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25WaWV3cG9ydFN0YWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0LmNvbnRlbnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQ7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQuY29udGVudDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBsaWNhdGlvblZpZXdwb3J0U3RhY2sgOiBWaWV3cG9ydFN0YWNrXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERlc2t0b3BDb250ZW50IENyZWF0ZURlc2t0b3BDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXBwbGljYXRpb25EZXNrdG9wQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIFN0YW5kYXJkQ29udGVudCBDcmVhdGVTdGFuZGFyZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LmNvbnRlbnQ7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLnZpZXdwb3J0LmNvbnRlbnRcclxue1xyXG4gICAgcHVibGljICBjbGFzcyBBcHBsaWNhdGlvblN0YW5kYXJkQ29udGVudCA6IFN0YW5kYXJkQ29udGVudFxyXG4gICAge1xyXG4gICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgIHZvaWQgQWRkTWVudVBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYXZQYW5lbC5BZGROYXYobmV3IEhvbWVNZW51UGFuZWwoTmF2UGFuZWwsIENvbnRlbnRQYW5lbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLmNsaWVudHM7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLm9yZGVycztcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEucHJvZHVjdHM7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5sYXVuY2hlcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmVtYmVkO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkudG9vbGJhcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpZGdldHMubmF2YmFyO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXgudWkud2luZG93cztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpZGdldHMuYXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBsaWNhdGlvbk5hdmJhciA6IE5hdmJhclxyXG4gICAge1xyXG4gICAgICAgIFRvb2xiYXJCdXR0b24gX3dvcmtzcGFjZU1vZGVCdXR0b247XHJcbiAgICAgICAgQXBwbGljYXRpb25WaWV3c0J1dHRvbiBfdmlld3NCdXR0b247XHJcblxyXG4gICAgICAgIHB1YmxpYyBBcHBsaWNhdGlvbk5hdmJhcihWaWV3cG9ydCB2aWV3cG9ydCkgOiBiYXNlKHZpZXdwb3J0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZEJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3dvcmtzcGFjZU1vZGVCdXR0b24gPSBBZGROYXZiYXJCdXR0b24oXCJXZWJzaXRlIE1vZGVcIik7XHJcbiAgICAgICAgICAgIF92aWV3c0J1dHRvbiA9IG5ldyBBcHBsaWNhdGlvblZpZXdzQnV0dG9uKHRoaXMsIHRoaXMpO1xyXG4gICAgICAgICAgICBfdmlld3NCdXR0b24uSGlkZSgpO1xyXG4gICAgICAgICAgICBBZGQoX3ZpZXdzQnV0dG9uKTtcclxuICAgICAgICAgICAgQWRkTmF2YmFyQnV0dG9uKFwiRm9ydW1cIik7XHJcbiAgICAgICAgICAgIEFkZFNwYWNlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIE5hdmJhckxhYmVsIENyZWF0ZUxhYmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ1NoYXJwV2ViTGFiZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBpbnQgRGVmYXVsdEhlaWdodCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gNTU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBIYW5kbGVFdmVudChzdHJpbmcgZXZlbnROYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoIChldmVudE5hbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJicm93c2VfY2xpZW50c1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uQnJvd3NlQ2xpZW50cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJyb3dzZV9vcmRlcnNcIjpcclxuICAgICAgICAgICAgICAgICAgICBPbkJyb3dzZU9yZGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJyb3dzZV9wcm9kdWN0c1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uQnJvd3NlUHJvZHVjdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWJzaXRlX21vZGVcIjpcclxuICAgICAgICAgICAgICAgICAgICBPbldlYnNpdGVNb2RlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZm9ydW1cIjpcclxuICAgICAgICAgICAgICAgICAgICBPbkZvcnVtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibXlfbmV3X2J1dHRvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIE9uTXlOZXdCdXR0b24oKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbk15TmV3QnV0dG9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB3aW4gPSBuZXcgV2luZG93KCk7XHJcbiAgICAgICAgICAgIHdpbi5DYXB0aW9uID0gXCJNWSBORVcgQlVUVE9OIFdJTkRPV1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbkJyb3dzZUNsaWVudHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmV3IENsaWVudHNXaW5kb3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25Ccm93c2VQcm9kdWN0cygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuZXcgUHJvZHVjdHNXaW5kb3coKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25Ccm93c2VPcmRlcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmV3IE9yZGVyc1dpbmRvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbldlYnNpdGVNb2RlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldERhdGFNb2RlKCFfaXNEZXNrdG9wTW9kZSk7XHJcbiAgICAgICAgICAgIGlmIChfaXNEZXNrdG9wTW9kZSlcclxuICAgICAgICAgICAgICAgIF92aWV3c0J1dHRvbi5TaG93KCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF92aWV3c0J1dHRvbi5IaWRlKCk7XHJcbiAgICAgICAgICAgIF93b3Jrc3BhY2VNb2RlQnV0dG9uLkxhYmVsID0gX2lzRGVza3RvcE1vZGUgPyBcIkRlc2t0b3AgTW9kZVwiIDogXCJXZWJzaXRlIE1vZGVcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgT25MYXVuY2hlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIG5ldyBMYXVuY2hlcldpbmRvdygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBPbkZvcnVtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNjcmlwdC5DYWxsKFwid2luZG93Lm9wZW5cIiwgXCJodHRwOi8vY3NoYXJwd2ViZXhwcmVzcy5mcmVlZm9ydW1zLm5ldC9cIiwgXCJfYmxhbmtcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIE9uRG93bmxvYWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ3aW5kb3cub3BlblwiLCBcImh0dHBzOi8vc3RvcmUuY3NoYXJwd2ViZXhwcmVzcy5jb20vXCIsIFwiX2JsYW5rXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLnF4LmludGVyZmFjZXM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS53aWRnZXRzLm5hdmJhcjtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpZGdldHMuYXBwXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBsaWNhdGlvblZpZXdzQnV0dG9uIDogVmlld3NCdXR0b25cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQXBwbGljYXRpb25WaWV3c0J1dHRvbihJRGVjb3JhdGUgZGVjb3JhdG9yLCBJRXZlbnRIYW5kbGVyIGhhbmRsZXIpIDogYmFzZShkZWNvcmF0b3IsIGhhbmRsZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkTWVudUJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKFwiQnJvd3NlIENsaWVudHNcIik7XHJcbiAgICAgICAgICAgIEFkZEJ1dHRvbihcIkJyb3dzZSBQcm9kdWN0c1wiKTtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKFwiQnJvd3NlIE9yZGVyc1wiKTtcclxuICAgICAgICAgICAgQWRkQnV0dG9uKFwiTVkgTkVXIEJVVFRPTlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG51c2luZyBDU2hhcnBXZWJMaWIucXguaW50ZXJmYWNlcztcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLnRhYmxlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEYXRhVGFibGUgOiBUYWJsZSwgSUhhbmRsZVNlbGVjdGlvblxyXG4gICAge1xyXG4gICAgICAgIEFic3RyYWN0RGF0YUNvbGxlY3Rpb24gRGF0YUNvbGxlY3Rpb24geyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBJSGFuZGxlU2VsZWN0ZWRSZWNvcmQgUmVjb3JkU2VsZWN0aW9uSGFuZGxlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIFNlbGVjdGlvbkhhbmRsZXIgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZ1tdIERlZmF1bHRDb2x1bW5zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3RyaW5nW10geyBcIk5hbWVcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0RGF0YUZyb21Db2xsZWN0aW9uKEFic3RyYWN0RGF0YUNvbGxlY3Rpb24gZGF0YUNvbGxlY3Rpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhQ29sbGVjdGlvbiA9IGRhdGFDb2xsZWN0aW9uO1xyXG4gICAgICAgICAgICBEYXRhID0gRGF0YUNvbGxlY3Rpb24uR2V0U2VsZWN0ZWREYXRhKERlZmF1bHRJZHMoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBIYW5kbGVTZWxlY3Rpb24oaW50IHNlbGVjdGVkSW5kZXgsIGR5bmFtaWMgcm93RGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChEYXRhQ29sbGVjdGlvbiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBBYnN0cmFjdERhdGFSZWNvcmQgc2VsZWN0ZWRSZWNvcmQ7XHJcbiAgICAgICAgICAgIGlmIChyb3dEYXRhICE9IG51bGwgJiYgcm93RGF0YS5sZW5ndGggIT0gbnVsbCAmJiByb3dEYXRhLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJlY29yZCA9IERhdGFDb2xsZWN0aW9uLkdldFJlY29yZEF0S2V5KHJvd0RhdGFbMF0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJlY29yZCA9IERhdGFDb2xsZWN0aW9uLkdldFJlY29yZEF0SW5kZXgoc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFJlY29yZCA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoUmVjb3JkU2VsZWN0aW9uSGFuZGxlciAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgUmVjb3JkU2VsZWN0aW9uSGFuZGxlci5IYW5kbGVTZWxlY3RlZFJlY29yZChzZWxlY3RlZFJlY29yZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYm9vbCBIYW5kbGVzQXBwZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25BcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2V0Q29sdW1uVmlzaWJsZSgwLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvbnRhaW5lcjtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLmNvcmU7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5mb3JtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRGF0YURldGFpbFBhbmVsIDogU2Nyb2xsXHJcbiAgICB7XHJcbiAgICAgICAgRm9ybVBhbmVsIEZvcm1QYW5lbCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgTGlzdDxzdHJpbmc+IE5hbWVzTGlzdCB7IGdldDsgc2V0OyB9XHJcbiAgICAgICAgTGlzdDxXaWRnZXQ+IFdpZGdldHNMaXN0IHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgV2lkZ2V0PiBGaWVsZE1hcCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIEFkZChGb3JtUGFuZWwpO1xyXG4gICAgICAgICAgICBBZGRGaWVsZHMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQnVpbGRGaWVsZHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgQWRkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJ1aWxkRmllbGRzKCk7XHJcbiAgICAgICAgICAgIEZvcm1QYW5lbC5BZGRGaWVsZHMoTmFtZXNMaXN0LCBXaWRnZXRzTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIHByb3RlY3RlZCB2b2lkIEFkZFRleHRGaWVsZChzdHJpbmcgbmFtZSwgc3RyaW5nIHRhZyA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYW1lc0xpc3QuQWRkKG5hbWUpO1xyXG4gICAgICAgICAgICBXaWRnZXQgd2lkZ2V0ID0gbmV3IFRleHRGaWVsZCgpO1xyXG4gICAgICAgICAgICBXaWRnZXRzTGlzdC5BZGQod2lkZ2V0KTtcclxuICAgICAgICAgICAgaWYgKHRhZyA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGFnID0gbmFtZS5Ub0xvd2VyKCkuUmVwbGFjZSgnICcsICdfJyk7XHJcbiAgICAgICAgICAgIEZpZWxkTWFwW3RhZ10gPSB3aWRnZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdm9pZCBTZXRUZXh0RmllbGRWYWx1ZShzdHJpbmcgdGFnLCBzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFdpZGdldCB3aWRnZXQ7XHJcbiAgICAgICAgICAgIEZpZWxkTWFwLlRyeUdldFZhbHVlKHRhZywgb3V0IHdpZGdldCk7XHJcbiAgICAgICAgICAgIGlmICh3aWRnZXQgPT0gbnVsbCB8fCB3aWRnZXQgYXMgVGV4dEZpZWxkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICh3aWRnZXQgYXMgVGV4dEZpZWxkKS5WYWx1ZSA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZShBYnN0cmFjdERhdGFSZWNvcmQgcmVjb3JkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ3aW5kb3cuY29uc29sZS5sb2dcIiwgXCJEYXRhIERldGFpbCBVcGRhdGVcIiwgcmVjb3JkLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSAgICAgICAgIEZvcm1QYW5lbCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRm9ybVBhbmVsPW5ldyBGb3JtUGFuZWwoKTtwcml2YXRlICAgICAgICAgTGlzdDxzdHJpbmc+IF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19OYW1lc0xpc3Q9bmV3IExpc3Q8c3RyaW5nPigpO3ByaXZhdGUgICAgICAgICBMaXN0PFdpZGdldD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1dpZGdldHNMaXN0PW5ldyBMaXN0PFdpZGdldD4oKTtwcml2YXRlICAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIFdpZGdldD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0ZpZWxkTWFwPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgV2lkZ2V0PigpO31cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS5jb250YWluZXI7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIERhdGFMaXN0UGFuZWwgOiBTY3JvbGxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRGF0YVRhYmxlIExpc3QgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0KCk7XHJcbiAgICAgICAgICAgIExpc3QgPSBDcmVhdGVEYXRhVGFibGUoKTtcclxuICAgICAgICAgICAgQWRkKExpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgRGF0YVRhYmxlIENyZWF0ZURhdGFUYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGFUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVmcmVzaEZyb21Db2xsZWN0aW9uKEFic3RyYWN0RGF0YUNvbGxlY3Rpb24gY29sbGVjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3QuU2V0RGF0YUZyb21Db2xsZWN0aW9uKGNvbGxlY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDb25maWc7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5xeC51aS53aW5kb3dzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5sYXVuY2hlclxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTGF1bmNoZXJXaW5kb3cgOiBXaW5kb3dcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRDYXB0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkxhdW5jaGVyXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgaW50W10gRGVmYXVsdExvY2F0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgaW50W10geyBHbG9iYWxEaW1lbnNpb25zLlRyYW5zY3JpcHRMZWZ0SW5zZXQsIEdsb2JhbERpbWVuc2lvbnMuVHJhbnNjcmlwdFRvcEluc2V0IH07XHJcbiAgICAgICAgfVxyXG5wcm90ZWN0ZWQgb3ZlcnJpZGUgaW50IERlZmF1bHRIZWlnaHQoKVxyXG57XHJcbiAgICByZXR1cm4gMjc1O1xyXG59cHJvdGVjdGVkIG92ZXJyaWRlIGludCBEZWZhdWx0V2lkdGgoKVxyXG57XHJcbiAgICByZXR1cm4gMTc1O1xyXG59XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5jb250YWN0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb250YWN0UGFnZSA6IENhcmRQYWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBCdXR0b25MYWJlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDb250YWN0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFBhZ2VUaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJDb250YWN0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRhZ05hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiY29udGFjdFwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ2FyZFBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmNvbnRhY3QucGFuZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb250YWN0UGFnZUhlYWRsaW5lUGFuZWwgOiBCcDJDb2x1bW5zXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIENvbnRhY3RQYWdlSGVhZGxpbmVQYW5lbChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRMZWZ0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBDYXJkIGNhcmQgPSBuZXcgQnBDYXJkKEBcIkNTaGFycFdlYkV4cHJlc3NcIiwgV2lkZ2V0KTtcclxuICAgICAgICAgICAgTGVmdENvbHVtbi5BZGRDaGlsZChjYXJkKTtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLkFkZFAoQFwiQ1NoYXJwV2ViRXhwcmVzcyBpcyBhbiBleGNpdGluZyBuZXcgdGVjaG5vbG9neSB0aGF0IGFsbG93cyBidWlsZGluZyBzb3BoaXN0aWNhdGVkIFdlYiBhcHBsaWNhdGlvbiB1c2luZyBvbmx5IENTaGFycCBwcm9ncmFtbWluZy5cIik7XHJcbiAgICAgICAgICAgIGNhcmQuQWRkQ29udGVudEl0ZW0odGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRSaWdodENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQ2FyZCBjYXJkID0gbmV3IEJwQ2FyZChAXCJOZXdzXCIsIFdpZGdldCk7XHJcbiAgICAgICAgICAgIFJpZ2h0Q29sdW1uLkFkZENoaWxkKGNhcmQpO1xyXG4gICAgICAgICAgICBCcFRleHQgdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgY2FyZC5BZGRDb250ZW50SXRlbSh0ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoaXMgaXMgdGhlIGNvZGUgd2hpY2ggY3JlYXRlcyB0aGUgc2FtcGxlIHRoYXQgeW91IGFyZSBzZWVpbmcuXHJcbi8vIEJwQ2FyZCBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBCb290c3RyYXAgY2FyZCBlbGVtZW50LlxyXG4vLyBCcENvZGUgaXMgYSBjbGFzcyByZXByZXNlbnRpbmcgYSBzdHlsZWQgc291cmNlIGNvZGUgZWxlbWVudC5cclxuXHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lLmZlYXR1cmVkX2NvZGVfc2FtcGxlXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsIDogQnBDYXJkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlRmVhdHVyZWRDb2RlU2FtcGxlUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZShcIkNTaGFycCBDb2RlIFNhbXBsZVwiLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRDb250ZW50SXRlbShuZXcgQnBDb2RlKFdpZGdldCwgQnVpbGRDb2RlKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0cmluZyBCdWlsZENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiLy8gVGhpcyBpcyB0aGUgY29kZSB3aGljaCBjcmVhdGVzIHRoZSBzYW1wbGUgdGhhdCB5b3UgYXJlIHNlZWluZy5cIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiLy8gQnBDYXJkIGlzIGEgY2xhc3MgcmVwcmVzZW50aW5nIEJvb3RzdHJhcCBjYXJkIGVsZW1lbnQuXCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIi8vIEJwQ29kZSBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBhIHN0eWxlZCBzb3VyY2UgY29kZSBlbGVtZW50LlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcInVzaW5nIENTaGFycFdlYkV4cHJlc3MuYXBwLmJvb3RzdHJhcDtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwidXNpbmcgQ1NoYXJwV2ViRXhwcmVzcy5hcHAudmlld3BvcnQucGFuZWxzO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJ1c2luZyBTeXN0ZW0uVGV4dDtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJuYW1lc3BhY2UgQ1NoYXJwV2ViRXhwcmVzcy5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF9jb2RlX3NhbXBsZVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJ7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcInB1YmxpYyBjbGFzcyBIb21lUGFnZUZlYXR1cmVkQ29kZVNhbXBsZVBhbmVsIDogQnBDYXJkXCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgcHVibGljIEhvbWVQYWdlRmVhdHVyZWRDb2RlU2FtcGxlUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZShcIlwiQ1NoYXJwIENvZGUgU2FtcGxlXCJcIiwgd2lkZ2V0KVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIHtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB9XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRDb250ZW50KClcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICB7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIEFkZENvbnRlbnRJdGVtKG5ldyBCcENvZGUoV2lkZ2V0LCBCdWlsZENvZGUoKSkpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIH1cIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIHN0cmluZyBCdWlsZENvZGUoKVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIHtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgU3RyaW5nQnVpbGRlciBzYiA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIi8vIFRoaXMgaXMgdGhlIGNvZGUgd2hpY2ggY3JlYXRlcyB0aGUgc2FtcGxlIHRoYXQgeW91IGFyZSBzZWVpbmcuXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIi8vIEJwQ2FyZCBpcyBhIGNsYXNzIHJlcHJlc2VudGluZyBCb290c3RyYXAgc3R5bGVkIEhUTUwgZWxlbWVudC5cIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiLy8gQnBDb2RlIGlzIGEgY2xhc3MgcmVwcmVzZW50aW5nIGEgc3R5bGVkIHNvdXJjZSBjb2RlIGVsZW1lbnQuXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwidXNpbmcgQ1NoYXJwV2ViRXhwcmVzcy5hcHAuYm9vdHN0cmFwO1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCJ1c2luZyBDU2hhcnBXZWJFeHByZXNzLmFwcC52aWV3cG9ydC5wYW5lbHM7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcInVzaW5nIFN5c3RlbS5UZXh0O1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIm5hbWVzcGFjZSBDU2hhcnBXZWJFeHByZXNzLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lLmZlYXR1cmVkX2NvZGVfc2FtcGxlXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIntcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwicHVibGljIGNsYXNzIEhvbWVQYWdlRmVhdHVyZWRDb2RlU2FtcGxlUGFuZWwgOiBCcENhcmRcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICBwdWJsaWMgSG9tZVBhZ2VGZWF0dXJlZENvZGVTYW1wbGVQYW5lbChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKFwiXCJDU2hhcnAgQ29kZSBTYW1wbGVcIlwiLCB3aWRnZXQpXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAge1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIH1cIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZSgpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENvbnRlbnQoKVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgIHtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICAgICAgQWRkQ29udGVudEl0ZW0obmV3IEJwQ29kZShXaWRnZXQsIEJ1aWxkQ29kZSgpKSk7XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgfVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAgc3RyaW5nIEJ1aWxkQ29kZSgpXCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoXCJcIiAgICAgICAge1wiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHNiID0gbmV3IFN0cmluZ0J1aWxkZXIoKTtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICAgICAgLy8uLi4uLi4gdGhpcyBjb2RlIC4uLi4uXCJcIlwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKFwiXCIgICAgICAgICAgICByZXR1cm4gc2IuVG9TdHJpbmcoKTtcIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgICAgICB9XCJcIik7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwiICAgIH1cIlwiKTtcIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoQFwiICAgICAgICAgICAgc2IuQXBwZW5kTGluZShcIlwifVwiXCIpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKEBcIiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1wiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgICAgIH1cIik7XHJcbiAgICAgICAgICAgIHNiLkFwcGVuZExpbmUoKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCIgICAgfVwiKTtcclxuICAgICAgICAgICAgc2IuQXBwZW5kTGluZShAXCJ9XCIpO1xyXG4gICAgICAgICAgICBzYi5BcHBlbmRMaW5lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzYi5Ub1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF92aWRlb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2VDU2hhcnBFeHByZXNzVmlkZW9Ib2xkZXIgOiBCcDJDb2x1bW5zXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlQ1NoYXJwRXhwcmVzc1ZpZGVvSG9sZGVyKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZExlZnRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcFZpZGVvIHZpZGVvID0gbmV3IEJwVmlkZW8oV2lkZ2V0LCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkL2h2clFvWFdFcEFBXCIpO1xyXG4gICAgICAgICAgICBMZWZ0Q29sdW1uLkFkZENoaWxkKHZpZGVvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZFJpZ2h0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIFJpZ2h0Q29sdW1uLkFkZENoaWxkKHRleHQpO1xyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgIC5BZGRCb2xkKEBcIkNTaGFycFdlYkV4cHJlc3MgQnVpbGQgYW5kIERlcGxveVwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJUaGlzIGlzIGEgc2hvcnQgdmlkZW8gKDNtNDZzKSBzaG93aW5nIHRoZSBhZGRpdGlvbiBvZiBhIG5ldyBvYmplY3QgdG8gYW4gZXhpc3RpbmcgYXBwbGljYXRpb24uXCIpXHJcbiAgICAgICAgICAgIC5BZGRQKEBcIkFsbCB0aGUgY29kaW5nIGlzIGRvbmUgdXNpbmcgQ1NoYXJwIGluIE1TIFZpc3VhbCBTdHVkaW8uXCIpXHJcbiAgICAgICAgICAgIC5BZGRQKEBcIldoZW4gdGhlIHNvbHV0aW9uIGlzIHJlYnVpbHQsIGFsbCBvZiB0aGUgYXBwbGljYXRpb24ncyBIVE1MNSBjb2RlYmFzZSBpcyByZWJ1aWx0IGF1dG9tYXRpY2FsbHkuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5mZWF0dXJlZF92aWRlb1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2VGZWF0dXJlZFZpZGVvUGFuZWwgOiBCcENhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSG9tZVBhZ2VGZWF0dXJlZFZpZGVvUGFuZWwoSVdpZGdldCB3aWRnZXQpIDogYmFzZShcIkNTaGFycFdlYkV4cHJlc3MgRGVtb1wiLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRDb250ZW50SXRlbShuZXcgSG9tZVBhZ2VDU2hhcnBFeHByZXNzVmlkZW9Ib2xkZXIoV2lkZ2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMubGVmdDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmJsb2Nrcy52aWV3cG9ydC5wYWdlcy5ob21lLmhlYWRsaW5lLnBhbmVscy5yaWdodDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlSGVhZGxpbmVQYW5lbHMgOiBCcDJDb2x1bW5zXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlSGVhZGxpbmVQYW5lbHMoSVdpZGdldCB3aWRnZXQpIDogYmFzZSh3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkTGVmdENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExlZnRDb2x1bW4uQWRkQ2hpbGQobmV3IEhvbWVQYWdlTGVmdEluZm9DYXJkKFdpZGdldCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkUmlnaHRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRSaWdodENoaWxkKG5ldyBIb21lUGFnZVJpZ2h0RG93bmxvYWRzQ2FyZChXaWRnZXQpKTtcclxuICAgICAgICAgICAgQWRkUmlnaHRDaGlsZChuZXcgSG9tZVBhZ2VSaWdodFZpZGVvc0NhcmQoV2lkZ2V0KSk7XHJcbiAgICAgICAgICAgIEFkZFJpZ2h0Q2hpbGQobmV3IEhvbWVQYWdlUmlnaHRMaW5rc0NhcmQoV2lkZ2V0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZFJpZ2h0Q2hpbGQoQnBFbGVtZW50IGNoaWxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmlnaHRDb2x1bW5cclxuICAgICAgICAgICAgICAgIC5BZGRDaGlsZChjaGlsZClcclxuICAgICAgICAgICAgICAgIC5BZGRDaGlsZChuZXcgQnBCcihXaWRnZXQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuY29udGFjdDtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5vdmVydmlldztcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy50ZWNobm9sb2d5O1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVNZW51UGFuZWwgOiBOYXZNZW51UGFuZWxcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSG9tZU1lbnVQYW5lbChOYXZQYW5lbCBuYXZQYW5lbCwgQ29udGVudFBhbmVsIGNvbnRlbnRQYW5lbCkgOiBiYXNlKG5hdlBhbmVsLCBjb250ZW50UGFuZWwpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQWRkUGFnZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWRkUGFnZShuZXcgSG9tZVBhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZFBhZ2UobmV3IE92ZXJ2aWV3UGFnZSgpKTtcclxuICAgICAgICAgICAgQWRkUGFnZShuZXcgVGVjaG5vbG9neVBhZ2UoKSk7XHJcbiAgICAgICAgICAgIEFkZFBhZ2UobmV3IENvbnRhY3RQYWdlKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBHZXREZWZhdWx0UGFnZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJob21lXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIEdldFRhZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJob21lXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBTZWxlY3ROYXZQYW5lbChzdHJpbmcgdGFnKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFNlbGVjdENvbnRlbnRQYWdlKHN0cmluZyB0YWcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRhZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImhvbWVcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJvdmVydmlld1wiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRlY2hub2xvZ3lcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjb250YWN0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgQ29udGVudFBhbmVsLlNlbGVjdFBhZ2UodGFnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lLmZlYXR1cmVkX2NvZGVfc2FtcGxlO1xyXG51c2luZyBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLmhvbWUuZmVhdHVyZWRfdmlkZW87XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC52aWV3cG9ydC5wYWdlcy5ob21lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBIb21lUGFnZSA6IENhcmRQYWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBCdXR0b25MYWJlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJIb21lXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFBhZ2VUaXRsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJIb21lXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRhZ05hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiaG9tZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ2FyZFBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRDYXJkUGFuZWxXaXRoU3BhY2VyKG5ldyBIb21lUGFnZUhlYWRsaW5lUGFuZWxzKHRoaXMpKTtcclxuICAgICAgICAgICAgQWRkQ2FyZFBhbmVsV2l0aFNwYWNlcihuZXcgSG9tZVBhZ2VGZWF0dXJlZENvZGVTYW1wbGVQYW5lbCh0aGlzKSk7XHJcbiAgICAgICAgICAgIEFkZENhcmRQYW5lbFdpdGhTcGFjZXIobmV3IEhvbWVQYWdlRmVhdHVyZWRWaWRlb1BhbmVsKHRoaXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMub3ZlcnZpZXdcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE92ZXJ2aWV3UGFnZSA6IENhcmRQYWdlXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBCdXR0b25MYWJlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJPdmVydmlld1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBQYWdlVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiT3ZlcnZpZXdcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVGFnTmFtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJvdmVydmlld1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgQWRkQ2FyZFBhbmVscygpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMub3ZlcnZpZXcucGFuZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPdmVydmlld1BhZ2VIZWFkbGluZVBhbmVsIDogQnAyQ29sdW1uc1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBPdmVydmlld1BhZ2VIZWFkbGluZVBhbmVsKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2Uod2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZExlZnRDaGlsZHJlbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBCcENhcmQgY2FyZCA9IG5ldyBCcENhcmQoQFwiQ1NoYXJwV2ViRXhwcmVzc1wiLCBXaWRnZXQpO1xyXG4gICAgICAgICAgICBMZWZ0Q29sdW1uLkFkZENoaWxkKGNhcmQpO1xyXG4gICAgICAgICAgICBCcFRleHQgdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgICAuQWRkUChAXCJDU2hhcnBXZWJFeHByZXNzIGlzIGFuIGV4Y2l0aW5nIG5ldyB0ZWNobm9sb2d5IHRoYXQgYWxsb3dzIGJ1aWxkaW5nIHNvcGhpc3RpY2F0ZWQgV2ViIGFwcGxpY2F0aW9uIHVzaW5nIG9ubHkgQ1NoYXJwIHByb2dyYW1taW5nLlwiKTtcclxuICAgICAgICAgICAgY2FyZC5BZGRDb250ZW50SXRlbSh0ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZFJpZ2h0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBDYXJkIGNhcmQgPSBuZXcgQnBDYXJkKEBcIk5ld3NcIiwgV2lkZ2V0KTtcclxuICAgICAgICAgICAgUmlnaHRDb2x1bW4uQWRkQ2hpbGQoY2FyZCk7XHJcbiAgICAgICAgICAgIEJwVGV4dCB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICBjYXJkLkFkZENvbnRlbnRJdGVtKHRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnZpZXdwb3J0LnBhZ2VzLnRlY2hub2xvZ3kucGFuZWxzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZWNobm9sb2d5UGFnZUhlYWRsaW5lUGFuZWwgOiBCcDJDb2x1bW5zXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFRlY2hub2xvZ3lQYWdlSGVhZGxpbmVQYW5lbChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRMZWZ0Q2hpbGRyZW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQnBDYXJkIGNhcmQgPSBuZXcgQnBDYXJkKEBcIkNTaGFycFdlYkV4cHJlc3NcIiwgV2lkZ2V0KTtcclxuICAgICAgICAgICAgTGVmdENvbHVtbi5BZGRDaGlsZChjYXJkKTtcclxuICAgICAgICAgICAgQnBUZXh0IHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgLkFkZFAoQFwiQ1NoYXJwV2ViRXhwcmVzcyBpcyBhbiBleGNpdGluZyBuZXcgdGVjaG5vbG9neSB0aGF0IGFsbG93cyBidWlsZGluZyBzb3BoaXN0aWNhdGVkIFdlYiBhcHBsaWNhdGlvbiB1c2luZyBvbmx5IENTaGFycCBwcm9ncmFtbWluZy5cIik7XHJcbiAgICAgICAgICAgIGNhcmQuQWRkQ29udGVudEl0ZW0odGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGRSaWdodENoaWxkcmVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwQ2FyZCBjYXJkID0gbmV3IEJwQ2FyZChAXCJOZXdzXCIsIFdpZGdldCk7XHJcbiAgICAgICAgICAgIFJpZ2h0Q29sdW1uLkFkZENoaWxkKGNhcmQpO1xyXG4gICAgICAgICAgICBCcFRleHQgdGV4dCA9IG5ldyBCcFRleHQoV2lkZ2V0KTtcclxuICAgICAgICAgICAgY2FyZC5BZGRDb250ZW50SXRlbSh0ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudmlld3BvcnQucGFnZXMudGVjaG5vbG9neVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVGVjaG5vbG9neVBhZ2UgOiBDYXJkUGFnZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgQnV0dG9uTGFiZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiVGVjaG5vbG9neVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBQYWdlVGl0bGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiVGVjaG5vbG9neVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUYWdOYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRlY2hub2xvZ3lcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZENhcmRQYW5lbHMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAuYm9vdHN0cmFwO1xyXG51c2luZyBDU2hhcnBXZWJMaWIuYXBwLnZpZXdwb3J0LnBhbmVscztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJMaWIuYmxvY2tzLnZpZXdwb3J0LnBhZ2VzLmhvbWUuaGVhZGxpbmUucGFuZWxzLmxlZnRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlTGVmdEluZm9DYXJkIDogQnBDYXJkXHJcbiAgICB7XHJcbiAgICAgICBjb25zdCBzdHJpbmcgdGl0bGUgPSBAXCJXZWxjb21lIHRvIENTaGFycFdlYkV4cHJlc3NcIjtcclxuXHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlTGVmdEluZm9DYXJkKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UodGl0bGUsIHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEJwVGV4dCB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgIC5BZGRQKEBcIkNTaGFycFdlYkV4cHJlc3MgaXMgYSB0ZWNobm9sb2d5IGZvciBidWlsZGluZyBzb3BoaXN0aWNhdGVkIFdlYiBhcHBsaWNhdGlvbnMgdXNpbmcgb25seSB0aGUgQ1NoYXJwIHByb2dyYW1taW5nIGxhbmd1YWdlLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJUaGVyZSBpcyBubyBuZWVkIHRvIHVzZSBIVE1MLCBDU1MsIG9yIEphdmFTY3JpcHQgYWx0aG91Z2ggY29kZSBzbmlwcGV0cyBtYXkgYmUgaW5jbHVkZWQgd2hlbiBhcHByb3ByaWF0ZS5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiVGhlIG5hdmlnYXRpb24gYnV0dG9ucyBhdCB0aGUgbGVmdCBzZWxlY3QgZGlzcGxheSBwYW5lbHMgaW4gdGhpcyBjZW50ZXIgY29udGVudCBhcmVhLiBBdCB0aGUgdG9wIGlzIGEgTW9kZSBzZWxlY3QgYnV0dG9uIHdoaWNoIHNob3dzIGVpdGhlciBcIlwiV2Vic2l0ZSBNb2RlXCJcIiBvciBcIlwiRGVza3RvcCBNb2RlXCJcIiAtIHlvdSBjYW4gdG9nZ2xlIHRoZSBtb2RlIGJ5IGNsaWNraW5nLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJEZXNrdG9wIG1vZGUgdXNlcyB3aW5kb3dzIHdoaWNoIGFyZSBzaW1pbGFyIHRvIGRlc2t0b3AgR1VJJ3MuIFRoZSBcIlwiVmlld3NcIlwiIHNlbGVjdGlvbiBidXR0b24gYXQgdGhlIHRvcCBvcGVucyBuZXcgd2luZG93cy4gU2VlIHRoZSBicmllZiB2aWRlbyBiZWxvdyBmb3IgYSBkZW1vbnN0cmF0aW9uLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCJUaGlzIHNpdGUgd2FzIGNyZWF0ZWQgdXNpbmcgTWljcm9zb2Z0J3MgVmlzdWFsIFN0dWRpbyAyMDE3IENvbW11bml0eSBFZGl0aW9uIHdpdGggYWxsIGNvZGluZyBmb3IgdGhlIGFwcGxpY2F0aW9uIGRvbmUgaW4gQ1NoYXJwLiBUaGUgdG90YWwgZGV2ZWxvcG1lbnQgdGltZSAoc2luZ2xlIGRldmVsb3BlcikgZm9yIHRoZSBkZW1vIGFwcGxpY2F0aW9uIHdhcyBhYm91dCB0d28gZGF5cyBpbmNsdWRpbmcgc2VydmVyIGRlcGxveW1lbnQgKFJ1Ynktb24tUmFpbHMpIHRvIEhlcm9rdS5cIilcclxuICAgICAgICAgICAgLkFkZFAoQFwiVGhhbmsgeW91IGZvciB2aXNpdGluZyB0aGUgZGVtbyBzaXRlLlwiKVxyXG4gICAgICAgICAgICAuQWRkUChAXCItLSBQZXRlciBGaXNrLCBjcmVhdG9yIG9mIENTaGFycFdlYkV4cHJlc3NcIik7XHJcbiAgICAgICAgICAgIEFkZENvbnRlbnRJdGVtKHRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJMaWIuYXBwLmJvb3RzdHJhcDtcclxudXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmJsb2Nrcy52aWV3cG9ydC5wYWdlcy5ob21lLmhlYWRsaW5lLnBhbmVscy5yaWdodFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2VSaWdodENhcmQgOiBCcENhcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgSG9tZVBhZ2VSaWdodENhcmQoc3RyaW5nIHRleHQsIElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UodGV4dCwgd2lkZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIEFkZExpbmsoc3RyaW5nIHVybCwgc3RyaW5nIHRleHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYnB0ZXh0ID0gbmV3IEJwVGV4dChXaWRnZXQpO1xyXG4gICAgICAgICAgICBicHRleHQuQWRkTGluayh1cmwsIHRleHQpO1xyXG4gICAgICAgICAgICBBZGRDb250ZW50SXRlbShicHRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdERhdGFDb2xsZWN0aW9uIDogTGlzdDxBYnN0cmFjdERhdGFSZWNvcmQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHZvaWQgTG9hZERhdGEoZHluYW1pYyBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFJc0phdmFTY3JpcHRPYmplY3QoZGF0YSkgfHwgIUlzSmF2YVNjcmlwdE51bWJlcihkYXRhLmxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBpdGVtRGF0YSBpbiBkYXRhKVxyXG4gICAgICAgICAgICAgICAgQWRkRGF0YUl0ZW0oaXRlbURhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgZHluYW1pY1tdIEdldFNlbGVjdGVkRGF0YShzdHJpbmdbXSBpZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PGR5bmFtaWNbXT4gc2VsZWN0ZWREYXRhID0gbmV3IExpc3Q8ZHluYW1pY1tdPigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgZGF0YVJlY29yZCBpbiB0aGlzKVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhLkFkZChkYXRhUmVjb3JkLkdldFNlbGVjdGVkRGF0YShpZHMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YS5Ub0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIEFkZERhdGFJdGVtKGR5bmFtaWMgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCBBYnN0cmFjdERhdGFSZWNvcmQgR2V0UmVjb3JkQXRLZXkoc3RyaW5nIGtleSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFic3RyYWN0RGF0YVJlY29yZCBHZXRSZWNvcmRBdEluZGV4KGludCBpbmRleClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gQ291bnQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbaW5kZXhdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgSXNKYXZhU2NyaXB0TnVtYmVyKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLklzSmF2YVNjcmlwdE51bWJlcihvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgSXNKYXZhU2NyaXB0T2JqZWN0KGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLklzSmF2YVNjcmlwdE9iamVjdChvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGJvb2wgSXNKYXZhU2NyaXB0U3RyaW5nKGR5bmFtaWMgb2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFVdGlsLklzSmF2YVNjcmlwdFN0cmluZyhvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsaWVudERhdGFSZWNvcmQgOiBBYnN0cmFjdERhdGFSZWNvcmRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgQ2xpZW50RGF0YVJlY29yZChkeW5hbWljIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTZXREYXRhKGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGR5bmFtaWNbXSBHZXRTZWxlY3RlZERhdGEoc3RyaW5nW10gaWRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxkeW5hbWljPiBkYXRhID0gbmV3IExpc3Q8ZHluYW1pYz4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaChzdHJpbmcgaWQgaW4gaWRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goaWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNpdHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoQ2l0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXVpZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoXCItLS1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLlRvQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQnVpbGRGaWVsZHMoKTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmFkZHJlc3MpKVxyXG4gICAgICAgICAgICAgICAgQWRkcmVzcyA9IFJhd0RhdGEuYWRkcmVzcztcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmNlbGwpKVxyXG4gICAgICAgICAgICAgICAgQ2VsbCA9IFJhd0RhdGEuY2VsbDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmNpdHkpKVxyXG4gICAgICAgICAgICAgICAgQ2l0eSA9IFJhd0RhdGEuY2l0eTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmVtYWlsKSlcclxuICAgICAgICAgICAgICAgIEVtYWlsID0gUmF3RGF0YS5lbWFpbDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLm5hbWUpKVxyXG4gICAgICAgICAgICAgICAgTmFtZSA9IFJhd0RhdGEubmFtZTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLnBob25lKSlcclxuICAgICAgICAgICAgICAgIFBob25lID0gUmF3RGF0YS5waG9uZTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLnN0YXRlKSlcclxuICAgICAgICAgICAgICAgIFN0YXRlID0gUmF3RGF0YS5zdGF0ZTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmNsaWVudF91dWlkKSlcclxuICAgICAgICAgICAgICAgIFVVSUQgPSBSYXdEYXRhLmNsaWVudF91dWlkO1xyXG4gICAgICAgICAgICBpZiAoSXNKYXZhU2NyaXB0U3RyaW5nKFJhd0RhdGEuemlwKSlcclxuICAgICAgICAgICAgICAgIFppcCA9IFJhd0RhdGEuemlwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0cmluZyBBZGRyZXNzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ2VsbCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENpdHkgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBFbWFpbCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQaG9uZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFN0YXRlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVVVJRCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFppcCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXG5cclxuICAgIFxucHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0FkZHJlc3M9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ2VsbD1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19DaXR5PVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0VtYWlsPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX05hbWU9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUGhvbmU9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fU3RhdGU9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVVVJRD1cIlwiO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19aaXA9XCJcIjt9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9yZGVyRGF0YVJlY29yZCA6IEFic3RyYWN0RGF0YVJlY29yZFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgT3JkZXJEYXRhUmVjb3JkKGR5bmFtaWMgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldERhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgZHluYW1pY1tdIEdldFNlbGVjdGVkRGF0YShzdHJpbmdbXSBpZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PGR5bmFtaWM+IGRhdGEgPSBuZXcgTGlzdDxkeW5hbWljPigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgaWQgaW4gaWRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKERhdGVUaW1lLkRhdGUuVG9TdHJpbmcoXCJ5eXl5LU1NTS1kZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGllbnRfbmFtZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChHZXRDbGllbnROYW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvZHVjdF9uYW1lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKEdldFByb2R1Y3ROYW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidXVpZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChVVUlEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5Ub0FycmF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIEdldFByb2R1Y3ROYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhTWFuYWdlci5Qcm9kdWN0cy5Qcm9kdWN0TmFtZUZvclVVSUQoUHJvZHVjdFVVSUQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBwdWJsaWMgc3RyaW5nIEdldENsaWVudE5hbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIERhdGFNYW5hZ2VyLkNsaWVudHMuQ2xpZW50TmFtZUZvclVVSUQoQ2xpZW50VVVJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZG91YmxlIEdldFByaWNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEYXRhTWFuYWdlci5Qcm9kdWN0cy5Qcm9kdWN0UHJpY2VGb3JVVUlEKFByb2R1Y3RVVUlEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgR2V0VG90YWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdldFByaWNlKCkgKiBRdWFudGl0eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQnVpbGRGaWVsZHMoKTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmNsaWVudF91dWlkKSlcclxuICAgICAgICAgICAgICAgIENsaWVudFVVSUQgPSBSYXdEYXRhLmNsaWVudF91dWlkO1xyXG4gICAgICAgICAgICBpZiAoSXNKYXZhU2NyaXB0U3RyaW5nKFJhd0RhdGEuZGF0ZV9zdHIpKVxyXG4gICAgICAgICAgICAgICAgRGF0ZVRpbWUgPSBDb252ZXJ0LlRvRGF0ZVRpbWUoUmF3RGF0YS5kYXRlX3N0cik7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5wcm9kdWN0X3V1aWQpKVxyXG4gICAgICAgICAgICAgICAgUHJvZHVjdFVVSUQgPSBSYXdEYXRhLnByb2R1Y3RfdXVpZDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdE51bWJlcihSYXdEYXRhLnF1YW50aXR5KSlcclxuICAgICAgICAgICAgICAgIFF1YW50aXR5ID0gUmF3RGF0YS5xdWFudGl0eTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLm9yZGVyX3V1aWQpKVxyXG4gICAgICAgICAgICAgICAgVVVJRCA9IFJhd0RhdGEub3JkZXJfdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ2xpZW50VVVJRCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgRGF0ZVRpbWUgRGF0ZVRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBQcm9kdWN0VVVJRCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgaW50IFF1YW50aXR5IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVVVJRCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXG4gICAgXG5wcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fQ2xpZW50VVVJRD1cIlwiO3ByaXZhdGUgRGF0ZVRpbWUgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0RhdGVUaW1lPURhdGVUaW1lLk5vdztwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUHJvZHVjdFVVSUQ9XCJcIjtwcml2YXRlIGludCBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fUXVhbnRpdHk9MDtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fVVVJRD1cIlwiO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2R1Y3REYXRhUmVjb3JkIDogQWJzdHJhY3REYXRhUmVjb3JkXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFByb2R1Y3REYXRhUmVjb3JkKGR5bmFtaWMgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNldERhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgZHluYW1pY1tdIEdldFNlbGVjdGVkRGF0YShzdHJpbmdbXSBpZHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PGR5bmFtaWM+IGRhdGEgPSBuZXcgTGlzdDxkeW5hbWljPigpO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChzdHJpbmcgaWQgaW4gaWRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGlkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9kdWN0X25hbWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5BZGQoTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1dWlkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuQWRkKFVVSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLkFkZChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLlRvQXJyYXkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuQnVpbGRGaWVsZHMoKTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmNvbG9yKSlcclxuICAgICAgICAgICAgICAgIENvbG9yID0gUmF3RGF0YS5jb2xvcjtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLmRlcGFydG1lbnQpKVxyXG4gICAgICAgICAgICAgICAgRGVwYXJ0bWVudCA9IFJhd0RhdGEuZGVwYXJ0bWVudDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLm1hdGVyaWFsKSlcclxuICAgICAgICAgICAgICAgIE1hdGVyaWFsID0gUmF3RGF0YS5tYXRlcmlhbDtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLnByb2R1Y3RfbmFtZSkpXHJcbiAgICAgICAgICAgICAgICBOYW1lID0gUmF3RGF0YS5wcm9kdWN0X25hbWU7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHROdW1iZXIoUmF3RGF0YS5wcmljZSkpXHJcbiAgICAgICAgICAgICAgICBQcmljZSA9IFJhd0RhdGEucHJpY2U7XHJcbiAgICAgICAgICAgIGlmIChJc0phdmFTY3JpcHRTdHJpbmcoUmF3RGF0YS5wcm9tb3Rpb25fY29kZSkpXHJcbiAgICAgICAgICAgICAgICBQcm9tb3Rpb25Db2RlID0gUmF3RGF0YS5wcm9tb3Rpb25fY29kZTtcclxuICAgICAgICAgICAgaWYgKElzSmF2YVNjcmlwdFN0cmluZyhSYXdEYXRhLnByb2R1Y3RfdXVpZCkpXHJcbiAgICAgICAgICAgICAgICBVVUlEID0gUmF3RGF0YS5wcm9kdWN0X3V1aWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIENvbG9yIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGVwYXJ0bWVudCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE1hdGVyaWFsIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgZG91YmxlIFByaWNlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgUHJvbW90aW9uQ29kZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFVVSUQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxuICAgIFxucHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NvbG9yPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0RlcGFydG1lbnQ9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTWF0ZXJpYWw9XCJcIjtwcml2YXRlIHN0cmluZyBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fTmFtZT1cIlwiO3ByaXZhdGUgZG91YmxlIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19QcmljZT0wO3ByaXZhdGUgc3RyaW5nIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19Qcm9tb3Rpb25Db2RlPVwiXCI7cHJpdmF0ZSBzdHJpbmcgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1VVSUQ9XCJcIjt9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLmNsaWVudHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsaWVudHNEYXRhVGFibGUgOiBEYXRhVGFibGVcclxuICAgIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZ1tdIERlZmF1bHRDb2x1bW5zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgc3RyaW5nW10geyBcIlVVSURcIiwgXCJOYW1lXCIsIFwiQ2l0eVwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEuY2xpZW50c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ2xpZW50c0RldGFpbFBhbmVsIDogRGF0YURldGFpbFBhbmVsXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIk5hbWVcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkFkZHJlc3NcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkNpdHlcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlN0YXRlXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJaaXBcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlBob25lXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJDZWxsXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJFbWFpbFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiQ2xpZW50IFVVSURcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoQWJzdHJhY3REYXRhUmVjb3JkIHJlY29yZClcclxuICAgICAgICB7XHJcbkNsaWVudERhdGFSZWNvcmQgY2xpZW50UmVjb3JkOyAgICAgICAgICAgIGlmICghKChjbGllbnRSZWNvcmQgPSByZWNvcmQgYXMgQ2xpZW50RGF0YVJlY29yZCkgIT0gbnVsbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwibmFtZVwiLCBjbGllbnRSZWNvcmQuTmFtZSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiYWRkcmVzc1wiLCBjbGllbnRSZWNvcmQuQWRkcmVzcyk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiY2l0eVwiLCBjbGllbnRSZWNvcmQuQ2l0eSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwic3RhdGVcIiwgY2xpZW50UmVjb3JkLlN0YXRlKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJ6aXBcIiwgY2xpZW50UmVjb3JkLlppcCk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwicGhvbmVcIiwgY2xpZW50UmVjb3JkLlBob25lKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJjZWxsXCIsIGNsaWVudFJlY29yZC5DZWxsKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJlbWFpbFwiLCBjbGllbnRSZWNvcmQuRW1haWwpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImNsaWVudF91dWlkXCIsIGNsaWVudFJlY29yZC5VVUlEKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsIm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5jbGllbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbGllbnRzTGlzdFBhbmVsIDogRGF0YUxpc3RQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhVGFibGUgQ3JlYXRlRGF0YVRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2xpZW50c0RhdGFUYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLnNwbGl0cGFuZTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnF4LnVpLndpbmRvd3M7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGFcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIERhdGFXaW5kb3cgOiBXaW5kb3csIElIYW5kbGVTZWxlY3RlZFJlY29yZFxyXG4gICAge1xyXG5cclxuICAgICAgICBwdWJsaWMgRGF0YUxpc3RQYW5lbCBEYXRhTGlzdFBhbmVsIHsgZ2V0OyBwcm90ZWN0ZWQgc2V0OyB9XHJcbiAgICAgICAgcHVibGljIERhdGFEZXRhaWxQYW5lbCBEYXRhRGV0YWlsUGFuZWwgeyBnZXQ7IHByb3RlY3RlZCBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXQoKTtcclxuICAgICAgICAgICAgRGF0YUxpc3RQYW5lbCA9IEJ1aWxkTGlzdFBhbmVsKCk7XHJcbiAgICAgICAgICAgIERhdGFEZXRhaWxQYW5lbCA9IEJ1aWxkRGV0YWlsUGFuZWwoKTtcclxuICAgICAgICAgICAgU3BsaXQuQWRkKERhdGFMaXN0UGFuZWwpO1xyXG4gICAgICAgICAgICBTcGxpdC5BZGQoRGF0YURldGFpbFBhbmVsKTtcclxuICAgICAgICAgICAgQWRkKFNwbGl0LCBcImNlbnRlclwiKTtcclxuICAgICAgICAgICAgQWRkTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIERhdGFMaXN0UGFuZWwuTGlzdC5SZWNvcmRTZWxlY3Rpb25IYW5kbGVyID0gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIHZvaWQgQWRkTGlzdGVuZXJzKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgT25BcHBlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVmcmVzaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIGJvb2wgSGFuZGxlc0FwcGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEhhbmRsZUV2ZW50KHN0cmluZyBldmVudE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50TmFtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9uX3JlZnJlc2hcIjpcclxuICAgICAgICAgICAgICAgICAgICBSZWZyZXNoKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUmVmcmVzaCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgRGF0YURldGFpbFBhbmVsIEJ1aWxkRGV0YWlsUGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhRGV0YWlsUGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCB2aXJ0dWFsIERhdGFMaXN0UGFuZWwgQnVpbGRMaXN0UGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhTGlzdFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIEhhbmRsZVNlbGVjdGVkUmVjb3JkKEFic3RyYWN0RGF0YVJlY29yZCByZWNvcmQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhRGV0YWlsUGFuZWwuVXBkYXRlKHJlY29yZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgU3BsaXRQYW5lIFNwbGl0IHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cbiAgICBcbnByaXZhdGUgU3BsaXRQYW5lIF9fUHJvcGVydHlfX0luaXRpYWxpemVyX19TcGxpdD1TcGxpdFBhbmUuSG9yaXpvbnRhbCgpO31cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEub3JkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPcmRlcnNEYXRhVGFibGUgOiBEYXRhVGFibGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nW10gRGVmYXVsdENvbHVtbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBzdHJpbmdbXSB7IFwiVVVJRFwiLCBcIkRhdGVcIiwgXCJDbGllbnQgTmFtZVwiLCBcIlByb2R1Y3QgTmFtZVwiIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5vcmRlcnNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE9yZGVyc0RldGFpbFBhbmVsIDogRGF0YURldGFpbFBhbmVsXHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEJ1aWxkRmllbGRzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIkNsaWVudFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiUHJvZHVjdFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiRGF0ZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiUXVhbnRpdHlcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlByaWNlIEVhY2hcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlRvdGFsXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJPcmRlciBVVUlEXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJDbGllbnQgVVVJRFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiUHJvZHVjdCBVVUlEXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEFic3RyYWN0RGF0YVJlY29yZCByZWNvcmQpXHJcbiAgICAgICAge1xyXG5PcmRlckRhdGFSZWNvcmQgb3JkZXJSZWNvcmQ7ICAgICAgICAgICAgaWYgKCEoKG9yZGVyUmVjb3JkID0gcmVjb3JkIGFzIE9yZGVyRGF0YVJlY29yZCkgIT0gbnVsbCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiY2xpZW50XCIsIG9yZGVyUmVjb3JkLkdldENsaWVudE5hbWUoKSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwicHJvZHVjdFwiLCBvcmRlclJlY29yZC5HZXRQcm9kdWN0TmFtZSgpKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJkYXRlXCIsIG9yZGVyUmVjb3JkLkRhdGVUaW1lLlRvU3RyaW5nKFwieXl5eS1NTU0tZGQgSEg6bW06c3NcIikpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInF1YW50aXR5XCIsIHN0cmluZy5Gb3JtYXQoXCJ7MH1cIiwgb3JkZXJSZWNvcmQuUXVhbnRpdHkpKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJwcmljZV9lYWNoXCIsIHN0cmluZy5Gb3JtYXQoXCIkezA6RjJ9XCIsIG9yZGVyUmVjb3JkLkdldFByaWNlKCkpKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJ0b3RhbFwiLCBzdHJpbmcuRm9ybWF0KFwiJHswOkYyfVwiLCBvcmRlclJlY29yZC5HZXRUb3RhbCgpKSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwib3JkZXJfdXVpZFwiLCBvcmRlclJlY29yZC5VVUlEKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJjbGllbnRfdXVpZFwiLCBvcmRlclJlY29yZC5DbGllbnRVVUlEKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJwcm9kdWN0X3V1aWRcIiwgb3JkZXJSZWNvcmQuUHJvZHVjdFVVSUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEub3JkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPcmRlcnNMaXN0UGFuZWwgOiBEYXRhTGlzdFBhbmVsXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFUYWJsZSBDcmVhdGVEYXRhVGFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcmRlcnNEYXRhVGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwibmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAudWkud2luZG93cy5kYXRhLnByb2R1Y3RzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQcm9kdWN0c0RhdGFUYWJsZSA6IERhdGFUYWJsZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBzdHJpbmdbXSBEZWZhdWx0Q29sdW1ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IHN0cmluZ1tdIHtcIlVVSURcIiwgXCJQcm9kdWN0IE5hbWVcIiB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBDU2hhcnBXZWJBcHAuYXBwLmRhdGE7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkdsb2JhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEucHJvZHVjdHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2R1Y3RzRGV0YWlsUGFuZWwgOiBEYXRhRGV0YWlsUGFuZWxcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBCdWlsZEZpZWxkcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJOYW1lXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJEZXBhcnRtZW50XCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJNYXRlcmlhbFwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiQ29sb3JcIik7XHJcbiAgICAgICAgICAgIEFkZFRleHRGaWVsZChcIlByaWNlXCIpO1xyXG4gICAgICAgICAgICBBZGRUZXh0RmllbGQoXCJQcm9tb3Rpb24gQ29kZVwiKTtcclxuICAgICAgICAgICAgQWRkVGV4dEZpZWxkKFwiUHJvZHVjdCBVVUlEXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEFic3RyYWN0RGF0YVJlY29yZCByZWNvcmQpXHJcbiAgICAgICAge1xyXG5Qcm9kdWN0RGF0YVJlY29yZCBwcm9kdWN0UmVjb3JkOyAgICAgICAgICAgIGlmICghKChwcm9kdWN0UmVjb3JkID0gcmVjb3JkIGFzIFByb2R1Y3REYXRhUmVjb3JkKSAhPSBudWxsKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJuYW1lXCIsIHByb2R1Y3RSZWNvcmQuTmFtZSk7XHJcbiAgICAgICAgICAgIFNldFRleHRGaWVsZFZhbHVlKFwiZGVwYXJ0bWVudFwiLCBwcm9kdWN0UmVjb3JkLkRlcGFydG1lbnQpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcIm1hdGVyaWFsXCIsIHByb2R1Y3RSZWNvcmQuTWF0ZXJpYWwpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcImNvbG9yXCIsIHByb2R1Y3RSZWNvcmQuQ29sb3IpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInByaWNlXCIsIHN0cmluZy5Gb3JtYXQoXCIkezA6RjJ9XCIsIHByb2R1Y3RSZWNvcmQuUHJpY2UpKTtcclxuICAgICAgICAgICAgU2V0VGV4dEZpZWxkVmFsdWUoXCJwcm9tb3Rpb25fY29kZVwiLCBwcm9kdWN0UmVjb3JkLlByb21vdGlvbkNvZGUpO1xyXG4gICAgICAgICAgICBTZXRUZXh0RmllbGRWYWx1ZShcInByb2R1Y3RfdXVpZFwiLCBwcm9kdWN0UmVjb3JkLlVVSUQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJuYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEucHJvZHVjdHNcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2R1Y3RzTGlzdFBhbmVsIDogRGF0YUxpc3RQYW5lbFxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhVGFibGUgQ3JlYXRlRGF0YVRhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvZHVjdHNEYXRhVGFibGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC5ib290c3RyYXA7XHJcbnVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMucmlnaHRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlUmlnaHREb3dubG9hZHNDYXJkIDogSG9tZVBhZ2VSaWdodENhcmRcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdHJpbmcgdGl0bGUgPSBAXCJEb3dubG9hZHMgMjAxOS1KYW4tMDdcIjtcclxuICAgICAgICBjb25zdCBzdHJpbmcgZGVtb1JhaWxzVXJsID0gQFwiaHR0cHM6Ly9naXRodWIuY29tL3BkZmlzay9jc2hhcnBfd2ViX2V4cHJlc3NfZGVtb19zZXJ2ZXJcIjtcclxuXHJcbiAgICAgICAgcHVibGljIEhvbWVQYWdlUmlnaHREb3dubG9hZHNDYXJkKElXaWRnZXQgd2lkZ2V0KSA6IGJhc2UodGl0bGUsIHdpZGdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFkZERvd25sb2FkTGluayhkZW1vUmFpbHNVcmwsIFwiRGVtbyBSYWlscyBTZXJ2ZXJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEFkZERvd25sb2FkTGluayhzdHJpbmcgdXJsLCBzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBicHRleHQgPSBuZXcgQnBUZXh0KFdpZGdldCk7XHJcbiAgICAgICAgICAgIGJwdGV4dC5BZGRMaW5rKHVybCwgdGV4dCk7XHJcbiAgICAgICAgICAgIEFkZENvbnRlbnRJdGVtKGJwdGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkxpYi5hcHAudmlld3BvcnQucGFuZWxzO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkxpYi5ibG9ja3Mudmlld3BvcnQucGFnZXMuaG9tZS5oZWFkbGluZS5wYW5lbHMucmlnaHRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEhvbWVQYWdlUmlnaHRMaW5rc0NhcmQgOiBIb21lUGFnZVJpZ2h0Q2FyZFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZyB0aXRsZSA9IEBcIkxpbmtzXCI7XHJcbiAgICAgICAgY29uc3Qgc3RyaW5nIGJsb2dVcmwgPSBAXCJodHRwczovL2NzaGFycHdlYmV4cHJlc3MucXVvcmEuY29tL1wiO1xyXG5cclxuICAgICAgICBwdWJsaWMgSG9tZVBhZ2VSaWdodExpbmtzQ2FyZChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHRpdGxlLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRMaW5rKGJsb2dVcmwsIFwiQ1NoYXJwV2ViRXhwcmVzcyBCbG9nXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViTGliLmFwcC52aWV3cG9ydC5wYW5lbHM7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViTGliLmJsb2Nrcy52aWV3cG9ydC5wYWdlcy5ob21lLmhlYWRsaW5lLnBhbmVscy5yaWdodFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgSG9tZVBhZ2VSaWdodFZpZGVvc0NhcmQgOiBIb21lUGFnZVJpZ2h0Q2FyZFxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHN0cmluZyB0aXRsZSA9IEBcIlZpZGVvc1wiO1xyXG4gICAgICAgIGNvbnN0IHN0cmluZyBkZW1vVXJsID0gQFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1YR3BuUHRMNFdJVVwiO1xyXG4gICAgICAgIGNvbnN0IHN0cmluZyBuZXdXaW5kb3dVcmwgPSBAXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWh2clFvWFdFcEFBXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBIb21lUGFnZVJpZ2h0VmlkZW9zQ2FyZChJV2lkZ2V0IHdpZGdldCkgOiBiYXNlKHRpdGxlLCB3aWRnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZGRMaW5rKGRlbW9VcmwsIFwiRGVtbyBBcHBsaWNhdGlvbiAobm8gc291bmQpXCIpO1xyXG4gICAgICAgICAgICBBZGRMaW5rKG5ld1dpbmRvd1VybCwgXCJVcGRhdGUgYW5kIERlcGxveSB0byBIZXJva3UgKDNtNDZzIHRvdGFsIGVsYXBzZWQgdGltZSlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENsaWVudERhdGFDb2xsZWN0aW9uIDogQWJzdHJhY3REYXRhQ29sbGVjdGlvblxyXG4gICAge1xyXG4gICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBDbGllbnREYXRhUmVjb3JkPiBDbGllbnRNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGREYXRhSXRlbShkeW5hbWljIGl0ZW1EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFJc0phdmFTY3JpcHRPYmplY3QoaXRlbURhdGEpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBDbGllbnREYXRhUmVjb3JkIGNsaWVudFJlY29yZCA9IG5ldyBDbGllbnREYXRhUmVjb3JkKGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgQ2xpZW50TWFwW2NsaWVudFJlY29yZC5VVUlEXSA9IGNsaWVudFJlY29yZDtcclxuICAgICAgICAgICAgQWRkKGNsaWVudFJlY29yZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgQWJzdHJhY3REYXRhUmVjb3JkIEdldFJlY29yZEF0S2V5KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gQ2xpZW50UmVjb3JkRm9yVVVJRChrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENsaWVudERhdGFSZWNvcmQgQ2xpZW50UmVjb3JkRm9yVVVJRChzdHJpbmcgdXVpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChDbGllbnRNYXAuQ29udGFpbnNLZXkodXVpZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQ2xpZW50TWFwW3V1aWRdO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgQ2xpZW50TmFtZUZvclVVSUQoc3RyaW5nIHV1aWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbGllbnREYXRhUmVjb3JkIHJlY29yZCA9IENsaWVudFJlY29yZEZvclVVSUQodXVpZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIi0tLVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkLk5hbWU7XHJcbiAgICAgICAgfVxyXG5cbiAgICBcbnByaXZhdGUgICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgQ2xpZW50RGF0YVJlY29yZD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX0NsaWVudE1hcD1uZXcgRGljdGlvbmFyeTxzdHJpbmcsIENsaWVudERhdGFSZWNvcmQ+KCk7fVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIENTaGFycFdlYkFwcC5hcHAuZGF0YVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgT3JkZXJEYXRhQ29sbGVjdGlvbiA6IEFic3RyYWN0RGF0YUNvbGxlY3Rpb25cclxuICAgIHtcclxuICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgT3JkZXJEYXRhUmVjb3JkPiBPcmRlck1hcCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEFkZERhdGFJdGVtKGR5bmFtaWMgaXRlbURhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIUlzSmF2YVNjcmlwdE9iamVjdChpdGVtRGF0YSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIE9yZGVyRGF0YVJlY29yZCBvcmRlclJlY29yZCA9IG5ldyBPcmRlckRhdGFSZWNvcmQoaXRlbURhdGEpO1xyXG4gICAgICAgICAgICBPcmRlck1hcFtvcmRlclJlY29yZC5VVUlEXSA9IG9yZGVyUmVjb3JkO1xyXG4gICAgICAgICAgICBBZGQob3JkZXJSZWNvcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIEFic3RyYWN0RGF0YVJlY29yZCBHZXRSZWNvcmRBdEtleShzdHJpbmcga2V5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9yZGVyUmVjb3JkRm9yVVVJRChrZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIE9yZGVyRGF0YVJlY29yZCBPcmRlclJlY29yZEZvclVVSUQoc3RyaW5nIHV1aWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoT3JkZXJNYXAuQ29udGFpbnNLZXkodXVpZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3JkZXJNYXBbdXVpZF07XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXG4gICAgXG5wcml2YXRlICAgICAgICAgRGljdGlvbmFyeTxzdHJpbmcsIE9yZGVyRGF0YVJlY29yZD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX09yZGVyTWFwPW5ldyBEaWN0aW9uYXJ5PHN0cmluZywgT3JkZXJEYXRhUmVjb3JkPigpO31cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLmRhdGFcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFByb2R1Y3REYXRhQ29sbGVjdGlvbiA6IEFic3RyYWN0RGF0YUNvbGxlY3Rpb25cclxuICAgIHtcclxuICAgICAgICBEaWN0aW9uYXJ5PHN0cmluZywgUHJvZHVjdERhdGFSZWNvcmQ+IFByb2R1Y3RNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBBZGREYXRhSXRlbShkeW5hbWljIGl0ZW1EYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFJc0phdmFTY3JpcHRPYmplY3QoaXRlbURhdGEpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBQcm9kdWN0RGF0YVJlY29yZCBwcm9kdWN0UmVjb3JkID0gbmV3IFByb2R1Y3REYXRhUmVjb3JkKGl0ZW1EYXRhKTtcclxuICAgICAgICAgICAgUHJvZHVjdE1hcFtwcm9kdWN0UmVjb3JkLlVVSURdID0gcHJvZHVjdFJlY29yZDtcclxuICAgICAgICAgICAgQWRkKHByb2R1Y3RSZWNvcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFByb2R1Y3REYXRhUmVjb3JkIFByb2R1Y3RSZWNvcmRGb3JVVUlEKHN0cmluZyB1dWlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFByb2R1Y3RNYXAuQ29udGFpbnNLZXkodXVpZCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvZHVjdE1hcFt1dWlkXTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIFByb2R1Y3ROYW1lRm9yVVVJRChzdHJpbmcgdXVpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgUHJvZHVjdERhdGFSZWNvcmQgcmVjb3JkID0gUHJvZHVjdFJlY29yZEZvclVVSUQodXVpZCk7XHJcbiAgICAgICAgICAgIGlmIChyZWNvcmQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIi0tLVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVjb3JkLk5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgQWJzdHJhY3REYXRhUmVjb3JkIEdldFJlY29yZEF0S2V5KHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvZHVjdFJlY29yZEZvclVVSUQoa2V5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBkb3VibGUgUHJvZHVjdFByaWNlRm9yVVVJRChzdHJpbmcgdXVpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFByb2R1Y3REYXRhUmVjb3JkIHJlY29yZCA9IFByb2R1Y3RSZWNvcmRGb3JVVUlEKHV1aWQpO1xyXG4gICAgICAgICAgICBpZiAocmVjb3JkID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlY29yZC5QcmljZTtcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSAgICAgICAgIERpY3Rpb25hcnk8c3RyaW5nLCBQcm9kdWN0RGF0YVJlY29yZD4gX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1Byb2R1Y3RNYXA9bmV3IERpY3Rpb25hcnk8c3RyaW5nLCBQcm9kdWN0RGF0YVJlY29yZD4oKTt9XHJcbn1cclxuXHJcbiIsInVzaW5nIEJyaWRnZTtcclxudXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5jbGllbnRzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDbGllbnRzV2luZG93IDogRGF0YVdpbmRvd1xyXG4gICAge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgQnV0dG9uQ29uZmlnW10gRGVmYXVsdEJ1dHRvbnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWdbXSB7XHJcbiAgICAgICAgICAgICAgICBCdXR0b25SZWZyZXNoKClcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEhhbmRsZUV2ZW50KHN0cmluZyBldmVudE5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50TmFtZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9uX3Nob3dfb3JkZXJzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgU2hvd09yZGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBiYXNlLkhhbmRsZUV2ZW50KGV2ZW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YUxpc3RQYW5lbC5SZWZyZXNoRnJvbUNvbGxlY3Rpb24oRGF0YU1hbmFnZXIuQ2xpZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFNob3dPcmRlcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU2NyaXB0LkNhbGwoXCJ3aW5kb3cuY29uc29sZS5sb2dcIiwgXCJTaG93T3JkZXJzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnV0dG9uQ29uZmlnIEJ1dHRvblJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWcoXCJSZWZyZXNoXCIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnV0dG9uQ29uZmlnIEJ1dHRvblNob3dPcmRlcnMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWcoXCJTaG93IE9yZGVyc1wiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBEYXRhRGV0YWlsUGFuZWwgQnVpbGREZXRhaWxQYW5lbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENsaWVudHNEZXRhaWxQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFMaXN0UGFuZWwgQnVpbGRMaXN0UGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDbGllbnRzTGlzdFBhbmVsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRDYXB0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkNsaWVudHNcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIENTaGFycFdlYkFwcC5hcHAuZGF0YTtcclxudXNpbmcgQ1NoYXJwV2ViTGliLnV0aWw7XHJcblxyXG5uYW1lc3BhY2UgQ1NoYXJwV2ViQXBwLmFwcC51aS53aW5kb3dzLmRhdGEub3JkZXJzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBPcmRlcnNXaW5kb3cgOiBEYXRhV2luZG93XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIEJ1dHRvbkNvbmZpZ1tdIERlZmF1bHRCdXR0b25zKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnW10ge1xyXG4gICAgICAgICAgICAgICAgQnV0dG9uUmVmcmVzaCgpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgRGF0YURldGFpbFBhbmVsIEJ1aWxkRGV0YWlsUGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcmRlcnNEZXRhaWxQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFMaXN0UGFuZWwgQnVpbGRMaXN0UGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcmRlcnNMaXN0UGFuZWwoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YUxpc3RQYW5lbC5SZWZyZXNoRnJvbUNvbGxlY3Rpb24oRGF0YU1hbmFnZXIuT3JkZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1dHRvbkNvbmZpZyBCdXR0b25SZWZyZXNoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiUmVmcmVzaFwiLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEJ1dHRvbkNvbmZpZyBCdXR0b25TaG93Q2xpZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQnV0dG9uQ29uZmlnKFwiU2hvdyBDbGllbnRcIiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXR0b25Db25maWcgQnV0dG9uU2hvd1Byb2R1Y3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWcoXCJTaG93IFByb2R1Y3RcIiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgc3RyaW5nIERlZmF1bHRDYXB0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk9yZGVyc1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQ1NoYXJwV2ViQXBwLmFwcC5kYXRhO1xyXG51c2luZyBDU2hhcnBXZWJMaWIudXRpbDtcclxuXHJcbm5hbWVzcGFjZSBDU2hhcnBXZWJBcHAuYXBwLnVpLndpbmRvd3MuZGF0YS5wcm9kdWN0c1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvZHVjdHNXaW5kb3cgOiBEYXRhV2luZG93XHJcbiAgICB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSBCdXR0b25Db25maWdbXSBEZWZhdWx0QnV0dG9ucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZ1tdIHtcclxuICAgICAgICAgICAgICAgIEJ1dHRvblJlZnJlc2goKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFEZXRhaWxQYW5lbCBCdWlsZERldGFpbFBhbmVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvZHVjdHNEZXRhaWxQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIERhdGFMaXN0UGFuZWwgQnVpbGRMaXN0UGFuZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9kdWN0c0xpc3RQYW5lbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQnV0dG9uQ29uZmlnIEJ1dHRvblJlZnJlc2goKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBCdXR0b25Db25maWcoXCJSZWZyZXNoXCIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUmVmcmVzaCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEYXRhTGlzdFBhbmVsLlJlZnJlc2hGcm9tQ29sbGVjdGlvbihEYXRhTWFuYWdlci5Qcm9kdWN0cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBCdXR0b25Db25maWcgQnV0dG9uU2hvd09yZGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1dHRvbkNvbmZpZyhcIlNob3cgT3JkZXJzXCIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHN0cmluZyBEZWZhdWx0Q2FwdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJQcm9kdWN0c1wiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
