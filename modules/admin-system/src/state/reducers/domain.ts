import { VERSION } from '@angular/core'
import { Domain } from '@colmena/admin-lb-sdk'
import { sortBy } from 'lodash'
import { Action, ActionReducer } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { createSelector } from 'reselect'
import 'rxjs/add/operator/map'

import * as domain from '../actions/domain'

export interface State {
  ids: string[];
  entities: { [id: string]: Domain };
  selectedId: string;
  selectedEntity: Domain;
  loaded: boolean;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
  selectedEntity: null,
  loaded: false,
}

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case domain.READ_DOMAINS_SUCCESS:
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
        selectedId: state.selectedId,
        selectedEntity: state.selectedEntity,
        loaded: true,
      }
    case domain.SELECT_DOMAIN: {
      const selection = action.payload
      return {
        ids: state.ids,
        entities: state.entities,
        selectedId: selection,
        selectedEntity: state.entities[selection],
        loaded: state.loaded,
      }
    }
    default:
      return state
  }
}

export const getEntities = (state: State) => state.entities

export const getIds = (state: State) => state.ids

export const getSelectedId = (state: State) => state.selectedId

export const getSelected = createSelector(getEntities, getSelectedId, (ent, id) => {
  return ent[id]
})

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id])
})
