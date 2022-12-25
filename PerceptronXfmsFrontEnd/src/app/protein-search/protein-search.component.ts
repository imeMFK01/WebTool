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
    this.Title = "Default Run";
    this.EmailId = '';

    this.fileAdditionalModel = false;
    this.fileRep1Model = false;
    this.fileRep2Model = false;
    this.fileRep3Model = false;


    this.isBridgeEnabled = true;
    this.isFrustratometerEnabled = true;

    this.barWidth = "0%";

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

    let adsa = this.postJSON(form, this.AllFileEntireContents)

  }

  postJSON(form, file) {

    let baseApiUrl = "http://localhost:52340";
    let formData: FormData = new FormData();

    // let formattingform: FormData = new FormData();
    // formattingform.append('Title', form.Title);
    // formattingform.append('EmailId', form.EmailId);
    // formattingform.append('UserId', form.UserId);
    // formattingform.append('isBridgeEnabled', form.isBridgeEnabled);
    // formattingform.append('isFrustratometerEnabled', form.isFrustratometerEnabled);

    var json = JSON.stringify(form);

    formData.append('Jsonfile', json);

    //form.FileName = file[0].name;  //Updated 20210108

    //formData.append('Jsonfile', json);
    for (let i = 0; i < file.length; i++) {
      formData.append('uploadFile', file[i], file[i].name);
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

  UploadAddInput() {
    let fileData = this.imgAdditionalFileInput.nativeElement;
    this.fileAdditionalModel = this.CheckFileSize(fileData, 1000);     // ~1MBs file limit
  }

  UploadRep1() {  // Uploading Replicate 1
    let fileData = this.imgRep1FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep1Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
  }

  UploadRep2() {  // Uploading Replicate 2
    let fileData = this.imgRep2FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep2Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
  }

  UploadRep3() {  // Uploading Replicate 3
    let fileData = this.imgRep3FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep3Model = this.CheckFileSize(fileData, 200000); 200000     // ~200MBs file limit
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

  onReset(form: any): void {
    this.barWidth = "0%";
    console.log("Form has been reset");
  }
}