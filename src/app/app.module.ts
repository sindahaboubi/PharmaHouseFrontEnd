import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './composants/layouts/navbar/navbar.component';
import { FooterComponent } from './composants/layouts/footer/footer.component';
import { SidebarComponent } from './composants/layouts/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AccueilComponent } from './composants/layouts/accueil/accueil.component';
import { ErreurComponent } from './composants/layouts/erreur/erreur.component';
import { ProposComponent } from './composants/layouts/propos/propos.component';
import { ListeOrdonnancesComponent } from './composants/gestionOrdonnances/liste-ordonnances/liste-ordonnances.component';
import { AjouterOrdonnanceComponent } from './composants/gestionOrdonnances/ajouter-ordonnance/ajouter-ordonnance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
    AjouterOrdonnanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
