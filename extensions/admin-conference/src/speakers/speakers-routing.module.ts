import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { SpeakersComponent } from './components/speakers.component'
import { SpeakersIndexComponent } from './components/speakers-index.component'
import { SpeakerFormComponent } from './components/speaker-form.component'

export const routes: Routes = [ {
  path: 'speakers',
  data: {
    title: 'Speakers',
  },
  component: SpeakersIndexComponent,
  children: [
    { path: '', component: SpeakersComponent, data: { title: 'Speakers' } },
    { path: 'add', component: SpeakerFormComponent, data: { title: 'Add' } },
    { path: ':id', component: SpeakerFormComponent, data: { title: 'Edit' } },
  ],
} ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpeakersRoutingModule { }
