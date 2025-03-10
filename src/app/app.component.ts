import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { LoginComponent } from "../components/login/login.component";
// import { SigninComponent } from "../components/signin/signin.component";
// import { HttpClientModule } from '@angular/common/http';
// import { CoursesComponent } from "../components/courses/courses.component";
import { CommonModule } from '@angular/common';
// import { HomePageComponent } from '../components/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatToolbar
],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courses-online';
}
