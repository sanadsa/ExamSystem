import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authenticationService.register(this.registerForm.value).subscribe(registeration => {
      this.router.navigate(['/login']);
    }, err => console.log(err));
  }

  get f() { return this.registerForm.controls; }

}


