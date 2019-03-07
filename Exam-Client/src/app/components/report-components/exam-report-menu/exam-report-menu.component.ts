import { TestService } from '../../../services/test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'es-exam-report',
  templateUrl: './exam-report-menu.component.html',
  styleUrls: ['./exam-report-menu.component.css']
})
export class ExamReportMenuComponent implements OnInit {
  field: string;
  exams: Test[];
  chosenExam: Test = {};
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  toDateRegular: Date = null;
  fromDateRegular: Date = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    calendar: NgbCalendar) {
    this.fromDate = null;
    this.toDate = null;
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

  public onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.fromDateRegular = new Date(date.year, date.month - 1, date.day);
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.toDateRegular = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
    } else {
      this.toDate = null;
      this.toDateRegular = null;
      this.fromDate = date;
      this.fromDateRegular = new Date(date.year, date.month - 1, date.day);
    }
  }

  public isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  public isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  public isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  public navToReports() {
    this.router.navigate(['/reports', { field: this.field }])
  }

  public navToExamReport() {
    this.router.navigate(['/examReportDetails', {
      examId: this.chosenExam.ID,
      field: this.field,
      fromDate: this.fromDateRegular.toString(),
      toDate: this.toDateRegular.toString()
    }])
  }

}
