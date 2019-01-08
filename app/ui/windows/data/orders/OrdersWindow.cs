using CSharpWebApp.app.data;
using CSharpWebLib.util;

namespace CSharpWebApp.app.ui.windows.data.orders
{
    public class OrdersWindow : DataWindow
    {
        protected override ButtonConfig[] DefaultButtons()
        {
            return new ButtonConfig[] {
                ButtonRefresh()
            };
        }

        protected override DataDetailPanel BuildDetailPanel()
        {
            return new OrdersDetailPanel();
        }

        protected override DataListPanel BuildListPanel()
        {
            return new OrdersListPanel();
        }

        public override void Refresh()
        {
            DataListPanel.RefreshFromCollection(DataManager.Orders);
        }

        ButtonConfig ButtonRefresh()
        {
            return new ButtonConfig("Refresh", this);
        }

        ButtonConfig ButtonShowClient()
        {
            return new ButtonConfig("Show Client", this);
        }

        ButtonConfig ButtonShowProduct()
        {
            return new ButtonConfig("Show Product", this);
        }

        protected override string DefaultCaption()
        {
            return "Orders";
        }

    }
}
