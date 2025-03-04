import { inject } from "@angular/core";
import { CanMatchFn, Route, UrlSegment, Router } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import { firstValueFrom } from "rxjs";

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {


  const autService = inject(AuthService);



  await firstValueFrom(autService.checkStatus());
  return autService.isAdmin();
};
