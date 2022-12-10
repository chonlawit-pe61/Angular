import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { cartitem } from 'src/app/interface/item';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  @Output() Itemfilter = new EventEmitter();
  isShowing = false;
  stateUserSelect: cartitem[] = [];
  sumtotalAll = 0;
  sidenav: any;
  ngOnInit(): void {}

  getItemValue(value: any) {
    this.stateUserSelect = value;
    // console.log(this.stateUserSelect);
    this.CheckMoneySumAll();
  }

  CheckOneItemIncrement(nameItem: string) {
    for (let index = 0; index < this.stateUserSelect.length; index++) {
      // console.log(this.stateUserSelect[index].total);

      if (this.stateUserSelect[index].title == nameItem) {
        this.stateUserSelect[index].numberselectitem++;
        // ราคารวม = จำนวนสินค้า * ราคา
        // console.log(this.stateUserSelect[index].numberselectitem);
        // console.log(this.stateUserSelect[index]);
        let sum =
          this.stateUserSelect[index].numberselectitem *
          this.stateUserSelect[index].money;
        this.stateUserSelect[index].total = sum;
      }
      this.CheckMoneySumAll();
    }
    // สร้าง array in stateUserSelect[index] เพื่อทำการเก็บ ชื่อ เเละราคารวม
  }
  CheckOneItemDecrement(nameItem: string) {
    for (let index = 0; index < this.stateUserSelect.length; index++) {
      if (this.stateUserSelect[index].title == nameItem) {
        this.stateUserSelect[index].numberselectitem--;
        // ราคารวม = จำนวนสินค้า * ราคา
        // console.log(this.stateUserSelect[index].numberselectitem);
        // console.log(this.stateUserSelect[index]);
        let sum =
          this.stateUserSelect[index].numberselectitem *
          this.stateUserSelect[index].money;
        this.stateUserSelect[index].total = sum;
        if (this.stateUserSelect[index].numberselectitem < 1) {
          this.openDialog(
            '0ms',
            '0ms',
            this.stateUserSelect[index].title,
            'REMOVE'
          );
          this.stateUserSelect[index].numberselectitem = 1;
          this.stateUserSelect[index].total = this.stateUserSelect[index].money;
        }
      }
      this.CheckMoneySumAll();
    }
  }
  CheckMoneySumAll() {
    let sumall = 0;
    for (let index = 0; index < this.stateUserSelect.length; index++) {
      sumall += this.stateUserSelect[index].total;
    }
    this.sumtotalAll = sumall;
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    item: string,
    status: string
  ): void {
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { item: item, status: status },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.event == 'REMOVE') {
        this.RemoveItemUserSelect(result.data);
      } else if (result.event == 'BUY') {
        this.stateUserSelect.length = 0;
        this.sumtotalAll = 0;
      }
    });
    this.isShowing = !this.isShowing;
    console.log(this.isShowing);
  }

  RemoveItemUserSelect(result: string) {
    const objWithIdIndex = this.stateUserSelect.findIndex(
      ({ title }) => title === result
    );
    console.log(objWithIdIndex);

    var RemoveItemInArraythis = this.stateUserSelect.splice(objWithIdIndex, 1);
    console.log(RemoveItemInArraythis);
    this.CheckMoneySumAll();
  }
  OpenOrClose(e: any) {
    e.toggle();
  }
}
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}
