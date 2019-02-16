import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @ViewChild('field') field: ElementRef;
  studyFields: any[] = ['Development', 'QA', 'Automation', 'Web', 'Cyber'];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeToManageTest(field) {
    this.router.navigate(['/testsList', { field: field }]);
  }

  routeToQuestions(field) {
    this.router.navigate(['/questionList', { field: field }]);
  }
}
