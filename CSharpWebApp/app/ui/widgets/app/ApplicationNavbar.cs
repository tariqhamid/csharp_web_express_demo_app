using Bridge;
using CSharpWebApp.app.ui.windows.data.clients;
using CSharpWebApp.app.ui.windows.data.orders;
using CSharpWebApp.app.ui.windows.data.products;
using CSharpWebApp.app.ui.windows.launcher;
using CSharpWebLib.app.viewport;
using CSharpWebLib.qx.ui.embed;
using CSharpWebLib.qx.ui.toolbar;
using CSharpWebLib.qx.ui.widgets.navbar;
using CSharpWebLib.qx.ui.windows;

namespace CSharpWebApp.app.ui.widgets.app
{
    public class ApplicationNavbar : Navbar
    {
        ToolbarButton _workspaceModeButton;
        ApplicationViewsButton _viewsButton;

        public ApplicationNavbar(Viewport viewport) : base(viewport)
        {
        }

        protected override void AddButtons()
        {
            _workspaceModeButton = AddNavbarButton("Website Mode");
            _viewsButton = new ApplicationViewsButton(this, this);
            _viewsButton.Hide();
            Add(_viewsButton);
            AddNavbarButton("Forum");
            AddSpacer();
        }

        protected override NavbarLabel CreateLabel()
        {
            return new CSharpWebLabel();
        }

        protected override int DefaultHeight()
        {
            return 55;
        }

        public override void HandleEvent(string eventName)
        {
            switch (eventName)
            {
                case "browse_clients":
                    OnBrowseClients();
                    break;
                case "browse_orders":
                    OnBrowseOrders();
                    break;
                case "browse_products":
                    OnBrowseProducts();
                    break;
                case "website_mode":
                    OnWebsiteMode();
                    break;
                case "forum":
                    OnForum();
                    break;
                case "my_new_button":
                    OnMyNewButton();
                    break;
            }
        }

        void OnMyNewButton()
        {
            var win = new Window();
            win.Caption = "MY NEW BUTTON WINDOW2";
        }

        void OnBrowseClients()
        {
            new ClientsWindow();
        }

        void OnBrowseProducts()
        {
            new ProductsWindow();
        }

        void OnBrowseOrders()
        {
            new OrdersWindow();
        }

        void OnWebsiteMode()
        {
            SetDataMode(!_isDesktopMode);
            if (_isDesktopMode)
                _viewsButton.Show();
            else
                _viewsButton.Hide();
            _workspaceModeButton.Label = _isDesktopMode ? "Desktop Mode" : "Website Mode";
        }

        void OnLauncher()
        {
           new LauncherWindow();
        }

        void OnForum()
        {
            Script.Call("window.open", "http://csharpwebexpress.freeforums.net/", "_blank");
        }

        void OnDownload()
        {
            Script.Call("window.open", "https://store.csharpwebexpress.com/", "_blank");
        }

    }
}
