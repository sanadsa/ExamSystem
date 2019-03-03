import { TestService } from './../../../services/test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/models/test';

@Component({
  selector: 'app-choose-exam',
  templateUrl: './choose-exam.component.html',
  styleUrls: ['./choose-exam.component.css']
})
export class ChooseExamComponent implements OnInit {
  field: string;
  exams: Test[] = [];

  constructor(private route: ActivatedRoute,
    private testService: TestService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.field = params.get('field');
    });

    this.testService.getTestsByField(this.field).subscribe((exams: Test[]) => {
      this.exams = exams;
    })
  }

  goToUserLogin(examId: number, field: string) {
    this.router.navigate(["/examineeForm", { examId: examId, field: field }]);
  }

}
