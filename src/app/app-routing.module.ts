import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/layouts/accueil/accueil.component';
import { ErreurComponent } from './composants/layouts/erreur/erreur.component';
import { ProposComponent } from './composants/layouts/propos/propos.component';
import { ListeOrdonnancesComponent } from './composants/gestionOrdonnances/liste-ordonnances/liste-ordonnances.component';
import { MedicamentFormComponent } from './composants/gestionMedicaments/medicament-form/medicament-form.component';
import { MedicamentListComponent } from './composants/gestionMedicaments/medicament-list/medicament-list.component';
import { ListeMedicamentsUserComponent } from './composants/gestionMedicaments/liste-medicaments-user/liste-medicaments-user.component';
import { CartComponent } from './composants/gestionMedicaments/cart/cart.component';
import { MedicamentDetailComponent } from './composants/gestionMedicaments/medicament-detail/medicament-detail.component';
import { DashboardMedicamentsComponent } from './composants/gestionMedicaments/dashboard-medicaments/dashboard-medicaments.component';
import { ListeusersComponent } from './composants/gestionutilisateurs/listeusers/listeusers.component';
import { AjoutuserComponent } from './composants/gestionutilisateurs/ajoutuser/ajoutuser.component';
import { UpdateuserComponent } from './composants/gestionutilisateurs/updateuser/updateuser.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: AccueilComponent }, // Default route
  { path: 'erreur', component: ErreurComponent },
  { path: 'propos', component: ProposComponent },
  { path: 'ordonnances', component: ListeOrdonnancesComponent },
  { path: 'medicaments', component: MedicamentListComponent },
  { path: 'medicamentsUser', component: ListeMedicamentsUserComponent },
  { path: 'medicaments/new', component: MedicamentFormComponent }, // Route for adding new medicament
  { path: 'medicaments/edit/:id', component: MedicamentFormComponent }, // Route for editing existing medicament
  { path: 'medicaments/:id', component: MedicamentDetailComponent }, // Add this route
  { path: 'dashboard', component: DashboardMedicamentsComponent },
  { path: 'cart', component: CartComponent }, // Route for cart
  //{ path: '**', component: ErreurComponent }, // Wildcard route for unknown paths
  {path : 'utilisateurs/list' , component : ListeusersComponent},
  {path : 'utilisateur/ajout', component : AjoutuserComponent},
  {path : 'utilisateur/update', component : UpdateuserComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent}

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
