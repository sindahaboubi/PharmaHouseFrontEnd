import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './composants/layouts/navbar/navbar.component';
import { FooterComponent } from './composants/layouts/footer/footer.component';
import { SidebarComponent } from './composants/layouts/sidebar/sidebar.component';
import { AccueilComponent } from './composants/layouts/accueil/accueil.component';
import { ErreurComponent } from './composants/layouts/erreur/erreur.component';
import { ProposComponent } from './composants/layouts/propos/propos.component';
import { ListeOrdonnancesComponent } from './composants/gestionOrdonnances/liste-ordonnances/liste-ordonnances.component';
import { MedicamentFormComponent } from './composants/gestionMedicaments/medicament-form/medicament-form.component';
import { MedicamentListComponent } from './composants/gestionMedicaments/medicament-list/medicament-list.component';
import { ListeMedicamentsUserComponent } from './composants/gestionMedicaments/liste-medicaments-user/liste-medicaments-user.component';
import { CartComponent } from './composants/gestionMedicaments/cart/cart.component';
import { MedicamentDetailComponent } from './composants/gestionMedicaments/medicament-detail/medicament-detail.component';
import { ConfirmDialogComponent } from './composants/gestionMedicaments/confirm-dialog-component/confirm-dialog-component.component';
import { AjouterOrdonnanceComponent } from './composants/gestionOrdonnances/ajouter-ordonnance/ajouter-ordonnance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { GestionutilisateursComponent } from './composants/gestionutilisateurs/gestionutilisateurs.component';
import { ListeusersComponent } from './composants/gestionutilisateurs/listeusers/listeusers.component';
import { AjoutuserComponent } from './composants/gestionutilisateurs/ajoutuser/ajoutuser.component';
import { UpdateuserComponent } from './composants/gestionutilisateurs/updateuser/updateuser.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardMedicamentsComponent } from './composants/gestionMedicaments/dashboard-medicaments/dashboard-medicaments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AccueilComponent,
    ErreurComponent,
    ProposComponent,
    ListeOrdonnancesComponent,
    MedicamentListComponent,
    MedicamentFormComponent,
    ListeMedicamentsUserComponent,
    CartComponent,
    MedicamentDetailComponent,
    ConfirmDialogComponent,
   AjouterOrdonnanceComponent,
   GestionutilisateursComponent,
   ListeusersComponent,
   AjoutuserComponent,
   UpdateuserComponent,
   LoginComponent,
   RegisterComponent,

   DashboardMedicamentsComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSnackBarModule
    // Add ReactiveFormsModule here if you're using reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
