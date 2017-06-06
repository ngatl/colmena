import { Component, AfterViewInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { UiService } from '@colmena/admin-ui'
import { DomainsService } from './domains.service'
import * as reducers from '../state/reducers'
import * as actions from '../state/actions'

@Component({
  selector: 'app-domain-detail',
  template: `
    <ui-form #form
             [item]="item$ | async"
             [title]="'Edit Domain'"
             [config]="formConfig"
             (action)="action($event)">
    </ui-form>
  `,
})
export class DomainDetailComponent {

  @ViewChild('form') private form
  public id: string
  public system$: Observable<any>
  public item$: Observable<any>
  public formConfig: any = {}

  constructor(
    private store: Store<reducers.State>,
    private route: ActivatedRoute,
    private service: DomainsService,
  ) {
    this.item$ = this.store.select('system').map(s => s.domains.selectedEntity)
    this.formConfig = this.service.getFormConfig()
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        this.store.dispatch(new actions.UpdateDomainAction(event.item))
      default:
        console.log('Unknown event action', event)
        break
    }
  }

}
