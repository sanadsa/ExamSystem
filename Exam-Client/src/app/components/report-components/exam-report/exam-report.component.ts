import { TestService } from './../../../services/test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'es-exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.css']
})
export class ExamReportComponent implements OnInit {
  field: string;
  exams: Test[];
  chosenExam: Test = {};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private route: ActivatedRoute,
    private testService: TestService,
    calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
    })

    this.testService.getTestsByField(this.field).subscribe((exams: Test[]) => {
      this.exams = exams;
    })
  }

  public chooseExam(exam: Test) {
    this.chosenExam = exam;
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
