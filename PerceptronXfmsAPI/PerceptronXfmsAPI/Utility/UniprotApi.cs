using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
//using System.Security.Cryptography.Xml;
using System.Web;
using System.Xml.Linq;

namespace PerceptronXfmsAPI.Utility
{
    public class UniprotApi
    {

        public void GetAndPrepareUniprotData(string ProteinHeader)
        {

            string DataObject = GetUniprotData(ProteinHeader);

            if (DataObject != null)
            {
                PrepareUniprotInfo(DataObject);
            }

        }



        public void PrepareUniprotInfo(string DataObject)
        {
            //var ParsedDataObject = JsonConvert.DeserializeObject<Object>(DataObject);

            XDocument xdoc = new XDocument();

            xdoc = XDocument.Parse(DataObject);
            //xdoc.
            //string MainHeader = ParsedDataObject.ChildrenTokens[2].Next.Last.Path(); //  secondaryAccessions.uniProtkbId;



            int a = 1;
        }


        public string GetUniprotData(string ProteinHeader)
        {
            string UniProtBaseApiURL = "https://rest.uniprot.org/uniprotkb/" + ProteinHeader + ".xml";
            string UrlParameters = "";
            string DataObject = "";

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(UniProtBaseApiURL);
                // Add an Accept header for JSON format.
                client.DefaultRequestHeaders.Accept.Add(
                   new MediaTypeWithQualityHeaderValue("application/json"));
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

                // Get data response
                var response = client.GetAsync(UrlParameters).Result;
                if (response.IsSuccessStatusCode)
                {
                    // Parse the response body
                    DataObject = response.Content.ReadAsStringAsync().Result;
                }
                else
                {
                    DataObject = null;
                    //Console.WriteLine("{0} ({1})", (int)response.StatusCode, response.ReasonPhrase);
                }
            }
            return DataObject;
        }

    }
}