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