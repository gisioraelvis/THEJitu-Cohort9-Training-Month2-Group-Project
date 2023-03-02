import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStartComponent } from './product-start.component';

describe('ProductStartComponent', () => {
  let component: ProductStartComponent;
  let fixture: ComponentFixture<ProductStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
