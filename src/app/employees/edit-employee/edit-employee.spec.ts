import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EditEmployee } from './edit-employee';
import { EmployeeService } from '../../services/employee/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('EditEmployee', () => {
  let component: EditEmployee;
  let fixture: ComponentFixture<EditEmployee>;
  let empServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {
    empServiceSpy = {
      getEmployeeById: vi.fn(),
      updateEmployee: vi.fn()
    };

    routerSpy = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [EditEmployee],
      providers: [
        { provide: EmployeeService, useValue: empServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEmployee);
    component = fixture.componentInstance;

    empServiceSpy.getEmployeeById.mockReturnValue(
      of({
        id: 1,
        firstName: 'Rajesh',
        lastName: 'Test123',
        email: 'test@gmail.com',
        phone: '91234567',
        gender: 'Male',
        dob: '2000-01-01',
        joinedDate: '2022-01-01'
      })
    );

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee data on init', () => {
    expect(empServiceSpy.getEmployeeById).toHaveBeenCalledWith('1');
    expect(component.empForm.value.firstName).toBe('Rajesh');
  });

  it('should update employee and navigate', () => {
    empServiceSpy.updateEmployee.mockReturnValue(of({}));

    component.empForm.setValue({
      firstName: 'Rajesh',
      lastName: 'Test123',
      email: 'test@gmail.com',
      phone: '91234567',
      gender: 'Male',
      dob: '2000-01-01',
      joinedDate: '2022-01-01'
    });

    component.onUpdate();

    expect(empServiceSpy.updateEmployee).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/employees']);
  });

});