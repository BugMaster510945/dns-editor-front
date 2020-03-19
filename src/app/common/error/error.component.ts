// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, Input } from '@angular/core';

import { GenericError } from '@app/common/error';

@Component({
  selector: 'app-error',
  templateUrl: 'error.component.html'
})

export class ErrorComponent {
  @Input() error /* : GenericError */ = new GenericError();

  constructor() { }

  hasStatus(): boolean {
    return this.error.status !== 0;
  }
}
