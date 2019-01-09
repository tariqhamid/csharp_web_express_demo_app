namespace CSharpWebApp.app.data
{
    public abstract class AbstractDataRecord
    {
        protected int Id { get; set; } = -1;
        protected dynamic RawData { get; set ; }

        protected void SetData(dynamic data)
        {
            RawData = data;
            BuildFields();
        }

        public virtual dynamic[] GetSelectedData(string[] ids)
        {
            return new dynamic[] { };
        }

        protected virtual void BuildFields() {
            if (IsJavaScriptNumber(RawData.id))
                Id = RawData.id;
        }

        protected bool IsJavaScriptNumber(dynamic obj)
        {
            return DataUtil.IsJavaScriptNumber(obj);
        }

        protected bool IsJavaScriptObject(dynamic obj)
        {
            return DataUtil.IsJavaScriptObject(obj);
        }

        protected bool IsJavaScriptString(dynamic obj)
        {
            return DataUtil.IsJavaScriptString(obj);
        }
    }
}
