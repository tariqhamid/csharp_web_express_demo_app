using CSharpWebApp.app.data;
using CSharpWebLib.util;

namespace CSharpWebApp.app.ui.windows.data.products
{
    public class ProductsWindow : DataWindow
    {

        protected override ButtonConfig[] DefaultButtons()
        {
            return new ButtonConfig[] {
                ButtonRefresh()
            };
        }

        protected override DataDetailPanel BuildDetailPanel()
        {
            return new ProductsDetailPanel();
        }

        protected override DataListPanel BuildListPanel()
        {
            return new ProductsListPanel();
        }

        ButtonConfig ButtonRefresh()
        {
            return new ButtonConfig("Refresh", this);
        }

        public override void Refresh()
        {
            DataListPanel.RefreshFromCollection(DataManager.Products);
        }

        ButtonConfig ButtonShowOrders()
        {
            return new ButtonConfig("Show Orders", this);
        }

        protected override string DefaultCaption()
        {
            return "Products";
        }

    }
}
