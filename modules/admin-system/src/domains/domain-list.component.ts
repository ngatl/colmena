import { Component, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store'

import { UiService } from '@colmena/admin-ui'
import * as domain from '../state/actions/domain'

import { DomainsService } from './domains.service'

@Component({
  selector: 'app-domain-list',
  template: `
    <ui-modal-form #form>
      <ui-form [config]="formConfig" [item]="item" (action)="handleAction($event)"></ui-form>
    </ui-modal-form>

    <ui-modal #view title="View Item">
      <pre>{{item | json}}</pre>
    </ui-modal>

    <ng-template #iconTemplate let-item="item">
      <div class="card-block" style="min-height: 200px">
        <h6 style="text-decoration: underline; cursor: pointer;" (click)="handleAction({ action: 'view', item: item })">
          <i class="icon-globe"></i> {{item.name}}
        </h6>
        <p class="text-muted" *ngIf="item.description">{{item.description}}</p>
      </div>
    </ng-template>

    <ui-data-grid #grid (action)="handleAction($event)" [iconTemplate]="iconTemplate" [service]="service"></ui-data-grid>
  `,
})
export class DomainListComponent {

  @ViewChild('grid') private grid
  @ViewChild('form') private form
  @ViewChild('view') private view

  public item: any = {}
  public formConfig: any = {}

  constructor(
    public service: DomainsService,
    public uiService: UiService,
    private store: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.formConfig = this.service.getFormConfig()

  }

  save(item): void {
    this.store.dispatch(new domain.UpdateDomainAction(item))
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        this.save(event.item)
        break
      case 'edit':
        this.item = Object.assign({}, event.item)
        this.store.dispatch(new domain.SelectDomainAction(this.item.id))
        this.router.navigate([this.item.id], { relativeTo: this.route })
        break
      case 'add':
        this.item = Object.assign({}, { id: null, name: null })
        this.form.title = 'Add Domain'
        this.form.show()
        break
      case 'view':
        this.item = event.item
        this.form.title = `${this.item.name}`
        this.view.show()
        break
      case 'cancel':
        this.form.hide()
        break
      case 'delete':
        const successCb = () => this.service
          .deleteItem(event.item.id,
          () => this.grid.refreshData(),
          (err) => this.uiService.toastError('Error deleting item', err.message))
        const question = { title: 'Are you sure?', text: 'The action can not be undone.' }
        this.uiService.alertQuestion(question, successCb, () => ({}))
        break
      default:
        console.log('Unknown event type', event)
        break
    }
  }

}
