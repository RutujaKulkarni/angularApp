import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SowDashboardComponent } from './sow-dashboard/sow-dashboard.component';
import { DelOpsDashboardComponent } from './del-ops-dashboard/del-ops-dashboard.component';
import { SowUploadComponent } from './sow-upload/sow-upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DelUploadComponent } from './del-upload/del-upload.component';
//importing Sravan's components
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MatProgressSpinnerModule  } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule  } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SowDashboardComponent,
    DelOpsDashboardComponent,
    SowUploadComponent,
    LandingPageComponent,
    DelUploadComponent,
    HomeComponent,
    AboutComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    ChartsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
	  MatTableModule,
    MatProgressSpinnerModule,
	  MatPaginatorModule,
    RouterModule.forRoot([
    {path: 'sow', component: SowDashboardComponent},
    {path: 'delivery-ops', component: DelOpsDashboardComponent},
    {path: 'sow-upload', component: SowUploadComponent},
    {path: 'del-upload', component: DelUploadComponent},
    {path: 'sbu', component: HomeComponent },
    {path: 'about', component: AboutComponent },
    {path: '', component: LandingPageComponent}
  ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

//  entryComponents: [CourseDialogComponent]
