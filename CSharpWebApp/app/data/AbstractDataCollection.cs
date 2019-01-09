using System.Collections.Generic;

namespace CSharpWebApp.app.data
{
    public abstract class AbstractDataCollection : List<AbstractDataRecord>
    {
        public void LoadData(dynamic data)
        {
            if (!IsJavaScriptObject(data) || !IsJavaScriptNumber(data.length))
                return;
            foreach (var itemData in data)
                AddDataItem(itemData);
        }

        public virtual dynamic[] GetSelectedData(string[] ids)
        {
            List<dynamic[]> selectedData = new List<dynamic[]>();
            foreach (var dataRecord in this)
                selectedData.Add(dataRecord.GetSelectedData(ids));
            return selectedData.ToArray();
        }

        protected virtual void AddDataItem(dynamic data)
        {
        }

        public virtual AbstractDataRecord GetRecordAtKey(string key)
        {
            return null;
        }

        public AbstractDataRecord GetRecordAtIndex(int index)
        {
            if (index < 0 || index >= Count)
                return null;
            return this[index];
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
