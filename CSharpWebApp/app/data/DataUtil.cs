using Bridge;

namespace CSharpWebApp.app.data
{
    public static class DataUtil
    {
        public static bool IsJavaScriptNumber(dynamic obj)
        {
            return CheckJavaScriptType(obj, "number");
        }

        public static bool IsJavaScriptObject(dynamic obj)
        {
            return CheckJavaScriptType(obj, "object");
        }

        public static bool IsJavaScriptString(dynamic obj)
        {
            return CheckJavaScriptType(obj, "string");
        }

        static bool CheckJavaScriptType(dynamic obj, string type)
        {
            return Script.Call<string>("typeof", obj) == type;
        }
    }
}
