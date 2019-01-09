using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebApp.app.viewport.pages.home.featured_video
{
    public class HomePageCSharpExpressVideoHolder : Bp2Columns
    {
        public HomePageCSharpExpressVideoHolder(IWidget widget) : base(widget)
        {
        }

        protected override void AddLeftChildren()
        {
            BpVideo video = new BpVideo(Widget, "https://www.youtube.com/embed/hvrQoXWEpAA");
            LeftColumn.AddChild(video);
        }

        protected override void AddRightChildren()
        {
            BpText text = new BpText(Widget);
            RightColumn.AddChild(text);
            text
            .AddBold(@"CSharpWebExpress Build and Deploy")
            .AddP(@"This is a short video (3m46s) showing the addition of a new object to an existing application.")
            .AddP(@"All the coding is done using CSharp in MS Visual Studio.")
            .AddP(@"When the solution is rebuilt, all of the application's HTML5 codebase is rebuilt automatically.");
        }

    }
}
