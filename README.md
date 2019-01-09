# csharp_web_express_demo_app
CSharpWebExpress allows the creation of advanced web applictions using only the CSharp programming language.


## Building
This project was built in Visual Studio 2017 Community Edition. It is dependent on two NuGet packages - Bridge.Net and CSharpWebExpressLib. Building the CSharp project produces JavaScript files which are automatically copied to the server project after a successful build.

Use any Web browser to open the index.html file in the server directory, however the data files will not be loaded.

If you have PHP or Python installed on your local machine, you can run a local server in the same directory as index.html.

php -S localhost:8080

or

python -m SimpleHTTPServer 8080

You will then be able to access the application at http://localhost:8080.

The data will load properly and you can browse the clients, products, and orders in the windows (View menu at top) is desktop mode.


## About this project

This project demonstrates the feasibility of creating a sophisticated Web application user interface using only the CSharp programming language.

## Mobile devices

There will be a separate project posted soon to demonstrate using CSharp with a widget set designed for mobile devices.


## Desktop applications

Windows 10 Build 1809 includes a new widget called HtmlView which is based upon the latest release of the MS Edge 11 browser engine.

This web application can also be run within an HtmlView widget in either WPF or WinForms and it can share data with the host desktop application.

