import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'number-pad',
  standalone: true,
  imports: [],
  templateUrl: './number-pad.component.html',
  styleUrl: './number-pad.component.css'
})
export class NumberPadComponent {
  @Output() numberClicked = new EventEmitter<string>();
  @Output() doneClicked = new EventEmitter<boolean>();

  addNumber(num: string) {
    this.numberClicked.emit(num);
  }
  
  doneNumber(done: boolean) {
    this.doneClicked.emit(done);
  }
}
