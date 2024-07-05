import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from 'src/app/classes/medicament.model';
import { MedicamentService } from 'src/app/services/medicament.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-medicament-detail',
  templateUrl: './medicament-detail.component.html',
  styleUrls: ['./medicament-detail.component.css']
})
export class MedicamentDetailComponent implements OnInit {
  medicament: Medicament | undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicamentService: MedicamentService,
    private cartService: CartService, 
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.medicamentService.getById(+id).subscribe(
        (medicament: Medicament) => this.medicament = medicament,
        (error) => console.error('Error fetching medicament:', error)
      );
    }
  }

  getMedicamentImageUrl(medicament: Medicament): string {
    return `data:image/jpeg;base64,${medicament.photo}`;
  }

  increaseQuantity(): void {
    if (this.quantity < this.medicament.quantite) {
      this.quantity++;
    } else {
      alert("La quantité maximale disponible est atteinte."); // Display pop-up in French
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    } else {
      alert("La quantité minimale est 1."); // Display pop-up in French
    }
  }
  addToCart(medicament: Medicament, quantity: number): void {
    if (quantity > 0) {
      // Ask for confirmation before proceeding
  
    
        // If user does not confirm, add to cart and navigate to 'cart' route
        this.cartService.addToCart(medicament, quantity);
        console.log(`${quantity} de ${medicament.titre} ajouté au panier.`);
        this.router.navigate(['/medicamentsUser']);
      
  
    } else {
      // If quantity is not greater than zero, log an error
      console.error('La quantité doit être supérieure à zéro.');
    }
  }
  
  calculateTotalPrice(): number {
    return this.quantity * (this.medicament?.prix || 0); // Handle null or undefined case for medicament
  }
}
