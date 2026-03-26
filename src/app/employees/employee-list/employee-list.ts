import { Component } from '@angular/core';
// import { Button, TextField } from '../../../../dist/ui-components/types/ui-components';
import { CommonModule } from '@angular/common';
import { Button, TextField } from 'ui-components';
import { Router } from '@angular/router';
import { ConfirmModal } from 'ui-components';
import { LoginService } from '../../services/login/login';
import { EmployeeService } from '../../services/employee/employee';
import { Employee } from '../../models/Employee';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  imports: [Button, CommonModule, ConfirmModal],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: 'logout' | 'delete' | null = null;
  selectedEmpId: number | null = null; // track which employee for delete
  errorMessage: string = '';
  employees:  Employee[] = [];
  constructor(
    private router: Router, private loginService: LoginService, 
    private employeeService: EmployeeService, private cdr: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res:  Employee[]) => {
        this.employees = res;
        this.cdr.detectChanges();
        if (!res || res.length === 0) {
          this.showError('No employees found.');
        } else {
          this.errorMessage = '';
        }
      },
      error: (err) => {
        this.showError('Failed to load employees. Please try again.');
      }
    });
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(emp: Employee) {
    this.router.navigate(['/employees/edit', emp.id]);
  }

  openModal(action: 'logout' | 'delete', emp?: Employee) {
    this.modalAction = action;
    this.showModal = true;

    if (action === 'logout') {
      this.modalTitle = 'Logout Confirmation';
      this.modalMessage = 'Are you sure you want to logout?';
    } else if (action === 'delete') {
      this.modalTitle = 'Delete Employee';
      this.modalMessage = 'Are you sure you want to delete this employee?';
      if (emp && emp.id) this.selectedEmpId = emp.id;
    }
  }

  handleConfirm() {
    if (this.modalAction === 'logout') {
      this.logout();
    } else if (this.modalAction === 'delete' && this.selectedEmpId !== null) {
      this.deleteEmployee(this.selectedEmpId);
    }
    this.resetModal();
  }

  handleCancel() {
    this.resetModal();
  }

  resetModal() {
    this.showModal = false;
    this.modalAction = null;
    this.selectedEmpId = null;
  }

  logout() {
    this.loginService.logout();
  }

  deleteEmployee(empId: number) {
    let id = empId.toString();
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
        this.showError('Employee deleted successfully.');
      },
      error: (err) => {
        this.showError('Failed to delete employee. Please try again.');
      }
    });
  }

  showError(msg: string) {
    this.errorMessage = msg;
    this.cdr.markForCheck();

    setTimeout(() => {
      this.errorMessage = '';
      this.cdr.markForCheck();
    }, 3000);
  }
}
