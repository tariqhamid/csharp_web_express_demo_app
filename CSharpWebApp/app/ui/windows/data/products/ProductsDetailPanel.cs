using CSharpWebApp.app.data;
using System;
using System.Globalization;

namespace CSharpWebApp.app.ui.windows.data.products
{
    public class ProductsDetailPanel : DataDetailPanel
    {
        protected override void BuildFields()
        {
            AddTextField("Name");
            AddTextField("Department");
            AddTextField("Material");
            AddTextField("Color");
            AddTextField("Price");
            AddTextField("Promotion Code");
            AddTextField("Product UUID");
        }

        public override void Update(AbstractDataRecord record)
        {
            if (!(record is ProductDataRecord productRecord))
                return;
            SetTextFieldValue("name", productRecord.Name);
            SetTextFieldValue("department", productRecord.Department);
            SetTextFieldValue("material", productRecord.Material);
            SetTextFieldValue("color", productRecord.Color);
            SetTextFieldValue("price", string.Format("${0:F2}", productRecord.Price));
            SetTextFieldValue("promotion_code", productRecord.PromotionCode);
            SetTextFieldValue("product_uuid", productRecord.UUID);
        }
    }
}
