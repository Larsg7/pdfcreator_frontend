import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateDisplayComponent } from './template-display.component';

describe('TemplateDisplayComponent', () => {
  let component: TemplateDisplayComponent;
  let fixture: ComponentFixture<TemplateDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
