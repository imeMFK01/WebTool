function InputFilesInfo = StructuringFileNames(UnStructFiles)

%This function is used for extracting information from MATLAB struct and
%store into MATLAB matrices


Name = {UnStructFiles.name};
FullFolderPath = {UnStructFiles.folder};

Size = size(Name,2);
InputFilesInfo = strings(Size,4);

for index = 1: Size

[~, OnlyFileName, FileExt] = fileparts(Name(index));
InputFilesInfo(index,:) = [OnlyFileName, Name(index), FileExt, FullFolderPath(index)];

end

end