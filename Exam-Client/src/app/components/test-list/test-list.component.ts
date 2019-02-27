import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  field: string;
  tests: Test[] = [];
  constructor(private route: ActivatedRoute,
     private testSerive: TestService,
     private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
    });
    this.testSerive.getTestsByField(this.field).subscribe((tests: Test[]) => {
      debugger;
      this.tests = tests;
    })
  }

  public navToMenu() {
    this.router.navigate(['/mainmenu']);
  }
}
