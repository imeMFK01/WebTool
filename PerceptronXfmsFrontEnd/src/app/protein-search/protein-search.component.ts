import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule, MatSidenavModule, MatCardModule, MatButtonModule, MatIconModule, MatCheckbox } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Http } from '@angular/http';
import { ConfigService } from '../config.service';
import { Headers } from '@angular/http';
import { FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DemoComponent } from '../demo/demo.component';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { from } from 'rxjs/observable/from';


import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http'
import { map } from "rxjs/operators";

@Component({
  selector: 'app-protein-search',
  templateUrl: './protein-search.component.html',
  styleUrls: ['./protein-search.component.css'],
  providers: [ConfigService]
})

export class ProteinSearchComponent implements OnInit {

  IsProgressbarOn = 0;

  @ViewChild("imgFileInput") imgFileInput;
  @ViewChild('imgAdditionalFileInput') imgAdditionalFileInput;
  @ViewChild("imgRep1FileInput") imgRep1FileInput;
  @ViewChild("imgRep2FileInput") imgRep2FileInput;
  @ViewChild('imgRep3FileInput') imgRep3FileInput;

  fileAdditionalModel: boolean;
  fileRep1Model: boolean;
  fileRep2Model: boolean;
  fileRep3Model: boolean;

  Size: any;

  AllFileEntireContents = [];

  isBridgeEnabled: boolean = false;
  isFrustratometerEnabled: boolean = false;

  barWidth: string = "0%";
  progress: string = '';

  diableEmail: boolean;
  name: any;

  filenameModel: boolean;

  EmailId: string = '';
  Title: any = '';

  isLoadDefaultsEnabled: boolean = false;

  FileAdditionalInputPlaced : string = '';
  FileRep1Placed : string = '';
  FileRep2Placed : string = '';
  FileRep3Placed : string = '';



  constructor(public af: AngularFireAuth, private router: Router, private _httpService: ConfigService, private _http: Http, public dialog: MatDialog, private _HttpClient: HttpClient) {
    this.af.authState.subscribe(user => { })
  }

  keyPress(event: any) {
    const pattern = /[0-9\.\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      confirm("Only integers are allowed");
      event.preventDefault();
    }
  }

