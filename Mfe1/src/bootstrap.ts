// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

import { bootstrap } from '@angular-architects/module-federation-tools';

bootstrap(AppModule, {
  production: false,
  appType: 'microfrontend'
})