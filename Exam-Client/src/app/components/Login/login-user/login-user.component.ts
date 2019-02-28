import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/models/test';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  examId: string;
  field: string;
  loginUserForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get("examId");
      this.field = params.get("field");
    });

    this.loginUserForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  public addUser() {
    // this.userService.addUser(JSON.stringify(this.loginUserForm)).subscribe(res => {
    // }, err => console.log(err));

    this.navToExam();
  }

  private navToExam() {
    this.router.navigate(["/exam", { examId: this.examId }]);
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
