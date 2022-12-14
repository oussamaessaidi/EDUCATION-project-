import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  eventId: any;
  eventForm: FormGroup;
  event: any = {};
  events: any;
  title: string = "Add event";
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService,
    private router: Router) { }

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("id");
    
    if (this.eventId) {
      
      this.title = "Edit event";
      this.eventService.getEventsById(this.eventId).subscribe(
        (data) => {
          this.event = data;
          console.log('data', data);
        }
      );
    }
  }

  addOrEditEvent() {
    console.log('here my object', this.event);
    if (this.eventId) {
      // Call service to update event object
      this.eventService.updateEvents(this.event).subscribe(
        (data) => {
          console.log('Here data after edit', data.message);
          this.router.navigate(['admin']);
        }
      );
    } else {
      // Call service to send event object to BE
      this.eventService.addEvent(this.event).subscribe(
        (data) => {
          console.log('Here data after add', data.message);
          this.router.navigate(['admin']);
        }
      );
    }
  }

}
