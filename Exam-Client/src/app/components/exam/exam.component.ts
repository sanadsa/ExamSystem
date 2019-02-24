import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { ExamService } from 'src/app/services/exam.service';
import { Test } from 'src/app/models/test';
import { Question } from 'src/app/models/question';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selectedAnswerId:number;

  constructor(private examService: ExamService,private modalService: NgbModal) { }

  ngOnInit() {
    this.examService.getExam(49).subscribe(result => {
      this.test = result[0][0];
      this.questions = result[1];
      this.allAnswers = result[2];
      debugger;
      this.q = this.questions[0];
      this.answers = this.allAnswers.filter(a => a.QuestionId == this.q.ID);
    })
  }
  nextQuestion() {
    debugger;
    const answer ={
      questionID: this.q.ID,
      userID:1,
      answerID:this.selectedAnswerId
    }
    this.index++;
    this.q = this.questions[this.index];
    if (!this.q) {
      
      return;
    }
    this.answers = this.allAnswers.filter(a => a.QuestionId == this.q.ID);
    this.examService.saveAnswer(answer).subscribe(result=>{
    },err=>console.log(err));
   
   
  }



  setAnswer(event) {
    const choice = event.target.value;
    const answer =this.answers.find(a => a.Info == choice);
    this.selectedAnswerId = answer.ID;
  }

  finishTest(content){
    this.modalService.open(content);
  }

}
