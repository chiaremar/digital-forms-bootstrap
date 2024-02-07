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

 /*  ngOnInit() {
    this.dataService.getAllSkids().subscribe(skids => {
      this.skids = skids;
      this._skids.next(skids);
      console.log('skids:', this.skids);
    });
  }
  */
  ngOnInit() {
    this.dataService.getAllSkids().subscribe({
      next: (skids) => {
      console.log(skids);

      //this.skids = skids;
      // for each skid in skids, do the updateeSkids function
      for (let i = 0; i < skids.length; i++) {
        this.updateSkids(skids[i], i);
      }
      //this._skids = new BehaviorSubject<Skid[]>(this.skids);
      //this.skids$  = this._skids.asObservable();
      },
      error: (error) => {
        console.error('There was an error!', error);
        //this.errorMessages.push(error);
      }
    });
  }
/*     fetch('http://127.0.0.1:3000/api/skids')
    .then(response => response.json())
    .then(data => {
      let skids = data.skids; // The skids array from the server
      this._skids.next(skids);
   
      console.log(skids);
    })
    .catch(error => console.error('Error:', error)); 
  }
  */
  
  updateSkids(updatedSkid: Skid, index: number) {
    let skids = this._skids.getValue();
    skids[index] = updatedSkid;
    this._skids.next(skids);
    console.log('skids:', skids);
  }

}
