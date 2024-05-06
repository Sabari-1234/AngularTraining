import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css',
})
export class ReactiveFormComponent {
  conatctForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    ]),
    gender: new FormControl({
      value: 'male',
      disabled: true,
    }),
    isMarried: new FormControl('', [Validators.requiredTrue]),
    country: new FormControl('', [Validators.required]),
    address: new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl(),
      pincode: new FormControl(),
    }),
  });
  CountryList = [
    {
      id: 1,
      name: 'IND',
    },
    {
      id: 2,
      name: 'USA',
    },
    {
      id: 3,
      name: 'UK',
    },
  ];

  get lastname() {
    return this.conatctForm.get('lastName');
  }
  get Email() {
    return this.conatctForm.get('email');
  }
  get country() {
    return this.conatctForm.get('country');
  }
  get married() {
    return this.conatctForm.get('isMarried');
  }
  get city() {
    return this.conatctForm.get('address')?.get('city');
  }
  onSubmit = () => {
    console.log(this.conatctForm);
  };
}
