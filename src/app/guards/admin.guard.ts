import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const isStaff = localStorage.getItem('is_staff');

  if (token && isStaff === 'true') {
    return true;
  }

  router.navigate(['/login']);
  return false;

};