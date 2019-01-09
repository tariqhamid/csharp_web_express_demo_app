using CSharpWebApp.app.data;

namespace CSharpWebApp.app.ui.windows.data.clients
{
    public class ClientsDetailPanel : DataDetailPanel
    {

        protected override void BuildFields()
        {
            AddTextField("Name");
            AddTextField("Address");
            AddTextField("City");
            AddTextField("State");
            AddTextField("Zip");
            AddTextField("Phone");
            AddTextField("Cell");
            AddTextField("Email");
            AddTextField("Client UUID");
        }

        public override void Update(AbstractDataRecord record)
        {
            if (!(record is ClientDataRecord clientRecord))
                return;
            SetTextFieldValue("name", clientRecord.Name);
            SetTextFieldValue("address", clientRecord.Address);
            SetTextFieldValue("city", clientRecord.City);
            SetTextFieldValue("state", clientRecord.State);
            SetTextFieldValue("zip", clientRecord.Zip);
            SetTextFieldValue("phone", clientRecord.Phone);
            SetTextFieldValue("cell", clientRecord.Cell);
            SetTextFieldValue("email", clientRecord.Email);
            SetTextFieldValue("client_uuid", clientRecord.UUID);
        }

    }
}
