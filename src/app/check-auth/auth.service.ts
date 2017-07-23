// vim: set tabstop=2 expandtab filetype=javascript:
import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired, AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private http: Http, private router: Router) {}

  checkCredentials(): boolean {
    return tokenNotExpired();
  }

  login(user: string, password: string): Observable<boolean>
  {
    return this.http.post('/api/authenticate', JSON.stringify({ user: user, password: password }))
      .map((response: Response) => 
        {
          if(  ! response 
            ||   response.status !== 201
            || ! response.headers
            || ! response.headers.has('Token') )
            return false;

          localStorage.setItem('token', response.headers.get('Token'));

          let retour = tokenNotExpired();
          if( retour )
          {
            if( this.redirectUrl )
              this.router.navigate([this.redirectUrl]);
            else
              this.router.navigate(['/']);
          }
          return tokenNotExpired();
        }
      );
    }
}

@Injectable()
export class AuthHttpSession extends AuthHttp {

  constructor(http: Http, defOpts?: RequestOptions) {
    super(new AuthConfig({
      noTokenScheme: true,
      tokenName: 'token',
      //tokenGetter: (() => localStorage.getItem('token')),
      globalHeaders: [{'Content-Type': 'application/json'}]
    }), http, defOpts);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .map(
        (response) =>
        {
          if(  response
            && response.headers
            && response.headers.has('Token') )
          {
            localStorage.setItem('token', response.headers.get('Token'));
          }
          return response;
        }
      );
  }
}
