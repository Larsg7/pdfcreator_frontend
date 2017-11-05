import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRunDialogComponent } from './first-run-dialog.component';

describe('FirstRunDialogComponent', () => {
  let component: FirstRunDialogComponent;
  let fixture: ComponentFixture<FirstRunDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstRunDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRunDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
