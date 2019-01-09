using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;


namespace CSharpWebApp.app.viewport.pages.contact.panels
{
    public class ContactPageHeadlinePanel : Bp2Columns
    {
        public ContactPageHeadlinePanel(IWidget widget) : base(widget)
        {
        }

        protected override void AddLeftChildren()
        {
            BpCard card = new BpCard(@"CSharpWebExpress", Widget);
            LeftColumn.AddChild(card);
            BpText text = new BpText(Widget);
            text
            .AddP(@"CSharpWebExpress is an exciting new technology that allows building sophisticated Web application using only CSharp programming.");
            card.AddContentItem(text);
        }

        protected override void AddRightChildren()
        {
            BpCard card = new BpCard(@"News", Widget);
            RightColumn.AddChild(card);
            BpText text = new BpText(Widget);
            card.AddContentItem(text);
        }

    }
}
