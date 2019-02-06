import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
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


  constructor(private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router) { }

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
    this.authenticationService.login(this.loginForm.value.email,this.loginForm.value.password) .pipe(first()).subscribe(data=>{
      this.router.navigate(['/mainmenu']);
    },err =>console.log(err));
  }

  restorePassword(email){
    debugger;
    this.authenticationService.restorePassword(email).subscribe(res=>{
      debugger;
      console.log(res);
    },err=>console.log(err));
  }
}
