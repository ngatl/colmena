import { Routes } from '@angular/router'

import { SystemDashboardComponent } from './system.component'
import { DomainsComponent, DomainListComponent, DomainDetailComponent } from './domains'
import { SettingsComponent } from './settings/settings.component'
import { UsersComponent } from './users/users.component'

import { DomainResolver } from './state/resolvers'

export const SystemRoutes: Routes = [{
  path: 'system',
  data: {
    title: 'System',
  },
  children: [
    { path: '', component: SystemDashboardComponent, data: { title: 'Dashboard' } },
    {
      path: 'domains',
      component: DomainsComponent,
      data: { title: 'Domains' },
      children: [
        { path: '', component: DomainListComponent },
        { path: ':id', component: DomainDetailComponent, resolve: { domain: DomainResolver } }
      ]
    },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    { path: 'users', component: UsersComponent, data: { title: 'Users' } }
  ],
}]
