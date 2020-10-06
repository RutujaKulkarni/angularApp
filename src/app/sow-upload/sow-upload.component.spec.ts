import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { SowUploadComponent } from './sow-upload.component';
import { NgModule } from '@angular/core';

describe('SowUploadComponent', () => {
  let component: SowUploadComponent;
  let fixture: ComponentFixture<SowUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpEventType,
        NgModule
      ],
      declarations: [ SowUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
