import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private api = 'http://localhost:5108/api';

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(`${this.api}/events`);
  }

  addEvent(data: any) {
    return this.http.post(`${this.api}/events`, data);
  }

  registerForEvent(eventId: number) {
    return this.http.post(`${this.api}/registrations`, { eventId });
  }

  getMyRegistrations() {
    return this.http.get(`${this.api}/registrations/my`);
  }

  getMyEventIds() {
    return this.http.get<number[]>(`${this.api}/registrations/my-events`);
  }

  getAllRegistrations() {
    return this.http.get(`${this.api}/registrations`);
  }

  getParticipants(eventId: number) {
    return this.http.get(`${this.api}/registrations/event/${eventId}`);
  }
}