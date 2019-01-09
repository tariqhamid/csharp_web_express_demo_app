using PyQx.qx.ui.windows;
using Python.interfaces;

namespace WebUi.app
{
    public class DesktopManager : IConsoleOut
    {
        static DesktopManager _instance;

        public static DesktopManager Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new DesktopManager();
                return _instance;
            }
        }

        public void Newline()
        {
            TranscriptWindow.Instance.Newline();
        }

        public void Print(object obj)
        {
            TranscriptWindow.Instance.Pr(obj);
        }

        public void PrintLn(object obj)
        {
            TranscriptWindow.Instance.Prn(obj);
        }
    }
}
