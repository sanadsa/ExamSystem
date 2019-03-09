import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';
import { disableDebugTools } from '@angular/platform-browser';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  minIndex: number = 0;
  maxIndex: number = 10;
  field: string;
  testForm: FormGroup;
  submitted: boolean;
  languages: string[] = ['Hebrew', 'English'];
  questionsList: Question[] = [];
  questionsFilteredList: any[] = [];
  selectedQuestionsId: number[] = [];
  filterBy: string;
  test: Test = {};
  isAllQuestionsSelected: boolean = false;

  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private testSerive: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
      const testId = params.get('testId');
      if (testId) {
        this.testSerive.getTestById(testId, this.field).subscribe(result => {
          this.test = result[0][0];
          this.questionsFilteredList = result[1];
          this.questionsFilteredList.forEach(q => {
            if (q.IsInTest == 1) {
              this.selectedQuestionsId.push(q.ID);
            }
          });
        });
      }
      this.getmoreQuestions();
    });
    this.generateForm();
  }

  private generateForm(): any {
    debugger;
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

  public navToTestsList() {
    this.router.navigate(['/testsList', { field: this.field }]);
  }

  public filterByTags() {
    // this.questionsFilteredList = this.questionsList.filter(q => q.content.toUpperCase().includes(this.filterBy.toUpperCase()));
    //  this.questionsFilteredList= this.questionsList.filter(q => q.tags.forEach(t => {
    //    t.toUpperCase().includes(this.filterBy.toUpperCase());
    //  }));
  }

  public addQuestion(data) {
    debugger;
    let dataExist = this.selectedQuestionsId.find(ID => ID == data.ID);
    if (!dataExist) {
      this.selectedQuestionsId.push(data.ID);
    } else {
      const indexOfQuestion = this.selectedQuestionsId.findIndex(ID => ID == data.ID);
      this.selectedQuestionsId.splice(indexOfQuestion, 1);
    }
  }

  private addNotSelectedQuestion(question) {
    let questinInSelectedList = this.selectedQuestionsId.find(ID => ID == question.ID);
    if (!questinInSelectedList) {
      this.selectedQuestionsId.push(question.ID);
    }  
  }

  private removeQuesiotn(question) {
    const indexOfQuestion = this.selectedQuestionsId.findIndex(ID => ID == question.ID);
    this.selectedQuestionsId.splice(indexOfQuestion, 1);
  }

  public selectAllFiltered() {
    if (this.isAllQuestionsSelected) {
      this.questionsFilteredList.forEach(q => {
        this.removeQuesiotn(q);
        q.IsInTest = false;
      });  
      this.isAllQuestionsSelected = false;
    } else {
      this.questionsFilteredList.forEach(q => {
        this.addNotSelectedQuestion(q);
        q.IsInTest = true;
      });
      this.isAllQuestionsSelected = true;
    }
  }

  public createTest() {
    debugger;
    if (this.test.ID) {
      this.generateForm();
    }
    this.submitted = true;
    this.testForm.value.questions = this.selectedQuestionsId;
    if (this.testForm.invalid) {
      return;
    }
    this.testSerive.addTest(this.testForm.value).subscribe(test => {
      this.navToTestsList();
    }, err => console.log(err));
  }

  public getmoreQuestions() {
    this.questionService.getQuestions(this.field, this.minIndex, this.maxIndex).subscribe(questions => {
      questions.forEach(q => {
        this.questionsFilteredList.push(q);
      });
      this.minIndex = this.maxIndex;
      this.maxIndex = this.maxIndex + 10;
    });
  }

  get f() { return this.testForm.controls; }

}
