import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SkidComponent } from './skid/skid.component';
import { Skid } from './skid/skid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SkidComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'digital-forms-bootstrap';
  numberOfSkids = 2; // 16; 
  skids: Skid[] = Array.from({length: this.numberOfSkids}, (_, i) => (
    { number: i + 1, 
      type: '',
      packaging: ''
    }
  ))

  private _skids = new BehaviorSubject<Skid[]>(this.skids);
  skids$ = this._skids.asObservable();

  updateSkids(updatedSkid: Skid, index: number) {
    let skids = this._skids.getValue();
    skids[index] = updatedSkid;
    this._skids.next(skids);
    console.log('skids:', skids);
  }

}
