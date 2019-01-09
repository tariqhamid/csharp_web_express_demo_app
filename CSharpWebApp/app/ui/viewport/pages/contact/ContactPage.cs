using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.contact
{
    public class ContactPage : CardPage
    {
        public override string ButtonLabel()
        {
            return "Contact";
        }

        public override string PageTitle()
        {
            return "Contact";
        }

        public override string TagName()
        {
            return "contact";
        }

        protected override void AddCardPanels()
        {
        }

    }
}
