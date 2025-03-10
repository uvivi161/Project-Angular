import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // בדיקה אם יש token (המשתמש מחובר)
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      // אם אין token, נעביר את המשתמש לדף התחברות
      this.router.navigate(['/']);
      return false;
    }
    
    // בדיקה אם נדרשת הרשאת מורה לניתוב הנוכחי
    const requiresTeacher = route.data['requiresTeacher'] === true;
    
    if (requiresTeacher) {
      // בדיקה אם המשתמש הוא מורה
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTeacher = payload.role === 'teacher';
        
        if (!isTeacher) {
          // אם נדרשת הרשאת מורה והמשתמש אינו מורה
          this.router.navigate(['/']);
          return false;
        }
      } catch (e) {
        // במקרה של שגיאה בפענוח המידע
        console.log(e);
        
        this.router.navigate(['/']);
        return false;
      }
    }
    
    // המשתמש מחובר ויש לו את ההרשאות המתאימות
    return true;
  }
}