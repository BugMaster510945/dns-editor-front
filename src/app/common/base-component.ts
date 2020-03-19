// vim: set tabstop=2 expandtab filetype=javascript:
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { GenericError } from '@app/common/error';

export class BaseComponent implements OnDestroy {
  private loadingLayer /* : number */ = 0;
  public loading /* : boolean */ = false;

  public error?: GenericError;
  protected subscription: Subscription[] = [];

  constructor() { }

  public setLoading() {
    if (this.loadingLayer++ === 0) {
      this.resetError();
    }
    this.loading = true;
  }

  public setLoaded() {
    --this.loadingLayer;
    this.loading = this.loadingLayer !== 0;
  }

  public handleError(e: GenericError) {
    this.error = e;
  }

  public resetError() {
    this.error = undefined;
  }

  public ngOnDestroy() {
    for (const sub of this.subscription) {
      sub.unsubscribe();
    }
  }

  public lazyUnsubscribe(o: Subscription): Subscription {
    this.subscription.push(o);
    return o;
  }
}
