import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button,TextField } from 'ui-components';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee';


@Component({
  selector: 'app-add-employee',
  imports: [ CommonModule, TextField, Button, ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee {

 empForm!: FormGroup;
 errorMessage: string = '';


  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) {}

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

  goBack() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    if (this.empForm.invalid) {
      this.empForm.markAllAsTouched();
      return;
    }

    // const payload = this.empForm.value;
    const payload = {
      id: Date.now(),
      ...this.empForm.value
    };

    this.employeeService.addEmployee(payload).subscribe({
      next: (res) => {
        console.log('Employee Added Successfully', res);

        // Navigate back to list
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.showError('Failed to add employee. Please try again.');
      }
    })
  }

  showError(msg: string) {
    this.errorMessage = msg;

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }


}
