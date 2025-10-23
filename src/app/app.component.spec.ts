import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- Verifique esta importação

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <-- E se ele está nos imports
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finangen-frontend';
}
