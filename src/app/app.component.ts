import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SkidComponent } from './skid/skid.component';
import { Skid } from '../../node_modules/take2-digital-forms-data-model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SkidComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'digital-forms-bootstrap';

  private _skids = new BehaviorSubject<Skid[]>([]);
  skids$ = this._skids.asObservable();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getAllSkids().subscribe({
      next: (skids) => {
      console.log(skids);

      // for each skid in skids, do the updateSkids function
      for (let i = 0; i < skids.length; i++) {
        this.updateSkids(skids[i], i);
      }
  
      },
      error: (error) => {
        console.error('There was an error!', error);
        // todo: handle error
        // this.errorMessages.push(error);
      }
    });
  }

  updateSkids(updatedSkid: Skid, index: number) {
    let skids = this._skids.getValue();
    skids[index] = updatedSkid;
    this._skids.next(skids);
    console.log('skids:', skids);

    console.log('app.component updatedSkid:', updatedSkid);
    //and update the skid on the server
    this.dataService.updateSkid(updatedSkid).subscribe(
      // todo why did response value cause strikethough on subscribe - typescript?
      //response => console.log('response:', response),
      // todo: handle response better, this should be error log
      error => console.log('response:', error)
    );

  }


}
