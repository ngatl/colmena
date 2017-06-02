import { Routes } from '@angular/router'

import { SystemDashboardComponent } from './system.component'
import { DomainsComponent } from './domains/domains.component'
import { DomainListComponent } from './domains/domain-list.component'
import { DomainDetailComponent } from './domains/domain-detail.component'
import { SettingsComponent } from './settings/settings.component'
import { UsersComponent } from './users/users.component'
import { UserDetailComponent } from './users/user-detail.component'

export const SystemModuleRoutes: Routes = [{
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
          component: DomainDetailComponent
        },
        {
          path: '',
          component: DomainListComponent
        }
      ]
    },
    { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
    {
      path: 'users',
      component: UsersComponent,
      data: { title: 'Users' },
      children: [
        {
          path: ':id',
          component: DomainDetailComponent,
          data: { title: ':id' }
        },
        {
          path: '',
          component: DomainListComponent
        }
      ]
    }
  ]
}]
