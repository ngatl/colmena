import { VERSION } from '@angular/core'

import { sortBy } from 'lodash'
import { Action, ActionReducer, combineReducers } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { createSelector } from 'reselect'

import * as domain from './domain'
import { DomainEffects } from '../effects/domain'

export interface State {
  domains: domain.State
  settings: any[]
  users: any[]
}

const reducers = {
  domains: domain.reducer
}

const systemReducer: ActionReducer<State> = combineReducers(reducers)

export function reducer(state: any, action: any) {
  return systemReducer(state, action)
}

export const SystemEffects = [
  EffectsModule.run(DomainEffects)
]

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.booksState$ = state$.select(getBooksState);
 * 	}
 * }
 * ```
 */
export const getDomainsState = (state: State) => state.domains

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 */
export const getDomainEntities = createSelector(getDomainsState, domain.getEntities)
export const getDomainIds = createSelector(getDomainsState, domain.getIds)
export const getSelectedDomainId = createSelector(getDomainsState, domain.getSelectedId)
export const getSelectedDomain = createSelector(getDomainsState, domain.getSelected)
