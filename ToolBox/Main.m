function [] = Main()

% MAIN FUNCTION OF THIS PIPELINE 

% this function will input data into other function/tool after computation
% we will get output results and then this Main.m (function) will call
% further for computations


% We will have two options either cal

%%%% Write a function for local deployment that will create all directories beforehand

[InFilePath, InFileName, InExt] = fileparts('D:\GitHub\02_WebTool\WebTool\ToolBox\InputTestFile\CheY-100-MS1-r-001.d');     %% For local deployment - SelectDFolder = uigetdir(path,'Select .d Folder');

%% CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH
if (InExt == '.d')     % CONVERTING .D FOLDER TO MZXML FILE AND WILL RETURNS THE FILE PATH

    DFolderFullPath = [ InFilePath '\' InFileName '\' InExt];
    MSConvertOutputResultFolder = '.\MSConvertOutputResultFolder';
    % Using MSConvert .d folder to mzXML
    mzXMLFullFileName = dFolderToMzxmlConverter(DFolderFullPath,MSConvertOutputResultFolder);

elseif (InExt == '.mzXML')

        mzXMLFullFileName = [ InFilePath '\' InFileName '\' InExt];

else

    msgbox("File format is incompatible. Please either use .d folder or .mzXML file for computations.", "File Format Not Supported", "error");

end

%% 




















        



end




