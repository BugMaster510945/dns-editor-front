// vim: set tabstop=2 expandtab filetype=javascript:

export class BaseComponent
{
  private loadingLayer: number = 0;
  public loading: boolean = false;

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
}
