import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
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
    elementName: 'mfe1-component'

    /** PRE EXISTING REMOTE MFEs */
    // remoteEntry: 'https://witty-wave-0a695f710.azurestaticapps.net/remoteEntry.js',
    // remoteName: 'react',
    // exposedModule: './web-components',
    // elementName: 'react-element'

    // remoteEntry: 'https://nice-grass-018f7d910.azurestaticapps.net/remoteEntry.js',
    //     remoteName: 'angular1',
    //     exposedModule: './web-components',
    //     elementName: 'angular1-element'
  }


ngOnInit(): void {
  
}

}
