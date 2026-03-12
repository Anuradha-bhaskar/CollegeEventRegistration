import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.role === 'Admin') {
          this.router.navigate(['/add']);
        } else {
          this.router.navigate(['/view']);
        }
      },
      error: () => { this.error = 'Invalid username or password.'; }
    });
  }
}
