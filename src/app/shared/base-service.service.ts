// vim: set tabstop=2 expandtab filetype=javascript:

import { Error } from './error/error';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class BaseService {

    protected extractArray(res: Response) {
        let body = res.json();
        return body || [];
    }

    protected extractObject(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected extractError(res: Response) {
        let error: Error = new Error(res && res.status || 0, res && res.statusText || 'Something went horribly wrong...', res && res.json() || {} );
        return Observable.throw(error);
    }
}
