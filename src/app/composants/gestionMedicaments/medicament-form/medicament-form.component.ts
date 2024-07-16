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
  currentImage: string | ArrayBuffer | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

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
      uniteId: ['', Validators.required],
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

          const formattedDate = this.formatDate(medicament.dateExpiration);

          this.medicamentForm.patchValue({
            titre: medicament.titre,
            description: medicament.description,
            dateExpiration: formattedDate,
            prix: medicament.prix,
            quantite: medicament.quantite,
            fabricant: medicament.fabricant,
            dosage: medicament.dosage,
            uniteId: medicament.unite.id
          });

          if (medicament.photo) {
            this.currentImage = `data:image/jpeg;base64,${medicament.photo}`;
          }
        },
        (error) => {
          console.error('Error fetching medicament:', error);
          this.errorMessage = "Erreur lors de la récupération du médicament.";
        }
      );
    }
  }

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
        this.errorMessage = "Erreur lors de la récupération des unités.";
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
      this.errorMessage = "Veuillez remplir tous les champs obligatoires.";
    }
  }

  createMedicament(): void {
    const formData = this.prepareFormData();
    this.medicamentService.create(formData).subscribe(
      () => {
        this.successMessage = "Le médicament a été ajouté avec succès.";
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/medicaments']);
        }, 3000); // Navigate after 3 seconds
      },
      (error) => {
        console.error('Error creating medicament:', error);
        this.successMessage = null;
        this.errorMessage = "Erreur lors de la création du médicament.";
      }
    );
  }

  updateMedicament(): void {
    const formData = this.prepareFormData(true);
    this.medicamentService.update(this.medicament.id, formData).subscribe(
      () => {
        this.successMessage = "Le médicament a été mis à jour avec succès.";
        this.errorMessage = null;
        setTimeout(() => {
          this.router.navigate(['/medicaments']);
        }, 3000); // Navigate after 3 seconds
      },
      (error) => {
        console.error('Error updating medicament:', error);
        this.successMessage = null;
        this.errorMessage = "Erreur lors de la mise à jour du médicament.";
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
