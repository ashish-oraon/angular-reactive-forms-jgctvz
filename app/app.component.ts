import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  SignupForm: FormGroup;

  ngOnInit() {
    this.SignupForm = new FormGroup({
      age: new FormControl(null, [
        Validators.required,
        Validators.max(40),
        Validators.min(0),
      ]),
      maxAge: new FormControl(null, [Validators.required]),
    });

    this.SignupForm.setValue({
      age: 12,
      maxAge: 50,
    });

    const maxAgeControl = <FormControl>this.SignupForm.get('maxAge');
    const ageControl = <FormControl>this.SignupForm.get('age');

    maxAgeControl.valueChanges.subscribe((value) => {
      console.log('value changed to ', value);
      if (value > 0) {
        ageControl.setValidators([
          Validators.required,
          Validators.min(0),
          Validators.max(+value),
        ]);
      } else {
        ageControl.setValidators([Validators.required]);
      }
      ageControl.updateValueAndValidity();
      this.SignupForm.updateValueAndValidity();
    });
  }

  onSubmit() {
    console.log(this.SignupForm);
    // this.SignupForm.controls['age'].getVal
  }
}

// angular form is group of controls
