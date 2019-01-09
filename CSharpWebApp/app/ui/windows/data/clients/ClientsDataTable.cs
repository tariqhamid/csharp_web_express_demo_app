using Bridge;

namespace CSharpWebApp.app.ui.windows.data.clients
{
    public class ClientsDataTable : DataTable
    {

        protected override string[] DefaultColumns()
        {
            return new string[] { "UUID", "Name", "City" };
        }

    }
}
