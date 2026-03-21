import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee';
import { CommonModule } from '@angular/common';
import { Button,TextField } from 'ui-components';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  imports: [CommonModule, TextField, Button, ReactiveFormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.scss',
})
export class EditEmployee {
  empId: any;
  empForm!:FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
      // 1. Initialize form
  this.empForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    phone: [''],
    gender: [''],
    dob: [''],
    joinedDate: ['']
  });
    this.empId = this.route.snapshot.paramMap.get('id');

    if (this.empId) {
      this.loadEmployeeData(this.empId);
    }
  }

  // Mock / API call
  loadEmployeeData(id: any) {
    // Replace this with API call
    const emp = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      phone: '9876543210',
      gender: 'Female',
      dob: '1995-01-01',
      joinedDate: '2022-01-01'
    };

    this.empForm.setValue(emp);
  }

  onUpdate() {
    if (this.empForm.valid) {
      console.log('Updated Employee:', this.empForm.value);

      // Navigate back after update
      this.router.navigate(['/employees']);
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }

  // EditEmployeeComponent.ts
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
}