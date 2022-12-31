using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PerceptronXfmsSimulationService.DTO
{
    public class ResultsVisualizeSaveIntoDB
    {
        public string QueryID;
        public string ProteinSequence = null;
        public string PeptideInfo;
        public string PfSasaTabXlsFile;
        public string SasaMainImageFile;

        public string BridgeResultsFile = null;
        public string PfModifiedPdb = null;
        public string CentralityModifiedPdb = null;

    }
}
