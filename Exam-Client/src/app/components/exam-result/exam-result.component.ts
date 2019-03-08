import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';
import { TestResult } from 'src/app/models/test-result';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {
  test: Test;
  testReuslts: TestResult[] = []
  questions: Question[] = []
  allAnswers: any[]
  answers: any[]
  question: Question
  index: number = 0;
  numberOfRightAnswers: number;
  grade: number;
  status: string;
  userId: number;
  constructor(private route: ActivatedRoute, private examService: ExamService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.test = JSON.parse(params.get('test'));
      debugger;
      this.questions = JSON.parse(params.get('questions'));
      this.allAnswers = JSON.parse(params.get('answers'));
      this.userId = JSON.parse(params.get('userId'));

      this.question = this.questions[this.index];
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
      this.checkTestReult();
    })
  }

  checkTestReult() {
    for (let index = 0; index < this.questions.length; index++) {
      const answers = this.allAnswers.filter(a => a.QuestionId == this.questions[index].ID);
      debugger;
      const correctAnswersId = answers.filter(a => a.CorrectAnswer).map(a => a.ID);
      const selectedAnswersId = answers.filter(a => a.Selected).map(a => a.ID);
      const testResult = {
        questionId: this.questions[index].ID,
        correctAnswersId: correctAnswersId,
        selectedAnswersId: selectedAnswersId,
        userAnsweredCorrectly: true
      }
      this.testReuslts.push(testResult);
    }
    for (let i = 0; i < this.testReuslts.length; i++) {
      for (let j = 0; j < this.testReuslts[i].correctAnswersId.length; j++) {
        if (this.testReuslts[i].correctAnswersId[j] != this.testReuslts[i].selectedAnswersId[j]) {
          this.testReuslts[i].userAnsweredCorrectly = false;
        }
      }
    }
    this.numberOfRightAnswers = this.testReuslts.filter(tr => tr.userAnsweredCorrectly == true).length;
    this.calculateGrade();
  }

  calculateGrade() {
    this.grade = 100 / this.questions.length * this.numberOfRightAnswers;
    if (this.grade > this.test.PassingGrade) {
      this.status = 'Passed';
    } else {
      this.status = 'Failed';
    }
    const report = {
      TestId: this.test.ID,
      UserId: this.userId,
      DeliveryDate: new Date(),
      QuestionsSent: this.numberOfRightAnswers,
      Grade: this.grade
    }
    this.examService.generateReport(report).subscribe(report => {
    }, err => console.log(err));
  }

  previousQuestion() {
    this.index--;
    this.question = this.questions[this.index];
    if (!this.question) {
      this.index++;
      this.question = this.questions[this.index];
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
  }

  nextQuestion() {
    this.index++;
    this.question = this.questions[this.index];
    if (!this.question) {
      this.index--;
      this.question = this.questions[this.index];
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
  }

}


