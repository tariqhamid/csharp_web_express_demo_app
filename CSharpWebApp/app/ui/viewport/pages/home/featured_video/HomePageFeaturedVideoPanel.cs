using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.home.featured_video
{
    public class HomePageFeaturedVideoPanel : BpCard
    {
        public HomePageFeaturedVideoPanel(IWidget widget) : base("CSharpWebExpress Demo", widget)
        {
        }

        protected override void AddContent()
        {
            AddContentItem(new HomePageCSharpExpressVideoHolder(Widget));
        }

    }
}
