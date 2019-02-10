import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';


@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  category: string;
  testform: boolean = true;
  // qustion1: Question = {
  //   id: 1,
  //   field: this.category,
  //   type: eQuestionType.SingleChoice,
  //   content: 'What is the DOM?',
  //   textBelow: '',
  //   possibleAnswers: [''],
  //   answerLayout: eAnswerLayout.Vertical,
  //   tags: ['javascript', 'advanced'],
  //   lastUpdate: new Date()
  // }
  // qustion2: Question = {
  //   id: 2,
  //   field: this.category,
  //   type: eQuestionType.SingleChoice,
  //   content: 'Sanad?',
  //   textBelow: '',
  //   possibleAnswers: [''],
  //   answerLayout: eAnswerLayout.Vertical,
  //   tags: ['javascript'],
  //   lastUpdate: new Date()

  // }

  questionsList: Question[] = [];
  questionsFilteredList: Question[] = [];
  selectedQuestions: Question[] = [];
  filterBy: string
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
    })
    // this.questionsList.push(this.qustion1);
    // this.questionsList.push(this.qustion2);
    this.questionsFilteredList = this.questionsList;
  }

  filterByTags() {
    // this.questionsFilteredList = this.questionsList.filter(q => q.content.toUpperCase().includes(this.filterBy.toUpperCase()));
    //  this.questionsFilteredList= this.questionsList.filter(q => q.tags.forEach(t => {
    //    t.toUpperCase().includes(this.filterBy.toUpperCase());
    //  }));
  }

  addQuestion(data) {
    var dataExist = this.selectedQuestions.find(q => q.Id == data.id);
    if (!dataExist) {
      this.selectedQuestions.push(data);
    } 
  }

  selectAllFiltered(){
    this.questionsFilteredList.forEach(q=>{
      this.addQuestion(q);
    });    
  }

}
