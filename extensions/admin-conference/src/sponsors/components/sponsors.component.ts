import { Component } from '@angular/core'

import { SponsorsService } from '../sponsors.service'
import { UiService } from '@colmena/admin-ui'

@Component({
  selector: 'app-conference-sponsors',
  template: `
    <div>
      <h1>
        <a href="" [routerLink]="['add']" class="btn btn-lg btn-success">
          <i class="icon-plus"></i>  Add Sponsor
        </a>
      </h1>
    </div>
    <div class="row">
      <app-conference-sponsor class="col-md-4" *ngFor="let item of items" [item]="item" (action)="handleAction($event)">
      </app-conference-sponsor>
    </div>
  `,
})
export class SponsorsComponent {

  public items: any[]

  constructor(
    private service: SponsorsService,
    private uiService: UiService,
  ) {
    this.loadData()
  }

  loadData() {
    this.service.findSponsors()
      .subscribe(items => this.items = items)
  }

  private handleAction(action) {
    switch (action.type) {
      case 'delete':
        const successCb = () => this.service
          .deleteSponsor(action.payload.id)
          .subscribe(
            () => {
              this.uiService.toastSuccess('Sponsor deleted', '')
              this.loadData()
            },
            (err) => this.uiService.toastError('Error deleting item', err.message))
        const question = { title: 'Are you sure?', text: 'The action can not be undone.' }
        return this.uiService.alertQuestion( question, successCb, () => ({}) )
      default:
        console.log('Unknown action', action)
    }
  }
}
