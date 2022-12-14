import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  userURL:string="http://localhost:3000/users";

  constructor(private httpClient:HttpClient) {
   


   }
   //request to send obj to matchURL BE
   signup(user,img:File){
    let formData=new FormData();
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName)
    formData.append("email",user.email)
    formData.append("password",user.password)
    formData.append("cin",user.cin)
    formData.append("tel",user.tel)
    formData.append("gender",user.gender)
    formData.append("specialite",user.specialite)
    formData.append("role",user.role)
    formData.append("img",img)
     return this.httpClient.post<{message:string,user:any}>(`${this.userURL}/signup`,formData);

  }

    //request to delete object by ID from from matchURL/id (BE)
  login(user){
    return this.httpClient.post<{message:string,user:any}>(`${this.userURL}/login`,user);

 
  }

    //request to get all object from matchURL BE
    getAllUsers() {
      return this.httpClient.get<{users:any,message:any}>(this.userURL);
    }

    //request to delete object by ID from from matchURL/id (BE)
  deleteUserById(id) {
    return this.httpClient.delete<{message:any}>(`${this.userURL}/${id}`);

}
 
  //request to get object by ID from from matchURL/id (BE)
  getUserById(id) {
    return this.httpClient.get<{ user:any }>(`${this.userURL}/${id}`);
  }
    //request to get object by ID from from matchURL/id (BE)
 /*    getUserByRole(role) {
      return this.httpClient.get<{ users:any }>(`${this.userURL}/role`,role);
    } */

    getTeacher() {
      return this.httpClient.get<{teachers:any,message:any}>(`${this.userURL}/teachers/`);
    }
}