// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

// tslint:disable:component-selector
@Component({
  selector: 'ng-swagger-ui',
  templateUrl: './ng-swagger-ui.component.html',
  styleUrls: ['./ng-swagger-ui.component.scss']
})
// tslint:enable:component-selector
export class NgSwaggerUIComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const currentAbsoluteUrl = window.location.href;
    const currentRelativeUrl = this.router.url;
    const index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    const baseUrl = currentAbsoluteUrl.substring(0, index);

    const fullUrl = baseUrl + '/api/v1/docs.json';

    const ui = SwaggerUIBundle({
      url: fullUrl,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: 'StandaloneLayout',
      validatorUrl: null
    });
  }
}
