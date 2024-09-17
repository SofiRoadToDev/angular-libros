import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaComponent } from './components/lista/lista.component';

export const routes: Routes = [
  { path: 'alta/:id', component: FormularioComponent },
  { path: 'alta', component: FormularioComponent },
  { path: '', component: ListaComponent },
];
