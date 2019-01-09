// This is the code which creates the sample that you are seeing.
// BpCard is a class representing Bootstrap card element.
// BpCode is a class representing a styled source code element.

using CSharpWebLib.app.bootstrap;
using CSharpWebLib.app.viewport.panels;
using System.Text;

namespace CSharpWebApp.app.viewport.pages.home.featured_code_sample
{
    public class HomePageFeaturedCodeSamplePanel : BpCard
    {
        public HomePageFeaturedCodeSamplePanel(IWidget widget) : base("CSharp Code Sample", widget)
        {
        }

        protected override void AddContent()
        {
            AddContentItem(new BpCode(Widget, BuildCode()));
        }

        string BuildCode()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine(@"// This is the code which creates the sample that you are seeing.");
            sb.AppendLine(@"// BpCard is a class representing Bootstrap card element.");
            sb.AppendLine(@"// BpCode is a class representing a styled source code element.");
            sb.AppendLine();
            sb.AppendLine(@"using CSharpWebExpress.app.bootstrap;");
            sb.AppendLine(@"using CSharpWebExpress.app.viewport.panels;");
            sb.AppendLine(@"using System.Text;");
            sb.AppendLine();
            sb.AppendLine(@"namespace CSharpWebExpress.app.viewport.pages.home.featured_code_sample");
            sb.AppendLine(@"{");
            sb.AppendLine(@"public class HomePageFeaturedCodeSamplePanel : BpCard");
            sb.AppendLine(@"        public HomePageFeaturedCodeSamplePanel(IWidget widget) : base(""CSharp Code Sample"", widget)");
            sb.AppendLine(@"        {");
            sb.AppendLine(@"        }");
            sb.AppendLine();
            sb.AppendLine(@"        protected override void AddContent()");
            sb.AppendLine(@"        {");
            sb.AppendLine(@"            AddContentItem(new BpCode(Widget, BuildCode()));");
            sb.AppendLine(@"        }");
            sb.AppendLine();
            sb.AppendLine(@"        string BuildCode()");
            sb.AppendLine(@"        {");
            sb.AppendLine(@"            StringBuilder sb = new StringBuilder();");
            sb.AppendLine(@"            sb.AppendLine(""// This is the code which creates the sample that you are seeing."");");
            sb.AppendLine(@"            sb.AppendLine(""// BpCard is a class representing Bootstrap styled HTML element."");");
            sb.AppendLine(@"            sb.AppendLine(""// BpCode is a class representing a styled source code element."");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            sb.AppendLine(""using CSharpWebExpress.app.bootstrap;"");");
            sb.AppendLine(@"            sb.AppendLine(""using CSharpWebExpress.app.viewport.panels;"");");
            sb.AppendLine(@"            sb.AppendLine(""using System.Text;"");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            sb.AppendLine(""namespace CSharpWebExpress.app.viewport.pages.home.featured_code_sample"");");
            sb.AppendLine(@"            sb.AppendLine(""{"");");
            sb.AppendLine(@"            sb.AppendLine(""public class HomePageFeaturedCodeSamplePanel : BpCard"");");
            sb.AppendLine(@"            sb.AppendLine(""        public HomePageFeaturedCodeSamplePanel(IWidget widget) : base(""CSharp Code Sample"", widget)"");");
            sb.AppendLine(@"            sb.AppendLine(""        {"");");
            sb.AppendLine(@"            sb.AppendLine(""        }"");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            sb.AppendLine(""        protected override void AddContent()"");");
            sb.AppendLine(@"            sb.AppendLine(""        {"");");
            sb.AppendLine(@"            sb.AppendLine(""            AddContentItem(new BpCode(Widget, BuildCode()));"");");
            sb.AppendLine(@"            sb.AppendLine(""        }"");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            sb.AppendLine(""        string BuildCode()"");");
            sb.AppendLine(@"            sb.AppendLine(""        {"");");
            sb.AppendLine(@"            sb.AppendLine(""            StringBuilder sb = new StringBuilder();"");");
            sb.AppendLine(@"            sb.AppendLine(""            //...... this code .....""");
            sb.AppendLine(@"            sb.AppendLine(""            return sb.ToString();"");");
            sb.AppendLine(@"            sb.AppendLine(""        }"");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            sb.AppendLine(""    }"");");
            sb.AppendLine(@"            sb.AppendLine(""}"");");
            sb.AppendLine(@"            sb.AppendLine();");
            sb.AppendLine(@"            return sb.ToString();");
            sb.AppendLine(@"        }");
            sb.AppendLine();
            sb.AppendLine(@"    }");
            sb.AppendLine(@"}");
            sb.AppendLine();
            return sb.ToString();
        }

    }
}
