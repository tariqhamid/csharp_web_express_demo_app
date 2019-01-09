using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebLib.blocks.viewport.pages.home.headline.panels.right
{
    public class HomePageRightCard : BpCard
    {
        public HomePageRightCard(string text, IWidget widget) : base(text, widget)
        {
        }

        protected void AddLink(string url, string text)
        {
            var bptext = new BpText(Widget);
            bptext.AddLink(url, text);
            AddContentItem(bptext);
        }

    }
}
