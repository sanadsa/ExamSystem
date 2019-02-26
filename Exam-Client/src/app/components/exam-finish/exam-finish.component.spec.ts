import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFinishComponent } from './exam-finish.component';

describe('ExamFinishComponent', () => {
  let component: ExamFinishComponent;
  let fixture: ComponentFixture<ExamFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
