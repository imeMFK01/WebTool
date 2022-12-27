using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PerceptronXfmsSimulationService.DTO;

namespace PerceptronXfmsSimulationService.EngineCalling
{
    public class Calling2Engine
    {

        public bool Call2MATLAB(string MatlabMainFileFullPath, SearchXfmsQueryDto SearchQuery)
        {
            //string JsonSearchQuery = JsonConvert.SerializeObject(new { Json = SearchQuery });

            // Create the MATLAB instance 
            MLApp.MLApp matlab = new MLApp.MLApp();

            // Change to the directory where the function is located 
            matlab.Execute(@"cd " + MatlabMainFileFullPath);

            // Define the output 
            object MatlabPipelineResults = null;

            // Call the MATLAB function myfunc
            matlab.Feval("Main", 2, out MatlabPipelineResults, SearchQuery.QueryID, SearchQuery.isBridgeEnabled, SearchQuery.isFrustratometerEnabled);

            // Display result 
            object[] MatlabPipelineResultsObj = MatlabPipelineResults as object[];

            string Error = MatlabPipelineResultsObj[0].ToString();
            string ErrorLog = MatlabPipelineResultsObj[1].ToString();


            if (Error == "True")
            {
                throw (new Exception(ErrorLog));
            }

            bool isCall2MATLABSuccess = true;
            return isCall2MATLABSuccess;
        }
    }
}


//Console.WriteLine(res[0]);
//Console.WriteLine(res[1]);
//// Get user input to terminate program
//Console.ReadLine();