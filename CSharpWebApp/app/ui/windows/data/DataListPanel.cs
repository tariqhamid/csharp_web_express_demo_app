using CSharpWebApp.app.data;
using CSharpWebLib.qx.ui.container;

namespace CSharpWebApp.app.ui.windows.data
{
    public class DataListPanel : Scroll
    {
        public DataTable List { get; private set; }

        protected override void Init()
        {
            base.Init();
            List = CreateDataTable();
            Add(List);
        }

        protected virtual DataTable CreateDataTable()
        {
            return new DataTable();
        }

        public void RefreshFromCollection(AbstractDataCollection collection)
        {
            List.SetDataFromCollection(collection);
        }
    }
}
