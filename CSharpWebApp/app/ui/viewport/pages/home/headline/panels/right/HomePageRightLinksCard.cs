using CSharpWebLib.app.viewport.panels;

namespace CSharpWebLib.blocks.viewport.pages.home.headline.panels.right
{
    public class HomePageRightLinksCard : HomePageRightCard
    {
        const string title = @"Links";
        const string blogUrl = @"https://csharpwebexpress.quora.com/";

        public HomePageRightLinksCard(IWidget widget) : base(title, widget)
        {
            AddLink(blogUrl, "CSharpWebExpress Blog");
        }

    }
}
