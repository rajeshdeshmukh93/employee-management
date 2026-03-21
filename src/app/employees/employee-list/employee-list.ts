import { Component } from '@angular/core';
// import { Button, TextField } from '../../../../dist/ui-components/types/ui-components';
import { CommonModule } from '@angular/common';
import { Button, TextField } from 'ui-components';
import { Router } from '@angular/router';
import { ConfirmModal } from 'ui-components';
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

  employees: any;
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

  openModal(action: 'logout' | 'delete', empId?: number) {
    this.modalAction = action;
    this.showModal = true;

    if (action === 'logout') {
      this.modalTitle = 'Logout Confirmation';
      this.modalMessage = 'Are you sure you want to logout?';
    } else if (action === 'delete') {
      this.modalTitle = 'Delete Employee';
      this.modalMessage = 'Are you sure you want to delete this employee?';
      if (empId) this.selectedEmpId = empId;
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
    console.log('Logged out');
    this.router.navigate(['/login']); // navigate to login page
  }

  deleteEmployee(empId: number) {
    console.log('Deleted employee:', empId);
    // call API to delete employee here
  }
}
