import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const isStaff = localStorage.getItem('is_staff');

  if (isStaff === 'true') {

    return true;

  }

  router.navigate(['/']);

  return false;

};