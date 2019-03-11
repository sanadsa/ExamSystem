import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  @ViewChild('field') field: ElementRef;
  studyFields: any[] = ['Development', 'QA', 'Automation', 'Web', 'Cyber'];
  constructor(private router: Router, private authenticationService:AuthenticationService) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
  }

  routeToManageTest(field: string): void {
    this.router.navigate(['/testsList', { field: field }]);
  }

  routeToQuestions(field: string): void {
    this.router.navigate(['/questionList', { field: field }]);
  }

  routeToReports(field: string): void {
    this.router.navigate(['/reports', { field: field }]);
  }

  routeToExams(field: string): void {
    this.router.navigate(['/chooseExam', { field: field }]);
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
