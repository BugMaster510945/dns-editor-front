// vim: set tabstop=2 expandtab filetype=javascript:
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestionnaire de zone DNS';
}
