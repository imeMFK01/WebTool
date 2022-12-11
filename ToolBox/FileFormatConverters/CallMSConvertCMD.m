function mzXMLFullFileName = CallMSConvertCMD(MSConvertCMDPath, DFolderInfo, mzXMLFileOutputDir)



%SUMMARY: Converting d folder to mzXML file
% Converting .d folder to mzxml file and will returns the mzxml file path

setenv('MSConvert_PATH', MSConvertCMDPath);
% mustBeTextScalar([pwd '\ProteoWizard\msconvert.exe' ' ' File '-e .mzXML -v --64 -z -o ' ' ' Results])
[status, ~] = system([MSConvertCMDPath '\msconvert.exe' ' ' DFolderInfo(1,4) ' ' ' --mzXML --v --64 -o ' ' ' mzXMLFileOutputDir]);


if (status ~= 0)

    % throw(ME)
    %Dear User, your input .d file of Replicate 'X' [[ DFolderInfo(1,4) ]] dose'Y' [[  DFolderInfo(1,1)  ]]  has been corrupted
    %therefore, we are unable to process your query further. So, please provide the
    %correct (uncorrupted) file.
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

