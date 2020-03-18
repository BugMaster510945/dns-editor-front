// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, Input } from '@angular/core';

import { Error } from '@app/common/error';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html'
})

export class ErrorComponent {
  @Input() error: Error;

  constructor() { }

  hasStatus(): boolean {
    return this.error.status !== 0;
  }
}
