using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class ProductDataRecord : AbstractDataRecord
    {
        public ProductDataRecord(dynamic data)
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
                    case "product_name":
                        data.Add(Name);
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

        protected override void BuildFields()
        {
            base.BuildFields();
            if (IsJavaScriptString(RawData.color))
                Color = RawData.color;
            if (IsJavaScriptString(RawData.department))
                Department = RawData.department;
            if (IsJavaScriptString(RawData.material))
                Material = RawData.material;
            if (IsJavaScriptString(RawData.product_name))
                Name = RawData.product_name;
            if (IsJavaScriptNumber(RawData.price))
                Price = RawData.price;
            if (IsJavaScriptString(RawData.promotion_code))
                PromotionCode = RawData.promotion_code;
            if (IsJavaScriptString(RawData.product_uuid))
                UUID = RawData.product_uuid;
        }

        public string Color { get; private set; } = "";
        public string Department { get; private set; } = "";
        public string Material { get; private set; } = "";
        public string Name { get; private set; } = "";
        public double Price { get; private set; } = 0;
        public string PromotionCode { get; private set; } = "";
        public string UUID { get; private set; } = "";
    }
}
