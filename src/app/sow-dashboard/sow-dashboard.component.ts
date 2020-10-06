import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { MatDialog, MatDialogConfig } from "@angular/material";
//import { NumericEditor } from '../numeric-editor.component';

@Component({
  selector: 'app-sow-dashboard',
  templateUrl: './sow-dashboard.component.html',
  styleUrls: ['./sow-dashboard.component.css']
})

export class SowDashboardComponent {
  gridApi: any;
  columnApi: any;
  private editType;
  columnDefs;
  private editedRowData: JSON;
  private newData: any;
  saveData: boolean = false;
  private frameworkComponents;
  private defaultColDef;

  constructor(private http: HttpClient) {
    this.frameworkComponents = {
      //numericEditor: NumericEditor
    };
    this.defaultColDef = {
      editable: true,
      sortable: true,
      flex: 0,
      minWidth: 110,
      filter: true,
      resizable: true,
    };
    this.saveData = false;
    this.columnDefs = [
      { headerName: `SOW ID`, field: `sowId`, sortable: true },
      { headerName: `Contract Name`, field: `contractName`, sortable: true,editable: true },
      { headerName: `Contract ID`, field: `SOW_Contract_Id`, sortable: true, editable: true },
      { headerName: `Contract Pred ID`, field: `SOW_Contract_Pred_Id`, sortable: true, editable: true },
      { headerName: `Signed Effective Date`, field: `signedEffectiveDate`, sortable: true, valueParser:this.dateValueSetter, editable: true }, //date
      { headerName: `SOW start Date`, field: `Sow_Strart_Date`, sortable: true, valueParser:this.dateValueSetter, editable: true }, //date
      { headerName: `SOW end Date`, field: `Sow_End_Date`, sortable: true, valueParser:this.dateValueSetter, editable: true }, //date
      { headerName: `Tenure`, field: `tenure`, sortable: true, valueParser: this.numericValueSetter, editable: true }, //int
      { headerName: `FG ID`, field: `FG_ID`, sortable: true, editable: true }, //string
      { headerName: `Source Data`, field: `sourceData`, sortable: true , editable: true},
      { headerName: `Status`, field: `status`, sortable: true, editable: true },
      { headerName: `Citi Legal Entity Seq`, field: `auroraCitiLegalEntitySeqFk`, sortable: true, hide:true }, //hide
      { headerName: `Geography`, field: `geography`, sortable: true, editable: true },
      { headerName: `Service Type Seq`, field: `auroraServiceTypeSeqFk`, sortable: true, hide:true }, //hide
      { headerName: `Sector Type Seq`, field: `auroraSectorTypeSeqFk`, sortable: true, hide:true }, //hide
      { headerName: `Area`, field: `area`, sortable: true,editable: true },
      { headerName: `Business Unit Seq`, field: `auroraBusinessUnitSeqFk`, sortable: true, hide:true }, //hide
      { headerName: `Citi SOW Owner Name`, field: `citiSowOwnerName`, sortable: true, editable: true },
      { headerName: `Citi SOW Owner Email Id`, field: `citiSowOwnerEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter },
      { headerName: `Citi Project Manager`, field: `citiPM`, sortable: true, editable: true },
      { headerName: `Citi Project Manager Email Id`, field: `citiPMEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter },
      { headerName: `Virtusa PM Name`, field: `virtusaPMName`, sortable: true, editable: true },
      { headerName: `Virtusa PM EmailId`, field: `virtusaPMEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter },
      { headerName: `Auto Email Triggered Flag`, field: `autoEmailTriggeredFlag`, sortable: true, editable: true },
      { headerName: `Auto Email Triggered Date`, field: `autoEmailTriggeredDate`, sortable: true, valueParser:this.dateValueSetter, editable: true}, //date
      { headerName: `Key Personnel SOW Count`, field: `keyPersonnelSOWCount`, sortable: true, valueParser: this.numericValueSetter, editable: true }, //int
      { headerName: `Cob Applicability`, field: `cobApplicability`, sortable: true,editable: true },
      { headerName: `Remarks`, field: `remarks`, sortable: true, editable: true },
      { headerName: `Created Date`, field: `createdDate`, sortable: true, valueParser:this.dateValueSetter,editable: true },//date
      { headerName: `Created By`, field: `createdBy`, sortable: true, editable: true }, //editable because we do not have entitlements in place
      { headerName: `Modified Date`, field: `modifiedDate`, sortable: true, valueParser:this.dateValueSetter,editable: true }, //date
      { headerName: `Modified By`, field: `modifiedBy`, sortable: true, editable: true },
    ];
    this.editType = 'fullRow';
  }

  OnGridReady(params) {
    this.saveData = true;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.http.get('http://localhost:8000/api/citi-portal/getDetails').subscribe(data => {//perform the async call
      this.newData = data;
      this.gridApi.setColumnDefs(this.columnDefs);
      this.gridApi.setRowData(this.newData);
    });
  }

  OnCellValueChanged(params){
    this.saveData = false;
    this.editedRowData = params.data;
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
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
        this.saveData = true;
        this.gridApi.setRowData(this.newData);
      }
    );
  }

  private numericValueSetter(params){
    //console.log(params);
    if (!isNaN(+params.newValue)) {
      //if value is not NaN after converting to number, return true with change
      params.data[params.colDef.field] = params.newValue;
      return params.newValue;
    }
    else{
      //if value is NaN, return false with no change
      return params.oldValue;
    }
  }

  private emailValueSetter(params){
    //console.log(params);
    if (params.newValue != null) {
      //if value is not NaN after converting to number, return true with change
      if(params.newValue.indexOf('@') >= 0 && params.newValue.indexOf('.') >= 0){
        params.data[params.colDef.field] = params.newValue;
        return params.newValue;
      }else{
        return '';
      }
    }
    else{
      //if value is NaN, return false with no change
      return params.oldValue;
    }
  }

  private dateValueSetter(params){
    if(!isNaN(Date.parse(params.newValue)))
  	{
      //if value is not NaN after converting to Date, return true with change
      params.data[params.colDef.field] = params.newValue;
      return params.newValue;
  	}else{
      //if value is NaN, return false with no change
      return params.oldValue;
    }
  }
}
