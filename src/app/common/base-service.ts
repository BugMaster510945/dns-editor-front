// vim: set tabstop=2 expandtab filetype=javascript:

import { Response } from '@angular/http';
import { Observable, throwError, } from 'rxjs';
import { Error } from '@app/common/error';

import { BaseComponent } from '@app/common/base-component.service';

export class BaseService {

  protected extractArray(res: Response) {
    try {
      return res && res.json() || [];
    } catch (e) {
      return [];
    }
  }

  /* protected extractObject(res: Response);
  protected extractObject(res: Response, c: BaseComponent); */
  protected extractObject(res: Response, c?: BaseComponent) {
    if (c) {
      c.setLoaded();
    }

    try {
      return res && res.json() || {};
    } catch (e) {
      return {};
    }
  }

  /* protected extractError(res: Response): Observable<Error>;
  protected extractError(res: Response, c: BaseComponent): Observable<Error>; */
  protected extractError(res: Response, c?: BaseComponent): Observable<Error> {
    let e: Error;
    let additionnalData: any;

    try {
      additionnalData = res && res.json() || {};
    } catch (e) {
      additionnalData = {};
    }

    e = new Error(
      res && res.status || 0,
      res && res.statusText || 'Something went horribly wrong...',
      additionnalData
    );

    if (c) {
      c.setLoaded();
      c.handleError(e);
    }
    return throwError(e);
  }
}
