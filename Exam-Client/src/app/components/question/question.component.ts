import { ConstantFields } from 'src/app/helpers/common-constants';
import { QuestionService } from './../../services/question.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() isTestform: boolean;
  @Output() onSelectQuestion: EventEmitter<any> = new EventEmitter();
  constFields: ConstantFields;

  constructor(private router: Router) { 
      this.constFields = new ConstantFields();
    }
  ngOnInit() {
  }

  keys(): Array<string> {
    const keys = Object.keys(this.question.QuestionType);
    return keys.slice(keys.length / 2);
  }

  navToEdit() {
    this.router.navigate([this.constFields.questionFormRoute, { question: JSON.stringify(this.question) }]);
  }

  navToQuestionList() {
    this.router.navigate([this.constFields.questionsListRoute, { field: this.question.Field }])
  }

  deleteQuestion(questionId) {
    this.onSelectQuestion.emit(questionId);
  }

  test(event,question) {
    if (event.target.style.backgroundColor == '') {
      event.target.style.backgroundColor = '#00ff00';
    }else{
      event.target.style.backgroundColor = '';
    }
     this.onSelectQuestion.emit(question);
  }

}
