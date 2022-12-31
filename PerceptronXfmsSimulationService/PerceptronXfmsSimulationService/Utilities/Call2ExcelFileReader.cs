using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PerceptronXfmsSimulationService.Utilities
{
    public class Call2ExcelFileReader
    {

        public string Call2ExcelFileReaderMatlab(string MatlabScriptsFullPath, string ResultFolderPath, string subName, string QueryID, string ExcelFileNameForReading)
        {
            //string JsonSearchQuery = JsonConvert.SerializeObject(new { Json = SearchQuery });

            string ExcelFullFileName = ResultFolderPath + "\\" + subName + QueryID + "\\"  + ExcelFileNameForReading;
            // Create the MATLAB instance 
            MLApp.MLApp matlab = new MLApp.MLApp();


            
            // Change to the directory where the function is located 
            matlab.Execute("cd " + MatlabScriptsFullPath);
            

            // Define the output 
            object MatlabPipelineResults = null;

            // Call the MATLAB function myfunc
            matlab.Feval("ExcelFileReaderMatab", 1, out MatlabPipelineResults, ExcelFullFileName);



            // Display result 
            object[] MatlabPipelineResultsObj = MatlabPipelineResults as object[];

            return MatlabPipelineResultsObj[0].ToString();

        }
    }
}
