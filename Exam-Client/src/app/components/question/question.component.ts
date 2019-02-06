import { Component, OnInit, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  keys(): Array<string> {
    const keys = Object.keys(this.question.Type);
    return keys.slice(keys.length / 2);
  }

  navToEdit() {
    debugger;
    this.router.navigate(['/editQuestion', { question: JSON.stringify(this.question)  }]);
  }
}
