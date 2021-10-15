import { TestBed } from '@angular/core/testing';

import { AfipInterceptorService } from './afip-interceptor.service';

describe('AfipInterceptorService', () => {
  let service: AfipInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfipInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
