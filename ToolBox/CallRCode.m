

Rinit













Rinit('limma', 'C:\Program Files\R\R-4.2.1\bin\R.exe', 'C:/Users/Farhan/AppData/Local/R/win-library/4.2')
load('TestData.mat')
Rpush('dat',dat,'grp',grp) 
Rrun('fit <- lmFit(dat,grp)') 
fit = Rpull('fit');
Rclear







