using CSharpWebLib.app.viewport.content;
using CSharpWebApp.app.viewport.pages.home;

namespace CSharpWebApp.app.ui.viewport.content
{
    public  class ApplicationStandardContent : StandardContent
    {
      protected override  void AddMenuPanels()
        {
            NavPanel.AddNav(new HomeMenuPanel(NavPanel, ContentPanel));
        }
    }
}
