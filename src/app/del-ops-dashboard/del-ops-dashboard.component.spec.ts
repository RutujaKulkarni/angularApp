import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelOpsDashboardComponent } from './del-ops-dashboard.component';

describe('DelOpsDashboardComponent', () => {
  let component: DelOpsDashboardComponent;
  let fixture: ComponentFixture<DelOpsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelOpsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelOpsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
