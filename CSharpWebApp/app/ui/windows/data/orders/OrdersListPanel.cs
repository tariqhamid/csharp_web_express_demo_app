namespace CSharpWebApp.app.ui.windows.data.orders
{
    public class OrdersListPanel : DataListPanel
    {
        protected override DataTable CreateDataTable()
        {
            return new OrdersDataTable();
        }
    }
}
