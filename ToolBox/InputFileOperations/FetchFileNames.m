function [] = FetchFileNames(MainFullFolderPath, RepNum)

% This function will check the existance of number of replicates and files
% along with their names

RepPath = MainFullFolderPath + "\" + RepNum;
if (exist(RepPath) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.
    DFiles = dir(fullfile(RepPath, '*.d'));
    MzxmlFiles = dir(fullfile(RepPath, '*.mzxml'));

    DFullFileNames = [DFullFileNames; string(DFiles.name)]

end

end