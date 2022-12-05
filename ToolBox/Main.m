

% MAIN FUNCTION OF THIS PIPELINE 

% this function will input data into other function/tool after computation
% we will get output results and then this Main.m (function) will call
% further for computations


% We will have two options either cal







% Using MSConvert .d folder to mzXML


[MassHunterFileName, MassHunterFilePath] = uigetfile({'*.csv'}, 'Select Mass Hunter File');   % Updated 202211221622
MassHunterData = readmatrix(string(MassHunterFilePath) + string(MassHunterFileName));   % 'CheY_100.csv'     % Updated 202211221622


