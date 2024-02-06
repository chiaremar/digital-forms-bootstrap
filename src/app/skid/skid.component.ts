import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatDialog } from '@angular/material/dialog';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';
import { FormsModule } from '@angular/forms';
import { NumberPadComponent } from '../number-pad/number-pad.component';
import { Skid } from '../../../node_modules/take2-digital-forms-data-model';

/* export interface Skid {
  number: number;
  type: string;
  packaging: string;
  grossWeight: string; // use input text with pattern="^\d*(\.\d{0,2})?$"
} */

@Component({
  selector: 'skid',
  standalone: true,
  imports: [SelectDialogComponent, FormsModule, NumberPadComponent],
  templateUrl: './skid.component.html',
  styleUrl: './skid.component.css'
})

export class SkidComponent {
  @Input() skid!:  Skid;
  @Output() skidChanged = new EventEmitter<Skid>();
  private _skid = new BehaviorSubject<Skid>(this.skid);
  skid$ = this._skid.asObservable();
  numberPadVisible = false;

  constructor(public dialog: MatDialog) {
    this.skid$.subscribe(skid => {
      this.updateSkid(skid)
    });
  }

/*   ngOnChanges(changes: SimpleChanges) {
    if (changes['skid']) {
      this._skid.next(this.skid);
    }
  } */
  
  updateSkid(updatedSkid: Skid) {
    let skid = this._skid.getValue();
    if (JSON.stringify(skid) !== JSON.stringify(updatedSkid)) {
      this._skid.next(updatedSkid);
    }
    this.skidChanged.emit(this.skid);
    //not sure why this is printing more than expected
    //console.log('skid:', skid);

  }

  showNumberPad() {
    this.numberPadVisible = true;
  }

  addNumber(num: string) {
    if (num === '.' && this.skid.grossWeight.includes('.')) {
      return;
    }
    if (num === 'done' && this.numberPadVisible) {
      this.numberPadVisible = false;
      return;
    }
    this.skid.grossWeight += num;
  } 

  doneNumber(done: boolean) {
    if (done && this.numberPadVisible) {
      this.numberPadVisible = false;
      return;
    }
   
  } 
  openTypeDialog(): void {
    const dialogRef = this.dialog.open(SelectDialogComponent, {
      width: '250px',
      data: {options: ['Computers', 'Printers', 'Monitors', 'Flat TVs', 'CRT TVs', 'Projector TV', 'Mixed']}
    });

    dialogRef.afterClosed().subscribe(result => {
      // if (result) {
      //   this.onSkidChange();
      // }
      if (result) {
        this.skid.type = result;
        this.updateSkid(this.skid);
      }
    });
  } 
  
}
