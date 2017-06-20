import { Component } from '@angular/core'

import { SpeakersService } from '../speakers.service'
import { UiService } from '@colmena/admin-ui'

@Component({
  selector: 'app-conference-speakers',
  template: `
    <div>
      <h1>
        <a href="" [routerLink]="['add']" class="btn btn-lg btn-success">
          <i class="icon-plus"></i>  Add Speaker
        </a>
      </h1>
    </div>
    <div class="row">
      <app-conference-speaker class="col-md-4" *ngFor="let item of items" [item]="item" (action)="handleAction($event)">
      </app-conference-speaker>
    </div>
  `,
})
export class SpeakersComponent {

  public items: any[]

  constructor(
    private service: SpeakersService,
    private uiService: UiService,
  ) {
    this.loadData()
  }

  loadData() {
    this.service.findSpeakers()
      .subscribe(items => this.items = items)
  }

  private handleAction(action) {
    switch (action.type) {
      case 'delete':
        const successCb = () => this.service
          .deleteSpeaker(action.payload.id)
          .subscribe(
            () => {
              this.uiService.toastSuccess('Speaker deleted', '')
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
