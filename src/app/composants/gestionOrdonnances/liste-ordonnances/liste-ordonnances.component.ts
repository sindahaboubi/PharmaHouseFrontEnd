import { Component } from '@angular/core';
import { Ordonnance } from 'src/app/classes/ordonnance';
import { OrdonnanceService } from 'src/app/services/ordonnance.service';
import { MatDialog } from '@angular/material/dialog';
import { AjouterOrdonnanceComponent } from '../ajouter-ordonnance/ajouter-ordonnance.component';

@Component({
  selector: 'app-liste-ordonnances',
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css']
})
export class ListeOrdonnancesComponent {
  listOrdonnances: Ordonnance[];
  userId: number=1;

  constructor(private ordonnanceService: OrdonnanceService, private dialog: MatDialog){}

  getOrdonnancesByUserId(): void {
    this.ordonnanceService.getOrdonnancesByUserId(this.userId).subscribe(
      data => {
        this.listOrdonnances = data;
        console.log(this.listOrdonnances);
      },
      error => {
        console.error(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AjouterOrdonnanceComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fermé');
    });
  }

  ngOnInit(){
    this.getOrdonnancesByUserId();
  }
}
