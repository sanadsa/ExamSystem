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

  constructor(private router: Router,
    private questionService: QuestionService) { 
      this.constFields = new ConstantFields();
    }
  ngOnInit() {
  }

  keys(): Array<string> {
    const keys = Object.keys(this.question.QuestionType);
    return keys.slice(keys.length / 2);
  }

  navToEdit() {
    debugger;
    this.router.navigate(['/editQuestion', { question: JSON.stringify(this.question) }]);
  }

  navToQuestionList() {
    this.router.navigate([this.constFields.questionsListRoute, { field: this.question.Field }])
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.question.ID).subscribe(res =>{
      this.navToQuestionList();
    });
  }

  test(question) {
    this.onSelectQuestion.emit(question);
  }

}
