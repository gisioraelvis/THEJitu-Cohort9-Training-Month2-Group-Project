import { TestBed } from '@angular/core/testing';

import { AddFormService } from './add-form.service';

describe('AddFormService', () => {
  let service: AddFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
