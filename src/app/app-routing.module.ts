import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { EventsComponent } from './components/events/events.component';
import { AdminComponent } from './components/admin/admin.component';
import { BestTutorsComponent } from './components/best-tutors/best-tutors.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { HomeComponent } from './components/home/home.component';
import { coursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MySpaceComponent } from './components/my-space/my-space.component';




const routes: Routes = [
  {path:"signup", component:SignupComponent},
  {path:"login", component:LoginComponent},
  {path:"courses", component:coursesComponent},
  {path:"events", component:EventsComponent},
  {path:"admin", component:AdminComponent},
  {path:"best-tutors", component:BestTutorsComponent},
  {path:"add-course", component:AddCourseComponent},
  {path:"add-event", component:AddEventComponent},
  {path:"Home", component:HomeComponent},
  { path: "signup/teacher", component: SignupComponent },
  { path: "signup/student", component: SignupComponent },
  // http://localhost:4200/courseDetail/:id => course-detail.component.html va s'afficher
  { path:"course/:id", component: CourseDetailComponent },
  // http://localhost:4200/editCourse/:id => edit-course.component.html va s'afficher
  { path:"editCourse/:id", component: EditCourseComponent },
  // http://localhost:4200/eventDetail/:id => event-detail.component.html va s'afficher
  { path:"events/:id", component: EventDetailComponent },
  // http://localhost:4200/editEvent/:id => edit-event.component.html va s'afficher
  { path:"editEvent/:id", component: EditEventComponent },
  {path:"student/myReservations",component:MyReservationsComponent},
  {path:"teacher/myReservations",component:MyReservationsComponent},
  {path:"mySpace",component:MySpaceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
