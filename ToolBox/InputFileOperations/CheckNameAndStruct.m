function Test = CheckNameAndStruct(QueryFullFolderPath, DoseResponseFile, InsideExp, RepArr)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROW ERROR



%% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME

QueryFullFolderPath = "D:\PerceptronXfmsInputFolder\0b284da3-b2ff-481a-9384-fa8fd99961d9";
RepNum = "Replicate1";
InsideExp = "\Exp\";
DoseResponseFile = "D:\PerceptronXfmsInputFolder\0b284da3-b2ff-481a-9384-fa8fd99961d9\DoseResponseInfo.txt";
GUID = "0b284da3-b2ff-481a-9384-fa8fd99961d9";
RepArr = ["Rep1"; "Rep2"; "Rep3"];


S = readlines( DoseResponseFile )

%% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME

% DoseResponseInfoTable = readtable(DoseResponseFile, 'Format', '%s', 'ReadVariableNames',false);
% DoseResponseInfo = DoseResponseInfoTable(:,1);
DoseResponseInfo = ReadDoseResponseFile(DoseResponseFile);




for iterRep = 1: size(RepArr,1)

RepNum = RepArr(iterRep);
InputFilesInfo = FetchFileNames(QueryFullFolderPath, InsideExp, RepNum, DoseResponseInfo);

%Check if user provided two different format files of same dose then throw error
DuplicationInputFilesCheck(InputFilesInfo, RepNum);

%Compare the files (.d & .mzXML) with the given Dose Response File Info
CompareDoseAndFileName(InputFilesInfo, DoseResponseInfo, RepNum);


end

DFullFileNames = [];

end


function [] = CompareDoseAndFileName(InputFilesInfo, DoseResponseInfo, RepNum)

%Compare the files (.d & .mzXML) with the given Dose Response File Info

%% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME
DoseResponseInfo = [DoseResponseInfo; "Dose200"]

%% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME

if size(InputFilesInfo(:,1),1) ~= size(DoseResponseInfo,1)



    %%%%%%ONe have another one is not


strcmp(InputFilesInfo(:,1), DoseResponseInfo)
intersect(InputFilesInfo(:,1), DoseResponseInfo)


setdiff(InputFilesInfo(:,1), DoseResponseInfo)

%%%%%%ONe have another one is not


end



end









