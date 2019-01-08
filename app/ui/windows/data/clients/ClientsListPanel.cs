namespace CSharpWebApp.app.ui.windows.data.clients
{
    public class ClientsListPanel : DataListPanel
    {
        protected override DataTable CreateDataTable()
        {
            return new ClientsDataTable();
        }
    }
}
