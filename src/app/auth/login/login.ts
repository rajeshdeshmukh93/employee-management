import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button,TextField } from 'ui-components';
import { User } from '../../models/User';
import { LoginService } from '../../services/login/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TextField, CommonModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{

  private apiUrl = 'http://localhost:3000/users';
  loginForm!:FormGroup;
  errorMessage: string = '';


  constructor(
      private fb: FormBuilder, 
      private router: Router, 
      private loginService: LoginService,
      private cdr: ChangeDetectorRef
    ) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }


  ngOnInit(): void {
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
      this.loginService.login(email, password!).subscribe({
      next: (user:any) => {
        if(user){
          this.loginService.setUser(user);
          this.router.navigate(['/employees']);
        }else{
          this.showError('Invalid email or password.');
        }
               
      },
      error: (err) => {
        this.showError('Login failed. Please check your credentials and try again.');
      }
    });
    }
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
