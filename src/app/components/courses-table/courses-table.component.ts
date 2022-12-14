import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/courses.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  pageOfItems : any;

  constructor(private router: Router, private coursesService: CoursesService) { }
  courses:any=[];
  search:any={};
  searchForm!:FormGroup;
  result:any;
  coursesTab:any=[];

  ngOnInit() {
this.allCourses();
  }
  goToDisplay(id:any){
  this.router.navigate([`course/${id}`]);
  }
  goToUpdate(x:number){
    this.router.navigate([`editCourse/${x}`]); 
  }
 
  deleteCourse(x:any) {
    this.coursesService.deleteCourseById(x).subscribe(
      (data) => {
        console.log('Here after delete', data.message);
        //MAJ
        this.allCourses();
      }
    );
  }
  toSearch(){
    this.courses=this.coursesTab;
    this.result=this.courses.filter(
      (    obj: { training: any; price: any; })=>{return  obj.training == this.search.name && obj.price == this.search.price}
    )
    this.courses=this.result;
    
  }
  allCourses() {
    this.coursesService.getAllCourses().subscribe(
      (data) => {
        this.courses = data.courses;
      }
    )
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    console.log("ggg",this.pageOfItems);
    
  }


}
