import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TestService } from 'src/app/services/test.service';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  category: string;
  isTestform: boolean = true;
  testForm: FormGroup;
  submitted: boolean;
  languages: string[] = ['Hebrew', 'English'];
  qustion1: Question = {
    Id: 1,
    Field: this.category,
    QuestionType: eQuestionType.SingleChoice,
    QuestionContent: '',
    Title: 'What is the DOM?',
    PossibleAnswers: [''],
    AnswerLayout: eAnswerLayout.Vertical,
    Tags: ['javascript', 'advanced'],
    LastUpdate: new Date()
  }
  qustion2: Question = {
    Id: 2,
    Field: this.category,
    QuestionType: eQuestionType.SingleChoice,
    QuestionContent: '',
    Title: 'What are Zubi?',
    PossibleAnswers: [''],
    AnswerLayout: eAnswerLayout.Vertical,
    Tags: ['javascript'],
    LastUpdate: new Date()
  }
  qustion3: Question = {
    Id: 3,
    Field: this.category,
    QuestionType: eQuestionType.SingleChoice,
    QuestionContent: '',
    Title: 'Kiki Do you Love me ?',
    PossibleAnswers: [''],
    AnswerLayout: eAnswerLayout.Vertical,
    Tags: ['typescript'],
    LastUpdate: new Date()
  }

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
      this.category = params.get('category');
    })

    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      ownerEmail: ['', Validators.required],
      passingGrade: ['', Validators.required],
      instructions: ['', Validators.required],
      msgSuccess: ['', Validators.required],
      msgFailure: ['', Validators.required],
      language: new FormControl(),
      reviewAnswers : new FormControl(),
      time : ['',Validators.required],
      questions: new FormControl()
    });

    this.questionsList.push(this.qustion1);
    this.questionsList.push(this.qustion2);
    this.questionsList.push(this.qustion3);
    this.questionsFilteredList = this.questionsList;
  }

  filterByTags() {
    // this.questionsFilteredList = this.questionsList.filter(q => q.content.toUpperCase().includes(this.filterBy.toUpperCase()));
    //  this.questionsFilteredList= this.questionsList.filter(q => q.tags.forEach(t => {
    //    t.toUpperCase().includes(this.filterBy.toUpperCase());
    //  }));
  }

  addQuestion(data) {
    var dataExist = this.selectedQuestions.find(q => q.Id == data.Id);
    if (!dataExist) {
      this.selectedQuestions.push(data);
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
    this.testForm.value.questions = [1,2];
    this.testSerive.addTest(this.testForm.value).subscribe(test => {
      alert('succes');
    }, err => console.log(err));
  }

  get f() { return this.testForm.controls; }

}
