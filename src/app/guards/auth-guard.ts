import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);  

  if (loginService.getUser()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
