import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dependant-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dependant-dropdown.component.html',
  styleUrl: './dependant-dropdown.component.css'
})
export class DependantDropdownComponent {

  fb: FormBuilder =inject(FormBuilder)

  countries = ["Argentina", "Brasil", "Bolivia", "Colombia", "Chile", "Ecuador"]

  provincias = ["Salta", "Tucuman", "Santa Fe", "Misiones", "Entre Ríos"]

  formulario = this.fb.group({
    pais:new FormControl(''),
    provincia: new FormControl(''),
    casado: new FormControl(false)
  })

  handleSubmit(){
    alert(this.formulario.get('casado')?.value)
  }

}
