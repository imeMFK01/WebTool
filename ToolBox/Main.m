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

%% PLACEHOLDERS FOR DEVELOPMENT & TESTING   %% PLACEHOLDERS FOR DEVELOPMENT & TESTING   %% PLACEHOLDERS FOR DEVELOPMENT & TESTING   
RepArr = ["Replicate1"; "Replicate2"; "Replicate3"];  %%% ["Replicate0"];   %%%%

%% PLACEHOLDERS FOR DEVELOPMENT & TESTING   %% PLACEHOLDERS FOR DEVELOPMENT & TESTING   %% PLACEHOLDERS FOR DEVELOPMENT & TESTING   

%% Setting up paths
InputFolderPath = "D:\PerceptronXfmsInputFolder";
mkdir(InputFolderPath);

ResultFolderPath = "D:\PerceptronXfmsResultFolder";
mkdir(ResultFolderPath);

IntermediateProcessingFolderPath = "D:\PerceptronXfmsIntermediateProcessingFolder";
MainProcessingDir = IntermediateProcessingFolderPath + '\' + GUID;
mkdir(MainProcessingDir);

MiscInputFiles = '\MiscInputFiles';
QueryFullFolderPath = InputFolderPath + "\" + GUID;


QueryResultFullPath = ResultFolderPath + "\Result_" + GUID;
mkdir(QueryResultFullPath);
SetWorkingDirForRCall = pwd + "\Rcall";
FullNameofRFile = pwd + "\FileFormatConverters\mzXMLtocsvConverter.R";


DoseResponseFile = QueryFullFolderPath  + MiscInputFiles+ "\DoseResponseInfo.txt";
MascotFullFileName = QueryFullFolderPath + MiscInputFiles + "\Mascot.xlsx";
FastaFullFileName = QueryFullFolderPath  + MiscInputFiles + "\Fasta.fasta";
SASAFullFileName = QueryFullFolderPath  + MiscInputFiles + "\Sasa.xlsx";
PDBFullFileName = QueryFullFolderPath  + MiscInputFiles + "\PDB.pdb";
ComparisonEngineOutDir = IntermediateProcessingFolderPath + "\" + GUID + '\OutDir';
mkdir(ComparisonEngineOutDir);

tempInsideExp = "\Exp"; %For the time being...
InsideExp = "\Exp\";  %For the time being...
ReplaceStringFrom = InsideExp;

ReplaceStringWith = "\CsvFilesBeforeFilter\";
%CsvInputFilesBeforeFilter = IntermediateProcessingFolderPath + "\" + GUID + tempInsideExp;
CsvPathBeforeFilter = IntermediateProcessingFolderPath + "\" + GUID + "\CsvFilesBeforeFilter";

%IntermediateProcessingFolderPath + "\" + GUID;

%Bridge2 ""  \Bridge2\InputParametersForBridge2  ""
WorkingDirPath = pwd;
BridgePyFolder =  [pwd '\' 'Bridge2'];
InputParamForBridge2 =  [ pwd  '\' 'Bridge2\InputParametersForBridge2.txt' ]; %Same for local and online deployment

BridgeOutputResults = QueryResultFullPath + "\" + "ResultsBridge.xlsx";
PythonExePath = [ pwd '\' 'Bridge2\python3env\Scripts\python.exe'];     %%#Convenience
PythonExeFolder = [ pwd '\' 'Bridge2\python3env\Scripts\'];





LocalDeployment = false;
%%
if (LocalDeployment)

    %User's current directory should be the ToolBox, where a Main.m file
    %exists to work tool properly


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

    %% ComparisonEngine Files
    % MASCOT FILE
    % Get the directory from user and read the Mascot file
    InputDir = uigetdir(pwd,'Select the Input folder' );
    MascotDir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a Mascot File' );
    MascotFullFileName= char(strcat(InputDir,'\',MascotDir));

    % FASTA FILE
    %select the fasta file
    FASTADir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a FASTA File' );
    FastaFullFileName = char(strcat(InputDir,strcat('\',FASTADir)));

    % SASA FILE
    SASADir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a SASA File' );
    SASAFullFileName = char(strcat(InputDir,strcat('\',SASADir)));

    % PDB File
    PDBDir=uigetfile({'*pdb;*.fasta;*.xlsx'},'Select a PDB File' );
    PDBFullFileName = char(strcat(InputDir,strcat('\',PDBDir)));

    ComparisonEngineOutDir = uigetdir(pwd,'Select the Output folder' );

    CsvInputFilesBeforeFilter = uigetdir(pwd,'Select the output folder where your filtered CSV files will be placed.' );
    %% ComparisonEngine Files
end




%% Sub tools paths
MSConvertCMDPath = [pwd '\ProteoWizard'];
SpectrumXfmsPath = [pwd '\SPECTRUM-XFMS_v1.0.0.0'];
CallingRCodePath = '';


%% HERE HARD CODE THE INPUT FOLDER BUT WILL ASK FROM USER AS UIGET

addpath("Bridge2\");
addpath("ComparisonEngine\");
addpath("FileFormatConverters\");
addpath("frustratometeR\");
addpath("InputFileOperations\");
addpath("ProteoWizard\");
addpath("Rcall\");
addpath("Utilities\");


InputFilesData = ValidateAndFetchInputFilesInfo(QueryFullFolderPath, DoseResponseFile, InsideExp, RepArr);

%% Creating File Directory for Intermediate Processing...
MainProcessingFolder = IntermediateProcessingDir(MainProcessingDir, InsideExp, RepArr);

%% Converting .d folder into mzXML file, keeping already provided input .mzXML files and 
mzXMLFilesInfo = ConversionIntoMzxml(InputFilesData, MSConvertCMDPath, MainProcessingFolder);


%%%msgbox("R installation path MUST NOT CONTAINS AN EMPTY SPACE.", "R Installation Guidelines", "warn");

%%Here will come R code integration for converting .mzXML file to .csv
CallRCode(SetWorkingDirForRCall, mzXMLFilesInfo,FullNameofRFile);


%%Comparison Engine will initialize from here
[MascotFile, wholeSeq, FileSASA, PDBFile] = ReadingMiscInputFiles(MascotFullFileName, FastaFullFileName, SASAFullFileName, PDBFullFileName);


%%%%  R code ki csv files 

% % % % % % % Copy them and 
% % % % % % % mkdir and paste their 
% % % % % % % That new folder will be Project Data

ChangingCsvLocAndNames(mzXMLFilesInfo, ReplaceStringFrom, ReplaceStringWith);
FilteringCsvData(MascotFile,ComparisonEngineOutDir, CsvPathBeforeFilter);

GeneratingMassHunterFiles(MascotFile,ComparisonEngineOutDir);

MainCalculation(MascotFile,ComparisonEngineOutDir,wholeSeq,FileSASA,PDBFile);

%%% Calling Bridge2
InitializeAndCallBridge(WorkingDirPath, PythonExeFolder, PythonExePath, BridgePyFolder, InputParamForBridge2, PDBFullFileName, BridgeOutputResults);



catch exception


end
        



end



%%Filtering code for removing unnecessary data
