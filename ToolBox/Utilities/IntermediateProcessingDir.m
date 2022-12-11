function MainProcessingFolder = IntermediateProcessingDir(IntermediateProcessingFolderPath, GUID, RepArr)

% %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME
% GUID = "0b284da3-b2ff-481a-9384-fa8fd99961d9";
% RepArr = ["Rep1"; "Rep2"; "Rep3"];
% IntermediateProcessingFolderPath = "D:\PerceptronXfmsIntermediateProcessingFolder";
% %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME   %% DEL ME


MainProcessingFolder = IntermediateProcessingFolderPath + "\" + GUID;

mkdir(MainProcessingFolder);

for index = 1: size(RepArr,1)
RepPath = MainProcessingFolder + "\" + RepArr(index);
mkdir(RepPath);
end

end

