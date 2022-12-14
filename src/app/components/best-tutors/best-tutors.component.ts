import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/tutors.service';

@Component({
  selector: 'app-best-tutors',
  templateUrl: './best-tutors.component.html',
  styleUrls: ['./best-tutors.component.css']
})
export class BestTutorsComponent implements OnInit {
  tutors: any = [];
  tutorId: string;
  constructor(private activatedRoute: ActivatedRoute, private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getAllTeachers().subscribe((data) => {
      console.log("here response", data)

      this.tutors = data.teachers;
    }
    );
  }

}
