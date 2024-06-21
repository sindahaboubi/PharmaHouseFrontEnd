import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medicament } from 'src/app/classes/medicament.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<{ medicament: Medicament, quantity: number }[]> = new BehaviorSubject([]);
  private cart: { medicament: Medicament, quantity: number }[] = [];

  constructor() {}

  addToCart(medicament: Medicament, quantity: number): void {
    // Find if the medicament is already in the cart
    const index = this.cart.findIndex(item => item.medicament.id === medicament.id);

    if (index !== -1) {
      // If medicament exists in cart, update its quantity
      this.cart[index].quantity += quantity;
    } else {
      // Otherwise, add new item to cart
      this.cart.push({ medicament: medicament, quantity: quantity });
    }

    // Emit the updated cart array
    this.cartSubject.next([...this.cart]);
  }

  getCartObservable(): Observable<{ medicament: Medicament, quantity: number }[]> {
    return this.cartSubject.asObservable();
  }
  removeFromCart(medicament: Medicament): void {
    const index = this.cart.findIndex(item => item.medicament.id === medicament.id);

    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next([...this.cart]);
    }
  }
  clearCart(): void {
    // Clear the cart array and emit an empty array
    this.cart = [];
    this.cartSubject.next([]);
  }

  getCart(): { medicament: Medicament, quantity: number }[] {
    // Return a copy of the cart array
    return [...this.cart];
  }

  // Other cart manipulation methods as needed
}

