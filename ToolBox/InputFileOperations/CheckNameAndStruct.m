function Test = CheckNameAndStruct(MainFolderName)


% This function will check the names of the input files/folders and the directory's structure

% This function will check the Number of Replicates, number and type of doses

% Number and type of doses in each replicate should be equal otherwise
% THROUGH ERROR

listing = dir(MainFolderName)


Rep1Path = MainFolderName + "\" + "Replicate1";
if (exist(Rep1Path) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.
    
end

Rep2Path = MainFolderName + "\" + "Replicate2";
if (exist(Rep2Path) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.

end


Rep3Path = MainFolderName + "\" + "Replicate3";
if (exist(Rep3Path) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.

end



end
