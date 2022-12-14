import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() MyEvent = new EventEmitter();
  user: any = {};
  f: FormGroup;
  currentUser: any;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isTeacher = false

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router, private tokenStorage: TokenStorageService,
    private dataService: DataService) { }

  ngOnInit() {
    this.notifyForChange();

    this.f = this.formBuilder.group({
      cin: [''],
      password: ['']
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login() {

    console.log('here my user', this.user);
    this.userService.login(this.user).subscribe((data) => {
      console.log("here user after login", data.user)

      this.currentUser = data.user;
      console.log("here user after login", this.currentUser)
      console.log("data", data.message)
      // window.location.reload();
      // this.tokenStorage.saveToken(this.currentUser.accessToken);
      // this.tokenStorage.saveUser(data);

      // this.isLoginFailed = false;
      // this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;

      // this.reloadPage();

      if (data.message != "2") {

        data.message = "echec authentification"

      } else {
        localStorage.setItem('ConnectedUser', JSON.stringify(this.currentUser));
        if (this.currentUser.role == "teacher") {

          // this.router.navigate(['courses'])
          this.router.navigate(['courses'])
            .then(() => {
              window.location.reload();
            });

          this.isTeacher = true

        } else if (this.currentUser.role == "student") {
          this.router.navigate(['courses'])
            .then(() => {
              window.location.reload();
            });



        } else {
          if (this.currentUser.role == "admin") {
            this.router.navigate(['admin'])
              .then(() => {
                window.location.reload();
              });

          }
        }

      }
    });

  }
  notifyForChange() {
    this.dataService.notifyAboutChange();
  }
  //  reloadPage() {
  //   window.location.reload();
  // }
}


