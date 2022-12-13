%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                           SPECTRUM-XFMS                          %
%                           Version 2.0.0.0                        %
%        Copyright (c) Biomedical Informatics Research Laboraty,   %
%          Lahore University of Management Sciences Lahore (LUMS), %
%                           Pakistan.                              %
%                (http://biolabs.lums.edu.pk/BIRL)                 %
%                    (safee.ullah@gmail.com)                       %
%                 Last Modified on: 12-December-2022               %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function MainFile()
% This function reads the following Input Files:
% 1. Folder containing mzXML Files
% 2. Mascot file
% 3. Fasta file of protein
% 4. pdb file
% 5. SASA file
% It matches the mzXML files with the mascost file on basis of
% m/z and give us a output for each replicate that can be used as an input
% to genertae MasHunter EIC format files 
% 1: it removes all the rwos that doesnot contai n our desired m/z
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Step1 : Load the Mascot , masshunter, SASA , Protein fasta and pdb File
% Get the directory from user and read the Mascot file
InputDir = uigetdir(pwd,'Select the Input folder' );
MascotDir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a Mascot File' );
dir_mascot= char(strcat(InputDir,'\',MascotDir));

%Reading mascot file
[~,~,MascotFile] = xlsread(dir_mascot);
MascotFile = string(MascotFile);

%%%%%% Reading the FASTA file
%select the fasta file
FASTADir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a FASTA File' );
dir_fasta= char(strcat(InputDir,strcat('\',FASTADir)));
% Read fasta file and select output directory
wholeSeq=fastaread(dir_fasta);
% geting the sequence from the fasta file
wholeSeq=wholeSeq.Sequence;
SASADir = uigetfile({'*xls;*.fasta;*.xlsx'},'Select a SASA File' );
dir_SASA= char(strcat(InputDir,strcat('\',SASADir)));
FileSASA=readtable(dir_SASA);
FileSASA = table2cell(FileSASA);
%%%%%%%%%%%%%%%%%%%%% Read PDB File
PDBDir=uigetfile({'*pdb;*.fasta;*.xlsx'},'Select a PDB File' );
dir_PDB= char(strcat(InputDir,strcat('\',PDBDir)));
PDBFile = pdbread(dir_PDB);
%%%%%%%%%%%%%%%%%%%%%%%%%%
OutputDir = uigetdir(pwd,'Select the Output folder' )
Format_mzXML(MascotFile,OutputDir)
GeneratingMassHunterFiles(MascotFile,OutputDir)
MainCalculation(MascotFile,OutputDir,wholeSeq,FileSASA,PDBFile)
