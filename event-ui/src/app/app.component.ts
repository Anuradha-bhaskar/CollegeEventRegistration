import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}