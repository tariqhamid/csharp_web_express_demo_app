namespace CSharpWebApp.app.ui.windows.data.orders
{
    public class OrdersDataTable : DataTable
    {
        protected override string[] DefaultColumns()
        {
            return new string[] { "UUID", "Date", "Client Name", "Product Name" };
        }
    }
}
