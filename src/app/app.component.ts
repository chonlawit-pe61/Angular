import { Value } from './../../node_modules/regjsparser/parser.d';
import { Component, Input } from '@angular/core';
import { cartitem } from './interface/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-shop';
}
