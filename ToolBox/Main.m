function [] = Main()

% MAIN FUNCTION OF THIS PIPELINE 

% this function will input data into other function/tool after computation
% we will get output results and then this Main.m (function) will call
% further for computations


% We will have two options either cal

%%%% Write a function for local deployment that will create all directories beforehand


try
%% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS      
%% PLACEHOLDERS DATA WILL BE DELETED AFTER API INTEGRATION
GUID = "0b284da3-b2ff-481a-9384-fa8fd99961d9";

%% PLACEHOLDERS 
RepArr = ["Replicate0"];   %%%%["Replicate1"; "Replicate2"; "Replicate3"];  

%% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  %% PLACEHOLDERS  
%% Setting up paths
InputFolderPath = "D:\PerceptronXfmsInputFolder";
mkdir(InputFolderPath);

ResultFolderPath = "D:\PerceptronXfmsResultFolder";
mkdir(ResultFolderPath);

IntermediateProcessingFolderPath = "D:\PerceptronXfmsIntermediateProcessingFolder";
mkdir(IntermediateProcessingFolderPath);


QueryFullFolderPath = InputFolderPath + "\" + GUID;
DoseResponseFile = QueryFullFolderPath + "\DoseResponseInfo.txt";

QueryResultFullPath = ResultFolderPath + "\Result_" + GUID

SetWorkingDirForRCall = pwd + "\Rcall";
FullNameofRFile = pwd + "\Rcall\mzXMLtocsvConverter.R";

InsideExp = "\Exp\";

LocalDeployment = false;
if (LocalDeployment)
    
% #FUTURE: How user will run its own jobs using local deployment

%[InFilePath, InFileName, InExt] = fileparts('D:\GitHub\02_WebTool\WebTool\ToolBox\InputTestFile\CheY-100-MS1-r-001.d');     %% For local deployment - SelectDFolder = uigetdir(path,'Select .d Folder');

    %FOR LOCAL DEPLOYMENT: USER SHOULD SELECT THE INPUT FOLDER FOR PROCESSING
    QueryFullFolderPath = uigetdir(pwd,'PERCEPTRON-XFMS: Please select the input folder');  

    DoseResponseFile = uigetfile(pwd, 'PERCEPTRON-XFMS: Please select dose response info file'); %% SHOULD BE IN TXT FORMAT
    ReplicatesInfoFile = uigetfile(pwd, 'PERCEPTRON-XFMS: Please select replicates info file'); %% SHOULD BE IN TXT FORMAT
    
    RepArr = []; % Work on it... like this >>>>>  ["Rep1", "Rep2", "Rep3"];   format

    %FOR LOCAL DEPLOYMENT: USER SHOULD SELECT THE INTERMEDIATE PROCESSING FOLDER FOR SAVING ALL TYPES OF PROCESSING
    IntermediateProcessingFolderPath = uigetdir(pwd,'PERCEPTRON-XFMS: Please select the intermediate processing folder');

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
addpath("FileFormatConverters\");
addpath("Utilities\");

InputFilesData = ValidateAndFetchInputFilesInfo(QueryFullFolderPath, DoseResponseFile, InsideExp, RepArr);


%% Creating File Directory for Intermediate Processing...
MainProcessingFolder = IntermediateProcessingDir(IntermediateProcessingFolderPath, GUID, RepArr);

%% Converting .d folder into mzXML file, keeping already provided input .mzXML files and 
mzXMLFilesInfo = ConversionIntoMzxml(InputFilesData, MSConvertCMDPath, MainProcessingFolder);


%%%msgbox("R installation path MUST NOT CONTAINS AN EMPTY SPACE.", "R Installation Guidelines", "warn");

%%Here will come R code integration for converting .mzXML file to .csv
CallRCode(SetWorkingDirForRCall, mzXMLFilesInfo,FullNameofRFile);



%%Filtering code for removing unnecessary data



%%Here!!! SPECTRUM-XFMS code 








catch exception


end
        
rmpath(FileOperations);


end




