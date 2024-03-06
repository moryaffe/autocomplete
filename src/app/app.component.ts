import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auto-complete';
  city: string = '';

  constructor() {
  }

  getChosenCity(chosenCity: string) {
    this.city = chosenCity;
  }
}
