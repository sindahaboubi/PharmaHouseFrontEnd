import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicament } from 'src/app/classes/medicament.model';
import { MedicamentService } from 'src/app/services/medicament.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Unite } from 'src/app/classes/unite';

@Component({
  selector: 'app-medicament-form',
  templateUrl: './medicament-form.component.html',
  styleUrls: ['./medicament-form.component.css']
})
export class MedicamentFormComponent implements OnInit {
  medicament: Medicament = new Medicament();
  isEditMode: boolean = false;
  medicamentForm: FormGroup;
  selectedFile: File | null = null;
  unites: Unite[] = [];
  currentImage: string | ArrayBuffer | null = null; // Variable to hold Base64 image data


  constructor(
    private medicamentService: MedicamentService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.medicamentForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateExpiration: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      fabricant: ['', Validators.required],
      dosage: ['', Validators.required],
      uniteId: ['', Validators.required], // Ensure this matches your HTML form field name
      file: [null]
    });
  }
  ngOnInit(): void {
    this.fetchUnites();
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.medicamentService.getById(id).subscribe(
        (medicament: Medicament) => {
          this.medicament = medicament;
          
          // Format the date to YYYY-MM-DD
          const formattedDate = this.formatDate(medicament.dateExpiration);
          
          this.medicamentForm.patchValue({
            titre: medicament.titre,
            description: medicament.description,
            dateExpiration: formattedDate, // Use the formatted date here
            prix: medicament.prix,
            quantite: medicament.quantite,
            fabricant: medicament.fabricant,
            dosage: medicament.dosage,
            uniteId: medicament.unite.id  // Ensure this matches the structure of your data
          });
  
          // If you're storing picture as a base64 string
          if (medicament.photo) {
            this.currentImage = `data:image/jpeg;base64,${medicament.photo}`;
          }
        },
        (error) => {
          console.error('Error fetching medicament:', error);
        }
      );
    }
  }
  
  // Utility function to format the date to YYYY-MM-DD
  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  convertBlobToBase64(blob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.currentImage = reader.result;
    };
  }


  fetchUnites(): void {
    this.medicamentService.getUnites().subscribe(
      (unites: Unite[]) => {
        this.unites = unites;
      },
      (error) => {
        console.error('Error fetching unites:', error);
      }
    );
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.medicamentForm.valid) {
      if (this.isEditMode) {
        this.updateMedicament();
      } else {
        this.createMedicament();
      }
    } else {
      // Form is invalid, handle validation errors or feedback to user
    }
  }

  createMedicament(): void {
    const formData = this.prepareFormData();
    this.medicamentService.create(formData).subscribe(
      () => {
        this.router.navigate(['/medicaments']);
      },
      (error) => {
        console.error('Error creating medicament:', error);
        // Handle error, show user appropriate message
      }
    );
  }

  updateMedicament(): void {
    const formData = this.prepareFormData(true);
    this.medicamentService.update(this.medicament.id, formData).subscribe(
      () => {
        this.router.navigate(['/medicaments']);
      },
      (error) => {
        console.error('Error updating medicament:', error);
        // Handle error, show user appropriate message
      }
    );
  }
  private prepareFormData(includeFile: boolean = true): FormData {
    const formData = new FormData();
    formData.append('titre', this.medicamentForm.get('titre')?.value);
    formData.append('description', this.medicamentForm.get('description')?.value);
    formData.append('dateExpiration', this.medicamentForm.get('dateExpiration')?.value);
    formData.append('prix', this.medicamentForm.get('prix')?.value.toString());
    formData.append('quantite', this.medicamentForm.get('quantite')?.value.toString());
    formData.append('fabricant', this.medicamentForm.get('fabricant')?.value);
    formData.append('dosage', this.medicamentForm.get('dosage')?.value);
    formData.append('uniteId', this.medicamentForm.get('uniteId')?.value);
  
    if (includeFile && this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    return formData;
  }
}
