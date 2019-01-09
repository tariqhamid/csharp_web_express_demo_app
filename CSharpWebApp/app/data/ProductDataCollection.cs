using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class ProductDataCollection : AbstractDataCollection
    {
        Dictionary<string, ProductDataRecord> ProductMap { get; set; } = new Dictionary<string, ProductDataRecord>();

        protected override void AddDataItem(dynamic itemData)
        {
            if (!IsJavaScriptObject(itemData))
                return;
            ProductDataRecord productRecord = new ProductDataRecord(itemData);
            ProductMap[productRecord.UUID] = productRecord;
            Add(productRecord);
        }

        public ProductDataRecord ProductRecordForUUID(string uuid)
        {
            if (ProductMap.ContainsKey(uuid))
                return ProductMap[uuid];
            return null;
        }

        public string ProductNameForUUID(string uuid)
        {
           ProductDataRecord record = ProductRecordForUUID(uuid);
            if (record == null)
                return "---";
            return record.Name;
        }

        public override AbstractDataRecord GetRecordAtKey(string key)
        {
            return ProductRecordForUUID(key);
        }

        public double ProductPriceForUUID(string uuid)
        {
            ProductDataRecord record = ProductRecordForUUID(uuid);
            if (record == null)
                return 0;
            return record.Price;
        }
    }
}

