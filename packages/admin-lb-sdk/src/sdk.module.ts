import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

// app
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { SocketDriver } from './sockets/socket.driver';
import { SDK_PROVIDERS } from './providers';

/**
* @module SDKModule
* @description
* This module should be imported when building a platform agnostic Application in the following scenarios:
*
*  1.- NativeScript iOS/Android app
*  2.- Angular universal application
**/
@NgModule({
  imports:      [ CommonModule, HttpModule ],
})
export class SDKModule {
  static forRoot(configuredProviders: any[]): ModuleWithProviders {
    return {
      ngModule  : SDKModule,
      providers: [
        ...SDK_PROVIDERS,
        ...configuredProviders,
        // platform agnostic just uses same storage provider for internal and sdk
        { provide: SDKStorage, useExisting: InternalStorage },
      ]
    };
  }
}
