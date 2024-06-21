import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/classes/medicament.model';
import { MedicamentService } from 'src/app/services/medicament.service';
import { CartService } from 'src/app/services/cart.service'; // Import the CartService

@Component({
  selector: 'app-liste-medicaments-user',
  templateUrl: './liste-medicaments-user.component.html',
  styleUrls: ['./liste-medicaments-user.component.css']
})
export class ListeMedicamentsUserComponent {
  medicaments: Medicament[] = [];
  filteredMedicaments: Medicament[] = [];
  searchText: string = '';
  baseUrl: string = 'http://localhost:8081'; // Replace with your backend URL

  constructor(
    private medicamentService: MedicamentService, 
    private cartService: CartService, // Ensure CartService is injected
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMedicaments();
  }

  fetchMedicaments(): void {
    this.medicamentService.getAll().subscribe(
      (medicaments: Medicament[]) => {
        this.medicaments = medicaments;
        this.filteredMedicaments = [...medicaments]; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching medicaments:', error);
      }
    );
  }

  viewMedicament(id: number): void {
    this.router.navigate(['/medicaments', id]);
  }

  addToCart(medicament: Medicament): void {
    this.cartService.addToCart(medicament,1);
  }

  // Filter medicaments based on search text
  filterMedicaments(): void {
    if (!this.searchText) {
      this.filteredMedicaments = [...this.medicaments]; // Reset to full list if search text is empty
    } else {
      this.filteredMedicaments = this.medicaments.filter(medicament =>
        this.containsSearchTerm(medicament)
      );
    }
  }

  // Helper function to check if any property of medicament contains the search term
  private containsSearchTerm(medicament: Medicament): boolean {
    const searchTerm = this.searchText.toLowerCase();
    return Object.values(medicament).some(val =>
      val && typeof val === 'string' && val.toLowerCase().includes(searchTerm)
    );
  }

  // Method to get URL of the medicament photo
  getMedicamentImageUrl(medicament: Medicament): string {
    return `data:image/jpeg;base64,${medicament.photo}`;
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
