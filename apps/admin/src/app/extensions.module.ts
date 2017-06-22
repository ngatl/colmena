import { NgModule } from '@angular/core'

import { ExtensionsRoutingModule } from './extensions-routing.module'

// import { StarterConfigModule } from '@colmena/module-admin-starter'
import { ConferenceConfigModule } from '@ngatl/module-admin-conference'

@NgModule({
  imports: [
    ExtensionsRoutingModule,

    // StarterConfigModule
    ConferenceConfigModule
  ],
})
export class ExtensionsModule {}
