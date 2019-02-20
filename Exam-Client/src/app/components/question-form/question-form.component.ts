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
  @ViewChild('vertical') vertical: ElementRef;
  @ViewChild('horizontal') horizontal: ElementRef;
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
            this.answersFormArray.push(this.initAnswers(element.Info, element.CorrectAnswer));
          });
        });
      } else {
        this.answersFormArray.push(this.initAnswers('', false));
        this.answersFormArray.push(this.initAnswers('', false));
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
  initAnswers(info, isCorrect) {
    let c = isCorrect == 0 ? false : true;
    return this.fb.group({
      Info: [info, Validators.required],
      IsCorrect: [c]
    });
  }
  addAnswer() {
    this.answersFormArray.push(this.initAnswers('', false));
  }
  removeAnswer(index) {
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

  setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[0]) ? true : false;
  }

  answerLayout(layout) {
    this.question.Layout = layout;
  }

  createQuestion() {
    var questionToAdd: Question = {
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
        this.questionId = <string>questionId;
        this.createAnswers(questionId);
        this.navToQuestionsList();
      }, err => console.log(err));
    }
  }

  editQuestion(questionToEdit) {
    this.questionService.editQuestion(questionToEdit).subscribe(res => {
      // delete 
      // add - this.createAnswers(questionToEdit.ID);
      this.navToQuestionsList();
    }, err => console.log(err));
  }

  navToQuestionsList() {
    this.router.navigate([this.constantFields.questionsListRoute, { field: this.question.Field }]);
  }

  createAnswers(questionId) {
    for (let ansControl of this.answersFormArray['controls']) {
      var answer = {
        QuestionId: questionId,
        CorrectAnswer: ansControl.value.IsCorrect,
        Info: ansControl.value.Info
      }
      this.questionService.addAnswer(answer).subscribe(response => {
      }, ansErr => console.log(ansErr));
    }
  }

}
