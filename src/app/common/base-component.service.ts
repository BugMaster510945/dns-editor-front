// vim: set tabstop=2 expandtab filetype=javascript:
import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { Error } from '@app/common/error';

export class BaseComponent implements OnDestroy
{
  private loadingLayer: number = 0;
  public loading: boolean = false;

  public error: Error;
  protected subscription: Subscription[] = [];

  constructor() { }

  public setLoading()
  {
    ++this.loadingLayer;
    this.loading = true;
  }

  public setLoaded()
  {
    --this.loadingLayer;
    this.loading = this.loadingLayer != 0;
  }

  public handleError(e: Error)
  {
    this.error = e;
  }

  public resetError()
  {
    this.error = undefined;
  }

  public ngOnDestroy()
  {
    for (let sub of this.subscription)
    {
      sub.unsubscribe();
    }
  }

  public lazyUnsubscribe(o: Subscription): Subscription
  {
    this.subscription.push(o);
    return o;
  }
}
