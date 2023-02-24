import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatDrivenFormsComponent } from './templat-driven-forms.component';

describe('TemplatDrivenFormsComponent', () => {
  let component: TemplatDrivenFormsComponent;
  let fixture: ComponentFixture<TemplatDrivenFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatDrivenFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplatDrivenFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
