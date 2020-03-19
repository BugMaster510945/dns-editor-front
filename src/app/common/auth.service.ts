// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { BaseService } from '@app/common/base-service';
import { BaseComponent } from '@app/common/base-component';

const LOCALSTORAGE_TOKEN_KEY = 'Token';
const LOCALSTORAGE_TOKEN_OFFSET_KEY = 'Token-Offset';
const RESPONSE_HEADER_TOKEN = 'Token';

// Utilisation statique de JwtHelperService au lieu de l'injection de dépendance
// à cause d'un import cyclique sur tokenGetter
const TOKEN_HELPER = new JwtHelperService();

export function jwtOptionsFactory(auth: AuthService) {
  return {
    headerName: 'Authorization',
    authScheme: 'Bearer ', // Space is important
    skipWhenExpired: false,
    tokenGetter: auth.getToken,
    throwNoTokenError: false,
    blacklistedRoutes: [new RegExp('^(?!(https?:\\\/\\\/[^/]+)?\\\/api\\\/).*$')]
  };
}

@Injectable()
export class AuthService extends BaseService {
  redirectUrl /* : string */ = '';

  public constructor(protected http: HttpClient) {
    super();
  }

  public getToken(): string | null {
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if (token) {
      let offset: number | undefined;
      offset = parseInt(localStorage.getItem(LOCALSTORAGE_TOKEN_OFFSET_KEY) || '', 10);
      if (isNaN(offset)) {
        offset = undefined;
      }

      if (!TOKEN_HELPER.isTokenExpired(token, offset)) {
        return token;
      }
    }
    return null;
  }

  public logout() {
    this.setToken(null);
  }

  public setToken(v: string | null) {
    if (v === null || v === '') {
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCALSTORAGE_TOKEN_OFFSET_KEY);
      return;
    }
    localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, v);

    const token = TOKEN_HELPER.decodeToken(v);
    if (token.hasOwnProperty('iat')) {
      localStorage.setItem(LOCALSTORAGE_TOKEN_OFFSET_KEY, (Math.floor(Date.now() / 1000 - token.iat - 5)).toString());
    }
  }

  public saveRedirectURL(url?: string) {
    if (url === undefined || url === '') {
      this.redirectUrl = '';
      return;
    }
    this.redirectUrl = url;
  }

  public getRedirectURL(): string | null {
    // const url = localStorage.getItem(LOCALSTORAGE_REDIRECT_URL_KEY);
    const url = this.redirectUrl;
    if (url !== '') {
      this.saveRedirectURL();
    }
    return url;
  }


  public isValidConnectedUser(): boolean {
    return this.getToken() !== null;
  }


  public login(c: BaseComponent, user: string, password: string): Observable<string> {
    return new Observable<string>(
      (ret) => {
        this.applyPipe(
          this.http.post(`api/v1/login`, JSON.stringify({ user, password })),
          c, true)
          .subscribe(
            (_) => {
              ret.next(this.getRedirectURL() || '/');
            },
            err => {
              ret.error(err);
            },
            () => {
              ret.complete();
            }
          );
      }
    );
  }
}

@Injectable()
export class AuthHTTPInterceptor implements HttpInterceptor {
  constructor(protected auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  console.log(req.url);
    if (req.url.startsWith('/')) {
      req = req.clone(
        {
          setHeaders: { 'Content-Type': 'application/json' },
          responseType: 'json'
        },
      );
    }
    return next.handle(req).pipe(
      tap(
        (ev: HttpEvent<any>) => {
          if (ev instanceof HttpResponse) {
            //// TODO:  debug ev.url.start....
            // if (ev.url && ev.url.startsWith(environment.baseUrlAPI)) {
  console.log(ev);
            if (ev.url) {
              // var a: HttpResponse<any> = ev;
              // debugger;
              if (ev.headers.has(RESPONSE_HEADER_TOKEN)) {
                this.auth.setToken(ev.headers.get(RESPONSE_HEADER_TOKEN));
              }
            }
          }
        }
      )
    );
  }
}
