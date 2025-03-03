import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {


  const autService = inject(AuthService);
  const router = inject(Router);


  const isAutenticated = await firstValueFrom(autService.checkStatus());
  if (isAutenticated) {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
