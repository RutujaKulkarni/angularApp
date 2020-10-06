import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SowDashboardComponent } from './sow-dashboard.component';

describe('SowDashboardComponent', () => {
  let component: SowDashboardComponent;
  let fixture: ComponentFixture<SowDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          FormsModule,
          HttpClientModule,
          AgGridModule.withComponents([])
      ],
      declarations: [ SowDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('grid API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.gridApi).toBeTruthy();
  });

  it('column API is available after `detectChanges`', () => {
    fixture.detectChanges();
    expect(component.columnApi).toBeTruthy();
  });

  it('column definitions are present', () => {
    fixture.detectChanges();
    expect(component.columnDefs).toBeTruthy();
  });

  it('column definitions size is 27', () => {
    fixture.detectChanges();
    expect(component.columnDefs.length).toEqual(27);
  });

  it('The grid should have all columns', () => {
    // const appElement = fixture.nativeElement;
    // const cellElements = appElement.querySelectorAll('.ag-cell-value');
    // expect(cellElements.length).toEqual(27);

    const elm = fixture.nativeElement;
    const grid = elm.querySelector('ag-grid-angular');
    const headerCells = grid.querySelectorAll('.ag-header-cell-text');
    const headerTitles = Array.from(headerCells).map((cell: any) =>
        cell.textContent.trim()
    );
    expect(headerTitles).toEqual(['SOW ID', 'Contract Name', 'Contract Type', 'Service Type', 'Source Data', 'Status',
    'Citi Legal Entity', 'Signed Effective Date', 'Commencement Date', 'Expiry Date', 'Geography', 'Sector',
    'Sow Executing Location', 'Area', 'Business Unit', 'Citi SOW Owner Name', 'Citi SOW Owner Email Id',
    'Citi Project Manager', 'Citi Project Manager Email Id', 'Virtusa Segment Delivery Head', 'Virtusa DD Name',
    'Virtusa DD EmailId', 'Virtusa PD Name', 'Virtusa PD Email Id', 'Virtusa PM Name', 'Virtusa PM EmailId',
    'Tenure'
    ]);
  });

});
