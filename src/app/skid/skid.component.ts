import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatDialog } from '@angular/material/dialog';
import { SelectDialogComponent } from '../select-dialog/select-dialog.component';

export interface Skid {
  number: number;
  type: string;
  packaging: string;
}

@Component({
  selector: 'skid',
  standalone: true,
  imports: [SelectDialogComponent],
  templateUrl: './skid.component.html',
  styleUrl: './skid.component.css'
})

export class SkidComponent {
  @Input() skid!:  Skid;
  @Output() skidChanged = new EventEmitter<Skid>();
  private _skid = new BehaviorSubject<Skid>(this.skid);
  skid$ = this._skid.asObservable();

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
