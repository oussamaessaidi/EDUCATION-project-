import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/events.service';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css']
})
export class EventsTableComponent implements OnInit {
  pageOfItems!: Array<any>;
  constructor(private router:Router, private eventsService:EventsService) { }
  events:any=[];
  search:any={};
  searchForm!:FormGroup;
  result:any;
  eventsTab:any=[];

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(
      (data) => {
        this.events = data.events;
      }
    )
  }
  eventDisplay(id:any){
    console.log('id', id);
    
   this.router.navigate([`events/${id}`]);
  }
  eventUpdate(x:number){
    this.router.navigate([`editEvent/${x}`]);
  }
  eventDelete(x:any){
    this.eventsService.deleteEvent(x).subscribe(
      (data) => {
        console.log('Here after delete', data.message);
        //MAJ
        this.allEvents();
      }
    );  }
  allEvents() {
    this.eventsService.getAllEvents().subscribe(
      (data) => {
        this.events = data.events;
      }
    )
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


}
