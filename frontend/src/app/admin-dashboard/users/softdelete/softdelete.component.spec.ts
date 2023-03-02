import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  SoftdeleteComponent} from './softdelete.component';

describe(' SoftdeleteComponent', () => {
  let component:  SoftdeleteComponent;
  let fixture: ComponentFixture< SoftdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SoftdeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent( SoftdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
