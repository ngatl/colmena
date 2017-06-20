import { Component } from '@angular/core'

import { UiService } from '@colmena/admin-ui'

import { ActivatedRoute, Router } from '@angular/router'
import { ConferenceSpeaker, SpeakersService } from '../speakers.service'

@Component({
  selector: 'app-conference-speaker-form',
  template: `
    
    {{item | json}}
  `,
})
export class SpeakerFormComponent {

  config: any
  itemId: string
  item: ConferenceSpeaker

  constructor(
    private service: SpeakersService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.config = this.service.getSpeakerFields()
    this.itemId = this.route.snapshot.params['id']

    if (this.itemId) {
      this.service.findSpeaker(this.itemId)
        .subscribe((res: ConferenceSpeaker) => {
          console.log(res)
          this.item = res
        })
    } else {
      this.item = new ConferenceSpeaker()
    }
  }

  private handleAction(action) {
    switch (action.type) {
      case 'save':
        return this.service
          .upsertSpeaker(Object.assign({}, action.payload, { id: this.itemId }))
          .subscribe(
            (res) => {
              console.log('res', res)
              this.uiService.toastSuccess('Speaker saved', '')
              this.handleAction({ type: 'cancel' })
            },
            (err) => {
              console.log('err', err)
            }
            )
      case 'cancel':
        return this.router.navigate(['/conference/speakers/'])
      default:
        console.log('Unknown action', action)
    }
  }
}
