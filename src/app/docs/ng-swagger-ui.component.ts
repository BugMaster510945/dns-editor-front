// vim: set tabstop=2 expandtab filetype=javascript:
import { Component, OnInit } from '@angular/core';
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'ng-swagger-ui',
  templateUrl: './ng-swagger-ui.component.html',
  styleUrls: ['./ng-swagger-ui.component.scss']
})
export class NgSwaggerUIComponent implements OnInit {

  constructor(private _location: PlatformLocation, private router: Router) { }

  ngOnInit() {
    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
    
    var fullUrl = baseUrl + '/api/v1/docs.json';

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
      layout: "StandaloneLayout",
        validatorUrl: null
    })


  }

}
