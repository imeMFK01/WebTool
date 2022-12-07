%%%Excel File Formatted Results

clear all
clc

ResultSheet1 = "ResultSheet1.xlsx";

a = [1 2 3; 4 5 6];



writematrix(a,ResultSheet1,'Sheet',1,'Range','A2')



b = [4,5;6,7];


writematrix(a,ResultSheet1,'Sheet',1,'Range','D2')


writematrix(a,'a.xls','W')
