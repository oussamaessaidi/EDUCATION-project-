import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }
  users: any = [];
  search: any = {};
  searchForm!: FormGroup;
  result: any;
  usersTab: any = [];

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.users;
      }
    )
  }
  userUpdate(id: any) {
    this.router.navigate([`editUser/${id}`]);

  }
  userDisplay(id: any) {
    this.router.navigate([`user/${id}`]);
  }
  userDelete(id: any) {
    this.userService.deleteUserById(id).subscribe(
      (data) => {
        console.log('Here after delete', data.message);
        //MAJ
        this.allUsers();
      }
    );
  }
  allUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data.users;
      }
    )
  }

}
