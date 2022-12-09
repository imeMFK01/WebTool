function Test = CheckNameAndStruct(MainFullFolderPath)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROUGH ERROR

listing = dir(MainFullFolderPath)


DFullFileNames = [];
[] = FetchFileNames(MainFullFolderPath, "Replicate1");
[] = FetchFileNames(MainFullFolderPath, "Replicate2");
[] = FetchFileNames(MainFullFolderPath, "Replicate3");



end


