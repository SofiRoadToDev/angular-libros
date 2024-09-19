import {
  Component,
  inject,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DataFetchingService } from '../../services/data-fetching.service';
import { Libro } from '../../interfaces/Libro';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
})
export class ListaComponent implements OnInit, OnChanges {
  libroService = inject(DataFetchingService);
  libros: Libro[] = [];
  filteredLibros: Libro[] = this.libros;
  router = inject(Router);

  @Input() parentQuery: string = '';

  ngOnInit(): void {
    this.cargarLibros();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentQuery']) {
      this.filteredLibros = this.libroService.applyFilter(
        this.libros,
        this.parentQuery
      );
    }
  }

  borrarLibro(id: number) {
    this.libroService.deleteLibro(id).subscribe({
      next: () => {
        alert('borrado correctamente');
      },
      error: (err) => {
        alert(`Error ${err}`);
      },
    });
    //this.cargarLibros();
    this.router.navigate(['']);
  }

  cargarLibros() {
    this.libroService
      .getLibros()
      .subscribe((users: any) => (this.libros = users));
  }
}
