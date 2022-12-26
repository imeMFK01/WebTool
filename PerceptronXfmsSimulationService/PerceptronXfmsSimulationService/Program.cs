using System; 
using System.Collections.Generic; 
using System.Text; 

namespace PerceptronXfmsSimulationService
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create the MATLAB instance 
            MLApp.MLApp matlab = new MLApp.MLApp();

            // Change to the directory where the function is located 
            matlab.Execute(@"cd C:\MATLAB");

            // Define the output 
            object result = null;

            // Call the MATLAB function myfunc
            matlab.Feval("myfunc", 2, out result, 5, 1, "world");

            // Display result 
            object[] res = result as object[];

            Console.WriteLine(res[0]);
            Console.WriteLine(res[1]);
            // Get user input to terminate program
            Console.ReadLine();
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

