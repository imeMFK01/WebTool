import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '../config.service';
import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-scan-view',
  templateUrl: './scan-view.component.html',
  styleUrls: ['./scan-view.component.css'],
  providers: [ConfigService]
})
export class ScanViewComponent implements OnInit {
  //displayedColumns = ['serial', 'name', 'id', 'score', 'molW', 'truncation', 'frags', 'mods', 'mix', 'fileId'];
  displayedColumns = ['serial', 'name', 'id', 'score', 'molW', 'fileId'];
  users: UserData[] = [];
  dataSource: MatTableDataSource<UserData>;
  querryId: any;
  blob: any;

  isBridgeResultsAvailable : string;
  isFrustratometerResultsAvailable : string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute, private router: Router, private _httpService: ConfigService) {
    const users: UserData[] = [];
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    this._httpService.GetSearchParams(this.querryId).subscribe(data => this.what(data));
    ////this._httpService.GetScanReslts(this.querryId).subscribe(data => this.what(data));   // Its healthy
    //this._httpService.downloadFile(this.querryId).subscribe(data => this.what(data));
  }
  
  getRecord(row) {
    let x = this.router;
    x.navigate(["summaryresults", this.querryId, row.fileId]);
  }
  download(){
    this.route.params.subscribe((params: Params) => this.querryId = params['querryId']);
    this._httpService.GetResultsDownload(this.querryId).subscribe(ResultsData => this.whatResults(ResultsData));
  }
  whatResults(ResultsData: any) {

    //See it later just for #Know
    //var Data = this.sanitizer.bypassSecurityTrustUrl('data:text/plain;base64,' + filedata);

    let FileName = ResultsData.ZipFileName;

    const byteCharacters = atob(ResultsData.FileBlob);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      this.blob = new Blob([byteArray], { type: "application/zip;charset=utf-8" });
      fileSaver.saveAs(this.blob, FileName);
      console.log(FileName + "Successfully Downloaded!!!");
  }

  ViewDetailedPF(){
    let x = this.router;
    x.navigate(["protectionfactor", this.querryId]);   
  }

  ViewDetailedCentrality(){
    if (this.isBridgeResultsAvailable == "True"){
      let x = this.router;
      x.navigate(["centrality", this.querryId]);
    }
    else{

    }
    
  }
  ViewDetailedFrustration(){
    if(this.isFrustratometerResultsAvailable == "True"){
      let x = this.router;
      x.navigate(["frustratometer", this.querryId]);
    }
    else{

    }
  }

  JobTitle: any;
  JobSubmissionTime: any;
  UserType: any;
  UserEmailId: any;
  isBridgeEnabled: string = "Disabled";
  isFrustratometerEnabled: string = "Disabled";
  Progress: any;
  

  what(data: any) {

    this.isBridgeResultsAvailable = data.SearchXfmsQuery.isBridgeEnabled;
    this.isFrustratometerResultsAvailable = data.SearchXfmsQuery.isFrustratometerEnabled;

    this.JobTitle = data.SearchXfmsQuery.Title;
    this.UserEmailId = data.SearchXfmsQuery.EmailID;
    
    this.isFrustratometerEnabled = data.SearchXfmsQuery.isFrustratometerEnabled;
    this.Progress = data.SearchXfmsQuery.Progress;
    this.JobSubmissionTime = data.SearchXfmsQuery.CreationTime;

    if (data.SearchXfmsQuery.isBridgeEnabled == "True") {
      this.isBridgeEnabled = "Enabled";
    }
    if (data.SearchXfmsQuery.isFrustratometerEnabled == "True") {
      this.isFrustratometerEnabled = "Enabled";
    }

    if (data.SearchXfmsQuery.EmailID != "") {
      this.UserType = "Registered User";
    }
    else {
      this.UserType = "Guest User";
      this.UserEmailId = "N/A";
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number, data: any): UserData {
  return {
    serial: id.toString(),
    name: data.FileName,
    id: data.ProteinId,
    score: data.Score,
    molW: data.MolW,
    fileId: data.FileId,
    SearchModeMessage: data.SearchModeMessage

    // truncation: data.Truncation,
    // frags: data.Frags,
    // mods: data.Mods,
    // mix: data.Time,    
  };
}

export interface UserData {
  serial: string;
  name: string;
  id: string;
  score: string;
  molW: string;
  fileId: string;
  SearchModeMessage: string;

  // truncation: string;
  // frags: string;
  // mods: string;
  // mix: string;
}




// let title = <HTMLLabelElement>document.getElementById("SearchTitle");
    // title.innerHTML = data.Paramters.SearchParameters.Title;
    // DenovAllow.innerHTML = data.Paramters.SearchParameters.DenovoAllow;

    // let PstLength = <HTMLLabelElement>document.getElementById("PSTLen");
    // PstLength.innerHTML = data.Paramters.SearchParameters.MinimumPstLength + " " + data.Paramters.SearchParameters.MaximumPstLength;

    // let IPMSWeight = <HTMLLabelElement>document.getElementById("Slider1");
    // let PSTWeight = <HTMLLabelElement>document.getElementById("Slider2");
    // let SpecCompWeight = <HTMLLabelElement>document.getElementById("Slider3");