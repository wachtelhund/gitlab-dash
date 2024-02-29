import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(SsrCookieService);
  const router = inject(Router);
  if (!(cookieService.get('signedin') === 'true')) {
    router.navigate(['/']);
    return false;
  }
  return true;
};