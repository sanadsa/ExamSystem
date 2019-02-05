import { QuestionService } from './../../services/question.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question, eQuestionType } from 'src/app/models/question';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @ViewChild('selectedType') selectedType: ElementRef;
  questionForm = new FormGroup({
    question: new FormGroup({
      questionType: new FormControl,
      questionText: new FormControl,
      belowQuestion: new FormControl,
      possibleAnswers: new FormControl
    })
  });
  submitted:boolean;
  isSingle = true;
  question: Question;
  questionType = eQuestionType;
  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2);
  }

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[1]) ? true : false;
  }

  createQuestion(){
    var ob = {
      Title: 'second',
      QuestionType: 'Multiple',
      QuestionContent: 'do you?',
      Active: true,
      LastUpdate: new Date()
    };

    this.questionService.addQuestion(ob).subscribe(question => {
      alert('success');
    },err=>console.log(err));
    // this.submitted = true;
    // if(this.questionForm.invalid){
    //   return;
    // }
  }

}
