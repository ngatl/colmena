import { VERSION } from '@angular/core'
import { Domain } from '@colmena/admin-lb-sdk'
import { sortBy } from 'lodash'
import { Action, ActionReducer } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { createSelector } from 'reselect';
import 'rxjs/add/operator/map';

import * as domain from '../actions/domain'

export interface State {
  ids: string[];
  entities: { [id: string]: Domain };
  selectedId: string;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedId: null,
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
        selectedId: state.selectedId
      }
    case domain.SELECT_DOMAIN: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedId: action.payload
      }
    }
    default:
      return state
  }
}

export function getDomainById(id: string) {
  return (state$: Observable<any>) => state$
    .map((s) => s.domains.entities[id]);
}
