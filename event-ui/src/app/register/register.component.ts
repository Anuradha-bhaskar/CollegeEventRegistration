import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.message = '';
    this.error = '';
    this.auth.register(this.username, this.password).subscribe({
      next: () => {
        this.message = 'Registered! Please login.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => { this.error = err.error?.message || 'Registration failed.'; }
    });
  }
}
