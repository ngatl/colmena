import { Action } from '@ngrx/store'
import { Domain } from '@colmena/admin-lb-sdk'

export const CREATE_DOMAIN = '[system] CreateDomain'
export const CREATE_DOMAIN_SUCCESS = '[system] CreateDomainSuccess'
export const CREATE_DOMAIN_FAIL = '[system] CreateDomainFail'

export const READ_DOMAINS = '[system] ReadDomains'
export const READ_DOMAINS_SUCCESS = '[system] ReadDomainsSuccess'
export const READ_DOMAINS_FAIL = '[system] ReadDomainsFail'

export const UPDATE_DOMAIN = '[system] UpdateDomain'
export const UPDATE_DOMAIN_SUCCESS = '[system] UpdateDomainSuccess'
export const UPDATE_DOMAIN_FAIL = '[system] UpdateDomainFail'

export const DELETE_DOMAIN = '[system] DeleteDomain'
export const DELETE_DOMAIN_SUCCESS = '[system] DeleteDomainSuccess'
export const DELETE_DOMAIN_FAIL = '[system] DeleteDomainFail'

export const SELECT_DOMAIN = '[system] SelectDomain'
export const SELECT_DOMAIN_SUCCESS = '[system] SelectDomainSuccess'
export const SELECT_DOMAIN_FAIL = '[system] SelectDomainFail'

export class CreateDomainAction implements Action {
  readonly type = CREATE_DOMAIN
  constructor(public payload: any) { }
}
export class CreateDomainSuccessAction implements Action {
  readonly type = CREATE_DOMAIN_SUCCESS
  constructor(public payload: Domain) { }
}
export class CreateDomainFailAction implements Action {
  readonly type = CREATE_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export class ReadDomainsAction implements Action {
  readonly type = READ_DOMAINS
  constructor(public payload: any = {}) { }
}
export class ReadDomainsSuccessAction implements Action {
  readonly type = READ_DOMAINS_SUCCESS
  constructor(public payload: Domain[]) { }
}
export class ReadDomainsFailAction implements Action {
  readonly type = READ_DOMAINS_FAIL
  constructor(public payload: any) { }
}

export class UpdateDomainAction implements Action {
  readonly type = UPDATE_DOMAIN
  constructor(public payload: Domain) { }
}
export class UpdateDomainSuccessAction implements Action {
  readonly type = UPDATE_DOMAIN_SUCCESS
  constructor(public payload: Domain) { }
}
export class UpdateDomainFailAction implements Action {
  readonly type = UPDATE_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export class DeleteDomainAction implements Action {
  readonly type = DELETE_DOMAIN
  constructor(public payload: any) { }
}
export class DeleteDomainSuccessAction implements Action {
  readonly type = DELETE_DOMAIN_SUCCESS
  constructor(public payload: any) { }
}
export class DeleteDomainFailAction implements Action {
  readonly type = DELETE_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export class SelectDomainAction implements Action {
  readonly type = SELECT_DOMAIN
  constructor(public payload: string) { }
}
export class SelectDomainSuccessAction implements Action {
  readonly type = SELECT_DOMAIN_SUCCESS
  constructor(public payload: any) { }
}
export class SelectDomainFailAction implements Action {
  readonly type = SELECT_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export type Actions
  = CreateDomainAction
  | CreateDomainSuccessAction
  | CreateDomainFailAction
  | ReadDomainsAction
  | ReadDomainsSuccessAction
  | ReadDomainsFailAction
  | UpdateDomainAction
  | UpdateDomainSuccessAction
  | UpdateDomainFailAction
  | DeleteDomainAction
  | DeleteDomainSuccessAction
  | DeleteDomainFailAction
  | SelectDomainAction
  | SelectDomainSuccessAction
  | SelectDomainFailAction
