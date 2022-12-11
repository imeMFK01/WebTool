function [] = ConversionIntoMzxml(InputFilesData, MSConvertCMDPath, MainProcessingFolder)


mzXMLFilesInfo = strings(size(InputFilesData,1),3);

for index = 1: size(InputFilesData,1)

    mzXMLFileOutputDir = MainProcessingFolder + "\" + InputFilesData(index,5);
    
%     NewMzxmlF

    if InputFilesData(index,3) == ".d"

        CallMSConvertCMD(MSConvertCMDPath, InputFilesData(index,:), mzXMLFileOutputDir);

        mzXMLFilesInfo(index,:) = [InputFilesData(index,5), mzXMLFileOutputDir, InputFilesData(index,1)+".mzXML"];


    elseif (InputFilesData(index,3) == ".mzXML")

        %If input file is mzXML then no need of conversion just copy paste
        %it from Input folder to processing folder

        InputMzxmlPath = InputFilesData(index,4) + "\" + InputFilesData(index,2);

        CopyMzxmlFileToProcessFolder(InputMzxmlPath, mzXMLFileOutputDir);


    end




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
