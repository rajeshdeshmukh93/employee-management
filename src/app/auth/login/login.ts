import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button,TextField } from 'ui-components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TextField, CommonModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{

  loginForm!:FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get dobControl(): FormControl {
    return this.loginForm.get('dob') as FormControl;
  }

  ngOnInit(): void {
    // this.loginForm.reset();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)      
      ]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Mock Login Logic
      if (email === 'admin@tcs.com' && password === 'Password123') {
        localStorage.setItem('session', 'active'); // Create session
        this.router.navigate(['/employees']);
      } else {
        // this.loginErrorMessage = 'Invalid email or password.';
      }
      this.router.navigate(['/employees']);

    }
  }

}
