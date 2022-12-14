import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';
import { allCourses } from 'src/app/data/coursesData';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
courseId: any;
courseForm: FormGroup;
course:any = {};
courses = allCourses;
title: string= "Add course";
  constructor(private activatedRout:ActivatedRoute,
    private coursesService:CoursesService,
    private router: Router) { }

  ngOnInit() {
    this.courseId = this.activatedRout.snapshot.paramMap.get("id");
    if (this.courseId) {
      // here into edit
      // search course by id
      this.title ="Edit course"
      this.coursesService.getCourseById(this.courseId).subscribe(
        (data) => {
          this.course = data.PP;
        }
      );
      // this.course = this.coursees.find(
      //   obj => {return obj.id == this.courseId})
    }
  }
    addOrEditCourse() {
      console.log('here my object', this.course);
      if (this.courseId) {
        // call service to update course object 
        this.coursesService.updateCourse(this.course).subscribe(
          (data) => {
            console.log('here data after EDIT', data.message);
            this.router.navigate(['courses']);
          } 
        );
      } else {
         // call service to send course object
         this.coursesService.addCourse(this.course).subscribe(
           (data) => {
             console.log('here data after add', data.message);
             this.router.navigate(['courses']);
           }
         );
      }
      
    }
  }
