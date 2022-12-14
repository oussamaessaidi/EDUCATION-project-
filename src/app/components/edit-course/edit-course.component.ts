import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseId: any;
  courseForm: FormGroup;
  course: any = {};
  courses: any;
  title: string = "Add course";
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private router: Router) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get("id");
    
    if (this.courseId) {
      
      this.title = "Edit course";
      this.courseService.getCourseById(this.courseId).subscribe(
        (data) => {
          this.course = data;
          console.log('data', data);
        }
      );
    }
  }

  addOrEditCourse() {
    console.log('here my object', this.course);
    if (this.courseId) {
      // Call service to update course object
      this.courseService.updateCourse(this.course).subscribe(
        (data) => {
          console.log('Here data after edit', data.message);
          this.router.navigate(['admin']);
        }
      );
    } else {
      // Call service to send course object to BE
      this.courseService.addCourse(this.course).subscribe(
        (data) => {
          console.log('Here data after add', data.message);
          this.router.navigate(['admin']);
        }
      );
    }
  }

}
