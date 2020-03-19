// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/common/auth.service';

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.checkCredentials()) {
      this.authService.saveRedirectURL(state.url);

      this.router.navigate(['/login']);
    }
    return true;
  }
}
