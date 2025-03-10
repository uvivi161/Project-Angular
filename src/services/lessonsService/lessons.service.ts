import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private url='http://localhost:3000/api/courses/';

  // private testingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzQwOTMzNjM0fQ.XjBuc8jlssyk8B9gt6jZ0mMZOzq-p8zN7RgBl8FpU3s';
  constructor(private http : HttpClient) { }

  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  
  private getHeaders():HttpHeaders{
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  } 
 
  getLessons(courseId: string) {
    return this.http.get(`${this.url}${courseId}/lessons`, {headers: this.getHeaders()});
  }

  getLessonById(courseId: string, lessonId: string) {
    return this.http.get(`${this.url}${courseId}/lessons/${lessonId}`, {headers: this.getHeaders()});
  }

  createLesson(courseId: string, lesson: any) {
    return this.http.post(`${this.url}${courseId}/lessons`, lesson, {headers: this.getHeaders()});
  }

  updateLesson(courseId: string, lesson: any) {
    return this.http.put(`${this.url}${courseId}/lessons/${lesson.id}`, lesson, {headers: this.getHeaders()});
  }

  deleteLesson(courseId: string, lessonId: string) {
    return this.http.delete(`${this.url}${courseId}/lessons/${lessonId}`, {headers: this.getHeaders()});
  }

}
