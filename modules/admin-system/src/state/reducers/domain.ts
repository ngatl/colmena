import { VERSION } from '@angular/core'
import { Domain } from '@colmena/admin-lb-sdk'
import { sortBy } from 'lodash'
import { Action, ActionReducer } from '@ngrx/store'

import * as domain from '../actions/domain'

export interface State {
  ids: string[];
  entities: { [id: string]: Domain };
  selectedIds: string[];
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedIds: [],
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case 'READ_DOMAINS_SUCCESS':
      const domains = action.payload
      const newDomains = domains.filter(item => !state.entities[item.id])
      const newDomainIds = newDomains.map(item => item.id)
      const newDomainEntities = newDomains.reduce((entities: { [id: string]: Domain }, item: Domain) => {
        return Object.assign(entities, {
          [item.id]: item
        })
      }, {})
      return {
        ids: [...state.ids, ...newDomainIds],
        entities: Object.assign({}, state.entities, newDomainEntities),
        selectedIds: state.selectedIds
      }
    default:
      return state
  }
}

export function getDomainById(id: string) {
  return (state$: Observable<any>) => state$
    .select((s) => s.domains.entities[id])
}
