import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-exam-tab-control',
  templateUrl: './exam-tab-control.component.html',
  styleUrls: ['./exam-tab-control.component.css']
})
export class ExamTabControlComponent implements OnInit {

  @Input() questions:Question[];
  @Output() onSelectTab = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getQuestion(index){
    this.onSelectTab.emit(index);
  }

}
