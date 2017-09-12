// vim: set tabstop=2 expandtab filetype=javascript:
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
//import { getTranslationProviders } from './app/shared/i18n-providers';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

/*getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});
*/
platformBrowserDynamic().bootstrapModule(AppModule);
