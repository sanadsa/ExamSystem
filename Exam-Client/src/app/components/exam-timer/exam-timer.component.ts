import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'es-exam-timer',
  templateUrl: './exam-timer.component.html',
  styleUrls: ['./exam-timer.component.css']
})
export class ExamTimerComponent implements OnInit {
  @Input() totalMinutes: number;
  sec: number = 0;
  isExamStarted: boolean = true;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.isExamStarted) {
      this.updateTimer();
    }
  }

  private updateTimer() {
    setInterval(() => {
      if (this.totalMinutes != 0) {
        if (this.sec == 0) {
          this.sec = 60;
          this.totalMinutes--;
        } else {
          this.sec--;
        }
      }
    }, 1000);
  }

}
