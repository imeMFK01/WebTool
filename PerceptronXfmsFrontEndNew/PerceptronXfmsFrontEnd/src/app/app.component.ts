import { Component, ViewChild } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  logged_in_user: any;
  UserEmailID: any;  //For show/hide Admin Panel

  disabled: any;  //boolean;
  disabled1: any;  //boolean;

  @ViewChild("menubutton") menubutton: any;


ngOnInit(){
  var logged_in = localStorage.getItem('login');
    if (logged_in) {
      this.disabled = true;
      if (localStorage.getItem('logged_in_user')) {
        this.logged_in_user = localStorage.getItem('logged_in_user');
      }
      else {
        this.logged_in_user = 'User';
      }
      this.disabled1 = false;
    } else {
      this.disabled = false;
      this.disabled1 = true;
    }

}



}
