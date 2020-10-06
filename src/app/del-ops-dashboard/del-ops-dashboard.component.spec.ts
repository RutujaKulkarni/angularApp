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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
