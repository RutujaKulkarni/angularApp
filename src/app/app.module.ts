import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { Grid } from 'ag-grid-community';
import { HttpClientModule } from '@angular/common/http';
//import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormsModule } from '@angular/forms';

import { SowDashboardComponent } from './sow-dashboard/sow-dashboard.component';
import { DelOpsDashboardComponent } from './del-ops-dashboard/del-ops-dashboard.component';
import { SowUploadComponent } from './sow-upload/sow-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumericEditor } from './numeric-editor.component';
import { DateEditor} from './date-component.component';
import { EmailEditor } from './email-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    SowDashboardComponent,
    DelOpsDashboardComponent,
    SowUploadComponent,
    NumericEditor,
    DateEditor,
    EmailEditor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    AgGridModule.withComponents([NumericEditor, DateEditor, EmailEditor]),
    RouterModule.forRoot([
    {path: 'sow', component: SowDashboardComponent},
    {path: 'delivery-ops', component: DelOpsDashboardComponent},
    {path: 'sow-upload', component: SowUploadComponent}
  ]),
    BrowserAnimationsModule
    /*AppRoutingModule*/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//  entryComponents: [CourseDialogComponent]
