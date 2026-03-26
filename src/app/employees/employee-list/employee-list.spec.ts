import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmployeeList } from './employee-list';
import { EmployeeService } from '../../services/employee/employee';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('EmployeeList', () => {
  let component: EmployeeList;
  let fixture: ComponentFixture<EmployeeList>;
  let empServiceSpy: any;

  beforeEach(async () => {
    empServiceSpy = {
      getEmployees: vi.fn(),
      deleteEmployee: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [EmployeeList],
      providers: [
        { provide: EmployeeService, useValue: empServiceSpy }
      ]
    }).compileComponents();

    empServiceSpy.getEmployees.mockReturnValue(of([]));

    fixture = TestBed.createComponent(EmployeeList);
    component = fixture.componentInstance;

    fixture.detectChanges(); 
  });

  it('should delete employee', () => {
    empServiceSpy.deleteEmployee.mockReturnValue(of({}));

    component.deleteEmployee(1);

    expect(empServiceSpy.deleteEmployee).toHaveBeenCalledWith('1');
  });

  it('should show success message after delete', () => {
    empServiceSpy.deleteEmployee.mockReturnValue(of({}));

    component.deleteEmployee(1);

    expect(component.errorMessage).toBeTruthy();
  });

  it('should show error if delete fails', () => {
    empServiceSpy.deleteEmployee.mockReturnValue(
      throwError(() => new Error())
    );

    component.deleteEmployee(1);

    expect(component.errorMessage).toBeTruthy();
  });

});