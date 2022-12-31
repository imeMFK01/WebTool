using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PerceptronXfmsSimulationService.Models;
using PerceptronXfmsSimulationService.DTO;

namespace PerceptronXfmsSimulationService.Repository
{
    public class SqlDatabase
    {

        public SearchXfmsQueryDto FetchQuery()
        {
            //Fetch "In Queue" Jobs
            //Take first job based on the submission priority, and sent to the MATLAB code for processing + parameters

            var temp = new SearchXfmsQueryDto();
            using (var db = new PerceptronXfmsDatabaseEntities())
            {
                var dbObject = db.SearchXfmsQueries.Where(x => x.Progress == "In Queue").Select(x => x).OrderBy(x => x.CreationTime).FirstOrDefault();

                temp = new SearchXfmsQueryDto()
                {
                    QueryID = dbObject.QueryID,
                    UserID = dbObject.UserID,
                    Progress = dbObject.Progress,
                    CreationTime = dbObject.CreationTime,
                    isBridgeEnabled = dbObject.isBridgeEnabled,
                    isFrustratometerEnabled = dbObject.isFrustratometerEnabled,
                    EmailID = dbObject.EmailID,
                    ID = dbObject.ID,
                    Title = dbObject.Title
                };
            }
            return temp;
        }

        public void UpdateJobStatus(string QueryID, string Status)
        {
            //Updating the progress status of 
            using (var db = new PerceptronXfmsDatabaseEntities())
            {
                var dbObject = db.SearchXfmsQueries.Where(x => x.QueryID == QueryID).Select(x => x).FirstOrDefault();
                dbObject.Progress = Status;
                db.SaveChanges();
            }
        }

        public void SaveZipFullFilePath(string QueryID, string ZippingFileName)
        {
            DateTime JobSubmissionTime = DateTime.Now.AddDays(0);  // Fetching Current Time  //Results will available for 48hrs only                 -2 after publication    #AfterPublication

            using (var db = new PerceptronXfmsDatabaseEntities())
            {
                var temp = new SearchResultsFile()
                {
                    QueryID = QueryID,
                    ZipResultFile = ZippingFileName,
                    CreationTime = JobSubmissionTime,
                };
                db.SearchResultsFiles.Add(temp);
                db.SaveChanges();
            }

        }

        public void ResultsSaveIntoDbForVisualize(string QueryID, ResultsVisualizeSaveIntoDB ResultsSaveDbObj)
        {
            using (var db = new PerceptronXfmsDatabaseEntities())
            {
                var temp = new ResultsVisualize()
                {
                    QueryID = QueryID,
                    ProteinSequence = ResultsSaveDbObj.ProteinSequence,
                    PeptideInfo = ResultsSaveDbObj.PeptideInfo,
                    PfSasaTabXlsFile = ResultsSaveDbObj.PfSasaTabXlsFile,
                    BridgeResultsFile = ResultsSaveDbObj.BridgeResultsFile,
                    SasaMainImageFile = ResultsSaveDbObj.SasaMainImageFile,
                    PfModifiedPdb = ResultsSaveDbObj.PfModifiedPdb,
                    CentralityModifiedPdb = ResultsSaveDbObj.CentralityModifiedPdb
                };
                db.ResultsVisualizes.Add(temp);
                db.SaveChanges();
            }

        }
    }
}
