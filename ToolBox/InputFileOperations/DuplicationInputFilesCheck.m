function [] = DuplicationInputFilesCheck(InputFilesInfo)
%Check if user provided two different format files of same dose then throw
%error

[~, OnlyFileName, ~] = fileparts(InputFilesInfo(:,1));

OnlyFileNameUnique = unique(OnlyFileName);

if size(OnlyFileName,1) ~= size(OnlyFileNameUnique,1)
    % throw(ME)
end

end