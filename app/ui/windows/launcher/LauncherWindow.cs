using Config;
using CSharpWebLib.qx.ui.windows;

namespace CSharpWebApp.app.ui.windows.launcher
{
    public class LauncherWindow : Window
    {
        protected override string DefaultCaption()
        {
            return "Launcher";
        }

        protected override int[] DefaultLocation()
        {
            return new int[] { GlobalDimensions.TranscriptLeftInset, GlobalDimensions.TranscriptTopInset };
        }

        protected override int DefaultHeight() => 275;

        protected override int DefaultWidth() => 175;

    }
}
