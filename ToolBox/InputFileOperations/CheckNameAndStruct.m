function Test = CheckNameAndStruct(QueryFullFolderPath, DoseResponseFile)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROW ERROR



DoseResponseInfoTable = readtable(DoseResponseFile, 'Format', '%s', 'ReadVariableNames',false);
DoseResponseInfo = DoseResponseInfoTable(:,1);



listing = dir(QueryFullFolderPath)


[FileNames] = FetchFileNames(QueryFullFolderPath, RepNum, DoseResponseInfo)


DFullFileNames = [];
[] = FetchFileNames(QueryFullFolderPath, "Replicate1");
[] = FetchFileNames(QueryFullFolderPath, "Replicate2");
[] = FetchFileNames(QueryFullFolderPath, "Replicate3");



%

if ()


end


