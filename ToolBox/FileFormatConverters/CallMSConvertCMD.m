function [] = CallMSConvertCMD(MSConvertCMDPath, DFolderInfo, mzXMLFileOutputDir)

% %% PLACEHOLDERS FOR TESTING  %% PLACEHOLDERS FOR TESTING  %% PLACEHOLDERS FOR TESTING
% DFolderInfo =  InputFilesData(index,:);
% 
% 
% %% PLACEHOLDERS FOR TESTING  %% PLACEHOLDERS FOR TESTING  %% PLACEHOLDERS FOR TESTING


%SUMMARY: Converting d folder to mzXML file
% Converting .d folder to mzxml file and will returns the mzxml file path

DFolderFullPath = char(DFolderInfo(1,4) + "\" + DFolderInfo(1,2));

%Just for safety purpose otherwise not needed - first deleting mzXML file if
%already exists and then creates a new one.
delete(mzXMLFileOutputDir+ "\" + DFolderInfo(1,1) + ".mzXML");

setenv('MSConvert_PATH', MSConvertCMDPath);
% mustBeTextScalar([pwd '\ProteoWizard\msconvert.exe' ' ' File '-e .mzXML -v --64 -z -o ' ' ' Results])
[status, cmdout] = system([MSConvertCMDPath '\msconvert.exe' ' ' DFolderFullPath ' ' ' --mzXML --v --64 -o ' ' ' char(mzXMLFileOutputDir)]);

%status == 0 means command completed successfully

if (status ~= 0)

    % throw(ME)
    %Dear User, your input .d file of Replicate 'X' [[ DFolderInfo(1,4) ]] dose'Y' [[  DFolderInfo(1,1)  ]]  has been corrupted
    %therefore, we are unable to process your query further. So, please provide the
    %correct (uncorrupted) file.
    % #DevUse - print [[  cmdout  ]] error 
    %     msgbox("File conversion error while converting .d folder to mzxml file.", "File Conversion Error", "error");

end

% % 
% %     _with compressions_
% % msconvert mydfoldername.d --mzXML --v --zlib
% % msconvert mydfoldername.d --mzXML --v --64 --zlib
% % msconvert mydfoldername.d --mzXML --v --64 --mz64 --inten64 --zlib
% % 
% % 
% % _without compression_
% % msconvert mydfoldername.d --mzXML --v



end

