import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';

@Component({
  selector: 'app-carousel-host',
  templateUrl: './carousel-host.component.html',
})
export class CarouselHostComponent implements OnInit {

  item: WebComponentWrapperOptions = {
    type: 'module',
    remoteEntry: 'http://localhost:4202/remoteEntry.js',
    exposedModule: './web-components',
    elementName: 'mfe1'

    // type: 'script',
    // remoteEntry: 'http://localhost:4201/remoteEntry.js',
    // remoteName: 'mfe2',
    // exposedModule: './CarouselComponent',
    // elementName: 'AppModule',

    // type: 'module',
    // remoteEntry: 'http://localhost:4201/remoteEntry.js',
    // // remoteName: 'mfe2',
    // exposedModule: './CarouselComponent',
    // elementName: 'app-carousel'


    // remoteEntry: 'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
    // remoteName: 'react',
    // exposedModule: './web-components',
    // elementName: 'react-element'

    // remoteEntry: 'https://nice-grass-018f7d910.azurestaticapps.net/remoteEntry.js',
    //     remoteName: 'angular1',
    //     exposedModule: './web-components',
    //     elementName: 'angular1-element'
  }

// constructor(
//   private cfr: ComponentFactoryResolver,
//   private vcref: ViewContainerRef
// ) {}


ngOnInit(): void {
  
}

  // async ngOnInit(): Promise<void> {
  //   const { CarouselComponent } = await loadRemoteModule({
  //     remoteEntry: 'http://localhost:4201/remoteEntry.js',
  //     remoteName: 'mfe2',
  //     exposedModule: './CarouselComponent',
  //   });

  //   console.log(CarouselComponent)

  //   this.vcref.createComponent(
  //     this.cfr.resolveComponentFactory(CarouselComponent)
  //   );

    // const componentRef: ComponentRef<{

    // }>
  // }

}
