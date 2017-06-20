import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'conference'

const link = (...links) => ([ '/', moduleName, ...links ])

const moduleConfig = {
  name: 'Conference',
  icon: 'icon-microphone',
  packageName: `@ngatl/module-admin-${moduleName}`,
  topLinks: [
    { weight: 2, icon: 'icon-microphone', link: link() }
  ],
  sidebarLinks: [
    { weight: 2, type: 'title', label: 'Conference' },
    { weight: 2, label: 'Speakers', icon: 'icon-microphone', link: link('speakers') },
    { weight: 3, label: 'Sponsors', icon: 'icon-diamond', link: link('sponsors') },
  ],
}
@NgModule()
export class ConferenceConfigModule {

  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }

}

