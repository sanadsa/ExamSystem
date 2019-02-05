import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question, eQuestionType } from 'src/app/models/question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {

  constructor() { }
  @ViewChild('selectedType') selectedType: ElementRef;
  questionForm = new FormGroup({
    question: new FormGroup({
      questionType: new FormControl,
      questionText: new FormControl,
      belowQuestion: new FormControl,
      possibleAnswers: new FormControl
    })
  });
  isSingle = true;
  question: Question;
  questionType = eQuestionType;
  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2);
  }

  ngOnInit() {
  }

  setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[1]) ? true : false;
  }

}
