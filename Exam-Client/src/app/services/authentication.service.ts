import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  restorePassword(email): Observable<any> {
    return this.http.get('http://localhost:8000/api/Authentication/restorePassword/' + email);
  }

  updatePassword(user: any) {
    return this.http.post('http://localhost:8000/api/Authentication/updatePassword/', user);
  }

  login(email: string, password: string) {
    return this.http.get<any>('http://localhost:8000/api/Authentication/login/' + email + '/' + password).pipe(
      map(data => {
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.currentUserSubject.next(data.user);
        }
      }));
  }

  register(user: any) {
    return this.http.post('http://localhost:8000/api/Authentication/register', user);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
