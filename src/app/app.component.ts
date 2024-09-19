import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilterboxComponent } from './components/filterbox/filterbox.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaComponent } from './components/lista/lista.component';
import { DependantDropdownComponent } from './components/dependant-dropdown/dependant-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FilterboxComponent,
    FormularioComponent,
    ListaComponent,
    DependantDropdownComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'overview';

  @Input()
  inputQuery: string = '';

  getQueryFromChild(value: string) {
    this.inputQuery = value;
  }
}
