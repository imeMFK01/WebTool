using System;
using System.IO;
using System.Collections.Generic; 
using System.Text;
using System.Threading;
using PerceptronXfmsSimulationService.Repository;
using PerceptronXfmsSimulationService.EngineCalling;
using PerceptronXfmsSimulationService.Utilities;
using PerceptronXfmsSimulationService.DTO;

namespace PerceptronXfmsSimulationService
{
    class Program
    {
        public static string RootPath = @"D:\GitHub\02_WebTool\WebTool";
        public static string MatlabMainFileFullPath = RootPath + "\\ToolBox";   // Path will be updated based on dev or prod side folder structs
        public static string MatlabScriptsFullPath = RootPath + "\\PerceptronXfmsSimulationService\\PerceptronXfmsSimulationService\\Utilities";

        public static string ResultFolderPath = @"D:\PerceptronXfmsResultFolder";
        public static string InputFolder = @"D:\PerceptronXfmsInputFolder";

        public static string subInputFolder = "MiscInputFiles";
        public static string subName = "Result_";

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

            //RunMeOnly();

            var instanceSqlDatabase = new SqlDatabase();
            bool RunLoop = true;

            MatlabMainFileFullPath = CheckMatlabToolboxPathInsideDev(MatlabMainFileFullPath, "ToolBox");
            MatlabScriptsFullPath = CheckMatlabToolboxPathInsideDev(MatlabScriptsFullPath, "Utilities");

            Console.WriteLine("WARNING!!!");
            Console.WriteLine("Using the path " + MatlabMainFileFullPath + " for ToolBox");
            Console.WriteLine("Using the path " + MatlabScriptsFullPath + " for Utilities");

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


                    SearchQuery.QueryID = "8ecbd72f-5188-4a4f-b1b7-4d27f9bd7136";                  //////Only for testing

                    if (SearchQuery != null)
                    {
                        string JobStatus = "In Queue";     //"Running";
                        instanceSqlDatabase.UpdateJobStatus(SearchQuery.QueryID, JobStatus);

                        Console.WriteLine("Running Job: " + SearchQuery.QueryID + "-----" + "Progress: " + SearchQuery.Progress);

                        //////Only for testing
                        //////var Call2MatlabDataObj = new Calling2Engine().Call2MATLAB(MatlabMainFileFullPath, SearchQuery);
                        ////////Zipping the Resutls
                        //////var ZippingFileName = new Zipping().ZippingOutputFiles(ResultFolderPath, Call2MatlabDataObj.QueryResultFullPath, SearchQuery.Title, SearchQuery.QueryID);
                        //////// Save ZippingFileName  into the DB
                        //////instanceSqlDatabase.SaveZipFullFilePath(SearchQuery.QueryID, ZippingFileName);






                        // Reading Files & Save Into DB
                        var ResultsSaveDbObj = new ResultsVisualizeSaveIntoDB();

                        //DoseResponseInformation



                        //Reading FASTA File
                        //string FastaFile = InputFolder + "\\" + QueryID + "\\" + subInputFolder + "\\" + "FASTA.fasta";
                        //ResultsSaveDbObj.ProteinSequence = new ReadFastaFile().FastaFileReader(FastaFile);


                        //PeptideInfo.xls
                        string PeptideInfo = "PeptideInfo.xls";
                        ResultsSaveDbObj.PeptideInfo = new Call2ExcelFileReader().Call2ExcelFileReaderMatlab(MatlabScriptsFullPath, ResultFolderPath, subName, SearchQuery.QueryID, PeptideInfo);



                        ///PF_SASA_tab.xls
                        string PfSasaTabXlsFile = "PF_SASA_tab.xls";
                        ResultsSaveDbObj.PfSasaTabXlsFile = new Call2ExcelFileReader().Call2ExcelFileReaderMatlab(MatlabScriptsFullPath, ResultFolderPath, subName, SearchQuery.QueryID, PfSasaTabXlsFile);



                        ///Bridge2 - Centrality Table [ResultsBridge.xlsx]
                        if (SearchQuery.isBridgeEnabled == "True")
                        {
                            string BridgeResultsFile = "ResultsBridge.xlsx";
                            // Read file and save into DB
                            ResultsSaveDbObj.BridgeResultsFile = new Call2ExcelFileReader().Call2ExcelFileReaderMatlab(MatlabScriptsFullPath, ResultFolderPath, subName, SearchQuery.QueryID, BridgeResultsFile);
                        }



                        /// SASAmain.png
                        string SasaMainImageFile = "SASAmain.png";
                        ResultsSaveDbObj.SasaMainImageFile = ResultFolderPath + "\\" + subName + SearchQuery.QueryID + "\\" + SasaMainImageFile;

                        //var SasaFileBlob = new FileToBlob().FileToBlobConverter(ResultFolderPath + "\\" + subName + SearchQuery.QueryID + "\\" + SasaMainImageFile);
                        //ResultsSaveDbObj.SasaMainImageFile = new BlobToBase64().BlobToStringConverter(SasaFileBlob);



                        ///Modified (Protection Factor) PDB [Modifiedchey.pdb]
                        //string PfModifiedPdb = "Modifiedchey.pdb";


                        ///Modified Centrality (Centrality.m) PDB [XYZ]



                        instanceSqlDatabase.ResultsSaveIntoDbForVisualize(SearchQuery.QueryID, ResultsSaveDbObj);



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


        public static string CheckMatlabToolboxPathInsideDev(string Folder, string CheckPathOf)
        {
            string FolderInfo = Folder;
            if (!(Directory.Exists(Folder)) && CheckPathOf == "ToolBox")
            {
                Folder = @"D:\FARHAN\00_LocalGitHub\WebTool\ToolBox";
            }
            else if (!(Directory.Exists(Folder)) && CheckPathOf == "Utilities")
            {
                Folder = @"D:\FARHAN\00_LocalGitHub\WebTool\PerceptronXfmsSimulationService\PerceptronXfmsSimulationService\Utilities";
            }
            return Folder;
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

