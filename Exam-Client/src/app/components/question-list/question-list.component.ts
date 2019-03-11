import { QuestionService } from './../../services/question.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList, Directive, PipeTransform } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantFields } from 'src/app/helpers/common-constants';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Input() questionsList: Array<Question>;
  filteredQuestionsList: Observable<Question[]>;
  field: string;
  constFields: ConstantFields;
  filterBy: string;
  filter = new FormControl('');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: QuestionService) {
    this.constFields = new ConstantFields();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get(this.constFields.category);
    })
    this.service.getQuestions(this.field, 0, 10).subscribe(response => {
      this.questionsList = response.reverse();
      this.filteredQuestionsList = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    });
  }

  private search(text: string): Array<Question> {
    return this.questionsList.filter(question => {
      const term = text.toLowerCase();
      return question.Title.toLowerCase().includes(term)
        || question.tags.toLowerCase().includes(term);
    });
  }

  public navMainMenu() {
    this.router.navigate([this.constFields.mainMenu]);
  }

  public navToAddQuestion() {
    const question: Question = {
      Field: this.field,
      QuestionType: null,
      Title: '',
      QuestionContent: '',
      Active: false,
      LastUpdate: new Date(),
      PossibleAnswers: null,
      Layout: null,
      tags: '',
      NumOfTests: 0
    }
    this.router.navigate([this.constFields.questionFormRoute, { questionId: 0, field: this.field }]);
  }

  public navToEdit(questionId) {
    this.router.navigate([this.constFields.questionFormRoute, { questionId: questionId, field: this.field }]);
  }

  public deleteQuestion(id: number) {
    let index;
    this.filteredQuestionsList.subscribe(questionList => {
      index = questionList.findIndex(question => question.ID == id);
      questionList.splice(index, 1);
      this.questionsList = questionList;
    });
    this.filteredQuestionsList = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    
    this.service.deleteQuestion(id).subscribe(r => {
    }, err => console.log(err))
  }

}
