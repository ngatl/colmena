import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

export const routes: Routes = [ {
  path: 'conference',
  data: {
    title: 'Conference',
  },
  children: [
    { path: '', loadChildren: './speakers/speakers.module#SpeakersModule' },
    { path: '', loadChildren: './sponsors/sponsors.module#SponsorsModule' },
  ],
} ]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
