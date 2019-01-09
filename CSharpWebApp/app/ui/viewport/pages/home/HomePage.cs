using CSharpWebApp.app.viewport.pages.home.featured_code_sample;
using CSharpWebApp.app.viewport.pages.home.featured_video;
using CSharpWebApp.app.viewport.pages.home.headline;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.home
{
    public class HomePage : CardPage
    {
        public override string ButtonLabel()
        {
            return "Home";
        }

        public override string PageTitle()
        {
            return "Home";
        }

        public override string TagName()
        {
            return "home";
        }

        protected override void AddCardPanels()
        {
            AddCardPanelWithSpacer(new HomePageHeadlinePanels(this));
            AddCardPanelWithSpacer(new HomePageFeaturedCodeSamplePanel(this));
            AddCardPanelWithSpacer(new HomePageFeaturedVideoPanel(this));
        }

    }
}
