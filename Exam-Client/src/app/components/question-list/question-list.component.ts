import { Component, OnInit,Input } from '@angular/core';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  number = [1,2,3,4,5];
  @Input() questionsList : Array<Question>;

  constructor(private router: Router) { 
    this.questionsList = new Array<Question>();
  }

  ngOnInit() {
    // this.questionsList.push(
    //   new Question('didos', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('1996|20|05'), ['fds','fsf']),
    //   new Question('kusayev', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf']),
    //   new Question('omer', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf'])
    // )
  }

  // navToAddQuestion() {
  //   this.router.navigate(['/addQuestion', { question: JSON.stringify(new Question('',eQuestionType.SingleChoice, '', '', [], eAnswerLayout.Horizontal, new Date(), []))  }]);
  // }

}
