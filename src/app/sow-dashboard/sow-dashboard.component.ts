import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sow-dashboard',
  templateUrl: './sow-dashboard.component.html',
  styleUrls: ['./sow-dashboard.component.css', './sow.scss']
})

export class SowDashboardComponent {
  gridApi: any;
  columnApi: any;
  private editType;
  columnDefs;
  private editedRowData: JSON;
  private newData: any;
  private saveData: boolean = false;
  private frameworkComponents;
  private defaultColDef;
  private newRow: boolean = false;
  private paginationPageSize;
  // private getRowHeight;

  constructor(private http: HttpClient) {

    this.paginationPageSize = 8;
    this.frameworkComponents = {
      //numericEditor: NumericEditor
    };
    this.defaultColDef = {
      editable: true,
      sortable: true,
      flex: 0,
      minWidth: 120,
      filter: true,
      wrapText: true,
      resizable: true,
    }; //autoHeight: true,

    this.saveData = false;
    this.columnDefs = [
      { headerName: `SOW ID`, field: `sowContractId`, sortable: true, width:150, pinned: 'left', sort: { direction: 'desc' } ,cellRenderer:this.getSowIdCellRenderer},
      { headerName: `SOW ID PK`, field: `sowId`, sortable: true, hide:true,cellRenderer:this.getCellRenderer },
      { headerName: `Contract Name`, field: `contractName`, sortable: true,editable: true, width:85 ,cellRenderer:this.getCellRenderer},
      { headerName: `Contract Pred ID`, field: `sowContractPredId`, sortable: true, editable: true,width:95,cellRenderer:this.getCellRenderer },
      { headerName: `Signed Effective Date`, field: `signedEffectiveDate`, sortable: true, valueParser:this.dateValueSetter, editable: true,width:70,cellRenderer:this.getCellRenderer}, //date
      { headerName: `SOW start Date`, field: `sowStartDate`, sortable: true, valueParser:this.dateValueSetter, editable: true, width:70 ,cellRenderer:this.getCellRenderer}, //date
      { headerName: `SOW end Date`, field: `sowEndDate`, sortable: true, valueParser:this.dateValueSetter, editable: true, width:70,cellRenderer:this.getCellRenderer }, //date
      { headerName: `Tenure`, field: `tenure`, sortable: true, valueParser: this.numericValueSetter, editable: true, width:80 ,cellRenderer:this.getCellRenderer}, //int
      { headerName: `FG ID`, field: `fgId`, sortable: true, editable: true, width:75 ,cellRenderer:this.getCellRenderer}, //string
      { headerName: `Source Data`, field: `sourceData`, sortable: true , editable: true,cellRenderer:this.getCellRenderer, width:80},
      { headerName: `Status`, field: `status`, sortable: true, editable: true, width:55,cellRenderer:this.getCellRenderer },
      { headerName: `Citi Legal Entity Seq`, field: `auroraCitiLegalEntitySeqFk`, sortable: true, hide:true,cellRenderer:this.getCellRenderer , width:80}, //hide
      { headerName: `Geography`, field: `geography`, sortable: true, editable: true ,cellRenderer:this.getCellRenderer, width:80},
      { headerName: `Service Type Seq`, field: `auroraServiceTypeSeqFk`, sortable: true, hide:true ,cellRenderer:this.getCellRenderer, width:80}, //hide
      { headerName: `Sector Type Seq`, field: `auroraSectorTypeSeqFk`, sortable: true, hide:true ,cellRenderer:this.getCellRenderer, width:80}, //hide
      { headerName: `Area`, field: `area`, sortable: true,editable: true ,cellRenderer:this.getCellRenderer, width:80},
      { headerName: `Business Unit Seq`, field: `auroraBusinessUnitSeqFk`, sortable: true, hide:true,cellRenderer:this.getCellRenderer, width:80 }, //hide
      { headerName: `Citi SOW Owner Name`, field: `citiSowOwnerName`, sortable: true, editable: true, width:90,cellRenderer:this.getCellRenderer },
      { headerName: `Citi SOW Owner Email Id`, field: `citiSowOwnerEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter,width:85 ,cellRenderer:this.getCellRenderer},
      { headerName: `Citi Project Manager`, field: `citiPM`, sortable: true, editable: true, width:90,cellRenderer:this.getCellRenderer },
      { headerName: `Citi Project Manager Email Id`, field: `citiPMEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter, width:85,cellRenderer:this.getCellRenderer },
      { headerName: `Virtusa PM Name`, field: `virtusaPMName`, sortable: true, editable: true, width:95,cellRenderer:this.getCellRenderer},
      { headerName: `Virtusa PM EmailId`, field: `virtusaPMEmailId`, sortable: true, editable: true, valueSetter: this.emailValueSetter,width:95,cellRenderer:this.getCellRenderer },
      { headerName: `Auto Email Triggered Flag`, field: `autoEmailTriggeredFlag`, sortable: true, editable: true,cellRenderer:this.getCellRenderer , width:80},
      { headerName: `Auto Email Triggered Date`, field: `autoEmailTriggeredDate`, sortable: true, valueParser:this.dateValueSetter, editable: true,cellRenderer:this.getCellRenderer, width:80}, //date
      { headerName: `Key Personnel SOW Count`, field: `keyPersonnelSOWCount`, sortable: true, valueParser: this.numericValueSetter, editable: true ,cellRenderer:this.getCellRenderer, width:80}, //int
      { headerName: `Cob Applicability`, field: `cobApplicability`, sortable: true,editable: true ,cellRenderer:this.getCellRenderer, width:80},
      { headerName: `Remarks`, field: `remarks`, sortable: true, editable: true ,cellRenderer:this.getCellRenderer, width:80},
      { headerName: `Created Date`, field: `createdDate`, sortable: true, valueParser:this.dateValueSetter,editable: true ,cellRenderer:this.getCellRenderer, width:80},//date
      { headerName: `Created By`, field: `createdBy`, sortable: true, editable: true ,cellRenderer:this.getCellRenderer, width:80}, //editable because we do not have entitlements in place
      { headerName: `Modified Date`, field: `modifiedDate`, sortable: true, valueParser:this.dateValueSetter,editable: true,cellRenderer:this.getCellRenderer , width:80}, //date
      { headerName: `Modified By`, field: `modifiedBy`, sortable: true, editable: true ,cellRenderer:this.getCellRenderer, width:80},
    ];
    this.editType = 'fullRow';
  }

