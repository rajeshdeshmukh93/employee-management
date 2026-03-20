import { Routes } from '@angular/router';
import { AddEmployee } from './employees/add-employee/add-employee';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EditEmployee } from './employees/edit-employee/edit-employee';
import { Login } from './auth/login/login';

export const routes: Routes = [

  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },

  { 
    path: 'login', 
    component: Login 
  },

  {
    path: 'employees',
    component: EmployeeList
  },

  {
    path: 'employees/add',
    component: AddEmployee
  },

  {
    path: 'employees/edit/:id',
    component: EditEmployee
  }

];
