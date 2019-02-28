import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  examId: string;
  field: string;
  exam: Test;
  loginUserForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private testService: TestService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get("examId");
      this.field = params.get("field");
    });

    this.testService.getTestById(this.examId, this.field).subscribe(req => {
      this.exam = req;
    }, err => console.log(err));

    this.loginUserForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  get firstName() {
    return this.loginUserForm.get("firstName");
  }
  get lastName() {
    return this.loginUserForm.get("lastName");
  }
  get email() {
    return this.loginUserForm.get("email");
  }

}
