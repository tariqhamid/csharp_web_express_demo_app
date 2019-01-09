using CSharpWebApp.app.data;

namespace CSharpWebApp.app.ui.windows.data.orders
{
    public class OrdersDetailPanel : DataDetailPanel
    {

        protected override void BuildFields()
        {
            AddTextField("Client");
            AddTextField("Product");
            AddTextField("Date");
            AddTextField("Quantity");
            AddTextField("Price Each");
            AddTextField("Total");
            AddTextField("Order UUID");
            AddTextField("Client UUID");
            AddTextField("Product UUID");
        }

        public override void Update(AbstractDataRecord record)
        {
            if (!(record is OrderDataRecord orderRecord))
                return;
            SetTextFieldValue("client", orderRecord.GetClientName());
            SetTextFieldValue("product", orderRecord.GetProductName());
            SetTextFieldValue("date", orderRecord.DateTime.ToString("yyyy-MMM-dd HH:mm:ss"));
            SetTextFieldValue("quantity", string.Format("{0}", orderRecord.Quantity));
            SetTextFieldValue("price_each", string.Format("${0:F2}", orderRecord.GetPrice()));
            SetTextFieldValue("total", string.Format("${0:F2}", orderRecord.GetTotal()));
            SetTextFieldValue("order_uuid", orderRecord.UUID);
            SetTextFieldValue("client_uuid", orderRecord.ClientUUID);
            SetTextFieldValue("product_uuid", orderRecord.ProductUUID);
        }
    }
}
