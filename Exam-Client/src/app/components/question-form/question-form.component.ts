import { ConstantFields } from './../../helpers/common-constants';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Question, eQuestionType } from 'src/app/models/question';

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
  constantFields: ConstantFields;
  quesForm: FormGroup;
  submitted: boolean;
  isSingle = true;
  question: Question;
  questionType = eQuestionType;
  keys(): Array<string> {
    const keys = Object.keys(this.questionType);
    return keys.slice(keys.length / 2).reverse();
  }

  addAnswer() {
    const control = <FormArray>this.quesForm.controls.answers;
    control.push(
      this.formBuilder.group({
        answer: [''],
      })
    )
  }
  removeAnswer(i: number) {
    const control = <FormArray>this.quesForm.controls.answers;
    control.removeAt(i);
  }

  constructor(private questionService: QuestionService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { 
      this.constantFields = new ConstantFields();
    }

  ngOnInit() {
    this.quesForm = this.formBuilder.group({
      answers: this.formBuilder.array([['','']])
    });
    this.route.paramMap.subscribe(params => {
      let jsonObj: any = JSON.parse(params.get('question')); // string to generic object first
      let jsonToQuestion: Question = <Question>jsonObj;
      this.question = jsonToQuestion;
    });
  }

  setIsSingle() {
    const choice = this.selectedType.nativeElement.value;
    this.isSingle = (choice === this.keys()[0]) ? true : false;
  }

  createQuestion() {
    var test = {
      Title: this.questionForm.get('question.questionText').value,
      QuestionType: this.questionForm.get('question.questionType').value,
      QuestionContent: this.questionForm.get('question.belowQuestion').value,
      Active: false,
      LastUpdate: new Date(),
    }
    console.log(test.Title + ' ' + test.QuestionContent+ ' ' +test.QuestionType+ ' ' +test.LastUpdate);
    var ob = {
      Title: 'second',
      QuestionType: 'Multiple',
      QuestionContent: 'do you?',
      Active: true,
      LastUpdate: new Date()
    };

    // this.questionService.addQuestion(ob).subscribe(question => {
    //   alert('success');
    // }, err => console.log(err));
    // this.submitted = true;
    // if(this.questionForm.invalid){
    //   return;
    // }
  }

}
