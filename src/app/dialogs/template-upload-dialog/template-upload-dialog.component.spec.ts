import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateUploadDialogComponent } from './template-upload-dialog.component';

describe('TemplateUploadDialogComponent', () => {
  let component: TemplateUploadDialogComponent;
  let fixture: ComponentFixture<TemplateUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
