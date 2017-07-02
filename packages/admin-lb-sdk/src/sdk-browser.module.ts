import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// app
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketDriver, SocketIOToken } from './sockets/socket.driver';
import { SocketBrowser } from './sockets/socket.browser';
import { SDK_PROVIDERS } from './providers';


/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
})
export class SDKBrowserModule {
  static forRoot(configuredProviders: any[]): ModuleWithProviders {
    return {
      ngModule  : SDKBrowserModule,
      providers: [
        ...SDK_PROVIDERS,
        { provide: InternalStorage, useClass: CookieBrowser },
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketDriver, useClass: SocketBrowser },
        ...configuredProviders
      ]
    };
  }
}

export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
