import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input() Y: any;
users: any;
isStudent: boolean = false;
  connected: any;
  message: any;
  reserve: any = {};
  isAddedIn: boolean;
  myReservations: any = [];
  path: any;

  constructor(private eventsService:EventsService) { }

  ngOnInit() {

    this.users = JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user", this.users.role);
    if (this.users.role == 'student') {
      this.isStudent = true;
    }

  }

  addtoBasket(idEvent,teacherName) {

    alert(idEvent);
    this.reserve.idEvent = idEvent;
    this.reserve.teacherName = teacherName;
    this.isAddedIn = true;
    this.reserve.userId = this.users._id;
    console.log("my reservation", this.reserve);
    
    console.log("here connected", this.users)
    this.eventsService.addReservationEvent(this.reserve).subscribe((data) => {

      this.message = data.message;
      console.log("here my reservations", this.reserve)

    })

  }

}

