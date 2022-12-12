for index = 1: size(InputFilesData,1)

    mzXMLFileOutputDir = MainProcessingFolder + "\" + InputFilesData(index,5);

    if InputFilesData(index,3) == ".d"

        mzXMLFullFileName = CallMSConvertCMD(MSConvertCMDPath, InputFilesData(index,:), mzXMLFileOutputDir)

    end




end




















Folder = cd;
Folder = fullfile(Folder, '..');
save(fullfile(Folder, 'FileName.mat'))



 mydir  = pwd;
 idcs   = strfind(mydir,'/');
 newdir = mydir(1:idcs(end)-1);

%%

fileID=fopen(MainFullFolderPath + "\DoseResponseInfo.txt",'r');
formatSpec='%c';
A=fscanf(fileID,formatSpec)


data=readmatrix(MainFullFolderPath + "\DoseResponseInfo.txt");



%%
 % ReadSize = [Inf 1]
% DoseResponseInfoFile = fopen(MainFullFolderPath + "\DoseResponseInfo.txt",'r');
% DoseResponseInfo = fscanf(DoseResponseInfoFile,'%s\n', ReadSize);
% fclose(DoseResponseInfoFile);