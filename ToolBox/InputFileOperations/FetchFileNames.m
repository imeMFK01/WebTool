function [DFiles, MzxmlFiles] = FetchFileNames(QueryFullFolderPath, InsideExp, RepNum, DoseResponseInfo)


% This function will fetch the name of the .d &/or mzXML files from the directory 
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

    InputFilesInfo = [];
    if ~isempty({DFiles.name})
        InputFilesInfo = [InputFilesInfo; StructuringFileNames(DFiles)];
    end

    if ~isempty({MzxmlFiles.name})
        InputFilesInfo = [InputFilesInfo; StructuringFileNames(MzxmlFiles)];
    end

    if size(InputFilesInfo,1) == 0

 ME = MException(['FileNotFound:' char(RepNum) ' do not contain any file'], 'Input file not found', 'Invalid input replicate folder');

throw(ME)
    end


end

end

function InputFilesInfo = StructuringFileNames(UnStructFiles)

Name = {UnStructFiles.name};
FullFolderPath = {UnStructFiles.folder};

Size = size(Name,2);
InputFilesInfo = strings(Size,2);

for index = 1: Size

InputFilesInfo(index,:) = [Name(index), FullFolderPath(index)];

end

end

