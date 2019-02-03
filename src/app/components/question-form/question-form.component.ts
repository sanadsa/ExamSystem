import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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
  questionType = ['Single', 'Multiple'];
  isSingle = true;

  constructor() { }

  ngOnInit() {
  }

  setIsSingle() {
    debugger;
    let choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice == 'Single') ? true : false;
  }

}
