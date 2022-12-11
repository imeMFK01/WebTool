function [] = CopyMzxmlFileToProcessFolder(InputMzxmlPath, DestinationMzxmlPath)


[status,msg] = copyfile(InputMzxmlPath, DestinationMzxmlPath);

%A status of 1 and an empty message and messageId confirm the copy was successful.
if (status ~= 1)

    % throw(ME)
    %Permission issue while copying the file please change the directory of
    %Processing folder and then proceed
    % #DevUse - print [[  msg  ]] error 

end


end
