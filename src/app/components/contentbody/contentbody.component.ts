import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { cartitem } from 'src/app/interface/item';
@Component({
  selector: 'app-contentbody',
  templateUrl: './contentbody.component.html',
  styleUrls: ['./contentbody.component.css'],
})
export class ContentbodyComponent implements OnInit {
  @Output() greenEvent = new EventEmitter();
  constructor() {}
  public cartItemList: cartitem[] = [];
  ngOnInit(): void {}

  Selectitems(title: string, money: number, url: string): void {
    const obj = {
      urlImg: url,
      title: title,
      money: money,
      numberselectitem: 1,
      total: money,
    };
    // console.log(obj);
    // console.log(this.cartItemList.length);
    if (this.cartItemList.length == 0) {
      this.cartItemList.push(obj);
      console.log(this.cartItemList);
      this.greenEvent.emit(this.cartItemList);
    } else {
      const result = this.cartItemList.find((data) => data.title === obj.title);
      if (result === undefined) {
        this.cartItemList.push(obj);
        // console.log(this.cartItemList);
        this.greenEvent.emit(this.cartItemList);
      }
    }
    // console.log(this.cartItemList);
  }
}
