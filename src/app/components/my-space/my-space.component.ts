import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-space',
  templateUrl: './my-space.component.html',
  styleUrls: ['./my-space.component.css']
})
export class MySpaceComponent implements OnInit {

  isDisplayed:boolean=false;
path:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.path=this.router.url;
    console.log("here my path", this.path)
    if(this.path=="/mySpace"){
      this.isDisplayed=true;
    }else  if(this.path=="/student/myReservations"){
      this.isDisplayed=false;
    }
  }

}
