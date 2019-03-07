import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTabControlComponent } from './exam-tab-control.component';

describe('ExamTabControlComponent', () => {
  let component: ExamTabControlComponent;
  let fixture: ComponentFixture<ExamTabControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamTabControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamTabControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
