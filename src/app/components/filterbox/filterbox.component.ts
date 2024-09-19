import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DataFetchingService } from '../../services/data-fetching.service';

@Component({
  selector: 'app-filterbox',
  standalone: true,
  imports: [],
  templateUrl: './filterbox.component.html',
  styleUrl: './filterbox.component.css',
})
export class FilterboxComponent {
  @Output() query = new EventEmitter<string>();

  servicio = inject(DataFetchingService);

  sendQueryToParent(value: string) {
    this.query.emit(value);
  }
}
