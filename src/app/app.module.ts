import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { Grid } from 'ag-grid-community';
import { HttpClientModule } from '@angular/common/http';
//import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormsModule } from '@angular/forms';

import { SowDashboardComponent } from './sow-dashboard/sow-dashboard.component';
import { DelOpsDashboardComponent } from './del-ops-dashboard/del-ops-dashboard.component';
import { SowUploadComponent } from './sow-upload/sow-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AlertsModule } from 'angular-alert-module';

@NgModule({
  declarations: [
    AppComponent,
    SowDashboardComponent,
    DelOpsDashboardComponent,
    SowUploadComponent,
    LandingPageComponent
    //NumericEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    AlertsModule.forRoot(),
    RouterModule.forRoot([
    {path: 'sow', component: SowDashboardComponent},
    {path: 'delivery-ops', component: DelOpsDashboardComponent},
    {path: 'sow-upload', component: SowUploadComponent},
    {path: '', component: LandingPageComponent}
  ]),
    BrowserAnimationsModule
    /*AppRoutingModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//  entryComponents: [CourseDialogComponent]
