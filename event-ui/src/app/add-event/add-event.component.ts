import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventName = '';
  date = '';
  seats: number | null = null;
  message = '';
  error = '';
  isSubmitting = false;

  constructor(private service: EventService) {}

  add() {
    const trimmedEventName = this.eventName.trim();

    this.message = '';
    this.error = '';

    if (!trimmedEventName || !this.date || !this.seats || this.seats < 1 || this.isSubmitting) {
      this.error = 'Enter a valid event name, date, and seat count.';
      return;
    }

    this.isSubmitting = true;

    const data = { eventName: trimmedEventName, date: this.date, seats: this.seats };
    this.service.addEvent(data).subscribe({
      next: () => {
        this.message = 'Event added successfully!';
        this.eventName = '';
        this.date = '';
        this.seats = null;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to add event.';
        this.isSubmitting = false;
      }
    });
  }
}