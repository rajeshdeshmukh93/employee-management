import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button,TextField } from 'ui-components';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  imports: [ CommonModule, TextField, Button, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee {

  // employeeForm!:FormGroup;
  // employees:any;

  // constructor(private fb:FormBuilder) {
  //    this.employees = [
  //     { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
  //   ];
  // }

 empForm!: FormGroup;
 // Singapore Phone Regex: Starts with 6, 8, or 9 and has 8 digits total
  readonly sgPhoneRegex = /^[689]\d{7}$/;

  constructor(private fb: FormBuilder) {}

ngOnInit(): void {
    this.empForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[89][0-9]{7}$/)]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      joinedDate: ['', Validators.required]
    }, { validators: this.dateLessThan('dob', 'joinedDate') });
  }

   get firstNameControl(): FormControl {
      return this.empForm.get('firstName') as FormControl;
    }

   get lastNameControl(): FormControl {
      return this.empForm.get('lastName') as FormControl;
    }

    get emailControl(): FormControl {
      return this.empForm.get('email') as FormControl;
    }

    get phoneControl(): FormControl {
      return this.empForm.get('phone') as FormControl;
    }

    get genderControl(): FormControl {
      return this.empForm.get('gender') as FormControl;
    }

    get dobControl(): FormControl {
      return this.empForm.get('dob') as FormControl;
    }

    get joinedDateControl(): FormControl {
      return this.empForm.get('joinedDate') as FormControl;
    }

    // Custom Validator: Ensures Joined Date is after Date of Birth
  dateLessThan(from: string, to: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const f = group.get(from)?.value;
      const t = group.get(to)?.value;
      if (f && t && new Date(t) <= new Date(f)) {
        return { dateMismatch: true };
      }
      return null;
    };
  }

    onSubmit() {
    if (this.empForm.valid) {
      console.log('Valid Form Submission:', this.empForm.value);
    } else {
      this.empForm.markAllAsTouched();
    }
  }

}
