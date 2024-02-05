import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export interface Skid {
  number: number;
  type: string;
  packaging: string;
}

@Component({
  selector: 'skid',
  standalone: true,
  imports: [],
  templateUrl: './skid.component.html',
  styleUrl: './skid.component.css'
})

export class SkidComponent {
  @Input() skid!:  Skid;
  @Output() skidChanged = new EventEmitter<Skid>();
  private _skid = new BehaviorSubject<Skid>(this.skid);
  skid$ = this._skid.asObservable();

  constructor() {
    this.skid$.subscribe(skid => {
      this.updateSkid(skid)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['skid']) {
      this._skid.next(this.skid);
    }
  }
  
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
    // open a dialog to select the type

    console.log('openTypeDialog');

  }
  
}
