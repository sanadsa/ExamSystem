import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {

  test: Test;
  questions: Question[]
  allAnswers: any[]
  answers: any[]
  userId: number
  userAnswers: any
  q: Question
  index: number = 0;
  numberOfRightAnswers: number = 0;
  grade:number;
  status:string;
  constructor(private route: ActivatedRoute, private examService: ExamService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.test = JSON.parse(params.get('test'));
      this.questions = JSON.parse(params.get('questions'));
      this.allAnswers = JSON.parse(params.get('answers'));
      this.q = this.questions[this.index];
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.q.ID);
      this.userId = parseInt(params.get('userId'));
      this.allAnswers.forEach(a => {
        if (a.Selected && a.CorrectAnswer) {
          this.numberOfRightAnswers++;
        }
      });
      this.calculateGrade();
    })
  }

  calculateGrade() {
    debugger;
    this.grade = 100 / this.questions.length * this.numberOfRightAnswers;
    if (this.grade > this.test.PassingGrade) {
      this.status = 'Passed';
    }else{
      this.status = 'Failed';
    }
  }

  previousQuestion() {
    this.index--;
    this.q = this.questions[this.index];
    if (!this.q) {
      this.index++;
    this.q = this.questions[this.index];
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.q.ID);
  }

  nextQuestion() {
    this.index++;
    this.q = this.questions[this.index];
    if (!this.q) {
      this.index--;
    this.q = this.questions[this.index];
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.q.ID);
  }

}
