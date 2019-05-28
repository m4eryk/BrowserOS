import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    const httpClientStub = {};
    TestBed.configureTestingModule({
      providers: [
        DataService,
        { provide: HttpClient, useValue: httpClientStub }
      ]
    });
    service = TestBed.get(DataService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
