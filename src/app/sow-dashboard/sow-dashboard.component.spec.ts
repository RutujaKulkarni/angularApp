import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowDashboardComponent } from './sow-dashboard.component';

describe('SowDashboardComponent', () => {
  let component: SowDashboardComponent;
  let fixture: ComponentFixture<SowDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
