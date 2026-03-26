import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { LoginService } from '../../services/login/login';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let loginServiceSpy: any;
  let routerSpy: any;

  beforeEach(async () => {

    loginServiceSpy = {
      login : vi.fn(),
      setUser :vi.fn()
    }

    routerSpy = {
      navigate :vi.fn()
    }

    await TestBed.configureTestingModule({
      imports: [Login ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with email and password', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should mark form invalid when empty', () => {
    component.loginForm.setValue({
      email: '',
      password: ''
    });

    expect(component.loginForm.invalid).toBe(true);
  });

  it('should mark form valid with correct data', () => {
    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: 'Password1'
    });

    expect(component.loginForm.valid).toBe(true);
  });

  it('should call login service on submit', () => {
    const mockUser: User[] = [
      {
        id: 1,
        name: 'Rajesh',
        email: 'test@gmail.com',
        password: 'Password1'
      }
    ];

    // ✅ Create spies using spyOn
    loginServiceSpy.login.mockReturnValue(of(mockUser));
    // spyOn(loginServiceSpy, 'setUser');
    // spyOn(routerSpy, 'navigate');

    component.loginForm.setValue({
      email: 'test@gmail.com',
      password: 'Password1'
    });

    component.onLogin();

    expect(loginServiceSpy.login).toHaveBeenCalledWith('test@gmail.com', 'Password1');
    expect(loginServiceSpy.setUser).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/employees']);
  });
});
