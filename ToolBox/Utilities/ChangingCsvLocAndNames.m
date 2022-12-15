function [] = ChangingCsvLocAndNames(mzXMLFilesInfo, ReplaceStringFrom, ReplaceStringWith)
%%Code for replacing the filenames based on current Comparison Engine
%%conventions i.e. Dose-100-MS1.csv

StartString = "Dose-";
EndString = "-MS1";


CsvFilesInfo = mzXMLFilesInfo;



OldCsvNameVector = strcat(extractBefore(mzXMLFilesInfo(:,3), '.mzXML'), '.csv');





strcat(StartString, extractBetween(CsvFilesInfo(:,3),'Dose', '.mzXML'), EndString, ".csv");


for index = 1: size(mzXMLFilesInfo,1)


SourceCsvName = strcat(mzXMLFilesInfo(index,2), '\' ,OldCsvNameVector(index,1));
DestinationCsvName = strrep(mzXMLFilesInfo(index,2), ReplaceStringFrom, ReplaceStringWith);
mkdir(DestinationCsvName);

movefile(SourceCsvName, DestinationCsvName);
end



end
% 
% source = "D:\PerceptronXfmsIntermediateProcessingFolder\0b284da3-b2ff-481a-9384-fa8fd99961d9\Exp\Replicate1\Dose0.mzXML"
% 
% destination = "D:\PerceptronXfmsIntermediateProcessingFolder\0b284da3-b2ff-481a-9384-fa8fd99961d9\Input\Replicate1"
% mkdir(destination)
% movefile(source, destination)



NewCsvNameVector = extractBefore(mzXMLFilesInfo(:,3), '.mzXML');