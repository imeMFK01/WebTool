function [] = Main()

% MAIN FUNCTION OF THIS PIPELINE 

% this function will input data into other function/tool after computation
% we will get output results and then this Main.m (function) will call
% further for computations


% We will have two options either cal

%%%% Write a function for local deployment that will create all directories beforehand

clear all
clc

try
%% PLACEHOLDERS DATA WILL BE DELETED AFTER API INTEGRATION
GUID = "0b284da3-b2ff-481a-9384-fa8fd99961d9";
RepArr = ["Rep1"; "Rep2"; "Rep3"];

%% Setting up paths
InputFolderPath = "D:\PerceptronXfmsInputFolder";
mkdir(InputFolderPath);

ResultFolderPath = "D:\PerceptronXfmsResultFolder";
mkdir(ResultFolderPath);

QueryFullFolderPath = InputFolderPath + "\" + GUID;
DoseResponseFile = QueryFullFolderPath + "\DoseResponseInfo.txt";

QueryResultFullPath = ResultFolderPath + "\Result_" + GUID

InsideExp = "\Exp\";

LocalDeployment = false;
if (LocalDeployment)
    
% #FUTURE: How user will run its job


    %FOR LOCAL DEPLOYMENT: USER SHOULD SELECT THE INPUT FOLDER FOR PROCESSING
    QueryFullFolderPath = uigetdir(pwd,'PERCEPTRON-XFMS: Please select the input folder');

    DoseResponseFile = uigetfile(pwd, 'PERCEPTRON-XFMS: Please select dose response info file'); %% SHOULD BE IN TXT FORMAT
    ReplicatesInfoFile = uigetfile(pwd, 'PERCEPTRON-XFMS: Please select replicates info file'); %% SHOULD BE IN TXT FORMAT
    
    RepArr = []; % Work on it... like this >>>>>  ["Rep1", "Rep2", "Rep3"];   format

    %FOR LOCAL DEPLOYMENT: USER SHOULD SELECT THE RESULT FOLDER FOR PROCESSING
    QueryResultFullPath = uigetdir(pwd,'PERCEPTRON-XFMS: Please select the result folder');

end




%% Sub tools paths
% global MSConvertCMDPath;
% global SpectrumXfmsPath;
% global CallingRCodePath;
% global Bridge2Path;

MSConvertCMDPath = [pwd '\ProteoWizard'];
SpectrumXfmsPath = [pwd '\SPECTRUM-XFMS_v1.0.0.0'];
CallingRCodePath = '';
Bridge2Path = [pwd '\Bridge2'];





%% HERE HARD CODE THE INPUT FOLDER BUT WILL ASK FROM USER AS UIGET




FileOperations = "InputFileOperations\";
addpath(FileOperations);

a = CheckNameAndStruct(QueryFullFolderPath, DoseResponseFile, InsideExp, RepArr);


[InFilePath, InFileName, InExt] = fileparts('D:\GitHub\02_WebTool\WebTool\ToolBox\InputTestFile\CheY-100-MS1-r-001.d');     %% For local deployment - SelectDFolder = uigetdir(path,'Select .d Folder');


%% CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH
if (InExt == '.d')     % CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH

   

    %FARHAN - Here should go the list of .d folders with full path
    DFolderFullPath = [ InFilePath '\' InFileName InExt];
    MSConvertOutputResultFolder = '.\MSConvertOutputResultFolder';
    % Using MSConvert .d folder to mzXML
    mzXMLFullFileName = dFolderToMzxmlConverter(MSConvertCMDPath, DFolderFullPath,MSConvertOutputResultFolder);

    rmpath(FileOperations);

elseif (InExt == '.mzXML')

        mzXMLFullFileName = [ InFilePath '\' InFileName '\' InExt];

else

    msgbox("File format is incompatible. Please either use .d folder or .mzXML file for computations.", "File Format Not Supported", "error");

end

%% 

%%%msgbox("R installation path MUST NOT CONTAINS AN EMPTY SPACE.", "R Installation Guidelines", "warn");

%%

















catch exception


end
        



end




