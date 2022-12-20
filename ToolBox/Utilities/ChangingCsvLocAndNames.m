%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                             PERCEPTRON-XFMS                             %
%                             Version 1.0.0.0                             %
% Copyright (c) Biomedical Informatics & Engineering Research Laboratory, %
%         Lahore University of Management Sciences Lahore (LUMS),         %
%                                Pakistan.                                %
%                    (http://biolabs.lums.edu.pk/BIRL)                    %
%                         (safee.ullah@gmail.com)                         %
%                      Last Modified on: 21-Dec-2022                      %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function [] = ChangingCsvLocAndNames(mzXMLFilesInfo, ReplaceStringFrom, ReplaceStringWith)
%%Code for replacing the filenames based on current Comparison Engine
%%conventions i.e. Dose-100-MS1.csv

StartString = "Dose-";
EndString = "-MS1";

NoOfRows = size(mzXMLFilesInfo,1);
NoOfCols =  size(mzXMLFilesInfo,2);

CsvFilesInfo = strings(NoOfRows, NoOfCols);
CsvFilesInfo(:,1) = mzXMLFilesInfo(:,1);

OldCsvNameVector = strcat(extractBefore(mzXMLFilesInfo(:,3), '.mzXML'), '.csv');
NewCsvNameVector = strcat(StartString, extractBetween(OldCsvNameVector(:,1), "Dose", ".csv"), EndString, ".csv");

for index = 1: NoOfRows

    OldCsvFileName = strcat(mzXMLFilesInfo(index,2), '\' ,OldCsvNameVector(index,1));
    NewCsvFileName = strcat(mzXMLFilesInfo(index,2), '\' ,NewCsvNameVector(index,1));
    movefile(OldCsvFileName, NewCsvFileName);
    DestinationCsvName = strrep(mzXMLFilesInfo(index,2), ReplaceStringFrom, ReplaceStringWith);
    mkdir(DestinationCsvName);
    movefile(NewCsvFileName, DestinationCsvName);

end

end
