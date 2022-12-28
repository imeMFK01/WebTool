using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace PerceptronXfmsAPI.Utility
{
    public class FileToBlob
    {

        public byte[] FileToBlobConverter(string pdbfile)
        {
            
            byte[] SasaFileBlob;
            using (FileStream fileStream = File.OpenRead(pdbfile))
            {
                SasaFileBlob = new byte[fileStream.Length];
                fileStream.Read(SasaFileBlob, 0, (int) fileStream.Length);
            }
            return SasaFileBlob;
        }
    }
}