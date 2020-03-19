// vim: set tabstop=2 expandtab filetype=javascript:
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { GenericError } from '@app/common/error';
import { BaseComponent } from '@app/common/base-component';
import { Deserializable } from '@app/common/deserializable.model';

type ParameterlessConstructor<T> = new () => T;

export class BaseService {

  protected applyPipe<T>(obj: Observable<T>, c?: BaseComponent, errorPassthrought?: boolean): Observable<T>;
  protected applyPipe(obj: Observable<any>, c?: BaseComponent, errorPassthrought: boolean = false): Observable<any> {
    if (c) {
      c.setLoading();
    }
    return obj.pipe(
      catchError(
        (res: HttpErrorResponse) => {
          const e = this.extractError(res);
          if (c) {
            c.handleError(e);
            if (!errorPassthrought) {
              return of(null);
            }
          }
          return throwError(e);
        }
      ),
      finalize(
        () => {
          if (c) {
            c.setLoaded();
          }
        }
      )
    );
  }

  protected applyPipeDeserialize<T extends Deserializable>(
    type: ParameterlessConstructor<T>,
    obj: Observable<T>,
    c?: BaseComponent,
    errorPassthrought?: boolean): Observable<T>;
  protected applyPipeDeserialize(
    type: ParameterlessConstructor<any>,
    obj: Observable<any>,
    c?: BaseComponent,
    errorPassthrought: boolean = false): Observable<any> {

    if (c) {
      c.setLoading();
    }
    return obj.pipe(
      map(
        (data: any) => {
          const v = new type();
          return v.deserialize(data);
        }
      ),
      catchError(
        (res: HttpErrorResponse) => {
          const e = this.extractError(res);
          if (c) {
            c.handleError(e);
            if (!errorPassthrought) {
              return of(null);
            }
          }
          return throwError(e);
        }
      ),
      finalize(
        () => {
          if (c) {
            c.setLoaded();
          }
        }
      )
    );
  }

  protected extractError(res: HttpErrorResponse, c?: BaseComponent): GenericError {
    const e = new GenericError();

    if (navigator.onLine) {
      if (res.error instanceof Error) {
        // Client Error
        e.setMessage(res.error.message);
      } else {
        // Server Error
        e.setStatus(res.status)
          .setMessage(res.statusText)
          .applyObject(res.error);
      }
    } else {
      e.setMessage('Navigator is offline');
    }

    if (c) {
      c.handleError(e);
    }
    return e;
  }
}
