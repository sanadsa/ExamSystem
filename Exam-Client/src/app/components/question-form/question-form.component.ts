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
  questionForm = new FormGroup({
    question: new FormGroup({
      questionType: new FormControl('', Validators.required),
      questionText: new FormControl('', Validators.required),
      belowQuestion: new FormControl('', Validators.required),
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
  }

  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2).reverse();
  }

  get answers() {
    return this.answerForm.get('answers') as FormArray;
  }

  get answersContent() {
    return this.answers.get('answer') as FormArray
  }

  get answer() {
    return this.answers.get('answer');
  }
  initAnswers() {
    // return this.fb.group({
    //   answer: this.fb.array([
    //     this.initAns()
    //   ])
    // });
    return this.fb.group({
      Info: ['', Validators.required],
      IsCorrect: [false]
    });
  }
  initAns() {
    return this.fb.group({
      Info: ['', Validators.required],
      IsCorrect: [false, Validators.required]
    });
  }
  addAnswer() {
    this.answers.push(this.initAnswers());
  }
  removeAnswer(index) {
    this.answers.removeAt(index);
    //this.answersContent.removeAt(index);
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

  createQuestion() {    
    var questionToAdd = {
      Title: this.questionForm.get('question.questionText').value,
      QuestionType: this.questionForm.get('question.questionType').value,
      QuestionContent: this.questionForm.get('question.belowQuestion').value,
      Active: false,
      LastUpdate: new Date(),
      Field: this.question.Field
    }

    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    }
    this.questionService.addQuestion(questionToAdd).subscribe(questionId => {
      debugger;
      this.questionId = <string>questionId;
      console.log('question id: ' + questionId);
      for (let ansControl of this.answers['controls']) {        
        var answer = {  
          QuestionId: questionId,
          CorrectAnswer: ansControl.value.IsCorrect,
          Info: ansControl.value.Info
        }
        this.questionService.addAnswer(answer).subscribe(response => {
        }, ansErr => console.log(ansErr));
      }
      this.router.navigate([this.constantFields.questionsListRoute, { category: this.question.Field }]);
    }, err => console.log(err));
  }
}
