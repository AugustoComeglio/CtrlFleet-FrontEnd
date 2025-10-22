import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class vigilanteGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const accessToken = this.cookieService.get('accessToken');
    const refreshToken = this.cookieService.get('refreshToken');
    const user_data = this.cookieService.get('user_data_id');
    // const router = inject(Router);
    console.log('token', accessToken);
    console.log('user_data', user_data);
    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
