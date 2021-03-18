import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loadingPage', [
      state('open', style({
        height: '100%',
        opacity: 1,
        backgroundColor: '#3498db'
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'sudokuAng';

  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }



}
