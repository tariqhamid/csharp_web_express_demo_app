using CSharpWebLib.qx.interfaces;
using CSharpWebLib.qx.ui.widgets.navbar;

namespace CSharpWebApp.app.ui.widgets.app
{
    public class ApplicationViewsButton : ViewsButton
    {
        public ApplicationViewsButton(IDecorate decorator, IEventHandler handler) : base(decorator, handler)
        {
        }

        protected override void AddMenuButtons()
        {
            AddButton("Browse Clients");
            AddButton("Browse Products");
            AddButton("Browse Orders");
            AddButton("MY NEW BUTTON");
        }

    }
}
