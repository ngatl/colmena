import { Component } from '@angular/core'

import { UiService } from '@colmena/admin-ui'

import { ActivatedRoute, Router } from '@angular/router'
import { ConferenceSponsor, SponsorsService } from '../sponsors.service'

@Component({
  selector: 'app-conference-sponsor-form',
  template: `
    {{item}}
  `,
})
export class SponsorFormComponent {

  config: any
  itemId: string
  item: ConferenceSponsor

  constructor(private conferenceService: SponsorsService,
              private uiService: UiService,
              private route: ActivatedRoute,
              private router: Router,) {
    this.config = this.conferenceService.getSponsorFields()
    this.itemId = this.route.snapshot.params['id']

    if (this.itemId) {
      this.conferenceService.findSponsor(this.itemId)
        .subscribe((res: ConferenceSponsor) => {
          this.item = res
        })
    } else {
      this.item = new ConferenceSponsor()
    }
  }


  private handleAction(action) {
    switch (action.type) {
      case 'save':
        return this.conferenceService
          .upsertSponsor(Object.assign({}, action.payload, {id: this.itemId}))
          .subscribe(() => {
            this.uiService.toastSuccess('Sponsor saved', '')
            this.handleAction({type: 'cancel'})
          }, (err) => this.uiService.toastError('Error deleting item', err.message))
      case 'cancel':
        return this.router.navigate(['/conference/sponsors/'])
      default:
        console.log('Unknown action', action)
    }
  }
}
