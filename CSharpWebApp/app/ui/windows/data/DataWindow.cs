using Bridge;
using CSharpWebApp.app.data;
using CSharpWebLib.qx.ui.splitpane;
using CSharpWebLib.qx.ui.windows;

namespace CSharpWebApp.app.ui.windows.data
{
    public abstract class DataWindow : Window, IHandleSelectedRecord
    {

        public DataListPanel DataListPanel { get; protected set; }
        public DataDetailPanel DataDetailPanel { get; protected set; }

        protected override void Init()
        {
            base.Init();
            DataListPanel = BuildListPanel();
            DataDetailPanel = BuildDetailPanel();
            Split.Add(DataListPanel);
            Split.Add(DataDetailPanel);
            Add(Split, "center");
            AddListeners();
            DataListPanel.List.RecordSelectionHandler = this;
        }

        protected virtual void AddListeners()
        {

        }

        protected override void OnAppear()
        {
            Refresh();
        }

        protected override bool HandlesAppear()
        {
            return true;
        }

        public override void HandleEvent(string eventName)
        {
            switch (eventName)
            {
                case "on_refresh":
                    Refresh();
                    break;
            }
        }

        public virtual void Refresh()
        {
        }

        protected virtual DataDetailPanel BuildDetailPanel()
        {
            return new DataDetailPanel();
        }

        protected virtual DataListPanel BuildListPanel()
        {
            return new DataListPanel();
        }

        public virtual void HandleSelectedRecord(AbstractDataRecord record)
        {
            DataDetailPanel.Update(record);
        }

        protected SplitPane Split { get; private set; } = SplitPane.Horizontal();
    }
}
