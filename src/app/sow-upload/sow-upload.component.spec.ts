import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowUploadComponent } from './sow-upload.component';

describe('SowUploadComponent', () => {
  let component: SowUploadComponent;
  let fixture: ComponentFixture<SowUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
