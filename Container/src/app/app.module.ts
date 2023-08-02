import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselHostComponent } from './carousel-host/carousel-host.component';
import { ModuleFederationToolsModule } from '@angular-architects/module-federation-tools';

@NgModule({
  declarations: [
    AppComponent,
    CarouselHostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModuleFederationToolsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
