function TransferFoldersAndFile()



InputFolderPath
ResultFolderPath

MainProcessingDir

QueryResultFullPath



FoldersToCheck = ["Result"; "Results_matched"; "Results_matched_intermediate"; "Resultsnew1"];

WorkingDirFullPathInString = string(WorkingDirPath);
ComparisonEngineFullPath = WorkingDirPath + "\" + ComparisonEngineFolder;

for index = 1: size(FoldersToCheck, 1)
    if (exist(WorkingDirFullPathInString  + "\" + FoldersToCheck(index, 1), "dir") == 7)
        [status, msgbox] = rmdir(WorkingDirPathInString  + "\" + FoldersToCheck(index, 1), 's');
    end
    
end



if exist(WorkingDirFullPathInString  + "\" + "PeptideInfo.xls","file") == 2
    delete(WorkingDirFullPathInString  + "\" + "PeptideInfo.xls");
end





end

