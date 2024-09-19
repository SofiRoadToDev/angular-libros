import { Injectable, inject } from '@angular/core';
import { Libro } from '../interfaces/Libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

/**provideHttpClient() in providers in app.config */
export class DataFetchingService {
  url: string = 'http://localhost:8080/api/v1';

  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allowed-Origin': '*',
    'Access-Control-Allowed-Methods': 'GET, PUT, DELETE, POST',
  };

  private options = {
    headers: this.headerDict,
  };
  private http = inject(HttpClient);

  getLibros() {
    return this.http
      .get(`${this.url}/libros`, this.options)
      .pipe(catchError(this.handleErrors));
  }
  /**Filtrado desde el backend */
  filterLibro(query: string): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.url}/filter/${query}`);
  }
  /**Filtrado desde el frontend */
  applyFilter(libros: Libro[], query: string) {
    return libros.filter((libro) =>
      libro.titulo.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }

  getLibro(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.url}/libros/${id}}`);
  }

  createLibro(libro: any): Observable<any> {
    return this.http
      .post(`${this.url}/libros`, libro, this.options)
      .pipe(catchError(this.handleErrors));
  }

  deleteLibro(id: number): Observable<any> {
    return this.http
      .delete(`${this.url}/libros/${id}`, this.options)
      .pipe(catchError(this.handleErrors));
  }

  private handleErrors(error: any) {
    let errorMsg = '';

    if (error.error instanceof ErrorEvent) {
      errorMsg = error.message;
    } else {
      errorMsg = `status: ${error.status} msg: ${error.message}`;
    }
    return throwError(() => errorMsg);
  }

  getLibroById(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${this.url}/libros/${id}`);
  }
}
