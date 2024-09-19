import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-filterbox',
  standalone: true,
  imports: [],
  templateUrl: './filterbox.component.html',
  styleUrl: './filterbox.component.css'
})
export class FilterboxComponent {

  @Output() filterWord = new EventEmitter<string>();

  onSearchChange(value:string){
    this.filterWord.emit(value)
  }

}
