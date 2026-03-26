import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddEmployee } from './add-employee';
import { EmployeeService } from '../../services/employee/employee';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('AddEmployee', () => {
  let component: AddEmployee;
  let fixture: ComponentFixture<AddEmployee>;
  let empServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    empServiceSpy = {
      addEmployee: vi.fn()
    };

    routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AddEmployee],
      providers: [
        { provide: EmployeeService, useValue: empServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form', () => {
    expect(component.empForm).toBeDefined();
  });

  it('should not submit if form invalid', () => {
    component.empForm.setValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      joinedDate: ''
    });

    component.onSubmit();

    expect(empServiceSpy.addEmployee).not.toHaveBeenCalled();
  });

  it('should call API on valid form', () => {
    const mockEmp = {
      firstName: 'Rajesh',
      lastName: 'Test123',
      email: 'test@gmail.com',
      phone: '91234567',
      gender: 'Male',
      dob: '2000-01-01',
      joinedDate: '2022-01-01'
    };

    empServiceSpy.addEmployee.mockReturnValue(of(mockEmp));

    component.empForm.setValue(mockEmp);

    component.onSubmit();

    expect(empServiceSpy.addEmployee).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/employees']);
  });

  it('should show error if API fails', () => {
    empServiceSpy.addEmployee.mockReturnValue(throwError(() => new Error()));

    component.empForm.setValue({
      firstName: 'Rajesh',
      lastName: 'Test123',
      email: 'test@gmail.com',
      phone: '91234567',
      gender: 'Male',
      dob: '2000-01-01',
      joinedDate: '2022-01-01'
    });

    component.onSubmit();

    expect(component.errorMessage).toBeTruthy();
  });

});