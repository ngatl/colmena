import { Component, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { UiService } from '@colmena/admin-ui'
import * as domain from '../state/actions/domain'

import { DomainsService } from './domains.service'

@Component({
  selector: 'app-domains',
  template: `<router-outlet></router-outlet>`,
})
export class DomainsComponent {

  public item: any = {}
  public formConfig: any = {}

  constructor(
    public service: DomainsService,
    public uiService: UiService,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  handleAction(event) {
    switch (event.action) {

      default:
        console.log('Unknown event action', event)
        break
    }
  }

}
