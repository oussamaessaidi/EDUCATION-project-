import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allEvents } from 'src/app/data/eventsData';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any = [];
  result: any;
  eventId: any;
  matchForm: FormGroup;
  event: any = {};
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventsService,
    private router: Router) { }

  ngOnInit() {
    //   this.events=allEvents;
    //  this.eventId=this.activatedRoute.snapshot.paramMap.get("id");
    //  this.result=this.events.filter(
    //    obj=>{return obj.id == this.eventId}
    //  )
    //  if(this.eventId){
    //  this.events=this.result;}
    //   }
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data.events;
    })
  }

  addOrEditMatch() {
    console.log('here my object', this.event);
    if (this.eventId) {
      // call service to update match object 
      this.eventService.updateEvents(this.event).subscribe(
        (data) => {
          // console.log('here data after EDIT', data.message);
          this.router.navigate(['events']);
        }
      );
    } else {
      // call service to send match object
      this.eventService.addEvent(this.event).subscribe(
        (data) => {
          console.log(data);

          //  console.log('here data after add', data.message);
          this.router.navigate(['events']);
        }
      );
    }

  }

}
