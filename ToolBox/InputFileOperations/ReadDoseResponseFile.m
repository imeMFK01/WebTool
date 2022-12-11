function DoseResponseInfo = ReadDoseResponseFile(DoseResponseFile)
%Reading input dose response file (txt)


% DoseResponseInfoTable = readtable(DoseResponseFile, 'Format', '%s', 'ReadVariableNames',false);
% DoseResponseInfo = DoseResponseInfoTable(:,1);

DoseResponseInfo = readlines(DoseResponseFile);

%Remove last row if it is empty string
if DoseResponseInfo(end,1) == ""
DoseResponseInfo = DoseResponseInfo(1:end-1,1);
end

end