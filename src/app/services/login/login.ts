import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => users.length ? users[0] : null)
      );
  }

  logout() {
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']);
  }

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
