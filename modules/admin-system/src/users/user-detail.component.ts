import { Component, Input, Output, EventEmitter } from '@angular/core'

import { UiService } from '@colmena/admin-ui'

import { UsersService } from './users.service'

@Component({
  selector: 'app-user-detail',
  template: `
    <ui-card>
    </ui-card>
  `,
})
export class UserDetailComponent {

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
