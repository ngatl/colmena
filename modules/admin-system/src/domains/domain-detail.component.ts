import { Component, Input, Output, EventEmitter } from '@angular/core'

import { UiService } from '@colmena/admin-ui'

@Component({
  selector: 'app-domain-detail',
  template: `
    <ui-card>
    </ui-card>
  `,
})
export class DomainDetailComponent {

  @Input() item
  @Input() formConfig
  @Output() action

  constructor(

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
