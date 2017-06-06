import { Routes } from '@angular/router'

import { SystemDashboardComponent } from './system.component'
import { DomainsComponent, DomainListComponent, DomainDetailComponent } from './domains'
import { SettingsComponent } from './settings/settings.component'
import { UsersComponent } from './users/users.component'

import { DomainExistsGuard } from './state/guards'

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
        {
          path: ':id',
          component: DomainDetailComponent,
          canActivate: [DomainExistsGuard]
        },
        { path: '', component: DomainListComponent },
      ]
    },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    { path: 'users', component: UsersComponent, data: { title: 'Users' } }
  ],
}]
