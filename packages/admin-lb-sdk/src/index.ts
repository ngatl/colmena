/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { JSONSearchParams } from './services/core/search.params';
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { SocketDriver, SocketIOToken } from './sockets/socket.driver';
import { SocketBrowser } from './sockets/socket.browser';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { EmailApi } from './services/custom/Email';
import { StorageContainerApi } from './services/custom/StorageContainer';
import { SystemApi } from './services/custom/System';
import { ContentEventApi } from './services/custom/ContentEvent';
import { ContentPageApi } from './services/custom/ContentPage';
import { ContentProductApi } from './services/custom/ContentProduct';
import { ContentPostApi } from './services/custom/ContentPost';
import { StorageFileApi } from './services/custom/StorageFile';
import { SystemDomainApi } from './services/custom/SystemDomain';
import { SystemSettingApi } from './services/custom/SystemSetting';
import { SystemUserApi } from './services/custom/SystemUser';
import { ConferenceEventApi } from './services/custom/ConferenceEvent';
import { ConferenceLocationApi } from './services/custom/ConferenceLocation';
import { ConferenceSpeakerApi } from './services/custom/ConferenceSpeaker';
import { ConferenceSponsorApi } from './services/custom/ConferenceSponsor';
import { PingApi } from './services/custom/Ping';
import { MetaApi } from './services/custom/Meta';

/**
 * Reusable providers block for various module types.
 * A platform agnostic module and a browser specific module are provided.
 */
export const SDK_PROVIDERS: any[] = [
  LoopBackAuth,
  LoggerService,
  JSONSearchParams,
  SDKModels,
  RealTime,
  ErrorHandler,
  SocketConnection,
  EmailApi,
  StorageContainerApi,
  SystemApi,
  ContentEventApi,
  ContentPageApi,
  ContentProductApi,
  ContentPostApi,
  StorageFileApi,
  SystemDomainApi,
  SystemSettingApi,
  SystemUserApi,
  ConferenceEventApi,
  ConferenceLocationApi,
  ConferenceSpeakerApi,
  ConferenceSponsorApi,
  PingApi,
  MetaApi,
];

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
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }, socketPluginFactory: Function): ModuleWithProviders {
    if (!socketPluginFactory) {
      throw (new Error('You must provide a factory function which returns the socket.io plugin to use.'));
    }
    return {
      ngModule  : SDKBrowserModule,
      providers: [
        ...SDK_PROVIDERS,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser },
        { provide: SocketIOToken, useFactory: socketPluginFactory },
        { provide: SocketDriver, useClass: SocketBrowser }
      ]
    };
  }
}

/**
* @module SDKModule
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
export class SDKModule {
  static forRoot(providers: {
    storage: any;
    socket: any;
  }): ModuleWithProviders {
    return {
      ngModule  : SDKModule,
      providers: [
        ...SDK_PROVIDERS,
        // platform agnostic just uses same storage provider for internal and sdk
        { provide: InternalStorage, useClass: providers.storage },
        { provide: SDKStorage, useExisting: InternalStorage },
        { provide: SocketDriver, useClass: providers.socket }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';
