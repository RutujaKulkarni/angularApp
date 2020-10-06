import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { DelOpsDashboardComponent } from './del-ops-dashboard.component';

describe('DelOpsDashboardComponent', () => {
  let component: DelOpsDashboardComponent;
  let fixture: ComponentFixture<DelOpsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            HttpClientModule,
            AgGridModule.withComponents([])
        ],
        declarations: [DelOpsDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DelOpsDashboardComponent);
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

  it('column definitions size is 16', () => {
    fixture.detectChanges();
    expect(component.columnDefs.length).toEqual(16);
  });

  it('The grid should have all columns', () => {
    const elm = fixture.nativeElement;
    const grid = elm.querySelector('ag-grid-angular');
    const headerCells = grid.querySelectorAll('.ag-header-cell-text');
    const headerTitles = Array.from(headerCells).map((cell: any) =>
        cell.textContent.trim()
    );
    expect(headerTitles).toEqual(['Chorus Code', 'Velocity Project Code', 'Project Name', 'Project Health', 'Onsite FTE Count', 'Offshore FTE Count',
    'Past Due RRs', 'Ageing of Past Due RRs', 'Resource Onboarding Delays', 'EIQ Baselining of resources', 'Attrition Count', 'Q2 Revenue (Million)',
    'Q2 Cost (Million)', 'Q2 Margin %'
    ]);
  });

});
