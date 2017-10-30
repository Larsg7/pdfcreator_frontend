import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSeriesDialogComponent } from './template-series-dialog.component';

describe('TemplateSeriesDialogComponent', () => {
  let component: TemplateSeriesDialogComponent;
  let fixture: ComponentFixture<TemplateSeriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSeriesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSeriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
