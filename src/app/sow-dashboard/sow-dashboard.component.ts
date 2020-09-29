import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-sow-dashboard',
  templateUrl: './sow-dashboard.component.html',
  styleUrls: ['./sow-dashboard.component.css']
})

export class SowDashboardComponent {
  gridApi: any;
  columnApi: any;
  private editType;
  private columnDefs;
  private editedRowData: JSON;
  private newData: any;
  saveData: boolean = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.saveData = false;
    this.columnDefs = [
      { headerName: `SOW ID`, field: `sowId`, sortable: true },
      { headerName: `Contract Name`, field: `contractName`, sortable: true },
      { headerName: `Contract Type`, field: `contractType`, sortable: true },
      { headerName: `Service Type`, field: `serviceType`, sortable: true },
      { headerName: `Source Data`, field: `sourceData`, sortable: true },
      { headerName: `Status`, field: `status`, sortable: true, editable: true },
      { headerName: `Citi Legal Entity`, field: `citiLegalEntity`, sortable: true },
      { headerName: `Signed Effective Date`, field: `signedEffectiveDate`, sortable: true },
      { headerName: `Commencement Date`, field: `commencementDate`, sortable: true },
      { headerName: `Expiry Date`, field: `expiryDate`, sortable: true, editable: true },
      { headerName: `Geography`, field: `geography`, sortable: true },
      { headerName: `Sector`, field: `sector`, sortable: true },
      { headerName: `Sow Executing Location`, field: `sowExecutingLocation`, sortable: true, editable: true },
      { headerName: `Area`, field: `area`, sortable: true },
      { headerName: `Business Unit`, field: `businessUnit`, sortable: true },
      { headerName: `Citi SOW Owner Name`, field: `citiSowOwnerName`, sortable: true, editable: true },
      { headerName: `Citi SOW Owner Email Id`, field: `citiSowOwnerEmailId`, sortable: true, editable: true },
      { headerName: `Citi Project Manager`, field: `citiProjectManager`, sortable: true, editable: true },
      { headerName: `Citi Project Manager Email Id`, field: `citiProjectManagerEmailId`, sortable: true, editable: true },
      { headerName: `Virtusa Segment Delivery Head`, field: `virtusaSegmentDeliveryHead`, sortable: true, editable: true },
      { headerName: `Virtusa DD Name`, field: `virtusaDDName`, sortable: true, editable: true },
      { headerName: `Virtusa DD EmailId`, field: `virtusaDDEmailId`, sortable: true, editable: true },
      { headerName: `Virtusa PD Name`, field: `virtusaPDName`, sortable: true, editable: true },
      { headerName: `Virtusa PD Email Id`, field: `virtusaPDEmailId`, sortable: true, editable: true },
      { headerName: `Virtusa PM Name`, field: `virtusaPMName`, sortable: true, editable: true },
      { headerName: `Virtusa PM EmailId`, field: `virtusaPMEmailId`, sortable: true, editable: true },
      { headerName: `Tenure`, field: `tenure`, sortable: true },
    ];
    this.editType = 'fullRow';
  }

  OnGridReady(params) {
    this.saveData = false;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.http.get('http://localhost:8000/api/citi-portal/getDetails').subscribe(data => {//perform the async call
      this.newData = data;
      //console.log(this.newData);
      this.gridApi.setColumnDefs(this.columnDefs);
      this.gridApi.setRowData(this.newData);
    });
  }

  OnRowValueChanged(params) {
    console.log(params);
    //     if(this.editedRowData != null){
    //       console.log("........ previous editedRowData");
    //       console.log(this.editedRowData);
    //       console.log("........ now params.data");
    //       console.log(params.data);
    //       //this.editedRowData = this.editedRowData.concat(params.data);
    // //      jsonArray1 = jsonArray1.concat(jsonArray2);
    //     }else{
    //       this.editedRowData = params.data;
    //     }
    //  console.log(this.editedRowData);
    //this.editedRowData.put(params.data);
    this.editedRowData = params.data;
    this.saveData = false;
  }

  OnRowDoubleClicked(params) {
    this.saveData = true;
  }

  OnSaveChanges() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put('http://localhost:8000/api/citi-portal/updateDetails', this.editedRowData, httpOptions).subscribe(
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
        //this.openMyDialog();
        //this.dialog.open(this.successDialog);
        this.gridApi.setRowData(this.newData);
      }
    );
  }

  // openMyDialog() {
  //       const dialogConfig = new MatDialogConfig();
  //       dialogConfig.disableClose = true;
  //       dialogConfig.autoFocus = true;
  //       dialogConfig.data = {
  //         id: 1,
  //         title: 'Success'
  //       };
  //       this.dialog.open(dialogConfig);
  //   }

}

//scenario 1: Same row is edited twice before sending data. Check if any error occures
/*TODO:
1. When one row is made editable, user can not edit another row before saving or canceling the changes.

*/
