import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SponsorsComponent } from './components/sponsors.component'
import { SponsorsIndexComponent } from './components/sponsors-index.component'
import { SponsorFormComponent } from './components/sponsor-form.component'

export const routes: Routes = [ {
  path: 'sponsors',
  data: {
    title: 'Sponsors',
  },
  component: SponsorsIndexComponent,
  children: [
    { path: '', component: SponsorsComponent, data: { title: 'Sponsors' } },
    { path: 'add', component: SponsorFormComponent, data: { title: 'Add' } },
    { path: ':id', component: SponsorFormComponent, data: { title: 'Edit' } },
  ],
} ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule { }
