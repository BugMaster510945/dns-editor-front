
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
        let error: Error = new Error(res.status, res.statusText || 'Something went horribly wrong...');
        return Observable.throw(error);
    }
}