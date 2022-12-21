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
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'ng-upload-root',
  templateUrl: './protein-search.component.html',
  styleUrls: ['./protein-search.component.css'],
})

export class ProteinSearchComponent {

  // private subscription: Subscription | undefined
  //constructor(private confservice: ConfigService) { }

  file: File | null = null

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0)
    }
  }


  // onSubmit() {
  //   if (this.file) {
  //     this.subscription = this.uploads(this.file).subscribe()
  //   }
  // }

  // ngOnDestroy() {
  //   this.subscription?.unsubscribe()
  // }

}