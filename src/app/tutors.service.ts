import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherURL: string = "http://localhost:3000/users/teachers"
  //courseURL: string = "api/courses"
  constructor(private htppClient: HttpClient) { }

  //request to send obj to matchURL BE
  addTeacher(obj) {
    return this.htppClient.post(this.teacherURL, obj);

  }
  //request to get all object from matchURL BE
  getAllTeachers() {
    return this.htppClient.get<{teachers:any,message:any}>(this.teacherURL);
  }
  //request to get object by ID from from matchURL/id (BE)
  getTeacherById(id) {
    return this.htppClient.get<{teacher:any}>(`${this.teacherURL}/${id}`);
  }
  //request to delete object by ID from from matchURL/id (BE)
  deleteTeacherById(id) {
    return this.htppClient.delete(`${this.teacherURL}/${id}`);

  }
  //request to edit object by ID from from matchURL/id (BE)
  updateTeachert(obj) {
    return this.htppClient.put(`${this.teacherURL}/${obj.id}`, obj);
  }

}
