function [FileNames] = FetchFileNames(QueryFullFolderPath, RepNum, DoseResponseInfo)

% This function will check the existance of number of replicates and files
% along with their names



%% DEL ME

QueryFullFolderPath = "D:\PerceptronXfmsInputFolder\0b284da3-b2ff-481a-9384-fa8fd99961d9";
RepNum = "Replicate1";
InsideExp = "\Exp\";

%% DEL ME


RepPath = QueryFullFolderPath + InsideExp + RepNum;
if (exist(RepPath) == 7)  %%  || (exist(Rep1Path) == 0)  %%% Checks only for folders.
    DFiles = dir(fullfile(RepPath, '*.d'));
    MzxmlFiles = dir(fullfile(RepPath, '*.mzxml'));


end

end



function [] = CompareDoseAndFileName()




end