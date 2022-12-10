function Test = CheckNameAndStruct(QueryFullFolderPath, DoseResponseFile, InsideExp, RepArr)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROW ERROR



DoseResponseInfoTable = readtable(DoseResponseFile, 'Format', '%s', 'ReadVariableNames',false);
DoseResponseInfo = DoseResponseInfoTable(:,1);



listing = dir(QueryFullFolderPath)

for iterRep = 1: size(RepArr,1)

[DFiles, MzxmlFiles] = FetchFileNames(QueryFullFolderPath, InsideExp, RepArr(iterRep), DoseResponseInfo)


end

DFullFileNames = [];

end


function [] = CompareDoseAndFileName()

%Compare Here


end

