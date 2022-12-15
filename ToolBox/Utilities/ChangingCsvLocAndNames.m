function CsvFilesInfo = ChangingCsvLocAndNames(mzXMLFilesInfo, CsvPathBeforeFilter)
%%Code for replacing the filenames based on current Comparison Engine
%%conventions i.e. Dose-100-MS1.csv

StartString = "Dose-";
EndString = "-MS1";


CsvFilesInfo = mzXMLFilesInfo;


NewCsvNameVector = extractBefore(mzXMLFilesInfo(:,3), '.mzXML');
OldCsvNameVector = strcat(extractBefore(mzXMLFilesInfo(:,3), '.mzXML'), '.csv');


movefile(OldCsvNameVector(:,1),'newname.csv');

CsvFilesInfo(:,3) = strcat(NewCsvNameVector, '.csv')


strcat(StartString, extractBetween(CsvFilesInfo(:,3),'Dose', '.mzXML'), EndString, ".csv");







for index = 1: size(CsvFilesInfo,1)

    if(mzXMLFilesInfo(index,3))




end

end

