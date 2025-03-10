import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/courseService/course.service';
import { LessonsService } from '../../services/lessonsService/lessons.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-course-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatListModule,
    MatListItem,
    MatList,
    MatCardContent
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent{
  course: any = {};
  lessons: any[] = [];
  courseId: string | null = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private courseService: CourseService,private lessonsService: LessonsService) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    
    if (this.courseId) {
      // עבור הקורס
      this.courseService.getCourseById(Number(this.courseId)).subscribe({
        next: (courseData) => {
          this.course = courseData;
          
          // לאחר שהקורס נטען, נטען את השיעורים
          this.lessonsService.getLessons(this.courseId!).subscribe({
            next: (lessonsData: any) => {
              this.lessons = lessonsData;
            },
            error: (err) => {
              console.error('Error loading lessons:', err);
              this.lessons = []; // אתחל כמערך ריק במקרה של שגיאה
            }
          });
        },
        error: (err) => {
          console.error('Error loading course:', err);
        }
      });
    }
  }
  
}
