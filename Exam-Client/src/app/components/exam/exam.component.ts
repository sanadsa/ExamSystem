import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ExamService } from 'src/app/services/exam.service';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  test: Test = {};
  questions: Question[];
  allAnswers: any[];
  answers: any[] = [];
  q: Question
  index: number = 0;

  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.getExam(49).subscribe(result => {
      debugger;
      this.test = result[0][0];
      this.questions = result[1];
      this.allAnswers = result[2];
      this.q = this.questions[0];
      this.answers =this.allAnswers.filter(a => a.QuestionId == this.q.ID);
    })
  }
  nextQuestion() {
    debugger;
    this.index++;
    this.q = this.questions[this.index];
    this.answers =this.allAnswers.filter(a => a.QuestionId == this.q.ID);

  }

}
