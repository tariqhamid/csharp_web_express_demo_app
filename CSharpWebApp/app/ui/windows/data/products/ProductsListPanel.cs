namespace CSharpWebApp.app.ui.windows.data.products
{
    public class ProductsListPanel : DataListPanel
    {
        protected override DataTable CreateDataTable()
        {
            return new ProductsDataTable();
        }
    }
}
