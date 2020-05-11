import { Answer } from 'src/app/models/answer';
import { ConstantFields } from './../../helpers/common-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question } from 'src/app/models/question';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
question: Question;
  questionForm: FormGroup;
  quesId: number;
  field: string;
  answerForm = new FormGroup({
    answers: new FormArray([])
  });
  constantFields: ConstantFields;
  questionId: string;
  answers: Array<Answer>;
  questionType: string[] = ['SingleChoice', 'MultipleSelection'];

  constructor(
    private questionService: QuestionService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.constantFields = new ConstantFields();
    this.answers = new Array<Answer>();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.quesId = +params.get('questionId');
      this.field = params.get('field');
      if (this.quesId != 0) {
        this.questionService.getQuestionById(this.quesId).subscribe(question => {
          debugger;
          this.question = question[0][0];
          this.questionForm = this.initQuesForm();
          this.questionService.getAnswers(this.quesId).subscribe(response => {
            this.answers = response;
            this.answers.forEach(element => {
              this.answersFormArray.push(this.initAnswer(element.Info, element.CorrectAnswer, element.ID));
            });
          });
        });
      } else {
        this.answersFormArray.push(this.initEmptyAnswer());
        this.answersFormArray.push(this.initEmptyAnswer());
        this.questionForm = this.initEmptyQuesForm();
      }
    });

    this.questionForm = this.initEmptyQuesForm();
  }

  private initQuesForm() {
    return this.fb.group({
      question: this.fb.group({
        questionType: [this.question.QuestionType || 'SingleChoice', Validators.required],
        questionText: [this.question.Title || '', Validators.required],
        belowQuestion: [this.question.QuestionContent || '', Validators.required],
        tags: [this.question.tags || '', Validators.required],
        layout: [this.question.Layout || '', Validators.required]
      })
    })  
  }

  private initEmptyQuesForm() {
    return this.fb.group({
      question: this.fb.group({
        questionType: ['SingleChoice', Validators.required],
        questionText: ['', Validators.required],
        belowQuestion: ['', Validators.required],
        tags: ['', Validators.required],
        layout: ['', Validators.required]
      })
    })
  }

  get answersFormArray() {
    return this.answerForm.get('answers') as FormArray;
  }

  private initAnswer(info: string, isCorrect: boolean, id: number) {
    let c = (isCorrect || isCorrect === false) ? false : true;
    return this.fb.group({
      Info: [info, Validators.required],
      IsCorrect: [isCorrect],
      ID: [id]
    });
  }

  private initEmptyAnswer() {
    return this.fb.group({
      Info: ['', Validators.required],
      IsCorrect: [false],
      ID: [0]
    });
  }

  public addAnswer() {
    this.answersFormArray.push(this.initEmptyAnswer());
  }

  public removeAnswer(index: number) {
    this.answersFormArray.removeAt(index);
  }

  public questionFormGroup(formControlName: string) {
    return this.questionForm.get('question').get(formControlName)
  }

  public showQuestion(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    });
  }

  public getQuestionObj() {
    let questionToAdd: Question = {
      Title: this.questionFormGroup('questionText').value,
      QuestionType: this.questionFormGroup('questionType').value,
      QuestionContent: this.questionFormGroup('belowQuestion').value,
      Active: false,
      PossibleAnswers: null,
      LastUpdate: new Date(),
      Field: this.field,
      Layout: this.questionFormGroup('layout').value,
      tags: this.questionFormGroup('tags').value,
      NumOfTests: 0
    }

    return questionToAdd;
  }

  public createQuestion() {
    let questionToAdd = this.getQuestionObj();

    if (this.quesId != 0) {
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

  private editQuestion(questionToEdit) {
    this.questionService.editQuestion(questionToEdit).subscribe(res => {
      this.createAnswers(questionToEdit.ID);
      this.navToQuestionsList();
    }, err => console.log(err));
  }

  private createAnswers(questionId) {
    debugger;
    for (let ansControl of this.answersFormArray['controls']) {
      let answer: Answer = {
        QuestionId: questionId,
        CorrectAnswer: (ansControl.value.IsCorrect === undefined) ? true : ansControl.value.IsCorrect,
        Info: ansControl.value.Info,
        ID: ansControl.value.ID
      }

      if (answer.ID != 0) {
        this.questionService.updateAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      } else {
        this.questionService.addAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      }
    }
  }

  private navToQuestionsList() {
    this.router.navigate([this.constantFields.questionsListRoute, { field: this.field }]);
  }

  public checkCorrectAnswer(index: number) {
    for (let ansControl of this.answersFormArray['controls']) {
      ansControl.value.IsCorrect = false;
    }

    this.answersFormArray['controls'][index].value.IsCorrect = 1;
  }
}
