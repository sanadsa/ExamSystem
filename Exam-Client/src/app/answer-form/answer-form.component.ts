import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      'Xs': this.fb.array([
        this.initX()
      ])
    });
    // this.form.valueChanges.subscribe(data => this.validateForm());
    // this.validateForm();
  }

  initX() {
    return this.fb.group({
      //  ---------------------forms fields on x level ------------------------
      'X': ['X', [Validators.required, Validators.pattern('[0-9]{4}')]],
      // ---------------------------------------------------------------------
      'Ys': this.fb.array([
        this.initY()
      ])
    });
  }

  initY() {
    return this.fb.group({
      //  ---------------------forms fields on y level ------------------------
      'Y1': ['Y1', [Validators.required, Validators.pattern('[0-9]{4}')]],
      'Y2': ['Y2', [Validators.required, Validators.pattern('[0-9]{4}')]],
      // ---------------------------------------------------------------------
      'Zs': this.fb.array([
        this.initZ()
      ])
    })
  }

  initZ() {
    return this.fb.group({
      //  ---------------------forms fields on z level ------------------------
      'Z': ['Z', [Validators.required, Validators.pattern('[0-9]{4}')]],
      // ---------------------------------------------------------------------
    })
  }

  addX() {
    const control = <FormArray>this.form.controls['Xs'];
    control.push(this.initX());
  }


  addY(ix) {
    const control = (<FormArray>this.form.controls['Xs']).at(ix).get('Ys') as FormArray;
    control.push(this.initY());
  }

  addZ(ix, iy) {
    const control = ((<FormArray>this.form.controls['Xs']).at(ix).get('Ys') as FormArray).at(iy).get('Zs') as FormArray;
    control.push(this.initZ());
  }

  constructor(private fb: FormBuilder) {
  }

}
