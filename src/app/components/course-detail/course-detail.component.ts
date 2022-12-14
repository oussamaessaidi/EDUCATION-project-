import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  title: string = "Course detail";
  courseId: any;
  findedCourse: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService:CoursesService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.courseId).subscribe(
      (data)=>{
        console.log('Here data', data);
        this.findedCourse = data;
      }
    );
  }

}
