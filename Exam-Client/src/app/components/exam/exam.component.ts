import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ExamService } from 'src/app/services/exam.service';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  @ViewChild('content') content: any;
  userId: number;
  test: Test = {};
  questions: Question[];
  allAnswers: any[];
  answers: any[] = [];
  question: Question
  index: number = 0;
  selectedAnswerId: number;
  examId: string;

  constructor(private examService: ExamService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get("examId");
      this.userId = parseInt(params.get("userId"));
      this.examService.getExam(this.examId).subscribe(result => {
        this.test = result[0][0];
        this.questions = result[1];
        this.allAnswers = result[2];
        this.question = this.questions[0];
        debugger;
        this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
        this.answers.forEach(a => {
          a.Selected = false;
        })
      });
    });
  }

  nextQuestion() {
    const selectValue = this.answers.find(a => a.Selected);
    if (!selectValue) {
      this.index++;
      this.question = this.questions[this.index];
      if (!this.question) {
        this.index--;
        this.question = this.questions[this.index];
        this.modalService.open(this.content);
        return;
      }
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
      return;
    }

    const answer = {
      questionID: this.question.ID,
      userID: this.userId,
      answerID: selectValue.ID
    }
    this.index++;
    this.question = this.questions[this.index];
    if (!this.question) {
      this.examService.saveAnswer(answer).subscribe(result => {
      }, err => console.log(err));
      this.index--;
      this.question = this.questions[this.index];
      this.modalService.open(this.content);
      return;
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
    this.examService.saveAnswer(answer).subscribe(result => {
    }, err => console.log(err));
    this.selectedAnswerId = 0;
  }

  setAnswer(ans) {
    debugger;
    if (this.question.QuestionType.toString() == 'SingleChoice') {
      this.answers.forEach(r => {
        r.Selected = false;
      });
      ans.Selected = true;
      this.selectedAnswerId = ans.ID;
    } else {
      ans.Selected = !ans.Selected;
    }

  }

  finishTest(content) {
    this.modalService.open(content);
  }

  previousQuestion() {
    const selectValue = this.answers.find(a => a.Selected);
    if (!selectValue) {
      this.index--;
      this.question = this.questions[this.index];
      if (!this.question) {
        this.index++;
        this.question = this.questions[this.index];
        this.modalService.open(this.content);
        return;
      }
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
      return;
    }

    const answer = {
      questionID: this.question.ID,
      userID: this.userId,
      answerID: selectValue.ID
    }
    this.index--;
    this.question = this.questions[this.index];
    if (!this.question) {
      this.examService.saveAnswer(answer).subscribe(result => {
      }, err => console.log(err));
      this.index++;
      this.question = this.questions[this.index];
      this.modalService.open(this.content);
      return;
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
    this.examService.saveAnswer(answer).subscribe(result => {
    }, err => console.log(err));
    this.selectedAnswerId = 0;
  }

  setAnswerSelected(answerID) {
    this.answers.forEach(a => a.Selected = false);
    this.answers.find(a => a.ID == answerID).Selected = true;
  }

  onFinish() {
    this.router.navigate(['/examResult',
      {
        test: JSON.stringify(this.test),
        questions: JSON.stringify(this.questions),
        answers: JSON.stringify(this.allAnswers),
        userId: this.userId
      }
    ]);
    this.modalService.dismissAll();
  }

  showQuestionByIndex(index){
    const selectValue = this.answers.find(a => a.Selected);
    if (!selectValue) {
      this.index= index;
      this.question = this.questions[this.index];
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
    }
    const answer = {
      questionID: this.question.ID,
      userID: this.userId,
      answerID: selectValue.ID
    }
    this.index= index;
    this.question = this.questions[this.index];
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.question.ID);
    this.examService.saveAnswer(answer).subscribe(result => {
    }, err => console.log(err));
  }


}
