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
import { StorageNative } from './storage/storage.native';
import { SocketNative } from './sockets/socket.native';
import { SocketDriver } from './sockets/socket.driver';
import { SocketConnection } from './sockets/socket.connections';
import { RealTime } from './services/core/real.time';
import { EmailApi } from './services/custom/Email';
import { CoreApi } from './services/custom/Core';
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
* @module SDKNativeModule
* @description
* This module should be imported when building a NativeScript Applications.
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler,
    SocketConnection
  ]
})
export class SDKNativeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : SDKNativeModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        JSONSearchParams,
        SDKModels,
        RealTime,
        EmailApi,
        CoreApi,
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
        { provide: InternalStorage, useClass: StorageNative },
        { provide: SDKStorage, useClass: StorageNative },
        { provide: SocketDriver, useClass: SocketNative }
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
