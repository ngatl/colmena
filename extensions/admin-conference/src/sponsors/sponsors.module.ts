import { NgModule } from '@angular/core'

import { ColmenaUiModule } from '@colmena/admin-ui'

import { SponsorsService } from './sponsors.service'
import { SponsorsRoutingModule } from './sponsors-routing.module'

import { SponsorComponent } from './components/sponsor.component'
import { SponsorFormComponent } from './components/sponsor-form.component'
import { SponsorsIndexComponent } from './components/sponsors-index.component'
import { SponsorsComponent } from './components/sponsors.component'

@NgModule({
  imports: [
    ColmenaUiModule,
    SponsorsRoutingModule,
  ],
  declarations: [
    SponsorComponent,
    SponsorFormComponent,
    SponsorsIndexComponent,
    SponsorsComponent,
  ],
  providers: [
    SponsorsService,
  ]
})
export class SponsorsModule { }
