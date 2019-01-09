using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public class ClientDataRecord : AbstractDataRecord
    {
        public ClientDataRecord(dynamic data)
        {
            SetData(data);
        }

        public override dynamic[] GetSelectedData(string[] ids)
        {
            List<dynamic> data = new List<dynamic>();
            foreach(string id in ids)
            {
                switch(id)
                {
                    case "city":
                        data.Add(City);
                        break;
                    case "name":
                        data.Add(Name);
                        break;
                    case "uuid":
                        data.Add(UUID);
                        break;
                    default:
                        data.Add("---");
                        break;
                }
            }
            return data.ToArray();
        }

        protected override void BuildFields()
        {
            base.BuildFields();
            if (IsJavaScriptString(RawData.address))
                Address = RawData.address;
            if (IsJavaScriptString(RawData.cell))
                Cell = RawData.cell;
            if (IsJavaScriptString(RawData.city))
                City = RawData.city;
            if (IsJavaScriptString(RawData.email))
                Email = RawData.email;
            if (IsJavaScriptString(RawData.name))
                Name = RawData.name;
            if (IsJavaScriptString(RawData.phone))
                Phone = RawData.phone;
            if (IsJavaScriptString(RawData.state))
                State = RawData.state;
            if (IsJavaScriptString(RawData.client_uuid))
                UUID = RawData.client_uuid;
            if (IsJavaScriptString(RawData.zip))
                Zip = RawData.zip;
        }

        public string Address { get; private set; } = "";
        public string Cell { get; private set; } = "";
        public string City { get; private set; } = "";
        public string Email { get; private set; } = "";
        public string Name { get; private set; } = "";
        public string Phone { get; private set; } = "";
        public string State { get; private set; } = "";
        public string UUID { get; private set; } = "";
        public string Zip { get; private set; } = "";

    }
}
