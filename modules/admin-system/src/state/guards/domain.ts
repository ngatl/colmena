import 'rxjs/add/operator/take'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/let'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { Router, RouterState, CanActivate, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { Domain, DomainApi } from '@colmena/admin-lb-sdk'
import * as reducers from '../reducers'
import * as actions from '../actions'


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class DomainExistsGuard implements CanActivate {
  constructor(
    private store: Store<reducers.State>,
    private domainApi: DomainApi,
    private router: Router,
  ) { }

  waitForDomainsToLoad(id: string): Observable<boolean> {
    this.store.dispatch(new actions.ReadDomainsAction({ where: { id: id } }))
    return this.store.select('system')
      .filter(system => system.domains.loaded)
      .take(1)
  }

  /**
   * This method checks if a domain with the given ID is already registered
   * in the Store
   */
  hasDomainInStore(id: string): Observable<boolean> {
    return this.store.select('system')
      .map(system => !!system.domains.entities[id])
      .take(1)
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasDomainInApi(id: string): Observable<boolean> {
    return this.domainApi.find({ where: { id: id } })
      .map((domains: Domain[]) => new actions.ReadDomainsSuccessAction(domains))
      .catch(() => {
        this.router.navigate(['/system/domains'])
        return of(false)
      })
  }

  /**
   * `hasDomain` composes `hasDomainInStore` and `hasDomainInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasDomain(id: string): Observable<boolean> {
    return this.hasDomainInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore)
        }

        return this.hasDomainInApi(id)
      })
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.params['id']
    return this.waitForDomainsToLoad(id)
      .switchMap(() => this.hasDomain(id))
  }
}
