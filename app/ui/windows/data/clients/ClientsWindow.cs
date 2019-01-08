using Bridge;
using CSharpWebApp.app.data;
using CSharpWebLib.util;

namespace CSharpWebApp.app.ui.windows.data.clients
{
    public class ClientsWindow : DataWindow
    {

        protected override ButtonConfig[] DefaultButtons()
        {
            return new ButtonConfig[] {
                ButtonRefresh()
            };
        }

        public override void HandleEvent(string eventName)
        {
            switch (eventName)
            {
                case "on_show_orders":
                    ShowOrders();
                    break;
                default:
                    base.HandleEvent(eventName);
                    break;
            }
        }

        public override void Refresh()
        {
            DataListPanel.RefreshFromCollection(DataManager.Clients);
        }

        void ShowOrders()
        {
            Script.Call("window.console.log", "ShowOrders");
        }

        ButtonConfig ButtonRefresh()
        {
            return new ButtonConfig("Refresh", this);
        }

        ButtonConfig ButtonShowOrders()
        {
            return new ButtonConfig("Show Orders", this);
        }

        protected override DataDetailPanel BuildDetailPanel()
        {
            return new ClientsDetailPanel();
        }

        protected override DataListPanel BuildListPanel()
        {
            return new ClientsListPanel();
        }

        protected override string DefaultCaption()
        {
            return "Clients";
        }

    }
}
