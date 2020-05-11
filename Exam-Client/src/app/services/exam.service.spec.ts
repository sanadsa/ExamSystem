import { ExamService } from './exam.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//import { ExamService } from './exam.service';

describe('ExamService', () => {
  let httpTestingController: HttpTestingController;
  let examService: ExamService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamService],
      imports: [HttpClientTestingModule]
    });
    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    examService = TestBed.get(ExamService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(examService).toBeTruthy();
  });
});
