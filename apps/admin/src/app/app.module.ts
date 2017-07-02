// Angular Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

// Third party Modules
import { LoopBackConfig, SocketIOToken, SDKBrowserModule } from '@colmena/admin-lb-sdk'
import * as io from 'socket.io-client';

// Local Modules
import { ColmenaLayoutModule } from '@colmena/admin-layout'
import { ColmenaUiModule } from '@colmena/admin-ui'

// Local Components/Routes/Services
import { AppConfigModule } from './app-config.module'
import { AppRoutingModule } from './app-routing.module'
import { AppStoreModule } from './app.store'

import { ExtensionsModule } from './extensions.module'

import { AppService } from './app.service'
import { LogService } from './log.service'

import { AppComponent } from './app.component'
import { NotFoundComponent } from './components/not-found/not-found.component'
import { RouterComponent } from './components/router/router.component'

// factories
export function socketPluginFactory() {
  return io;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,

    SDKBrowserModule.forRoot([
      // provide browser based socket plugin
      { provide: SocketIOToken, useFactory: socketPluginFactory }
    ]),
    ColmenaLayoutModule,
    ColmenaUiModule,

    AppStoreModule,
    AppRoutingModule,
    AppConfigModule,

    ExtensionsModule,
  ],
  providers: [
    AppService,
    LogService,
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    RouterComponent,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {

  configureLoopBack() {
    const apiConfig = JSON.parse(window.localStorage.getItem('apiConfig'))

    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
    this.logService.info(`Configure LoopBack: ${apiConfig.baseUrl}/${apiConfig.version}`)
  }

  constructor(
    private appService: AppService,
    private logService: LogService,
  ) {
    this.configureLoopBack()
    this.appService.fetchSettings()
    this.appService.fetchDomains()
  }

}
