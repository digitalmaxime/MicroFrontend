import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from './carousel/carousel.module';

// export const routes: Routes = [
//   {
//     path: "**",
//     children: [
//       { 
//         path: '**', component: AppComponent
//       }
//     ]
//   }
// ]


@NgModule({
  declarations: [
  ],

  imports: [
    BrowserModule,
    CommonModule,
    // RouterModule.forRoot(routes),
    CarouselModule
  ],

  providers: [],

  exports: [],

  bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
    
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
      const ce = createCustomElement(CarouselComponent, {injector: this.injector});
      customElements.define('mfe1', ce);
  }
}
