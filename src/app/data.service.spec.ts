import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should return an empty array if search term is empty', () => {
    service.search('').subscribe(data => {
      expect(data.length).toBe(0);
    });
  });

  it('should return expected data (HttpClient called once)', () => {
    const mockCities: string[] = ['New York', 'Los Angeles', 'Chicago'];
    service.search('New').subscribe(data => {
      expect(data).toEqual(mockCities);
    });

    const req = httpTestingController.expectOne(service.baseurl + 'cities?search=New');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCities);
  });
  
});

