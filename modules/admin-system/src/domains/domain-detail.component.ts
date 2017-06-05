import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { UiService } from '@colmena/admin-ui'

@Component({
  selector: 'app-domain-detail',
  template: `
    <ui-card>
      {{ item | async }}
    </ui-card>
  `,
})
export class DomainDetailComponent implements OnInit {

  public item
  @Input() formConfig
  @Output() action

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.item = this.route.data.map(data => data.domains)

  }

  handleAction(event) {
    switch (event.action) {

      default:
        console.log('Unknown event action', event)
        break
    }
  }

}
