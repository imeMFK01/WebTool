using System;
using System.IO;
using System.Collections.Generic; 
using System.Text;
using System.Threading;
using PerceptronXfmsSimulationService.Repository;
using PerceptronXfmsSimulationService.EngineCalling;
using PerceptronXfmsSimulationService.Utilities;

namespace PerceptronXfmsSimulationService
{
    class Program
    {
        public static string MatlabMainFileFullPath = @"D:\GitHub\02_WebTool\WebTool\ToolBox";   // Path will be updated based on dev or prod side folder structs
        public static string ResultFolderPath = @"D:\PerceptronXfmsResultFolder";

        public static void RunMeOnly()
        {
            byte[] blob;
            // Read Zip file 
            using (FileStream fileStream = File.OpenRead(@"D:\PerceptronXfmsResultFolder\Result_8ecbd72f-5188-4a4f-b1b7-4d27f9bd7136\Modifiedchey.pdb"))
            {
                blob = new byte[fileStream.Length];
                fileStream.Read(blob, 0, (int)fileStream.Length);
            }
        }


        static void Main(string[] args)
        {

            RunMeOnly();

            var instanceSqlDatabase = new SqlDatabase();
            bool RunLoop = true;


            MatlabMainFileFullPath = CheckMatlabToolboxPathInsideDev(MatlabMainFileFullPath);

            Console.WriteLine("**********************************************");
            Console.WriteLine("*****PERCEPTRON-XFMS INITIALIZING CONSOLE*****");
            Console.WriteLine("**********************************************");
            while (RunLoop)
            {
                string QueryID = null;
                try
                {
                    var SearchQuery = instanceSqlDatabase.FetchQuery();
                    QueryID = SearchQuery.QueryID;

                    if (SearchQuery != null)
                    {
                        string JobStatus = "In Queue";     //"Running";
                        instanceSqlDatabase.UpdateJobStatus(SearchQuery.QueryID, JobStatus);

                        Console.WriteLine("Running Job: " + SearchQuery.QueryID + "-----" + "Progress: " + SearchQuery.Progress);

                        var Call2MatlabDataObj = new Calling2Engine().Call2MATLAB(MatlabMainFileFullPath, SearchQuery);

                        

                        //Zipping the Resutls
                        var ZippingFileName = new Zipping().ZippingOutputFiles(ResultFolderPath, Call2MatlabDataObj.QueryResultFullPath, SearchQuery.Title, SearchQuery.QueryID);
                        // Save ZippingFileName  into the DB
                        instanceSqlDatabase.SaveZipFullFilePath(SearchQuery.QueryID, ZippingFileName);


                        //instanceSqlDatabase.UpdateJobStatus(SearchQuery.QueryID, "Completed");
                        Console.WriteLine("Running Job: " + SearchQuery.QueryID + "-----" + "Progress: " + "Completed");
                        int waithere = 1;

                    }
                    else
                    {
                        Thread.Sleep(10000);
                    }
                }
                catch(Exception Error)
                {
                    if (QueryID != null)
                    {
                        // Here error will come 

                        // Save Status into the DB
                        /////instanceSqlDatabase.UpdateJobStatus(QueryID, "Error In Query");

                        Console.WriteLine("Running Job: " + QueryID + "-----" + "Progress: " + "Error In Query");

                        // Send email to the user
                    }
                }
                Console.ReadLine();
            }
        }


        public static string CheckMatlabToolboxPathInsideDev(string MatlabMainFileFullPath)
        {
            if (!(Directory.Exists(MatlabMainFileFullPath)))
            {
                MatlabMainFileFullPath = @"D:\FARHAN\00_LocalGitHub\WebTool\ToolBox";
            }
            return MatlabMainFileFullPath;
        }

    }
}








//Outputs from MATLAB code  ->
//  -> (i) Sucessfully Run 
//  -> (ii) Error in Simulation
// Update the status into the database
// (if) success then create a zipped folder as well and SAVE INTO THE RESULTSLOG TABLE
//
//Send email to the user (if email provided)
//
//
// If DB is not attached then service should not crash but go to the sleep..!!

