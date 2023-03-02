import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CorouselComponent  } from './corousel.component';

describe('OrdersComponent ', () => {
  let component:CorouselComponent  ;
  let fixture: ComponentFixture<CorouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorouselComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
