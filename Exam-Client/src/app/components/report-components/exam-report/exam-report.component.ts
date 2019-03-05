import { Test } from './../../../models/test';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.css']
})
export class ExamReportComponent implements OnInit {
  exam: Test;
  field: string;
  questionsFilteredList: any[] = [];
  selectedQuestionsId: number[] = [];

  constructor(private route: ActivatedRoute,
    private examService: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let examId = params.get('examId');
      this.field = params.get('field');
      this.examService.getTestById(examId, this.field).subscribe(exam => {
        this.exam = exam[0][0];
        console.log(this.exam.TestName);
        this.questionsFilteredList = exam[1];
        this.questionsFilteredList.forEach(q => {
          if (q.IsInTest == 1) {
            this.selectedQuestionsId.push(q.ID);
          }
        });
      }, err => console.log(err));
    });
  }

}
