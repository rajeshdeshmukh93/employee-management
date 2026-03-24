import { CanActivateFn } from '@angular/router';

export const unsavedGuard: CanActivateFn = (component: any) => {
  return component.canDeactivate();
};
