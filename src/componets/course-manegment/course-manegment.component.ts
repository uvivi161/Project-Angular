import { Component } from '@angular/core';
import { CourseService } from '../../services/courseService/course.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonsService } from '../../services/lessonsService/lessons.service';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-course-manegment',
  imports: [ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    
  ],
  templateUrl: './course-manegment.component.html',
  styleUrl: './course-manegment.component.css'
})
export class CourseManegmentComponent {

  courses:  any[] = [];
  courseForm!: FormGroup;
  deleteForm !: FormGroup;
  lessonForm !: FormGroup;
  deleteLessonForm !: FormGroup;
  addcourse = false;
  updatecourse = false;
  deletecourse = false;
  addlesson = false;
  deletelesson = false;
  updatelesson = false;
  

  constructor(private courseService: CourseService,private fb : FormBuilder,private lessonService: LessonsService){
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      id: ['']
    });
    this.courseService.getAllCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      courseId: [''],
      id: ['']
    });
    this.deleteLessonForm = this.fb.group({
      id: ['', Validators.required],
      courseId: ['']
    });
  }

  addCourse(){
    this.addcourse = true;
  }

  updateCourse(){
    this.updatecourse = true;
  }

  deleteCourse(){
    this.deletecourse = true;
  }

  addLesson(){
    this.addlesson = true;
  }

  updateLesson(){
    this.updatelesson = true;
  }

  deleteLesson(){
    this.deletelesson = true;
  }

  onAdd() {
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value).subscribe({
        next: (res) => {
          alert("course created");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          alert("course creation failed");
        }
      });
    }
    this.addcourse = false;
  }

  onUpdate(){
    if (this.courseForm.valid) {
      this.courseService.updateCourse(this.courseForm.value).subscribe({
        next: (res) => {
          alert("course updated");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          if(err.status === 404){
            alert("course not found");}
          if(err.status === 401){
            alert("Unauthorized");
          } 
          alert("course update failed");
        }
      });
    }
    this.updatecourse = false;
  }

  onDelete(){
    if (this.deleteForm.valid) {
      this.courseService.deleteCourse(this.deleteForm.value.id).subscribe({
        next: (res) => {
          alert("course deleted");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          alert("course delete failed");
        }
      });
    }
    this.deletecourse = false;
  }

  onAddLesson(){
    if (this.lessonForm.valid) {
      this.lessonService.createLesson(this.lessonForm.value.courseId,this.lessonForm.value).subscribe({
        next: (res) => {
          alert("lesson created");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          alert("lesson creation failed");
        }
      });
    }
    this.addlesson = false;
  }

  onUpdateLesson(){
    if (this.lessonForm.valid) {
      this.lessonService.updateLesson(this.lessonForm.value.courseId,this.lessonForm.value).subscribe({
        next: (res) => {
          alert("lesson updated");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          if(err.status === 404){
            alert("lesson not found");}
          if(err.status === 401){
            alert("Unauthorized");
          } 
          alert("lesson update failed");
        }
      });
    }
    this.updatelesson = false;
  }

  onDeleteLesson(){
    if (this.deleteLessonForm.valid) {
      this.lessonService.deleteLesson(this.deleteLessonForm.value.courseId,this.deleteLessonForm.value.id).subscribe({
        next: (res) => {
          alert("lesson deleted");
          this.courseService.getAllCourses().subscribe((data: any[]) => {
            this.courses = data;
          });
        },
        error: (err) => {
          if(err.status === 400){
            alert("Invalid input");
            return;
          }
          alert("lesson delete failed");
        }
      });
    }
    this.deletelesson = false;
  }
}
