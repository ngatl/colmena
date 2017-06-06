import { Component, ViewChild, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { UiService } from '@colmena/admin-ui'
import * as domain from '../state/actions/domain'

import { DomainsService } from './domains.service'

@Component({
  selector: 'app-domains',
  template: `<router-outlet></router-outlet>`,
})
export class DomainsComponent implements OnInit {

  constructor(
    public service: DomainsService,
    public uiService: UiService,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new domain.ReadDomainsAction({}))
  }

  handleAction(event) {
    switch (event.type) {

      default:
        console.log('Unknown event type', event)
        break
    }
  }

}
