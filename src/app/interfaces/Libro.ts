import { Editorial } from './Editorial';
import { Autor } from './Autor';

export interface Libro {
  id: number;
  titulo: string;
  isbn: string;
  tema: string;
  editorial: string;
  autores: Autor[];
}
