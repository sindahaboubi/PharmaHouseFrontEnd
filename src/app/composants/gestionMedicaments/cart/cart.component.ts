import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Medicament } from 'src/app/classes/medicament.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { medicament: Medicament, quantity: number }[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(item: { medicament: Medicament, quantity: number }): void {
    this.cartService.removeFromCart(item.medicament);
    this.cart = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cart = [];
  }

  calculateTotalCartPrice(): number {
    return this.cart.reduce((total, item) => total + (item.quantity * item.medicament.prix), 0);
  }

  getMedicamentImageUrl(medicament: Medicament): string {
    return `data:image/jpeg;base64,${medicament.photo}`;
  }
}
