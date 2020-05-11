import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService, IAuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginForm: FormGroup
  submitted: boolean;
  currentUser: any;
  authenticationService: IAuthenticationService;

  constructor(private formBuilder: FormBuilder,
    authenticationService: AuthenticationService,
    private router: Router) {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.router.navigate(['/mainmenu']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })

  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password).pipe(first()).subscribe(data => {
      this.router.navigate(['/mainmenu']);
    }, err => alert('email or the password is not correct'));
  }

  restorePassword(email) {
    this.authenticationService.restorePassword(email).subscribe(res => {
    }, err => console.log(err));
  }
}
