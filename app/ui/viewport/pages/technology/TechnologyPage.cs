using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.technology
{
    public class TechnologyPage : CardPage
    {
        public override string ButtonLabel()
        {
            return "Technology";
        }

        public override string PageTitle()
        {
            return "Technology";
        }

        public override string TagName()
        {
            return "technology";
        }

        protected override void AddCardPanels()
        {
        }

    }
}
