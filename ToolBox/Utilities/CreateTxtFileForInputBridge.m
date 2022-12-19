function CreateTxtFileForInputBridge(InputParamForBridge2, PDBFullFileName, BridgeOutputResults)
%This function will create text file will contains input/output full file
%paths for initializing bridge.py

strPDBFullFileName = strrep(PDBFullFileName, '\', '/');
strBridgeOutputResults = strrep(BridgeOutputResults, '\', '/');

if exist(InputParamForBridge2, 'file') == 2
    delete(InputParamForBridge2)
end

fileID = fopen(InputParamForBridge2,'w');
fprintf(fileID,'%s\n%s',[strPDBFullFileName; strBridgeOutputResults]);
fileID = fclose(fileID);
    
if fileID ~= 0
    %Error
    %throw(MException)
end

end