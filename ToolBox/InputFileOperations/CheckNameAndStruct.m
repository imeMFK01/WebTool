function Test = CheckNameAndStruct(MainFolderName)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROUGH ERROR

listing = dir(MainFolderName)


DFullFileNames = [];
[] = FetchFileNames(MainFolderName, "Replicate1");
[] = FetchFileNames(MainFolderName, "Replicate2");
[] = FetchFileNames(MainFolderName, "Replicate3");



end


function [] = FetchFileNames(MainFolderName, RepNum)

RepPath = MainFolderName + "\" + RepNum;
if (exist(RepPath) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.
    DFiles = dir(fullfile(RepPath, '*.d'));
    MzxmlFiles = dir(fullfile(RepPath, '*.mzxml'));

    DFullFileNames = [DFullFileNames; string(DFiles.name)]

end

end