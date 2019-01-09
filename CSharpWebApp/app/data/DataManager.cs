using CSharpWebApp.app.api;

namespace CSharpWebApp.app.data
{
    public static class DataManager
    {
        public static ClientDataCollection Clients { get; private set; } = new ClientDataCollection();
        public static ProductDataCollection Products { get; private set; } = new ProductDataCollection();
        public static OrderDataCollection Orders { get; private set; } = new OrderDataCollection();

        public static void LoadData()
        {
            LoadClients();
            LoadProducts();
            LoadOrders();
        }

        static void LoadClients()
        {
            void fn(dynamic data)
            {
                Clients.LoadData(data);
            }
            ServerApi.GetClients(fn);
        }

        static void LoadProducts()
        {
            void fn(dynamic data)
            {
                Products.LoadData(data);
            }
            ServerApi.GetProducts(fn);
        }

        static void LoadOrders()
        {
            void fn(dynamic data)
            {
                Orders.LoadData(data);
            }
            ServerApi.GetOrders(fn);
        }
    }
}
