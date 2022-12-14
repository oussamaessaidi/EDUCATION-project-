import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventsUrl:string="http://localhost:3000/events"
  constructor(private httpClient: HttpClient) { }
  getAllEvents(){
    return this.httpClient.get<{ events: any, message: any }>(this.eventsUrl);
  }
  addEvent(obj:any){
    return this.httpClient.post<{ message: string }>(this.eventsUrl,obj);
  }
  getEventsById(id:any){
    return this.httpClient.get<{ event: any }>(`${this.eventsUrl}/${id}`);
  }
  deleteEvent(id:any){
    return this.httpClient.delete<{ message: string }>(`${this.eventsUrl}/${id}`);
  }
  updateEvents(obj:any){
    return this.httpClient.put<{ message: string }>(`${this.eventsUrl}/ ${obj._id}`,obj);
  }

  // /request to send obj to matchURL BE
  addReservationEvent(obj) {
    return this.httpClient.post<{message:any}>(`${this.eventsUrl}/reservation`,obj);

  }
    //request to get all object from matchURL BE
    getAllMyReservationEvents() {
      return this.httpClient.get<{reservation:any,message:any}>(`${this.eventsUrl}/add/myReservation`);
    }
}
