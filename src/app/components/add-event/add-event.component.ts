import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allEvents } from 'src/app/data/eventsData';
import { EventsService } from 'src/app/events.service';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventId: any;
  eventForm: FormGroup;
  newEvent: any = {};
  events = allEvents;
  title: string = "Add Match";
  constructor(private addEventForm: FormBuilder, private activatedRoute: ActivatedRoute,
    private eventsService: EventsService, private router: Router
  ) { }
  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.eventId) {
      // here into edit
      // search match by id
      this.title = "Edit Event"
      this.eventsService.getEventsById(this.eventId).subscribe(
        (data) => {
          this.newEvent = data.event;
        }
      );
      // this.event = this.events.find(
      //   obj => {return obj.id == this.eventId})
    }
  }
  addOrEditEvent() {
    console.log('here my object', this.newEvent);
    if (this.eventId) {
      // call service to update event object
      this.eventsService.updateEvents(this.newEvent).subscribe(
        (data) => {
          console.log('here data after EDIT', data.message);
          this.router.navigate(['events']);
        }
      );
    }
    // call service to send event object
    this.eventsService.addEvent(this.newEvent).subscribe((data) => {
      console.log('here data after add', data.message);
      this.router.navigate(['events']);
    }
    );
  }
}