namespace CSharpWebApp.app.ui.windows.data.products
{
    public class ProductsDataTable : DataTable
    {
        protected override string[] DefaultColumns()
        {
            return new string[] {"UUID", "Product Name" };
        }
    }
}
