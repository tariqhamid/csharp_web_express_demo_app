using CSharpWebApp.app.viewport.pages.contact;
using CSharpWebApp.app.viewport.pages.overview;
using CSharpWebApp.app.viewport.pages.technology;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.home
{
    public class HomeMenuPanel : NavMenuPanel
    {
        public HomeMenuPanel(NavPanel navPanel, ContentPanel contentPanel) : base(navPanel, contentPanel)
        {
        }

        public override void AddPages()
        {
            AddPage(new HomePage());
            AddPage(new OverviewPage());
            AddPage(new TechnologyPage());
            AddPage(new ContactPage());
        }

        public override string GetDefaultPage()
        {
            return "home";
        }

        public override string GetTag()
        {
            return "home";
        }

        protected override void SelectNavPanel(string tag)
        {
        }

        protected override void SelectContentPage(string tag)
        {
            switch (tag)
            {
                case "home":
                case "overview":
                case "technology":
                case "contact":
                    ContentPanel.SelectPage(tag);
                    break;
            }
        }

    }
}
