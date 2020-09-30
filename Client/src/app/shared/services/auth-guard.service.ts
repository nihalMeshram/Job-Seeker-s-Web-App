import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../../app.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private appState: AppState)
  {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let url: string = state.url;
    let roles = route.data["roles"] as Array<string>;
    return this.isUserAuthenticated(url, roles);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {
    return this.canActivate(route, state);
  }

  isUserAuthenticated(url: string, roles: Array<string>): Observable<boolean> | boolean  {

    return this.authService.authenticate().pipe(
      map((res: any) => {
        if(res === 0 || (res && roles?.indexOf(res?.role) === -1)) {
            // Store the attempted URL for redirecting.
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
            return false;
          } else {
            return true;
          }
        }, (err) => {
          alert('Something went wrong...')
        }
      ));
  }
}