  private getCellRenderer(params){
    return '<span style="top:356px; left:530px; width:46px; height:17px; text-align:left; font-family: sans-serif; display: block; font-size:12px; letter-spacing:0px; color:#5A5C5D; opacity:1; ">'+params.value+'</span>'
  }

  private getSowIdCellRenderer(params){
    return '<span style="top:356px; left:140px; width:120px; height:17px; text-align:left; font-family: sans-serif; font-size:12px; font-weight: bold; letter-spacing: 0px;color: #5A5C5D; opacity: 1;">'+params.value+'</span>'
  }

  private getRowHeight (params) {
    console.log("in getrowheight");
    console.log(params);
    // if (params.node.level === 0) {
    //   return 50;
    // }else{
    //   return 30;
    // }
    // if (params.node.level === 1) {
    //   return 60;
    // }
    return 40;
  }

  OnAddRow(){
    this.newRow = true; //indicates that a new row is added to the UI
    var newItems = [this.createNewRowData()];
    this.gridApi.applyTransaction({add: newItems});
  }

  createNewRowData() {
    var newData = { sowId:'', contractName:'', sowContractId:'', sowContractPredId:'', signedEffectiveDate:'', sowStartDate:'', sowEndDate:'',
      tenure:'', fgId:'', sourceData:'', status:'', auroraCitiLegalEntitySeqFk:1, geography:'', auroraServiceTypeSeqFk:1, auroraSectorTypeSeqFk:1,
      area:'', auroraBusinessUnitSeqFk:1, citiSowOwnerName:'', citiSowOwnerEmailId:'', citiPM:'', citiPMEmailId:'', virtusaPMName:'', virtusaPMEmailId:'',
      autoEmailTriggeredFlag:'', autoEmailTriggeredDate:'', keyPersonnelSOWCount:'', cobApplicability:'', remarks:'', createdDate:this.getTodaysDate(),
      createdBy:'rukulkarni', modifiedDate:this.getTodaysDate(), modifiedBy:'rukulkarni'};
    return newData;
}

  OnGridReady(params) {
    this.saveData = true;
    this.newRow = false;
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.fetchData();
    this.autoSizeAll(true);
    console.log("On Grid ready");
    console.log(params);
  }

  fetchData(){
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
    if(this.newRow == true){
      //this means that we need to add the new row to the DB
      this.addDetails()
    }else{
      this.updateDetails();
    }
  }

  updateDetails(){
    console.log("Update: ");
    console.log(this.editedRowData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put('http://localhost:8000/api/citi-portal/updateDetails', this.editedRowData, httpOptions).subscribe(
      val => {
        console.log("PUT call successful value returned in body", val);
        alert("SOW updated successfully!");
      },
      response => {
        console.log("PUT call in error", response);
        alert("SOW could not be updated. Please try again! "+response.error.message);
      },
      () => {
        console.log("The PUT observable is now completed.");
        this.saveData = true;
        this.newRow = false;
        this.fetchData();
      }
    );
  }

  addDetails(){
    console.log("Add: ");
    console.log(this.editedRowData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post('http://localhost:8000/api/citi-portal/addDetails', this.editedRowData, httpOptions).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
        alert("SOW added successfully!");
      },
      response => {
        console.log("POST call in error", response);
        alert("SOW could not be added. Please try again!");
      },
      () => {
        console.log("The POST observable is now completed.");
        this.saveData = true;
        this.newRow = false;
        this.fetchData();
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
      alert("Entered value is not a date. Please use yyyy-mm-dd format.");
      return params.oldValue;
    }
  }

  private getTodaysDate(){
    // return format : yyyy-mm-dd
    let date: Date = new Date();
    return date.getFullYear() +'-'+ String(date.getMonth() + 1).padStart(2, '0') +'-'+ String(date.getDate()).padStart(2, '0');
  }

  autoSizeAll(skipHeader) {
      var allColumnIds = [];
      this.columnApi.getAllColumns().forEach(function (column) {
        allColumnIds.push(column.colId);
      });
      this.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  setHeaderHeight(value) {
    this.gridApi.setHeaderHeight(value);
  }

}
