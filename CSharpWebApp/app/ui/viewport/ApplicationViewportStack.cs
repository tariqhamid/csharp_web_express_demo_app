using CSharpWebApp.app.ui.viewport.content;
using CSharpWebLib.app.viewport;
using CSharpWebLib.app.viewport.content;

namespace CSharpWebApp.app.ui.viewport
{
    public class ApplicationViewportStack : ViewportStack
    {
        protected override DesktopContent CreateDesktopContent()
        {
            return new ApplicationDesktopContent();
        }

        protected override StandardContent CreateStandardContent()
        {
            return new ApplicationStandardContent();
        }
    }
}
