import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePlaceholdersComponent } from './template-placeholders.component';

describe('TemplatePlaceholdersComponent', () => {
  let component: TemplatePlaceholdersComponent;
  let fixture: ComponentFixture<TemplatePlaceholdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePlaceholdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePlaceholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
