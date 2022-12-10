function InputFilesInfo = StructuringFileNames(UnStructFiles)

Name = {UnStructFiles.name};
FullFolderPath = {UnStructFiles.folder};

Size = size(Name,2);
InputFilesInfo = strings(Size,2);

for index = 1: Size

InputFilesInfo(index,:) = [Name(index), FullFolderPath(index)];

end

end