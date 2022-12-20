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
  @ViewChild("PtmAllow") PtmAllow;

  ListOfDatabases = [
    // { value: 'Swissprot', viewValue: 'Swissprot' },
    // { value: 'TrEMBL', viewValue: 'TrEMBL' },
    { value: 'Human', viewValue: 'Human' },
    { value: 'Ecoli', viewValue: 'Ecoli' },
    { value: 'Bovine', viewValue: 'Bovine' }
  ];

  YesNo = [
    { value: '1', viewValue: 'Yes' },
    { value: '0', viewValue: 'No' },
  ];


  states = [
    { name: 'Human', viewValue: 'Human' },
    { name: 'Ecoli', viewValue: 'Ecoli' },
    { name: 'Bovine', viewValue: 'Bovine' }
  ]; //    { name: 'Swissprot', viewValue: 'Swissprot' }, { name: 'TrEMBL', viewValue: 'TrEMBL' },


////////////////////////////////
filename: any;

/////////////////////////////


  diableEmail: boolean;
  name: any;
  
  state: string = '';
  // upload:any;
  Uploaded_File:any;
  filenameModel:boolean;
  
  
  postData: string;
  

  
  //////Placeholder Variables to avoid ng build --prod --aot error
  PST_Tolerance: any;
  Maximum_PstLength:any;
  Hop_Threshhold:any;
  FilterDB:any;
  Autotune:any;
  Title:any;
  email:any;
  ////

  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;


  constructor(public af: AngularFireAuth, private router: Router, private _httpService: ConfigService, public dialog: MatDialog) {
    this.af.authState.subscribe(user => {  })

    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.states.slice());
  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
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

    
    form.TerminalModification = form.TerminalModification.toString();

    
    

    let fi = this.imgFileInput.nativeElement;

    let FileName = fi.files[0].name;
    let FileExtension = FileName. substr(FileName.lastIndexOf('.') + 1);  //Updated 20210102
    if (FileExtension == 'zip'){
      form.NoOfOutputResults = '100';
    }
    else if (FileExtension != 'zip'){     //Updated 20201215
      form.FDR_CutOff = "N/A";
      form.FDRCutOff = "N/A";
    }

   
    let stats: any = 'false';
    console.log(form);
    stats = this._httpService.postJSON(form, fi.files);
    //console.log(stats);
   
  }

  upload(Uploaded_File) {
    let fi = this.imgFileInput.nativeElement;
    let Size = 60000

    if (fi.files.length > 0) {
      const fsize = fi.files.item(0).size;
      const file = Math.round((fsize / 1024));  // bytes to MBs
      if (file >= Size) {    //size limit = 60 MB
        //CALL API FOR UPLOADING THE DATA...!!!


        this.filenameModel = true;
      } else if (file < Size) {
        this.filenameModel = false;
      }
    }

    


  }

  onReset(form: any): void {
    console.log("Form has been reset");
  }
}