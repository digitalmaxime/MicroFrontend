# MicroFrontend

<h2>Overview</h2>

<h4>Main Idea</h4>

2 separate Angular projects : 
- Shell (host/container) 
- Remote (microfrontend)
  
Where the _Shell_ contains independent _Remote_ UI component
  

<h4>Packages</h4>

 `ng add @angular-architects/module-federation`
 in both project

 `yarn add @angular-architects/module-federation-tools`
 in both project


<h4>Shell's Main Files</h4>

- A component.html that wraps the mfe : `<mft-wc-wrapper [options]="item"></mft-wc-wrapper>`
- A component.ts that hold a property for the `options` passed to the mfe
  -  `  item: WebComponentWrapperOptions = { ... }  `
- A modified Bootstrap.ts file with use of the `@angular-architects/module-federation-tools`
- A `angular-architects/module-federation`-generated `webpack.config.js` file

<h4>Remote's Main Files</h4>

- A module scoped component that needs to be exposed
- An app.module.ts that
  - import { createCustomElement } from '@angular/elements'; // from -->  yarn add @angular/elements
  - import the exposed component's module
  - A does a special Boostrap 
    -  `export class AppModule implements DoBootstrap { ..`
    -   `ngDoBootstrap(appRef: ApplicationRef): void { .. `
- A modified Bootstrap.ts file with use of the `@angular-architects/module-federation-tools`
- A `angular-architects/module-federation`-generated `webpack.config.js` file

--- 

 make sure that the costomElements name _mfe1-component_
 ```
 Mfe1/src/app/app.modules.ts 

    [...]
    ngDoBootstrap(appRef: ApplicationRef): void {
        const ce = createCustomElement(CarouselComponent, { injector: this.injector });
        customElements.define('mfe1-component', ce); // <<---- 'mfe1-component'
    }
    [...]
```

matchs _`element-name : mfe1-component`_

```
Container/src/app/carousel-host/carousel-host.component.ts

    [...]

    item: WebComponentWrapperOptions = {
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './web-components',
        elementName: 'mfe1-component' // <<----
    }
    [...]
 ```

 ---

<h2>Providing a Web Component with Module Federation
- Steps (Host)</h2>

  \* Note that package versions must match. Make sure to use the same CLI version in both _Shell_ and _Remote_. 

<h4>Check Angular CLI version</h4>

```
ng version 
```

<h4>Create an Angular Project (with Routing **)</h4>

```
ng new // make sure to add Routing
```

<h5>import @angular-architects/module-federation</h5>

```
ng add @angular-architects/module-federation
```

<h5>import @angular-architects/module-federation-tools</h5>

```
yarn add @angular-architects/module-federation-tools
```

<h5>import ModuleFederationToolsModule in app.module.ts</h5>

```
// src/app/app.module.ts

...
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';
...

@NgModule({
  imports: [
    ...
    ModuleFederationToolsModule
  ],
  ...
})
export class AppModule { }
```

<h5>add the module-federation-tools import in the app.component.ts file</h5>

```
// src/app/app.component.ts

import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
```


<h5>add the Standalone component selector in the html</h5>

```
// src/app/app.component.html

<mft-wc-wrapper [options]="item"></mft-wc-wrapper>
```

<h5>declare the mfe's options prop in the app.component.ts file (using a pre-existing exposed mfe)</h5>

```
// src/app/app.component.ts

item: WebComponentWrapperOptions = {
    remoteEntry: 'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
    remoteName: 'react',
    exposedModule: './web-components',
    elementName: 'react-element'
}
    
```

<h5>modify the bootstrap.ts file according to the Module-Federation's recommendation</h5>

```
// src/bootstrap.ts

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { bootstrap } from '@angular-architects/module-federation-tools';

bootstrap(AppModule, {
  production: environment.production,
  appType: 'shell'
});
```

<h5>serve the application</h5>

```
ng serve
```

---
<h2>Exposing Micro Frontend as Web Component in Angular
 - Steps (Remote)</h2>


<h5>Create an Angular Project (no Routing required **)</h5>

```
ng new
ng generate module mySpecialModule
ng generate component my-special-module/mySpecialItem
```

<h5>Ajust the app.module.ts file</h5>

- <h5>import the exposed component's module</h5>

  ```
  // src/app/app.module.ts

  ...
  @NgModule({
    declarations: [
      AppComponent
    ],

    imports: [
      BrowserModule,
      CommonModule,
      MySpecialModule, // <<-- 
    ],
    ...
  ```


- <h5>import '@angular/elements'</h5>

  ```
  yarn add '@angular/elements
  ```

- <h5>Do a special bootstrapping of app.module.ts</h5>

  ```
  // src/app/app.module.ts

  import { createCustomElement } from '@angular/elements';
  ...
  export class AppModule implements DoBootstrap {

    constructor(private injector: Injector) {

    }

    ngDoBootstrap(appRef: ApplicationRef): void {
      const ce = createCustomElement(CarouselComponent, { injector: this.injector });
      customElements.define('mfe1-component', ce);
    }
  }
  ```

- <h5>Ajust the app.module.ts file</h5>

  ```
  // src/app/app.module.ts
  ...

  bootstrap: [] // <<-- remove the 'Bootstrap' array
  ...
  ```


<h5>import @angular-architects/module-federation</h5>

```
ng add @angular-architects/module-federation

```

<h5>import @angular-architects/module-federation-tools</h5>

```
yarn add @angular-architects/module-federation-tools

```

 
<h5>modified the Bootstrap.ts file with use of the `@angular-architects/module-federation-tools`</h5>

```
import { AppModule } from './app/app.module';

import { bootstrap } from '@angular-architects/module-federation-tools';

bootstrap(AppModule, {
  production: false,
  appType: 'microfrontend'
})
```

<h5>ajust the `webpack.config.ts` file</h5>

```
// webpack.config.ts

...
plugins: [
    new ModuleFederationPlugin({
      library: { type: "module" },

      // For remotes (please adjust)
      name: "mfe1",
      filename: "remoteEntry.js",
      exposes: {
        './web-components': './src/bootstrap.ts',
      },
      ...

```

<h5>serve the application</h5>

```
ng serve
```

checkout `//http://localhost:4201/remoteEntry.js` and make sure there is some content

 ---


 <h2>Linking the Shell and Mfe configurations</h5>

 - the .. should be equivalent to ..

 ref: https://dev.to/blminami/micro-frontends-nx-angular-module-federation-angular-mfe-vuejs-mfe-13hi
