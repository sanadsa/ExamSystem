import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, eQuestionType, eAnswerLayout } from 'src/app/models/question';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  category: string;

  questionsList:Question[]=[]
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.category = params.get('category');
    })

    this.questionsList.push(
      new Question('didos', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('1996|20|05'), ['fds','fsf']),
      new Question('kusayev', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf']),
      new Question('omer', eQuestionType.SingleChoice, 'some text', 'some text below', null, eAnswerLayout.Horizontal, new Date('2018|20|05'), ['fds','fsf'])
    )
  }

}
