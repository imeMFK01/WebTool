function [outputArg1,outputArg2] = CallRCode(SetWorkingDirForRCall, mzXMLFilesInfo,FullNameofRFile)

%This code is using third party library named as % Rcall: An R interface for MATLAB. % Copyright (C) 2022, Janine Egert and Clemens Kreutz

%Before using this library install R in your system and add into the
%Environmental variable path 

%% PLACEHOLDER FOR TESTING   %% PLACEHOLDER FOR TESTING
%mzXMLFilesInfo(1,2) = "D:\GitHub\02_WebTool\WebTool\ToolBox\Rcall\";
% SetWorkingDirForRCall = pwd + "\Rcall";
% FullNameofRFile = pwd + "\Rcall\mzXMLtocsvConverter.R";
%% PLACEHOLDER FOR TESTING   %% PLACEHOLDER FOR TESTING

cd Rcall\;
for index = 1: size(mzXMLFilesInfo,1)
    MzxmlPath = mzXMLFilesInfo(index,2);
    UpdateRCodeFile(SetWorkingDirForRCall, MzxmlPath, FullNameofRFile);
    Rclear;
    Rinit;
    Rrunfile(char(FullNameofRFile));
    Rexec;
end
cd ..;

stophere = 1;
end
