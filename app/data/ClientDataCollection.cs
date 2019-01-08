using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class ClientDataCollection : AbstractDataCollection
    {
        Dictionary<string, ClientDataRecord> ClientMap { get; set; } = new Dictionary<string, ClientDataRecord>();

        protected override void AddDataItem(dynamic itemData)
        {
            if (!IsJavaScriptObject(itemData))
                return;
            ClientDataRecord clientRecord = new ClientDataRecord(itemData);
            ClientMap[clientRecord.UUID] = clientRecord;
            Add(clientRecord);
        }

        public override AbstractDataRecord GetRecordAtKey(string key)
        {
            return ClientRecordForUUID(key);
        }

        public ClientDataRecord ClientRecordForUUID(string uuid)
        {
            if (ClientMap.ContainsKey(uuid))
                return ClientMap[uuid];
            return null;
        }

        public string ClientNameForUUID(string uuid)
        {
            ClientDataRecord record = ClientRecordForUUID(uuid);
            if (record == null)
                return "---";
            return record.Name;
        }
    }
}
