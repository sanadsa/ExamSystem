import { Component, OnInit } from '@angular/core';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  number = [1,2,3,4,5];
  questionsList : Array<Question>;

  constructor() { 
    this.questionsList = new Array<Question>();
  }

  ngOnInit() {
    this.questionsList.push(
      new Question(1, 'zubi', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('1996|20|05'), ['fds','fsf']),
      new Question(1, 'zubi2', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf']),
      new Question(1, 'zubi2', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf'])
    )
  }

}
