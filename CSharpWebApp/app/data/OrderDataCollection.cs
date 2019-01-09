using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class OrderDataCollection : AbstractDataCollection
    {
        Dictionary<string, OrderDataRecord> OrderMap { get; set; } = new Dictionary<string, OrderDataRecord>();

        protected override void AddDataItem(dynamic itemData)
        {
            if (!IsJavaScriptObject(itemData))
                return;
            OrderDataRecord orderRecord = new OrderDataRecord(itemData);
            OrderMap[orderRecord.UUID] = orderRecord;
            Add(orderRecord);
        }

        public override AbstractDataRecord GetRecordAtKey(string key)
        {
            return OrderRecordForUUID(key);
        }

        public OrderDataRecord OrderRecordForUUID(string uuid)
        {
            if (OrderMap.ContainsKey(uuid))
                return OrderMap[uuid];
            return null;
        }
    }
}
