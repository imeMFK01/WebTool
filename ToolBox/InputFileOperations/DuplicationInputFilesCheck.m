function [] = DuplicationInputFilesCheck(InputFilesInfo, RepNum)
%Check if user provided two different format files of same dose then throw
%error

%[~, OnlyFileName, ~] = fileparts(InputFilesInfo(:,1));
OnlyFileName = InputFilesInfo(:,1);

OnlyFileNameUnique = unique(OnlyFileName);

if size(OnlyFileName,1) ~= size(OnlyFileNameUnique,1)
    % throw(ME)
    % Dear User, your input query cannot be processed because you have
    % provided two different files (.d & .mzXML) against a single dose in Replicate 'X'
    % (RepNum). So, please provide single file against each dose.

end

end