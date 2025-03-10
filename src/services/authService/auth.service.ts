import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }
                   
  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, {email, password}).subscribe((res:any) => {
      sessionStorage.setItem('token', res.token);
      alert('Login Successful');
    },
    (error: any) => {
      if(error.status === 401){
        alert('Invalid email or password');
        return;
      }
      if(error.status === 400){
        alert('Invalid input');
        return;
      }
      alert('Login Failed');
    }
  )}

  isLoggedIn():boolean{
    return !!sessionStorage.getItem('token');
  } 

  logout(){
      sessionStorage.removeItem('token');
  } 

  signIn(name:string, email: string, password: string, role:string){
    this.http.post(`${this.url}/register`, {name,email, password, role}).subscribe((res:any) => {
      sessionStorage.setItem('token', res.token);     
      alert('Sign in Successful');
    },
    (error: any) => {
      if(error.status === 409){
        alert('Email already exists');
        return;
      }
      if(error.status === 400){
        alert('Invalid input');
        return;
      }
      alert('Sign in Failed');
    }) 
  }  
}  
