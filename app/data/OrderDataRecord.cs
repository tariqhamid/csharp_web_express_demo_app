using System;
using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class OrderDataRecord : AbstractDataRecord
    {

        public OrderDataRecord(dynamic data)
        {
            SetData(data);
        }

        public override dynamic[] GetSelectedData(string[] ids)
        {
            List<dynamic> data = new List<dynamic>();
            foreach (string id in ids)
            {
                switch (id)
                {
                    case "date":
                        data.Add(DateTime.Date.ToString("yyyy-MMM-dd"));
                        break;
                    case "client_name":
                        data.Add(GetClientName());
                        break;
                    case "product_name":
                        data.Add(GetProductName());
                        break;
                    case "uuid":
                        data.Add(UUID);
                        break;
                    default:
                        data.Add(id);
                        break;
                }
            }
            return data.ToArray();
        }

        public string GetProductName()
        {
            return DataManager.Products.ProductNameForUUID(ProductUUID);
        }

       public string GetClientName()
        {
            return DataManager.Clients.ClientNameForUUID(ClientUUID);
        }

        public double GetPrice()
        {
            return DataManager.Products.ProductPriceForUUID(ProductUUID);
        }

        public double GetTotal()
        {
            return GetPrice() * Quantity;
        }

        protected override void BuildFields()
        {
            base.BuildFields();
            if (IsJavaScriptString(RawData.client_uuid))
                ClientUUID = RawData.client_uuid;
            if (IsJavaScriptString(RawData.date_str))
                DateTime = Convert.ToDateTime(RawData.date_str);
            if (IsJavaScriptString(RawData.product_uuid))
                ProductUUID = RawData.product_uuid;
            if (IsJavaScriptNumber(RawData.quantity))
                Quantity = RawData.quantity;
            if (IsJavaScriptString(RawData.order_uuid))
                UUID = RawData.order_uuid;
        }

        public string ClientUUID { get; private set; } = "";
        public DateTime DateTime { get; private set; } = DateTime.Now;
        public string ProductUUID { get; private set; } = "";
        public int Quantity { get; private set; } = 0;
        public string UUID { get; private set; } = "";
    }
}
