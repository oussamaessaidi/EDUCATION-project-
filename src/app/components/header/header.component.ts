import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { UserService } from 'src/app/users.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notifierSubscription: Subscription = this.dataService.eventEmitterNotifier.subscribe(notified => {
    // originator has notified me. refresh my data here.
  });

  orderPage: any;
  isdisplayed: boolean = false;
  users: any;
  constructor(private router: Router,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private dataService: DataService) {


  }
  headerUser: boolean = false;
  headerTutor: boolean = false;
  headerAdmin: boolean = false;
  customEvent: any;

  ngOnInit() {

    this.notifyForChange(); // call this method after add/edit/delete or as per your requirement

    this.users = JSON.parse(localStorage.getItem("ConnectedUser") || "[]");
    console.log("here my connected user", this.users.role);
    if (this.users.length == '0') {
      this.isdisplayed = true;
    }
    else if (this.users.role == 'student') {
      this.headerUser = true;
    }
    else if (this.users.role == 'teacher') {
      this.headerTutor = true;
    }
    else if (this.users.role == 'Admin') {
      this.headerAdmin = true;
    }


  }
  notifyForChange() {
    this.dataService.notifyAboutChange();
  }
  // )}
  logout() {
    localStorage.removeItem('ConnectedUser');
    this.router.navigate([''])
      .then(() => {
        window.location.reload();
      });
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
