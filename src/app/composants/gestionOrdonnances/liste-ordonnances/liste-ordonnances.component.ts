import { Component } from '@angular/core';
import { Ordonnance } from 'src/app/classes/ordonnance';
import { OrdonnanceService } from 'src/app/services/ordonnance.service';

@Component({
  selector: 'app-liste-ordonnances',
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css']
})
export class ListeOrdonnancesComponent {
  listOrdonnances: Ordonnance[];

  constructor(private ordonnanceService: OrdonnanceService){}

  afficherOrdonnances(){
    this.ordonnanceService.getAllOrdonnances().subscribe(
      data => {
        this.listOrdonnances = data;
        console.log(this.listOrdonnances);
      },
      error => {
        console.log('Error fetching ordonnances', error);
      }
    );
  }

  ngOnInit(){
    this.afficherOrdonnances();
  }
}
