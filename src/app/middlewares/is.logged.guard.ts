import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import { UsersService } from '../services/users/users.service';

import {Observable} from "rxjs";

export const isLoggedGuard : CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree=> {
    return inject(UsersService).canActivate() ? true : inject(Router).createUrlTree(['/']);
};
