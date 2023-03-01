import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  OrderEditComponent } from './edit-orders.component';

describe('EditProductComponent', () => {
  let component:  OrderEditComponent;
  let fixture: ComponentFixture< OrderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  OrderEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent( OrderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
