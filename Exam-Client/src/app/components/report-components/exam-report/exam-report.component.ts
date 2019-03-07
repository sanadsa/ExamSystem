import { Test } from './../../../models/test';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.css']
})
export class ExamReportComponent implements OnInit {
  exam: Test;
  reports: Report[];
  field: string;
  examId: number;
  questionsFilteredList: any[] = [];
  selectedQuestionsId: number[] = [];
  numOfQuestions: number;
  fromDate: string;
  toDate: string;

  constructor(private route: ActivatedRoute,
    private examService: TestService,
    private reportService: ReportService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = +params.get('examId');
      this.field = params.get('field');
      this.fromDate = params.get('fromDate');
      this.toDate = params.get('toDate');
    });
    this.getExam();
    this.getReport();
  }

  private getReport(): void {
    this.reportService.getRespondentReportByTest(this.examId, this.fromDate, this.toDate).subscribe((reports: Report[]) => {
      this.reports = reports;
    });
  }

  private getExam(): void {
    this.examService.getTestById(this.examId, this.field).subscribe(exam => {
      this.exam = exam[0][0];
      this.questionsFilteredList = exam[1];
      this.questionsFilteredList.forEach(q => {
        if (q.IsInTest == 1) {
          this.selectedQuestionsId.push(q.ID);
        }
      });
    }, err => console.log(err));
  }
}
