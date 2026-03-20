import { Component } from '@angular/core';
// import { Button, TextField } from '../../../../dist/ui-components/types/ui-components';
import { CommonModule } from '@angular/common';
import { Button,TextField } from 'ui-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [Button, CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees:any;
  constructor(private router: Router) {
    this.employees = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' }
    ];
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(id: number) {
  this.router.navigate(['/employees/edit', id]);
}
}
