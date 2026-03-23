import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const user = loginService.getUser();

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
