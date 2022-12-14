import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  @Input() X: any;
  users: any;
  result: any;
  courses: any;
  events: any;
  isDisplayed: boolean = false;
  constructor(private coursesService: CoursesService, private eventservice:EventsService) { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user", this.users.fName);
    console.log("here my connected user role", this.users.role);


    // call service to send course object
    this.coursesService.getAllMyReservationCours().subscribe(
      (data) => {
        console.log('here data after add', data);
        // this.router.navigate(['courses']);
        // this.courses = data.reservation;
        if (this.users.role == 'student') {
          this.isDisplayed = true;
          this.result = data.reservation.filter(
            obj => { return obj.userId == this.users._id }
          )
          if (this.users._id) {
            this.courses = this.result;
          }
        } else if (this.users.role == 'teacher') {
          
          this.result = data.reservation.filter(
            obj => { return obj.teacherName == this.users.fName }
          )
          if (this.users.fName) {
            this.courses = this.result;
            console.log('!!!',this.courses);
          }
        }
      }
    );

    // call service to send event object
    this.eventservice.getAllMyReservationEvents().subscribe(
      (data) => {
        console.log('here data after add', data);
        // this.router.navigate(['events']);
        // this.events = data.reservation;
        if (this.users.role == 'student') {
          this.isDisplayed = true;
          this.result = data.reservation.filter(
            obj => { return obj.userId == this.users._id }
          )
          if (this.users._id) {
            this.events = this.result;
          }
        } else if (this.users.role == 'teacher') {
          
          this.result = data.reservation.filter(
            obj => { return obj.teacherName == this.users.fName }
          )
          if (this.users.fName) {
            this.events = this.result;
            console.log('!!!',this.events);
          }
        }
      }
    );
  }
}
