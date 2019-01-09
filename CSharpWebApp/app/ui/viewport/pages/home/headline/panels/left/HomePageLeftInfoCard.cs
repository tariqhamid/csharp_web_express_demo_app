using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;

namespace CSharpWebLib.blocks.viewport.pages.home.headline.panels.left
{
    public class HomePageLeftInfoCard : BpCard
    {
       const string title = @"Welcome to CSharpWebExpress";

        public HomePageLeftInfoCard(IWidget widget) : base(title, widget)
        {
            BpText text = new BpText(Widget);
            text
            .AddP(@"CSharpWebExpress is a technology for building sophisticated Web applications using only the CSharp programming language.")
            .AddP(@"There is no need to use HTML, CSS, or JavaScript although code snippets may be included when appropriate.")
            .AddP(@"The navigation buttons at the left select display panels in this center content area. At the top is a Mode select button which shows either ""Website Mode"" or ""Desktop Mode"" - you can toggle the mode by clicking.")
            .AddP(@"Desktop mode uses windows which are similar to desktop GUI's. The ""Views"" selection button at the top opens new windows. See the brief video below for a demonstration.")
            .AddP(@"This site was created using Microsoft's Visual Studio 2017 Community Edition with all coding for the application done in CSharp. The total development time (single developer) for the demo application was about two days including server deployment (Ruby-on-Rails) to Heroku.")
            .AddP(@"Thank you for visiting the demo site.")
            .AddP(@"-- Peter Fisk, creator of CSharpWebExpress");
            AddContentItem(text);
        }
    }
}
