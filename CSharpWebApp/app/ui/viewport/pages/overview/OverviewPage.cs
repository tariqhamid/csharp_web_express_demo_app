using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.overview
{
    public class OverviewPage : CardPage
    {
        public override string ButtonLabel()
        {
            return "Overview";
        }

        public override string PageTitle()
        {
            return "Overview";
        }

        public override string TagName()
        {
            return "overview";
        }

        protected override void AddCardPanels()
        {
        }

    }
}
