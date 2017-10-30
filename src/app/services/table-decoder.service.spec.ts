import { TestBed, inject } from '@angular/core/testing';

import { TableDecoderService } from './table-decoder.service';

describe('TableDecoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableDecoderService]
    });
  });

  it('should be created', inject([TableDecoderService], (service: TableDecoderService) => {
    expect(service).toBeTruthy();
  }));
});
