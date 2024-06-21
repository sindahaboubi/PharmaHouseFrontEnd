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
    ConfirmDialogComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
