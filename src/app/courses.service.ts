import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courseURL: string = "http://localhost:3000/courses";
  // courseURL: string = "api/course";  
  constructor(private httpClient: HttpClient) { }

  // request to send obj to courseURL
  addCourse(obj) {
    return this.httpClient.post<{ message: string }>(this.courseURL, obj);
  }
  // request to get all objects from courseURL (BE)
  getAllCourses() {
    return this.httpClient.get<{ courses: any, message: any }>(this.courseURL);
  }
  // request to search course by team one courseURL
  searchCourse(obj) {
    return this.httpClient.post(`${this.courseURL}/search`, obj);
  }
  // request to get all objects from courseURL/id (BE)
  getCourseById(id) {
    return this.httpClient.get<{ PP: any }>(`${this.courseURL}/${id}`);
  }
  // request to delete object by id courseURL/id (BE)
  deleteCourseById(id) {
    return this.httpClient.delete<{ message: string }>(`${this.courseURL}/${id}`);
  }
  // request to edit object by id courseURL/id (BE)
  updateCourse(obj) {
    return this.httpClient.put<{ message: string }>(`${this.courseURL}/${obj._id}`, obj);
  }
  //request to send obj to matchURL BE
  addRservation(obj) {
    return this.httpClient.post<{message:any}>(`${this.courseURL}/reservation`,obj);

  }
    //request to get all object from matchURL BE
    getAllMyReservationCours() {
      return this.httpClient.get<{reservation:any,message:any}>(`${this.courseURL}/add/myReservation`);
    }
}
