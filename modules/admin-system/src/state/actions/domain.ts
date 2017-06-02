import { Action } from '@ngrx/store'

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

export class CreateDomainAction implements Action {
  type = CREATE_DOMAIN
  constructor(public payload: any) { }
}
export class CreateDomainSuccessAction implements Action {
  type = CREATE_DOMAIN_SUCCESS
  constructor(public payload: any) { }
}
export class CreateDomainFailAction implements Action {
  type = CREATE_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export class ReadDomainsAction implements Action {
  type = READ_DOMAINS
  constructor(public payload?: any) { }
}
export class ReadDomainsSuccessAction implements Action {
  type = READ_DOMAINS_SUCCESS
  constructor(public payload: any) { }
}
export class ReadDomainsFailAction implements Action {
  type = READ_DOMAINS_FAIL
  constructor(public payload: any) { }
}

export class UpdateDomainAction implements Action {
  type = UPDATE_DOMAIN
  constructor(public payload: any) { }
}
export class UpdateDomainSuccessAction implements Action {
  type = UPDATE_DOMAIN_SUCCESS
  constructor(public payload: any) { }
}
export class UpdateDomainFailAction implements Action {
  type = UPDATE_DOMAIN_FAIL
  constructor(public payload: any) { }
}

export class DeleteDomainAction implements Action {
  type = DELETE_DOMAIN
  constructor(public payload: any) { }
}
export class DeleteDomainSuccessAction implements Action {
  type = DELETE_DOMAIN_SUCCESS
  constructor(public payload: any) { }
}
export class DeleteDomainFailAction implements Action {
  type = DELETE_DOMAIN_FAIL
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
