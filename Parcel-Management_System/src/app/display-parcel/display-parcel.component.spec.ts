import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayParcelComponent } from './display-parcel.component';

describe('DisplayParcelComponent', () => {
  let component: DisplayParcelComponent;
  let fixture: ComponentFixture<DisplayParcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayParcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayParcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
