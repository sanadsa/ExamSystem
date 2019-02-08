import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  currentemail: string
  emailByUrl: BehaviorSubject<any>
  restorePasswordForm: FormGroup
  submitted: boolean

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.emailByUrl = new BehaviorSubject<any>(this.route.params);
    if (this.emailByUrl.value._value.email) {
      this.currentemail = this.emailByUrl.value._value.email;
    }
    this.restorePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  updatePassword() {
    debugger;
    this.submitted = true;
    if (this.restorePasswordForm.invalid) {
      return;
    }
    const admin = {
      email:this.currentemail,
      password:this.restorePasswordForm.value.password
    }
    console.log(admin);
    
    this.authenticationService.updatePassword(admin).subscribe(res => {
      alert('password Changed');
      this.router.navigate(['/login']);
    }, err => { console.log(err); })
  }

  get f() { return this.restorePasswordForm.controls };

}
