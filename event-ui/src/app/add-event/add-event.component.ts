import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html'
})
export class AddEventComponent {
  eventName = '';
  date = '';
  seats: number | null = null;
  message = '';
  error = '';

  constructor(private service: EventService, private router: Router) {}

  add() {
    this.message = '';
    this.error = '';
    const data = { eventName: this.eventName, date: this.date, seats: this.seats };
    this.service.addEvent(data).subscribe({
      next: () => {
        this.message = 'Event added successfully!';
        this.eventName = '';
        this.date = '';
        this.seats = null;
      },
      error: (err) => { this.error = err.error?.message || 'Failed to add event.'; }
    });
  }
}