  keyPress1(event: any) {
    const pattern = /[_\0-9\+\-\.\ \a-z\@\A-Z]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      confirm("Press submit button to confirm your submission");
      event.preventDefault();
    }
  }

  
  LoadDefaults() { // Here is Load Default Parameters
    
    this.isLoadDefaultsEnabled = true;

    this.Title = "Default Run";
    this.EmailId = '';

    this.fileAdditionalModel = false;
    this.fileRep1Model = false;
    this.fileRep2Model = false;
    this.fileRep3Model = false;


    this.isBridgeEnabled = true;
    this.isFrustratometerEnabled = true;

    this.barWidth = "0%";

    this.FileAdditionalInputPlaced = 'AdditionalInputFiles.zip';
    this.FileRep1Placed = 'Replicate1.zip';
    this.FileRep2Placed = 'Replicate2.zip';
    this.FileRep3Placed =  'Replicate3.zip';

  }


  ngOnInit() {
    var user = firebase.auth().currentUser;
    if (user.emailVerified == false) {
      this.diableEmail = false;
    }
    else {
      this.diableEmail = true;
    }
  }

  ngAfterViewInit() { //Added //Updated 20201215 
    // Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  onSubmit(form: any): void {
    this.IsProgressbarOn = 1;
    var user = firebase.auth().currentUser;

    if (user.emailVerified == true) {
      form.EmailId = user.email;
      form.UserId = user.email;
    }
    else {
      // form.UserId = user.uid;
      if (form.UserId != "" && form.UserId != user.uid) {
        form.EmailId = form.UserId;
        form.UserId = user.uid;
      }
      else {
        form.EmailId = "";
        form.UserId = user.uid;
      }
    }
    if (this.isBridgeEnabled){
      form.isBridgeEnabled = 'True';
    }
    else{
      form.isBridgeEnabled = 'False';
    }

    if (this.isFrustratometerEnabled){
      form.isFrustratometerEnabled = 'True';
    }
    else{
      form.isFrustratometerEnabled = 'False';
    }


    let status;
    //FilesAdditional.files[0].name =
    if (this.isLoadDefaultsEnabled){
      status = this.postJSON(form, []);
    }
    else{
      status = this.postJSON(form, this.AllFileEntireContents);
    }
    //console.log(status);

  }

  postJSON(form, file) {

    let baseApiUrl = "https://localhost:44300";
    //"http://localhost:52340";
    //  https://perceptronxfms.lums.edu.pk/PerceptronXFMSAPI
    let formData: FormData = new FormData();

    // let formattingform: FormData = new FormData();
    // formattingform.append('Title', form.Title);
    // formattingform.append('EmailId', form.EmailId);
    // formattingform.append('UserId', form.UserId);
    // formattingform.append('isBridgeEnabled', form.isBridgeEnabled);
    // formattingform.append('isFrustratometerEnabled', form.isFrustratometerEnabled);

    var json = JSON.stringify(form);

    formData.append('Jsonfile', json);

    if (this.isLoadDefaultsEnabled) {   // For API side working
      formData.append('isLoadDefaultsEnabled', 'True');
    }
    else {                   // For API side working
      //form.FileName = file[0].name;  //Updated 20210108

      //formData.append('Jsonfile', json);
      formData.append('isLoadDefaultsEnabled', 'False');
      for (let i = 0; i < file.length; i++) {
        formData.append('uploadFile', file[i], file[i].name);
      }
    }

    const uploadReq = new HttpRequest('POST', baseApiUrl + '/api/search/File_upload', formData, {
      reportProgress: true,
    });

    this._HttpClient.request(uploadReq).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        //this.progress += Math.round(100 * event.loaded / event.total);
        this.barWidth = Math.round((100 / (event.total || 0) * event.loaded)) + "%";
      }
      else if (event.type === HttpEventType.Response) {
        console.log((event.body));
      }
    });
  }


  UndefinedNativeElement(Element: any){
    if(Element === undefined || Element.files[0] === undefined){
      return true;
    }
  }

  UploadAddInput() {
    if (this.UndefinedNativeElement(this.imgAdditionalFileInput.nativeElement)){
      this.FileAdditionalInputPlaced = '';
    }
    else{
      let fileData = this.imgAdditionalFileInput.nativeElement;
      this.fileAdditionalModel = this.CheckFileSize(fileData, 1000);     // ~1MBs file limit
      this.FileAdditionalInputPlaced = fileData.files[0].name;
    }
  }

  UploadRep1() {  // Uploading Replicate 1
    if (this.UndefinedNativeElement(this.imgRep1FileInput.nativeElement)){
      this.FileRep1Placed = '';
    }
    else{
      let fileData = this.imgRep1FileInput.nativeElement;   //imgFileInput.nativeElement;
      this.fileRep1Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
      this.FileRep1Placed = fileData.files[0].name;
    }
  }

  UploadRep2() {  // Uploading Replicate 2
    if (this.UndefinedNativeElement(this.imgRep2FileInput.nativeElement)){
      this.FileRep2Placed = '';
    }
    else{
    let fileData = this.imgRep2FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep2Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
    this.FileRep2Placed = fileData.files[0].name;
    }
  }

  UploadRep3() {  // Uploading Replicate 3
    if (this.UndefinedNativeElement(this.imgRep3FileInput.nativeElement)){
      this.FileRep3Placed = '';
    }
    else{
    let fileData = this.imgRep3FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep3Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
    this.FileRep3Placed = fileData.files[0].name;
    }
  }

  CheckFileSize(fileData, Size) {
    if (fileData.files.length > 0) {
      const fsize = fileData.files.item(0).size;
      const file = Math.round((fsize / 1024));  // bytes to MBs
      if (file >= Size) {
        return true;
      } else if (file < Size) {
        this.AllFileEntireContents.push(fileData.files.item(0));
        return false;
      }
    }
  }

  onReset({ form }: { form: any; }): void {
    this.isLoadDefaultsEnabled = false;
    this.FileAdditionalInputPlaced = '';
    this.FileRep1Placed = '';
    this.FileRep2Placed = '';
    this.FileRep3Placed = '';
    this.barWidth = "0%";
    console.log("Form has been reset");
  }
}