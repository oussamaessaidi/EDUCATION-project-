import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  title: string = "Event detail";
  eventId: any;
  findedEvent: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventsService) { }

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.eventService.getEventsById(this.eventId).subscribe(
      (data)=>{
        console.log('Here data', data);
        this.findedEvent = data;
      }
    );
  }

}
