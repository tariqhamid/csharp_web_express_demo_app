using Bridge;
using CSharpWebApp.app.data;
using CSharpWebLib.app.viewport;
using CSharpWebLib.qx.core;
using CSharpWebApp.app.ui.viewport;

namespace CSharpWebApp.app
{
    public class Application : Qobject
    {

        static Application _instance = null;
        Application() { }

        public static Application Instance
        {
            get
            {
                if (_instance == null)
                    _instance = new Application();
                return _instance;
            }
        }

        protected override void Init()
        {
            NativeObject = Script.Call<dynamic>("qxlib.app.App.getInstance");
        }

        public void Start(dynamic root)
        {
            Viewport viewport = ApplicationViewport.CreateViewport();
            root.add(viewport.NativeObject, new { top = 0, right = 0, bottom = 0, left = 0 });
            DataManager.LoadData();
        }

    }
}
