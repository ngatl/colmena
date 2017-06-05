import { VERSION } from '@angular/core'

import { sortBy } from 'lodash'
import { Action, ActionReducer, combineReducers } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import * as domain from './reducers/domain'
import { DomainEffects } from './effects/domain'

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
