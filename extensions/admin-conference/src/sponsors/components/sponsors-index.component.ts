import { Component } from '@angular/core'

@Component({
  template: `
    <div class="card">
      <div class="card-block">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class SponsorsIndexComponent { }
