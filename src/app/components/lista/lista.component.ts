import { Component, inject, OnInit } from '@angular/core';
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
export class ListaComponent implements OnInit {
  libroService = inject(DataFetchingService);
  libros: Libro[] = [];
  router = inject(Router);
  ngOnInit(): void {
    this.cargarLibros();
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
