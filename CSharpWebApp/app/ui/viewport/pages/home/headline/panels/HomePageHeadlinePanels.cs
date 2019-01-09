using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;
using CSharpWebLib.blocks.viewport.pages.home.headline.panels.left;
using CSharpWebLib.blocks.viewport.pages.home.headline.panels.right;

namespace CSharpWebApp.app.viewport.pages.home.headline
{
    public class HomePageHeadlinePanels : Bp2Columns
    {
        public HomePageHeadlinePanels(IWidget widget) : base(widget)
        {
        }

        protected override void AddLeftChildren()
        {
            LeftColumn.AddChild(new HomePageLeftInfoCard(Widget));
        }

        protected override void AddRightChildren()
        {
            AddRightChild(new HomePageRightDownloadsCard(Widget));
            AddRightChild(new HomePageRightVideosCard(Widget));
            AddRightChild(new HomePageRightLinksCard(Widget));
        }

        void AddRightChild(BpElement child)
        {
            RightColumn
                .AddChild(child)
                .AddChild(new BpBr(Widget));
        }

    }
}
