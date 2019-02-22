import { Answer } from 'src/app/models/answer';
import { ConstantFields } from './../../helpers/common-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @ViewChild('selectedType') selectedType: ElementRef;
  question: Question;
  questionForm: FormGroup;
  answerForm = new FormGroup({
    answers: new FormArray([])
  });
  constantFields: ConstantFields;
  submitted: boolean;
  isSingle = true;
  questionType = eQuestionType;
  questionId: string;
  answers: Array<Answer>;

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.constantFields = new ConstantFields();
    this.answers = new Array<Answer>();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let jsonObj: any = JSON.parse(params.get('question'));
      this.question = <Question>jsonObj;
      if (this.question.ID != undefined) {
        this.questionService.getAnswers(this.question.ID).subscribe(response => {
          this.answers = response;
          this.answers.forEach(element => {
            this.answersFormArray.push(this.initAnswers(element.Info, element.CorrectAnswer, element.ID));
          });
        });
      } else {
        this.answersFormArray.push(this.initAnswers());
        this.answersFormArray.push(this.initAnswers());
      }
    });

    this.questionForm = this.fb.group({
      question: this.fb.group({
        questionType: [this.question.QuestionType || '', Validators.required],
        questionText: [this.question.Title || '', Validators.required],
        belowQuestion: [this.question.QuestionContent || '', Validators.required],
        tags: [this.question.tags || '', Validators.required],
        layout: [this.question.Layout || '', Validators.required]
      })
    })
  }

  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2).reverse();
  }

  get answersFormArray() {
    return this.answerForm.get('answers') as FormArray;
  }
  private initAnswers(info = '', isCorrect = false, id = 0) {
    let c = (isCorrect || isCorrect === false) ? false : true;
    return this.fb.group({
      Info: [info, Validators.required],
      IsCorrect: [isCorrect],
      ID: [id]
    });
  }

  public addAnswer() {
    this.answersFormArray.push(this.initAnswers());
  }

  public removeAnswer(index) {
    this.answersFormArray.removeAt(index);
  }

  get questionTypeF() {
    return this.questionForm.get('question').get('questionType');
  }
  get questionText() {
    return this.questionForm.get('question').get('questionText');
  }
  get belowQuestion() {
    return this.questionForm.get('question').get('belowQuestion');
  }
  get tags() {
    return this.questionForm.get('question').get('tags');
  }
  get layout() {
    return this.questionForm.get('question').get('layout');
  }

  public setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[0]) ? true : false;
  }

  public answerLayout(layout) {
    this.question.Layout = layout;
  }

  public createQuestion() {
    let questionToAdd: Question = {
      Title: this.questionText.value,
      QuestionType: this.questionForm.get('question.questionType').value,
      QuestionContent: this.questionForm.get('question.belowQuestion').value,
      Active: false,
      PossibleAnswers: null,
      LastUpdate: new Date(),
      Field: this.question.Field,
      Layout: this.layout.value,
      tags: this.questionForm.get('question.tags').value
    }

    if (this.question.ID != undefined) {
      questionToAdd.ID = this.question.ID;
      this.editQuestion(questionToAdd);
    } else {
      this.questionService.addQuestion(questionToAdd).subscribe(questionId => {
        debugger;
        this.questionId = <string>questionId;
        this.createAnswers(questionId);
        this.navToQuestionsList();
      }, err => console.log(err));
    }
  }

  private editQuestion(questionToEdit) {
    this.questionService.editQuestion(questionToEdit).subscribe(res => {
      this.createAnswers(questionToEdit.ID);
      this.navToQuestionsList();
    }, err => console.log(err));
  }

  private navToQuestionsList() {
    this.router.navigate([this.constantFields.questionsListRoute, { field: this.question.Field }]);
  }

  public checkRadio(i) {
    for (let ansControl of this.answersFormArray['controls']) {
      ansControl.value.IsCorrect = false;
    }
    this.answersFormArray['controls'][i].value.IsCorrect = 1;
  }

  private createAnswers(questionId) {
    for (let ansControl of this.answersFormArray['controls']) {
      console.log(ansControl);
      let answer: Answer = {
        QuestionId: questionId,
        CorrectAnswer: (ansControl.value.IsCorrect === undefined) ? true : ansControl.value.IsCorrect,
        Info: ansControl.value.Info,
        ID: ansControl.value.ID
      }
      if (answer.ID != 0) {
        debugger;
        this.questionService.updateAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      } else {
        this.questionService.addAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      }
    }
  }

}
