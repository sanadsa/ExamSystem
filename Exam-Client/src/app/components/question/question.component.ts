import { QuestionModalComponent } from './../question-modal/question-modal.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() isTestform: boolean;
  @Output() onSelectQuestion: EventEmitter<any> = new EventEmitter();
  @Output() onOpenModal: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }
  ngOnInit() {
  }
  keys(): Array<string> {
    const keys = Object.keys(this.question.QuestionType);
    return keys.slice(keys.length / 2);
  }
  showQuestion() {
    this.onOpenModal.emit(this.question);
  }

  navToEdit() {
    debugger;
    this.router.navigate(['/editQuestion', { question: JSON.stringify(this.question) }]);
  }
  test(question) {
    this.onSelectQuestion.emit(question);
  }

}
