import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @ViewChild('category') test: ElementRef;
  studyFields: any[] = ['Development', 'QA', 'Automation'];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  routeToManageTest(category) {
    this.router.navigate(['/testsList', { category: category }]);
  }


}
