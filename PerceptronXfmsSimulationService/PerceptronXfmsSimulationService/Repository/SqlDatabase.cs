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
    }
}
