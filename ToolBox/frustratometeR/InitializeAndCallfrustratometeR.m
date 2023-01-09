%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                             PERCEPTRON-XFMS                             %
%                             Version 1.0.0.0                             %
% Copyright (c) Biomedical Informatics & Engineering Research Laboratory, %
%         Lahore University of Management Sciences Lahore (LUMS),         %
%                                Pakistan.                                %
%                    (http://biolabs.lums.edu.pk/BIRL)                    %
%                         (safee.ullah@gmail.com)                         %
%                      Last Modified on: 21-Dec-2022                      %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function InitializeAndCallfrustratometeR(WorkingDirPath, FullNameoffrustratometeRFile, frustratometerFolder, PDBFullFileName, QueryResultFullPath, PdbChain, ResultFolderName)

% Results folder
%Update frustratometeR.R file
UpdatefrustratometerFile(WorkingDirPath, FullNameoffrustratometeRFile, frustratometerFolder, PDBFullFileName, QueryResultFullPath, PdbChain, ResultFolderName);

DriveLetter = extractBefore(FullNameoffrustratometeRFile, ':');
LowerDriveLetter = lower( DriveLetter );

Wsl = "/mnt/" + LowerDriveLetter;
PreparefrustratometeRFilePath = extractAfter(FullNameoffrustratometeRFile, ':');
PreparefrustratometeRFilePath = PreparefrustratometeRFilePath.replace('\','/');
frustratometeRFullFileNameInWsl = Wsl + PreparefrustratometeRFilePath;

[status,cmdout] = system(['wsl.exe -d Ubuntu22V01 ' 'Rscript '  char(frustratometeRFullFileNameInWsl)]);

if status ~= 0
    %Exceptions
    %throw(ME)
    %%%Use here cmdout for error related things
    %cmdout
end
end

% % % CMD2 = 'wsl.exe -d Ubuntu22V01';
% % % CMD3 = 'R';
% % % CMD4 = ['source("' char(frustratometeRFullFileNameInWsl) '")'];