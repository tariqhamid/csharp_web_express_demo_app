using CSharpWebLib.qx.constants;
using CSharpWebLib.qx.io.request;

namespace CSharpWebApp.app.api
{
    public class ServerApi
    {
        public static ServerApi Instance { get; } = new ServerApi();

        public static void GetClients(FnVoidA fn)
        {
            Send("clients", fn);
        }

        public static void GetProducts(FnVoidA fn)
        {
            Send("products", fn);
        }

        public static void GetOrders(FnVoidA fn)
        {
            Send("orders", fn);
        }

        static void Send(string path, FnVoidA fn)
        {
            Xhr xhr = new Xhr
            {
                Method = "GET",
                Url = string.Format("/api/{0}", path)
            };
            xhr.AddListener("success", () => { OnSuccess(xhr, fn); });
            xhr.Send();
        }

        static void OnSuccess(Xhr xhr, FnVoidA fn)
        {
            dynamic response = xhr.Response;
            if (fn is FnVoidA)
                fn(response);
        }

    }
}
