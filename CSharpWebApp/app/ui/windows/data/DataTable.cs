using Bridge;
using CSharpWebApp.app.data;
using CSharpWebLib.qx.interfaces;
using CSharpWebLib.qx.ui.table;

namespace CSharpWebApp.app.ui.windows.data
{
    public class DataTable : Table, IHandleSelection
    {
        AbstractDataCollection DataCollection { get; set; }
        public IHandleSelectedRecord RecordSelectionHandler { get; set; }

        protected override void Init()
        {
            base.Init();
            SelectionHandler = this;
        }

        protected override string[] DefaultColumns()
        {
            return new string[] { "Name" };
        }

        public void SetDataFromCollection(AbstractDataCollection dataCollection)
        {
            DataCollection = dataCollection;
            Data = DataCollection.GetSelectedData(DefaultIds());
        }

        public void HandleSelection(int selectedIndex, dynamic rowData)
        {
            if (DataCollection == null)
                return;
            AbstractDataRecord selectedRecord;
            if (rowData != null && rowData.length != null && rowData.length > 0)
                selectedRecord = DataCollection.GetRecordAtKey(rowData[0]);
            else
                selectedRecord = DataCollection.GetRecordAtIndex(selectedIndex);
            if (selectedRecord == null)
                return;
            if (RecordSelectionHandler != null)
                RecordSelectionHandler.HandleSelectedRecord(selectedRecord);
        }

        protected override bool HandlesAppear()
        {
            return true;
        }

        protected override void OnAppear()
        {
            SetColumnVisible(0, false);
        }

    }
}
