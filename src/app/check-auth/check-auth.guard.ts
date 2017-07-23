// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let retour: boolean = this.authService.checkCredentials();

    if ( ! retour )
    {
      this.authService.redirectUrl = state.url;

      this.router.navigate(['/login']);
    }
    return retour;
  }
}
