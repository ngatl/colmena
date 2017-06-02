import { Injectable } from '@angular/core'
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Store } from '@ngrx/store'
import { DomainApi, Domain } from '@colmena/admin-lb-sdk'
import { getDomainById] } from '../reducers'

@Injectable()
export class DomainResolver implements Resolve<Domain> {
  constructor(private store: Store<any>) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.let(getDomainById(route.params['id']))
  }
}
