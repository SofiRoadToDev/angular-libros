import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilterboxComponent } from "./components/filterbox/filterbox.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FilterboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'overview';
}
