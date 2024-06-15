import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './composants/layouts/accueil/accueil.component';
import { ErreurComponent } from './composants/layouts/erreur/erreur.component';
import { ProposComponent } from './composants/layouts/propos/propos.component';
import { ListeOrdonnancesComponent } from './composants/gestionOrdonnances/liste-ordonnances/liste-ordonnances.component';

const routes: Routes = [
  {path:'accueil', component:AccueilComponent},
  {path:'propos', component: ProposComponent},
  {path:'ordonnances', component:ListeOrdonnancesComponent},
  {path:'', redirectTo:'accueil', pathMatch:'full'},
  {path:'**', component:ErreurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
