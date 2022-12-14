import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() X: any;
  users: any;
  isStudent: boolean = false;
  connected: any;
  message: any;
  reserve: any = {};
  isAddedIn: boolean;
  myReservations: any = [];
  path: any;
  constructor(private courseService: CoursesService,
    private router:Router ,) { }

  ngOnInit() {
    this.path=this.router.url;
    this.users = JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user", this.users.role);
    if (this.users.role == 'student' && this.path == "/courses") {
      this.isStudent = true;
    }

  }

  addtoBasket(idCourse,teacherName) {

    alert(idCourse);
    this.reserve.idCourse = idCourse;
    this.reserve.teacherName = teacherName;
    this.isAddedIn = true;
    this.reserve.userId = this.users._id;
    console.log("here connected", this.users)
    this.courseService.addRservation(this.reserve).subscribe((data) => {

      this.message = data.message;
      console.log("here my reservations", this.reserve)

    })

  }

}
