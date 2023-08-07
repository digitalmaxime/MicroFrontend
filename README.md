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

 `ng add @angular-architects/module-federation-tools`
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

<h2>Steps (Host)</h2>

<h4>Create an Angular Project</h4>

```
ng new 
```

<h5>import @angular-architects/module-federation</h5>

```
yarn add @angular-architects/module-federation
```

<h5>import @angular-architects/module-federation-tools</h5>

```
yarn add @angular-architects/module-federation-tools
```

<h5>add the module-federation `selector` to host mfe</h5>

```
<mft-wc-wrapper [options]="item"></mft-wc-wrapper>
```

<h5>declare the mfe's options prop</h5>

```
item: WebComponentWrapperOptions = {
    remoteEntry: 'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
    remoteName: 'react',
    exposedModule: './web-components',
    elementName: 'react-element'
}
    
```




 ---

 ref: https://dev.to/blminami/micro-frontends-nx-angular-module-federation-angular-mfe-vuejs-mfe-13hi