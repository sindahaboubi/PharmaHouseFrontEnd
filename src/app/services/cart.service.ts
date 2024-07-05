import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Medicament } from 'src/app/classes/medicament.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject: BehaviorSubject<{ medicament: Medicament, quantity: number }[]> = new BehaviorSubject([]);
  private cart: { medicament: Medicament, quantity: number }[] = [];

  constructor(private http: HttpClient) {}

  addToCart(medicament: Medicament, quantity: number): void {
    const index = this.cart.findIndex(item => item.medicament.id === medicament.id);

    if (index !== -1) {
      this.cart[index].quantity += quantity;
    } else {
      this.cart.push({ medicament: medicament, quantity: quantity });
    }

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
    this.cart = [];
    this.cartSubject.next([]);
  }

  getCart(): { medicament: Medicament, quantity: number }[] {
    return [...this.cart];
  }

  createCommande(commandeRequest: any): Observable<any> {
    return this.http.post('http://localhost:8081/commandes/create', commandeRequest);
  }
}
