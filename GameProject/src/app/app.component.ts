import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(numberFired: number) {
    return numberFired%2 === 0 ? this.oddNumbers.push(numberFired) : this.evenNumbers.push(numberFired);
  }
}
