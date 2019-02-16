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
  questionForm = new FormGroup({
    question: new FormGroup({
      questionType: new FormControl('', Validators.required),
      questionText: new FormControl('', Validators.required),
      belowQuestion: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    })
  });
  answerForm = new FormGroup({
    answers: new FormArray([this.initAnswers(), this.initAnswers()]),
  });
  constantFields: ConstantFields;
  submitted: boolean;
  isSingle = true;
  question: Question;
  questionType = eQuestionType;
  questionId: string;

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
    this.constantFields = new ConstantFields();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let jsonObj: any = JSON.parse(params.get('question'));
      let jsonToQuestion: Question = <Question>jsonObj;
      this.question = jsonToQuestion;
    });

    // this.questionForm = this.fb.group({
    //   question: [
    //     questionType: [this.question.QuestionType || '']
    //   ]        
    // })

    // this.testForm = this.formBuilder.group({
    //   name: [this.test.TestName || '', Validators.required],
    //   ownerEmail: [this.test.OwnerEmail || '', Validators.required],
    //   passingGrade: [this.test.PassingGrade || '', Validators.required],
    //   instructions: [this.test.Instructions || '', Validators.required],
    //   msgSuccess: ['', Validators.required],
    //   msgFailure: ['', Validators.required],
    //   language: [this.test.Language || ''],
    //   reviewAnswers: [this.test.ReviewAnswers || ''],
    //   time: [this.test.Time || '', Validators.required],
    //   questions: [] = [],
    //   field: this.field
    // })
  }

  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2).reverse();
  }

  get answers() {
    return this.answerForm.get('answers') as FormArray;
  }  
  initAnswers() {
    return this.fb.group({
      Info: ['', Validators.required],
      IsCorrect: [false]
    });
  }  
  addAnswer() {
    this.answers.push(this.initAnswers());
  }
  removeAnswer(index) {
    this.answers.removeAt(index);
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

  setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[0]) ? true : false;
  }

  answerLayout(layout) {
    this.question.Layout = layout;
  }

  createQuestion() {
    var questionToAdd = {
      Title: this.questionForm.get('question.questionText').value,
      QuestionType: this.questionForm.get('question.questionType').value,
      QuestionContent: this.questionForm.get('question.belowQuestion').value,
      Active: false,
      LastUpdate: new Date(),
      Field: this.question.Field,
      Layout: this.question.Layout,
      tags: this.questionForm.get('question.tags').value
    }    

    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }
    this.questionService.addQuestion(questionToAdd).subscribe(questionId => {
      debugger;
      this.questionId = <string>questionId;
      for (let ansControl of this.answers['controls']) {        
        var answer = {  
          QuestionId: questionId,
          CorrectAnswer: ansControl.value.IsCorrect,
          Info: ansControl.value.Info
        }        
        this.questionService.addAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      }
      this.router.navigate([this.constantFields.questionsListRoute, { field: this.question.Field }]);
    }, err => console.log(err));
  }
}
