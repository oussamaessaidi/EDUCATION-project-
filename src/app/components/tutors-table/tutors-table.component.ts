import { Component, OnInit } from '@angular/core';
import { allTutors } from 'src/app/data/tutorsData';
import { TeacherService } from 'src/app/tutors.service';

@Component({
  selector: 'app-tutors-table',
  templateUrl: './tutors-table.component.html',
  styleUrls: ['./tutors-table.component.css']
})
export class TutorsTableComponent implements OnInit {
  tutors : any= [];

  constructor(private teacherService : TeacherService) { }

  ngOnInit() {
    this.teacherService.getAllTeachers().subscribe((data)=>{ 
      this.tutors=data.teachers;
   
   })
  }

}
