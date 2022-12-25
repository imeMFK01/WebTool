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



@Component({
  selector: 'app-protein-search',
  templateUrl: './protein-search.component.html',
  styleUrls: ['./protein-search.component.css'],
  providers: [ConfigService]
})

export class ProteinSearchComponent implements OnInit {

  IsProgressbarOn = 0;

  @ViewChild("imgFileInput") imgFileInput;
  @ViewChild("imgRep1FileInput") imgRep1FileInput;
  @ViewChild("imgInfo") imgInfo;

  AllFileEntireContents = [];

  barWidth: string = "0%";
  fileRep1Model: boolean;


  diableEmail: boolean;
  name: any;

  filenameModel: boolean;

  EmailId: string = '';
  Title: any = '';

  constructor(public af: AngularFireAuth, private router: Router, private _httpService: ConfigService, private _http: Http, public dialog: MatDialog) {
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
      if (form.UserId != "") {
        form.EmailId = form.UserId;
        form.UserId = user.uid;
      }
      else {
        form.EmailId = "";
        form.UserId = user.uid;
      }
    }

    //let FileName = fi.files[0].name;


    let stats: any = 'false';
    // console.log(form);

    // let fi = this.imgRep1FileInput.nativeElement;
    // stats = this._httpService.postJSON(form, fi.files);



    let adsa = this._httpService.postJSON(form, this.AllFileEntireContents)

    //stats = this.UploadToServer(form, this.AllFilesData);

    //stats = this._httpService.postJSON(form, fileData.files);
    console.log(stats);

  }




  //   UploadToServer(form, file) {






  //     let formData: FormData = new FormData();

  //     // form.FileName = file[0].name;  //Updated 20210108
  //     var json = JSON.stringify(form);

  //     formData.append('Jsonfile', json);
  //     // for (let i = 0; i < file.length; i++) {
  //     //     formData.append('uploadFile', file[i], file[i].name);
  //     // }

  //     console.log(json);
  //     let headers = new Headers();
  //     headers.append('Accept', 'application/json');
  //     return this._http.post(this.baseApiUrl + '/api/search/File_upload', formData, { headers: headers })
  //         .map(res => res.json())
  //         .subscribe(
  //             data => console.log('success'),
  //             error => console.log(error)
  //         )
  // }















  // upload(Uploaded_File) {

  //   let fi = this.imgRep1FileInput.nativeElement;   //imgFileInput.nativeElement;

  //   // if (fi.files.length > 0) {
  //   //   const fsize = fi.files.item(0).size;
  //   //   const file = Math.round((fsize / 1024));  // bytes to MBs
  //   //   if (file >= Size) {    //size limit = 60 MB
  //   //     //CALL API FOR UPLOADING THE DATA...!!!
  //   //     this.fileRep1Model = true;
  //   //   } else if (file < Size) {
  //   //     this.fileRep1Model = false;
  //   //   }
  //   // }
  // }


  UploadRep1() {  // Uploading Replicate 1
    let fileData = this.imgRep1FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep1Model = this.CheckFileSize(fileData);
  }


  @ViewChild("imgRep2FileInput") imgRep2FileInput;
  fileRep2Model: boolean;


  UploadRep2() {  // Uploading Replicate 1
    let fileData = this.imgRep2FileInput.nativeElement;   //imgFileInput.nativeElement;
    this.fileRep2Model = this.CheckFileSize(fileData);
  }




  CheckFileSize(fileData) {

    let Size = 200000     // ~200MBs file limit

    if (fileData.files.length > 0) {
      const fsize = fileData.files.item(0).size;
      const file = Math.round((fsize / 1024));  // bytes to MBs
      if (file >= Size) {    //size limit = 60 MB

        return true;
      } else if (file < Size) {
        //CALL API FOR UPLOADING THE DATA...!!!
        this.AllFileEntireContents.push(fileData.files.item(0));
        return false;
      }
    }
  }





  onReset(form: any): void {
    console.log("Form has been reset");
  }
}