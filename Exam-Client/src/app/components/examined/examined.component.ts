import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-examined',
  templateUrl: './examined.component.html',
  styleUrls: ['./examined.component.css']
})
export class ExaminedComponent implements OnInit {

  examinedForm: FormGroup
  submitted: boolean
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.examinedForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email,Validators.required])],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required]
    })
  }

  get f() { return this.examinedForm.controls; }

  onSubmit() {
    debugger;
    this.submitted=true;
    if (this.examinedForm.invalid) {
      return;
    }
  }

}
