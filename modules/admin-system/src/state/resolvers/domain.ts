import { Observable } from 'rxjs/Observable'
import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Store } from '@ngrx/store'

import { Domain } from '@colmena/admin-lb-sdk'
import { getDomainById } from '../reducers/domain';

@Injectable()
export class DomainResolver implements Resolve<Domain> {
  constructor(private store: Store<any>) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.select('system').let(getDomainById(route.params['id']))
  }
}
