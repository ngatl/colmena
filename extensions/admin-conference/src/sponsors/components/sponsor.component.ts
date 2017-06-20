import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-conference-sponsor',
  template: `
    <div class="card card-inverse">
      <div class="card-block">
        <h4 class="card-title">
          <a href="" [routerLink]="[item.id]" class="btn btn-lg btn-link">
            {{item.name}}
          </a>
        </h4>
        <p class="card-text">{{item.description}}</p>
        <p class="card-text">{{item.level}}</p>
        <div class="delete-button">
          <button class="btn btn-danger" (click)="action.emit({ type: 'delete', payload: item })">
            <i class="icon-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card:hover {
      box-shadow: 0 0 10px #333;
    }
    .card-img-overlay {
      padding: 0;
    }
    .delete-button {
      display: none;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
    .card:hover .delete-button {
      display: block;
    }
  `]
})
export class SponsorComponent {

  @Input() item: any = {}
  @Output() action = new EventEmitter()

}
