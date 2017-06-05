import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { DomainApi } from '@colmena/admin-lb-sdk'
import { UiDataGridService, FormService } from '@colmena/admin-ui'
import 'rxjs/add/operator/map';

@Injectable()
export class DomainsService extends UiDataGridService {

  public icon = 'icon-globe'
  public title = 'Domains'

  public tableColumns = [
    { field: 'id', label: 'ID', action: 'view' },
    { field: 'name', label: 'Name', action: 'view' },
  ]

  public formFields = [
    this.formService.input('id', {
      label: 'ID',
      placeholder: 'ID'
    }),
    this.formService.input('name', {
      label: 'Name',
      placeholder: 'Name'
    }),
    this.formService.email('email', {
      label: 'Email',
      placeholder: 'Email'
    }),
  ]

  public system$
  public domains$

  constructor(
    public domainApi: DomainApi,
    public formService: FormService,
    public store: Store<any>,
  ) {
    super()
    this.columns = this.tableColumns
    this.system$ = this.store.select('system')
    this.domains$ = this.system$.map((s) => s.domains)
  }

  getFormConfig() {
    return {
      icon: this.icon,
      fields: this.formFields,
      showCancel: true,
    }
  }

  getItems() {
    return this.domainApi.find(this.getFilters())
  }

  getItemCount() {
    return this.domainApi.count(this.getWhereFilters())
  }

  upsertItem(item, successCb, errorCb): void {
    if (item.id) {
      this.domainApi.upsert(item).subscribe(successCb, errorCb)
    } else {
      this.domainApi.create(item).subscribe(successCb, errorCb)
    }
  }

  deleteItem(item, successCb, errorCb) {
    this.domainApi
      .deleteById(item.id)
      .subscribe(
      (success) => successCb(success),
      (error) => errorCb(error),
    )
  }

}
