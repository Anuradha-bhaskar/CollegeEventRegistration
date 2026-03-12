import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';

@Component({
  selector: 'app-participants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participants.component.html'
})
export class ParticipantsComponent implements OnInit {
  allRegistrations: any[] = [];
  events: any[] = [];
  selectedEventId: number | null = null;
  participants: any[] = [];
  message = '';

  constructor(private service: EventService) {}

  ngOnInit() {
    this.service.getEvents().subscribe((res: any) => { this.events = res; });
    this.service.getAllRegistrations().subscribe({
      next: (res: any) => { this.allRegistrations = res; },
      error: () => { this.message = 'Failed to load registrations.'; }
    });
  }

  loadParticipants(eventId: number) {
    this.selectedEventId = eventId;
    this.service.getParticipants(eventId).subscribe({
      next: (res: any) => { this.participants = res; },
      error: () => { this.message = 'Failed to load participants.'; }
    });
  }
}
