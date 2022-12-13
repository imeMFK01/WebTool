function [] = UpdateRCodeFile(SetWorkingDirForRCall, MzxmlPath, FullNameofRFile)
% #FUTUREPERSPECTIVES %%HANDLE EXCEPTION IF SAME OR ANYOTHER LINE ALSO CONTAINS  " #setwd "
% ContainsString =  contains(FileContent(:,1), ["setwd", "#setwd"]);

%%
% cd Rcall\
FileContent = readlines(FullNameofRFile);

SetWorkingDirFormattedForRCall = strrep(SetWorkingDirForRCall, '\', '\\');

DynamicSetWorkingDirForRCall = string(['setwd(' '"'  char(SetWorkingDirFormattedForRCall) '"' ')' ]);

MzxmlFormattedPath = strrep(MzxmlPath, '\', '\\');
MzxmlFilesPath = string([ 'MzxmlPath = "'  char(MzxmlFormattedPath) '"']);

for index=1: size(FileContent,1)
    if contains(FileContent(index,1), "setwd")
        FileContent(index,1) = DynamicSetWorkingDirForRCall;
    end

    if contains(FileContent(index,1), "MzxmlPath = ")
        FileContent(index,1) = MzxmlFilesPath;
    end
end

fileID = fopen(FullNameofRFile, 'w');
fprintf(fileID, '%s\n', FileContent);
fclose(fileID);



end