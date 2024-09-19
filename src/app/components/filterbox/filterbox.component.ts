import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filterbox',
  standalone: true,
  imports: [],
  templateUrl: './filterbox.component.html',
  styleUrl: './filterbox.component.css',
})
export class FilterboxComponent {
  @Output() query = new EventEmitter<string>();

  sendQueryToParent(value: string) {
    this.query.emit(value);
  }
}
