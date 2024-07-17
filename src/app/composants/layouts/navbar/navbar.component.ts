import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Medicament } from 'src/app/classes/medicament.model';
import { AuthGuard } from 'src/app/services/auth.Guard';
import { AuthApi } from 'src/app/services/auth.api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}


  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart: { medicament: Medicament, quantity: number }[]) => {
      this.cartCount = cart.reduce((count, item) => count + item.quantity, 0);
    });
    
  }
  Logout(){
    localStorage.clear();
    window.location.reload();
  }

}
