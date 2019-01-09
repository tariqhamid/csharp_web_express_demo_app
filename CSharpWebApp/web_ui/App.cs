using Bridge;
using CSharpWebApp.app;

namespace CSharpWebApp
{
    public class App
    {
        public static void Start(dynamic root)
        {
            Application.Instance.Start(root);
        }
    }
}
