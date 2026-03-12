import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-events.component.html'
})
export class ViewEventsComponent implements OnInit {
  events: any[] = [];
  registeredEventIds: number[] = [];
  message = '';
  isUser = false;

  constructor(private service: EventService, public auth: AuthService) {}

  ngOnInit() {
    this.isUser = !this.auth.isAdmin();
    this.service.getEvents().subscribe({
      next: (res: any) => { this.events = res; },
      error: () => { this.message = 'Failed to load events.'; }
    });

    // Load registered event IDs for current user
    if (this.isUser) {
      this.service.getMyEventIds().subscribe({
        next: (res: number[]) => { this.registeredEventIds = res; },
        error: () => { }
      });
    }
  }

  isAlreadyRegistered(eventId: number): boolean {
    return this.registeredEventIds.includes(eventId);
  }

  register(eventId: number) {
    if (this.isAlreadyRegistered(eventId)) {
      alert('You are already registered for this event.');
      return;
    }

    this.service.registerForEvent(eventId).subscribe({
      next: () => {
        alert('Registered successfully!');
        // Refresh to update seat count and registered status
        this.service.getEvents().subscribe((res: any) => { this.events = res; });
        this.service.getMyEventIds().subscribe((res: number[]) => { this.registeredEventIds = res; });
      },
      error: (err) => { alert(err.error?.message || 'Registration failed.'); }
    });
  }
}