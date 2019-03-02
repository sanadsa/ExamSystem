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
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["", Validators.compose([Validators.required, Validators.maxLength(10)])]
    });
  }

  public addUser() {
    let userToAdd = {
      firstName: this.userForm.firstName.value,
      lastName: this.userForm.lastName.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value
    }
    this.userService.addUser(userToAdd).subscribe(res => {
    }, err => console.log(err));

    this.navToExam();
  }

  private navToExam() {
    this.router.navigate(["/exam", { examId: this.examId }]);
  }

  get userForm() {
    return this.loginUserForm.controls;
  }
  
}
