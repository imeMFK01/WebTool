function mzXMLFullFileName = CallMSConvertCMD(MSConvertCMDPath, DFolderFullPath,MSConvertOutputResultFolder)



%SUMMARY: Converting d folder to mzXML file
% Converting .d folder to mzxml file and will returns the mzxml file path

setenv('MSConvert_PATH', MSConvertCMDPath);
% mustBeTextScalar([pwd '\ProteoWizard\msconvert.exe' ' ' File '-e .mzXML -v --64 -z -o ' ' ' Results])
[status, ~] = system([MSConvertCMDPath '\msconvert.exe' ' ' DFolderFullPath ' ' ' --mzXML --v --64 -o ' ' ' MSConvertOutputResultFolder]);


if (status == 0)

    mzXMLFullFileName = MSConvertOutputResultFolder

else

    msgbox("File conversion error while converting .d folder to mzxml file.", "File Conversion Error", "error");

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

