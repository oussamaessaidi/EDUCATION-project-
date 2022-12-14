import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwPaginationModule } from 'jw-angular-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SubscribtionComponent } from './components/subscribtion/subscribtion.component';
import { EventsComponent } from './components/events/events.component';
import { BestTutorsComponent } from './components/best-tutors/best-tutors.component';
import { NewsComponent } from './components/news/news.component';
import { CourseComponent } from './components/course/course.component';
import { EventComponent } from './components/event/event.component';
import { TutorComponent } from './components/tutor/tutor.component';
import { AdminComponent } from './components/admin/admin.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { TutorsTableComponent } from './components/tutors-table/tutors-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { coursesComponent } from './components/courses/courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { MySpaceComponent } from './components/my-space/my-space.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchSectionComponent,
    WelcomeComponent,
    coursesComponent,
    SubscribtionComponent,
    EventsComponent,
    BestTutorsComponent,
    NewsComponent,
    CourseComponent,
    EventComponent,
    TutorComponent,
    SignupComponent,
    AdminComponent,
    CoursesTableComponent,
    EventsTableComponent,
    TutorsTableComponent,
    UsersTableComponent,
    LoginComponent,
    AddCourseComponent,
    AddEventComponent,
    HomeComponent,
    CourseDetailComponent,
    EditCourseComponent,
    EventDetailComponent,
    EditEventComponent,
    MyReservationsComponent,
    MySpaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
