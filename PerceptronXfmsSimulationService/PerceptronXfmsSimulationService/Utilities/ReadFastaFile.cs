using System.IO;

namespace PerceptronXfmsSimulationService.Utilities
{
    public class ReadFastaFile
    {
        public string FastaFileReader(string FastaFile)
        {
            string ProteinSequence = File.ReadAllText(FastaFile);
            return ProteinSequence;
        }

    }
}
