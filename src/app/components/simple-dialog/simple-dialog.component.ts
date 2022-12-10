import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css'],
})
export class SimpleDialogComponent implements OnInit {
  sidenav!: MatSidenav;
  Status = false;
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit(): void {}

  RemoveAction(action: string, title: string) {
    this.dialogRef.close({ event: action, data: title });
  }
  BuyAction(action: string, title: string) {
    this.dialogRef.close({ event: action, data: title });
  }
}
