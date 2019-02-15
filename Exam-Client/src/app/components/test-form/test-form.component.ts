import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  field: string;
  isTestform: boolean = true;
  testForm: FormGroup;
  submitted: boolean;
  languages: string[] = ['Hebrew', 'English'];
  questionsList: Question[] = [];
  questionsFilteredList: Question[] = [];
  selectedQuestionsId: number[] = [];
  filterBy: string;
  test: Test = {}

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private testSerive: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      debugger;
      this.field = params.get('field');
      const testId = params.get('testId');
      if (testId) {
        this.testSerive.getTestById(testId).subscribe(result => {
          this.test = result[0][0];
          debugger;
          this.questionsFilteredList = result[1];
        });
      } else {
        this.questionService.getQuestions(this.field).subscribe(questions => {
          this.questionsFilteredList = questions;
        });
      }
    })

    this.testForm = this.formBuilder.group({
      name: [this.test.TestName || '', Validators.required],
      ownerEmail: [this.test.OwnerEmail || '', Validators.required],
      passingGrade: [this.test.PassingGrade || '', Validators.required],
      instructions: [this.test.Instructions || '', Validators.required],
      msgSuccess: ['', Validators.required],
      msgFailure: ['', Validators.required],
      language: [this.test.Language || ''],
      reviewAnswers: [this.test.ReviewAnswers || ''],
      time: [this.test.Time || '', Validators.required],
      questions: [] = [],
      field: this.field
    });

    // this.questionsList.push(this.qustion1);
    // this.questionsList.push(this.qustion2);
    // this.questionsList.push(this.qustion3);

    // this.questionsFilteredList = this.questionsList;
  }
  generateForm(): any {
    this.testForm = this.formBuilder.group({
      name: [this.test.TestName || '', Validators.required],
      ownerEmail: [this.test.OwnerEmail || '', Validators.required],
      passingGrade: [this.test.PassingGrade || '', Validators.required],
      instructions: [this.test.Instructions || '', Validators.required],
      msgSuccess: ['', Validators.required],
      msgFailure: ['', Validators.required],
      language: [this.test.Language || ''],
      reviewAnswers: [this.test.ReviewAnswers || ''],
      time: [this.test.Time || '', Validators.required],
      questions: [] = [],
      field: this.field
    });
  }

  filterByTags() {
    // this.questionsFilteredList = this.questionsList.filter(q => q.content.toUpperCase().includes(this.filterBy.toUpperCase()));
    //  this.questionsFilteredList= this.questionsList.filter(q => q.tags.forEach(t => {
    //    t.toUpperCase().includes(this.filterBy.toUpperCase());
    //  }));
  }

  addQuestion(data) {
    var dataExist = this.selectedQuestionsId.find(ID => ID == data.ID);
    if (!dataExist) {
      this.selectedQuestionsId.push(data.ID);
    } else {
      const indexOfQuestion = this.selectedQuestionsId.findIndex(ID => ID == data.ID);
      this.selectedQuestionsId.splice(indexOfQuestion, 1);
    }
  }

  selectAllFiltered() {
    this.questionsFilteredList.forEach(q => {
      this.addQuestion(q);
    });
  }

  createTest() {
    this.submitted = true;
    this.testForm.value.questions = this.selectedQuestionsId;
    if (this.testForm.invalid) {
      return;
    }
    this.testSerive.addTest(this.testForm.value).subscribe(test => {
      alert('succes');
    }, err => console.log(err));
  }

  get f() { return this.testForm.controls; }

}
