import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './carousel/carousel.module';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    CommonModule,
    CarouselModule,
    
  ],

  providers: [],

  exports: [],

  bootstrap: []
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    const ce = createCustomElement(CarouselComponent, { injector: this.injector });
    customElements.define('mfe1-component', ce);
  }
}
