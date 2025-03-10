
import { Routes } from "@angular/router";
import { CourseDetailsComponent } from "../componets/course-details/course-details.component";
import { CourseManegmentComponent } from "../componets/course-manegment/course-manegment.component";
import { CoursesComponent } from "../componets/courses/courses.component";
import { HomePageComponent } from "../componets/home-page/home-page.component";
import { AuthGuard } from "../gaurds/auth.guard";

export const routes: Routes = [
    {path:'', component:HomePageComponent},
    {path:'courses', component:CoursesComponent, canActivate: [AuthGuard]},
    {path:'course-manegment', component:CourseManegmentComponent, canActivate: [AuthGuard], data: {requiresTeacher: true}},
    {path:'course-details/:id', component: CourseDetailsComponent, data:{renderMode : 'dynamic'} },
]; 