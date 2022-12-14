import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { allCourses } from 'src/app/data/coursesData';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class coursesComponent implements OnInit {
  @Input() X: any;
  courseToFind: any;
  findedCourses: any = [];
  course:any = {};
  courses:any;
  path:string;
  constructor(private coursesService:CoursesService ) { }

  ngOnInit() {
    // this.path = this.router.url;
    // // teamToFind = {team: "valeur tapée ds le component search"}
    // this.courseToFind = JSON.parse(localStorage.getItem('teamToFind'));

     // call service to send course object
     this.coursesService.getAllCourses().subscribe(
      (data) => {
        console.log('here data after add', data);
        // this.router.navigate(['courses']);
        this.courses = data.courses;
      }
    );

    // this.courses = allCourses;
    // search object by teamOne or teamTwo
    // Push finded objects into array findedcourses
    // for (let i = 0; i < this.courses.length; i++) {
    //   if ((this.courses[i].teamOne == this.courseToFind.team) ||
    //     (this.courses[i].teamTwo == this.courseToFind.team)) {
    //     this.findedCourses.push(this.courses[i]);
    //   }
    // }
    // // Condition
    // if (this.path == "/allcourses/search") {
    //   this.courses = this.findedCourses;
    // }

  }

}
