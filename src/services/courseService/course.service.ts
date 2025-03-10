import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private url='http://localhost:3000/api/courses';

  private testingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzQwOTMzNjM0fQ.XjBuc8jlssyk8B9gt6jZ0mMZOzq-p8zN7RgBl8FpU3s';
  constructor(private http : HttpClient) { }

  private getToken(): string | null{
    return sessionStorage.getItem('token');
  }


  private getHeaders():HttpHeaders{
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  } 
 
  getAllCourses() : Observable<any>{
    return this.http.get(this.url, {headers: this.getHeaders()});
  }

  getCourseById(id: number) : Observable<any>{
    return this.http.get(`${this.url}/${id}`, {headers: this.getHeaders()});
  }

  createCourse(course: any) : Observable<any>{
    return this.http.post(this.url, course, {headers: this.getHeaders()});
  }

  updateCourse(course: any): Observable<any> {
    const token = this.getToken();
    
    // Check if token exists before proceeding
    if (!token) {
      // Return an error Observable if no token is found
      return throwError(() => new Error('No authentication token found'));
    }
    
    try {
      // Safely decode the token
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      const courseData = {
        description: course.description,
        title: course.title,
        teacherId: payload.userId
      };
      
      return this.http.put(`${this.url}/${course.id}`, courseData, {
        headers: this.getHeaders()
      });
    } catch (error) {
      // Handle any parsing errors that might occur
      return throwError(() => new Error('Invalid token format'));
    }
  }

  deleteCourse(id: number) : Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {headers: this.getHeaders()});
  }

  enroll(courseid: number, userId: number) : Observable<any>{
    return this.http.post(`${this.url}/${courseid}/enroll`, {userId}, {headers: this.getHeaders()});
  }

  unenroll(courseid: number, userId: number): Observable<any> {
    // For DELETE requests, the second parameter is options, which includes headers and body
    return this.http.delete(`${this.url}/${courseid}/unenroll`, {
      headers: this.getHeaders(),
      body: { userId: userId } // The body needs to be passed this way for DELETE
    });
  }

}