using System; 
using System.Collections.Generic; 
using System.Text;
using System.Threading;
using PerceptronXfmsSimulationService.Repository;

namespace PerceptronXfmsSimulationService
{
    class Program
    {
        static void Main(string[] args)
        {
            bool RunLoop = true;
            while (RunLoop)
            {

                try
                {
                    var SearchQuery = new SqlDatabase().FetchQuery();


                    if (SearchQuery != null)
                    {

                    }
                    else
                    {
                        Thread.Sleep(10000);
                    }
                }
                catch(Exception Error)
                {
                    // Here error will come 
                    // Save Status into the DB
                    // Send email to the user



                }
            }
        }
    }
}







//Fetch "In Queue" Jobs
//Take first job, update the progress, and sent to the MATLAB code for processing + parameters
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

