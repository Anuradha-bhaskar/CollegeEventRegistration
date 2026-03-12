import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';

@Component({
  selector: 'app-my-registrations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-registrations.component.html'
})
export class MyRegistrationsComponent implements OnInit {
  registrations: any[] = [];
  message = '';

  constructor(private service: EventService) {}

  ngOnInit() {
    this.service.getMyRegistrations().subscribe({
      next: (res: any) => { this.registrations = res; },
      error: () => { this.message = 'Failed to load registrations.'; }
    });
  }
}
