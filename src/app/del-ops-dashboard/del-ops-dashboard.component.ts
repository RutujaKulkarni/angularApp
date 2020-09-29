import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material";
@Component({
  selector: 'app-del-ops-dashboard',
  templateUrl: './del-ops-dashboard.component.html',
  styleUrls: ['./del-ops-dashboard.component.css']
})

export class DelOpsDashboardComponent {
  gridApi: any;
  columnApi: any;
  private editType;
  private columnDefs;
  private editedRowData: JSON;
  private newData: any;

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { headerName: `Project Code`, field: `projectCode`, sortable: true }, //project master model
      { headerName: `Project Name`, field: `projectName`, sortable: true }, //project master model -> velocity code
      { headerName: `Project Health`, field: `projectHealth`, sortable: true, editable: true }, //project leading model
      { headerName: `Onsite FTE Count`, field: `onsiteFteCount`, sortable: true, editable: true }, // ?
      { headerName: `Offshore FTE Count`, field: `offshoreFteCount`, sortable: true, editable: true }, // ?
      { headerName: `Past Due RRs`, field: `pastDueRrs`, sortable: true, editable: true }, //project leading model
      { headerName: `Ageing of Past Due RRs`, field: `ageingOfPastDueRrs`, sortable: true, editable: true }, //project leading model
      { headerName: `Resource Onboarding Delays`, field: `resourceOnboardingDelays`, sortable: true, editable: true }, //project leading model
      { headerName: `EIQ Baselining of resources`, field: `eiqBaseliningOfResources`, sortable: true, editable: true }, //project leading model
      { headerName: `Attrition Count`, field: `attritionCount`, sortable: true, editable: true }, //project leading model
      { headerName: `Q2 Revenue`, field: `revenue`, sortable: true, editable: true }, //project leading model
      { headerName: `Q2 Cost`, field: `cost`, sortable: true, editable: true }, //project leading model
      { headerName: `Q2 Margin`, field: `margin`, sortable: true, editable: true }, //project leading model
    ];
    this.editType = 'fullRow';
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.http.get('http://localhost:8002/api/citi-portal/dev-ops/details').subscribe(data => {//perform the async call
      this.newData = data;
      //console.log(this.newData);
      this.gridApi.setColumnDefs(this.columnDefs);
      this.gridApi.setRowData(this.newData);
    });
  }

  OnRowValueChanged(params) {
    console.log(params);
    this.editedRowData = params.data;
  }

  OnSaveChanges() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put('http://localhost:8002/api/citi-portal/updateDetails', this.editedRowData, httpOptions).subscribe(
      val => {
        console.log("PUT call successful value returned in body", val);
        this.saveData = false;
      },
      response => {
        console.log("PUT call in error", response);
        this.saveData = false;
      },
      () => {
        console.log("The PUT observable is now completed.");
        this.saveData = false;
        this.gridApi.setRowData(this.newData);
      }
    );
  }

  OnRowDoubleClicked(params) {
    //this.saveData = true;
  }

}


/*
The data model for this dashboard can be captured from
1. PROJECT LEADING INDICATOR
2. CHORUS MASTER
3. PROJECT MASTER
4. SOW MASTER
5. PROGRAM MASTER

*/
