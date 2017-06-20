import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-conference-speaker',
  template: `
    <div class="card card-inverse">
      <img class="card-img img-fluid" [attr.src]="item.imageUrl" [attr.alt]="item.name">
      <div class="card-img-overlay">
        <h4 class="card-title">
          <a href="" [routerLink]="[item.id]" class="btn btn-lg btn-link">
            {{item.name}}
          </a>
        </h4>
        <p class="card-text">{{item.description}}</p>
        <p class="card-text"></p>
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
    .card-title {
      background: rgba(0,0,0,0.3);
      padding: 20px 10px;
    }
    .card-title a {
      color: white;
    }
    .card-text,
    .card-title {
      text-shadow: 0 0 2px #333;
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
export class SpeakerComponent {

  @Input() item: any = {}
  @Output() action = new EventEmitter()

}
