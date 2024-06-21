import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicament } from 'src/app/classes/medicament.model';
import { MedicamentService } from 'src/app/services/medicament.service';

@Component({
  selector: 'app-medicament-list',
  templateUrl: './medicament-list.component.html',
  styleUrls: ['./medicament-list.component.css']
})
export class MedicamentListComponent implements OnInit {
  medicaments: Medicament[] = [];
  filteredMedicaments: Medicament[] = [];
  searchText: string = '';
  baseUrl: string = 'http://localhost:8081'; // Replace with your backend URL

  constructor(private medicamentService: MedicamentService, private router: Router) {}

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

  editMedicament(id: number): void {
    this.router.navigate(['/medicaments/edit', id]);
  }

  deleteMedicament(id: number): void {
    if (confirm('Are you sure you want to delete this medicament?')) {
      this.medicamentService.delete(id).subscribe(
        () => {
          // Refresh list after deletion
          this.fetchMedicaments();
        },
        (error) => {
          console.error('Error deleting medicament:', error);
        }
      );
    }
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

  navigateToNewMedicament(): void {
    this.router.navigate(['/medicaments/new']);
  }
}