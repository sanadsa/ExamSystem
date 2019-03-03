import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResultComponent } from './exam-result.component';

describe('ExamFinishComponent', () => {
  let component: ExamResultComponent;
  let fixture: ComponentFixture<ExamResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
