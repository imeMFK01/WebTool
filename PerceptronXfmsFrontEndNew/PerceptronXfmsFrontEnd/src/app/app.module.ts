import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BooleanInput } from '@angular/cdk/coercion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProteinSearchComponent } from './protein-search/protein-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProteinSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
