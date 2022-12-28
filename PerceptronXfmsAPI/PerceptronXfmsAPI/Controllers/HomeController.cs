using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using System;
using PerceptronXfmsAPI.Utility;

namespace PerceptronXfmsAPI.Controllers
{
    public class HomeController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("")]
        public HttpResponseMessage Index()
        {

            new ExcelFileReader().ExcelFileReading(@"D:\PerceptronXfmsResultFolder\Result_8ecbd72f-5188-4a4f-b1b7-4d27f9bd7136\PF_SASA_tab_Updated.xls");

            return new HttpResponseMessage()
            {
                Content = new StringContent(
                    "<strong>PerceptronXfmsAPI is working fine.</strong>",
                    Encoding.UTF8,
                    "text/html"
                )
            };
        }
    }
}