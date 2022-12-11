function [] = ConversionIntoMzxml(InputFilesData, MSConvertCMDPath, MainProcessingFolder)


mzXMLFilesInfo = strings(size(InputFilesData,1),2);

for index = 1: size(InputFilesData,1)

    mzXMLFileOutputDir = MainProcessingFolder + "\" + InputFilesData(index,5);

    if InputFilesData(index,3) == ".d"

        CallMSConvertCMD(MSConvertCMDPath, InputFilesData(index,:), mzXMLFileOutputDir);

        

    end




end



% 
% 
% 
% %% CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH
% if (InExt == '.d')     % CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH
% 
%    
% 
%     %FARHAN - Here should go the list of .d folders with full path
%     DFolderFullPath = [ InFilePath '\' InFileName InExt];
%     MSConvertOutputResultFolder = '.\MSConvertOutputResultFolder';
%     % Using MSConvert .d folder to mzXML
%     mzXMLFullFileName = dFolderToMzxmlConverter(MSConvertCMDPath, DFolderFullPath,MSConvertOutputResultFolder);
% 
%     
% 
% elseif (InExt == '.mzXML')
% 
%         mzXMLFullFileName = [ InFilePath '\' InFileName '\' InExt];
% 
% else
% 
%     msgbox("File format is incompatible. Please either use .d folder or .mzXML file for computations.", "File Format Not Supported", "error");
% 
% end
% 


end