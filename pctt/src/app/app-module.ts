import { NgModule, provideBrowserGlobalErrorListeners , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { CoreModule } from './core/core-module';




@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,

    CoreModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
