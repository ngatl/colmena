import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { DomainApi, Domain } from '@colmena/admin-lb-sdk'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import * as domain from '../actions/domain'

@Injectable()
export class DomainEffects {

  constructor(
    private actions$: Actions,
    private domainApi: DomainApi,
  ) { }

  @Effect()
  createDomain$: Observable<Action> = this.actions$
    .ofType(domain.CREATE_DOMAIN)
    .map((action: domain.CreateDomainAction) => action.payload)
    .mergeMap((item: Domain) =>
      this.domainApi.create(item)
        .map(() => new domain.CreateDomainSuccessAction(item))
        .catch(() => of(new domain.CreateDomainFailAction(item))))

  @Effect()
  readDomains$: Observable<Action> = this.actions$
    .ofType(domain.READ_DOMAINS)
    .map((action: domain.ReadDomainsAction) => action.payload)
    .mergeMap((item: any) =>
      this.domainApi.find(item)
        .map(() => new domain.ReadDomainsSuccessAction(item))
        .catch(() => of(new domain.ReadDomainsFailAction(item))))

  @Effect()
  updateDomain$: Observable<Action> = this.actions$
    .ofType(domain.UPDATE_DOMAIN)
    .map((action: domain.UpdateDomainAction) => action.payload)
    .mergeMap((item: Domain) =>
      this.domainApi.upsert(item)
        .map(() => new domain.UpdateDomainSuccessAction(item))
        .catch(() => of(new domain.UpdateDomainFailAction(item))))

  @Effect()
  deleteDomain$: Observable<Action> = this.actions$
    .ofType(domain.DELETE_DOMAIN)
    .map((action: domain.DeleteDomainAction) => action.payload)
    .mergeMap((item: Domain) =>
      this.domainApi.deleteById(item.id)
        .map(() => new domain.DeleteDomainSuccessAction(item))
        .catch(() => of(new domain.DeleteDomainFailAction(item))))

}
