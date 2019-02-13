import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';


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
  // qustion1: Question = {
  //   Id: 1,
  //   Field: this.field,
  //   QuestionType: eQuestionType.SingleChoice,
  //   QuestionContent: '',
  //   Title: 'What is the DOM?',
  //   PossibleAnswers: [''],
  //   AnswerLayout: eAnswerLayout.Vertical,
  //   Tags: ['javascript', 'advanced'],
  //   LastUpdate: new Date()
  // }
  // qustion2: Question = {
  //   Id: 2,
  //   Field: this.field,
  //   QuestionType: eQuestionType.SingleChoice,
  //   QuestionContent: '',
  //   Title: 'What are Zubi?',
  //   PossibleAnswers: [''],
  //   AnswerLayout: eAnswerLayout.Vertical,
  //   Tags: ['javascript'],
  //   LastUpdate: new Date()
  // }
  // qustion3: Question = {
  //   Id: 3,
  //   Field: this.field,
  //   QuestionType: eQuestionType.SingleChoice,
  //   QuestionContent: '',
  //   Title: 'Kiki Do you Love me ?',
  //   PossibleAnswers: [''],
  //   AnswerLayout: eAnswerLayout.Vertical,
  //   Tags: ['typescript'],
  //   LastUpdate: new Date()
  // }

  questionsList: Question[] = [];
  questionsFilteredList: Question[] = [];
  selectedQuestions: Question[] = [];
  filterBy: string
  constructor(private route: ActivatedRoute,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private testSerive: TestService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
    })

    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      ownerEmail: ['', Validators.required],
      passingGrade: ['', Validators.required],
      instructions: ['', Validators.required],
      msgSuccess: ['', Validators.required],
      msgFailure: ['', Validators.required],
      language: new FormControl(),
      reviewAnswers: new FormControl(),
      time: ['', Validators.required],
      questions:this.selectedQuestions,
      field: this.field
    });

    // this.questionsList.push(this.qustion1);
    // this.questionsList.push(this.qustion2);
    // this.questionsList.push(this.qustion3);
    this.questionService.getQuestions(this.field).subscribe(questions => {
      debugger;
      this.questionsFilteredList = questions;
    })
    // this.questionsFilteredList = this.questionsList;
  }

  filterByTags() {
    // this.questionsFilteredList = this.questionsList.filter(q => q.content.toUpperCase().includes(this.filterBy.toUpperCase()));
    //  this.questionsFilteredList= this.questionsList.filter(q => q.tags.forEach(t => {
    //    t.toUpperCase().includes(this.filterBy.toUpperCase());
    //  }));
  }

  addQuestion(data) {
    var dataExist = this.selectedQuestions.find(q => q.ID == data.ID);
    if (!dataExist) {
      debugger;
      this.selectedQuestions.push(data);
      console.log(this.testForm.controls.questions.value);
      
      // this.testForm.controls.questions.value.push(data);
    } else {
      const indexOfQuestion = this.selectedQuestions.findIndex(q => q.ID == data.ID);
      console.log();
      
      this.selectedQuestions.splice(indexOfQuestion, 1);
    }

  }

  selectAllFiltered() {
    this.questionsFilteredList.forEach(q => {
      this.addQuestion(q);
    });
  }

  createTest() {
    this.submitted = true;
    if (this.testForm.invalid) {
      return;
    }
    debugger;
    this.testSerive.addTest(this.testForm.value).subscribe(test => {
      alert('succes');
    }, err => console.log(err));
  }

  get f() { return this.testForm.controls; }

}
