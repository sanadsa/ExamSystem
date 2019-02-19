import { QuestionService } from './../../services/question.service';
import { Component, OnInit, Input } from '@angular/core';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantFields } from 'src/app/helpers/common-constants';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  number = [1, 2, 3, 4, 5];
  @Input() questionsList: Array<Question>;
  field: string;
  constFields: ConstantFields;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: QuestionService) {
    this.questionsList = new Array<Question>();
    this.constFields = new ConstantFields();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get(this.constFields.category);
    })
    this.service.getQuestions(this.field).subscribe(response => {
      this.questionsList = response;
    });
  }

  navMainMenu() {
    this.router.navigate([this.constFields.mainMenu]);
  }

  navToAddQuestion() {
    const question: Question = {
      Field: this.field,
      QuestionType: eQuestionType.SingleChoice,
      Title: '',
      QuestionContent: '',
      Active: false,
      LastUpdate: new Date(),
      PossibleAnswers: null,
      Layout: eAnswerLayout.Horizontal,
      tags: ''
    }
    this.router.navigate([this.constFields.questionFormRoute, { question: JSON.stringify(question) }]);
  }

  deleteQuestion(id) {
    const index = this.questionsList.findIndex(q => q.ID == id);
    this.questionsList.splice(index, 1);
    this.service.deleteAnswers(id).subscribe(r => {
      this.service.deleteQuestion(id).subscribe(res => {
      });
    })
  }

}
