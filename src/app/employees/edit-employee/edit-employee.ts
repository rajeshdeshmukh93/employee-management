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
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
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

  loadEmployeeData(id: any) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (res) => {
        console.log('Employee Data:', res);

        this.empForm.patchValue(res);
      },
      error: (err) => {
        console.error('Error fetching employee', err);
      }
    });
  }

  onUpdate() {
    if (this.empForm.invalid) {
      this.empForm.markAllAsTouched();
      return;
    }

    const payload = this.empForm.value;

    this.employeeService.updateEmployee(this.empId, payload).subscribe({
      next: (res) => {
        console.log('Employee Updated Successfully', res);

        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error('Update failed', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
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
}