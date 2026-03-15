import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';

interface DashboardEvent {
  eventId: number;
  eventName: string;
  date: string;
  seats: number;
}

interface DashboardRegistration {
  id: number;
  fullName: string;
  eventId: number;
  eventName: string;
  date: string;
}

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  totalRegistrations = 0;
  upcomingEvents: DashboardEvent[] = [];
  pastEvents: DashboardEvent[] = [];
  message = '';

  constructor(private service: EventService) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  private loadOverview(): void {
    this.message = '';

    this.service.getEvents().subscribe({
      next: (events: any) => {
        const allEvents = (events as DashboardEvent[]) || [];
        this.splitEventsByDate(allEvents);
      },
      error: () => {
        this.message = 'Failed to load events overview.';
      }
    });

    this.service.getAllRegistrations().subscribe({
      next: (registrations: any) => {
        this.totalRegistrations = ((registrations as DashboardRegistration[]) || []).length;
      },
      error: () => {
        this.message = this.message || 'Failed to load registrations overview.';
      }
    });
  }

  private splitEventsByDate(events: DashboardEvent[]): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.upcomingEvents = events
      .filter(eventItem => new Date(eventItem.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    this.pastEvents = events
      .filter(eventItem => new Date(eventItem.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}