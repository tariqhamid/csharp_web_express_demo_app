using CSharpWebLib.app.viewport;
using CSharpWebLib.qx.ui.widgets.navbar;
using CSharpWebApp.app.ui.widgets.app;

namespace CSharpWebApp.app.ui.viewport
{

    public class ApplicationViewport : Viewport
    {

        public static Viewport CreateViewport()
        {
            if (Instance == null)
                Instance = new ApplicationViewport();
            return Instance;
        }

        protected override bool HandlesAppear()
        {
            return true;
        }

        protected override void OnAppear()
        {
        }

        protected override Navbar CreateNavbar()
        {
            return new ApplicationNavbar(this);
        }

        protected override ViewportStack CreateContent()
        {
            return new ApplicationViewportStack();
        }
    }

}
