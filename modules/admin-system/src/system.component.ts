import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

import * as domain from './state/actions/domain'

@Component({
  selector: 'app-system-dashboard',
  template: `
    <div class="row">
      <div class="col-md-3" *ngFor="let widget of (widgets$ | async)">
        <ui-dashboard-icon
          [routerLink]="widget.link"
          [count]="widget.count"
          [icon]="widget.icon"
          [label]="widget.label"
          [type]="widget.type">
        </ui-dashboard-icon>
      </div>
    </div>
  `,
  styles: [`
    ui-card {
      cursor: pointer;
    }
    ui-card h4 {
      margin: 0;
    }
  `]
})
export class SystemDashboardComponent {

  public app$
  public widgets$

  constructor(
    private store: Store<any>,
  ) {
    this.app$ = this.store.select('app')
    this.widgets$ = this.app$.map(a => a.systemDashboard)
  }
}
