using CSharpWebLib.app.viewport.panels;

namespace CSharpWebLib.blocks.viewport.pages.home.headline.panels.right
{
    public class HomePageRightVideosCard : HomePageRightCard
    {
        const string title = @"Videos";
        const string demoUrl = @"https://www.youtube.com/watch?v=XGpnPtL4WIU";
        const string newWindowUrl = @"https://www.youtube.com/watch?v=hvrQoXWEpAA";

        public HomePageRightVideosCard(IWidget widget) : base(title, widget)
        {
            AddLink(demoUrl, "Demo Application (no sound)");
            AddLink(newWindowUrl, "Update and Deploy to Heroku (3m46s total elapsed time)");
        }

    }
}
