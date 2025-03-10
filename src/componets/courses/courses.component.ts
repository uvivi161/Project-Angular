import { Component } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-courses',
  imports: [
    RouterLink,
    MatCardHeader,
    MatCard,
    MatCardActions,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  courses: any[] = [];
  constructor(private courseService: CourseService) {
    this.courseService.getAllCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }

  token = sessionStorage.getItem('token');
  payload = this.token ? JSON.parse(atob(this.token.split(".")[1])) : null;
  userId = this.payload.userId;

  

  enroll(courseId: number){
    this.courseService.enroll(courseId, this.userId).subscribe({
      next: (res) => {
        alert("enrool success");  
      },
      error: (err) => {
        if(err.status === 401){
          alert("You must be logged in to enroll in a course");
        }
        else if(err.status === 500){
          alert("You are already enrolled in this course");
        }
        alert("enrool failed");
      }
    })
  }

  unenroll(courseId: number) {
    this.courseService.unenroll(courseId, this.userId).subscribe({
      next: (res) => {
        alert("unenroll success");
      },
      error: (err) => {
        if (err.status === 401) {
          alert("You must be logged in to unenroll in a course");
        }
        else if (err.status === 500) {
          alert("You are not enrolled in this course");
        }
        alert("unenroll failed");
      }
    });
  }

}
