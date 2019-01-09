using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebLib.blocks.viewport.pages.home.headline.panels.right
{
    public class HomePageRightDownloadsCard : HomePageRightCard
    {
        const string title = @"Downloads 2019-Jan-07";
        const string demoRailsUrl = @"https://github.com/pdfisk/csharp_web_express_demo_server";

        public HomePageRightDownloadsCard(IWidget widget) : base(title, widget)
        {
            AddDownloadLink(demoRailsUrl, "Demo Rails Server");
        }

        void AddDownloadLink(string url, string text)
        {
            var bptext = new BpText(Widget);
            bptext.AddLink(url, text);
            AddContentItem(bptext);
        }
    }
}
