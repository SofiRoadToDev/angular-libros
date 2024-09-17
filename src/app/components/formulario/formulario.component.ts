import { Component, inject, OnInit } from '@angular/core';
import { Libro } from '../../interfaces/Libro';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataFetchingService } from '../../services/data-fetching.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error, timeStamp } from 'node:console';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent implements OnInit {
  libroService = inject(DataFetchingService);
  route = inject(ActivatedRoute);
  libro?: Libro;

  fb = inject(FormBuilder);
  router = inject(Router);
  id?: any | null;

  libroForm = this.fb.group({
    titulo: new FormControl(this.libro?.titulo || '', Validators.required),
    tema: new FormControl(this.libro?.tema || '', [Validators.required]),
    editorial: new FormControl(
      this.libro?.editorial || '',
      Validators.required
    ),
    isbn: new FormControl(this.libro?.isbn || '', Validators.required),
    autores: this.fb.array([this.crearAutor()]),
  });

  crearAutor(apellido?: string, nombre?: string): FormGroup {
    return this.fb.group({
      apellido: new FormControl(apellido || '', Validators.required),
      nombre: new FormControl(nombre || '', Validators.required),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id) {
      this.libroService.getLibroById(Number(this.id)).subscribe({
        next: (l) => {
          console.log(l);
          this.libro = l;
          this.libroForm.patchValue(this.libro);
          this.autores.clear();
          this.libro.autores.forEach((a) => {
            this.autores.push(
              new FormGroup({
                apellido: new FormControl(a.apellido),
                nombre: new FormControl(a.nombre),
              })
            );
          });
        },
        error: (e) => alert(e),
      });
    }
  }

  get autores(): FormArray {
    return this.libroForm.get('autores') as FormArray;
  }

  agregarAutor() {
    this.autores.push(this.crearAutor());
  }

  handleSubmit() {
    console.log(this.libroForm.value.editorial);
    console.log(this.libroForm.value.isbn);
    console.log(this.libroForm.value.titulo);
    console.log(this.libroForm.value.tema);
    console.log(this.libroForm.value.autores);
    console.log(this.autores);
    this.libroService.createLibro(this.libroForm.value).subscribe({
      next: (data) => {
        alert(data);
        this.router.navigate(['']);
      },
      error: (e) => {
        alert(e);
        this.router.navigate(['']);
      },
    });
  }
}
