using Bridge;
using CSharpWebApp.app.data;
using CSharpWebLib.qx.ui.container;
using CSharpWebLib.qx.ui.core;
using CSharpWebLib.qx.ui.form;
using System.Collections.Generic;

namespace CSharpWebApp.app.ui.windows.data
{
    public class DataDetailPanel : Scroll
    {
        FormPanel FormPanel { get; set; } = new FormPanel();
        List<string> NamesList { get; set; } = new List<string>();
        List<Widget> WidgetsList { get; set; } = new List<Widget>();
        Dictionary<string, Widget> FieldMap { get; set; } = new Dictionary<string, Widget>();

        protected override void Init()
        {
            base.Init();
            Add(FormPanel);
            AddFields();
        }

        protected virtual void BuildFields()
        {
        }

        void AddFields()
        {
            BuildFields();
            FormPanel.AddFields(NamesList, WidgetsList);
        }

       protected void AddTextField(string name, string tag = null)
        {
            NamesList.Add(name);
            Widget widget = new TextField();
            WidgetsList.Add(widget);
            if (tag == null)
                tag = name.ToLower().Replace(' ', '_');
            FieldMap[tag] = widget;
        }

        protected void SetTextFieldValue(string tag, string text)
        {
            Widget widget;
            FieldMap.TryGetValue(tag, out widget);
            if (widget == null || widget as TextField == null)
                return;
            (widget as TextField).Value = text;
        }

        public virtual void Update(AbstractDataRecord record)
        {
            Script.Call("window.console.log", "Data Detail Update", record.ToString());
        }

    }
}
