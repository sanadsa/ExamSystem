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
    return this.http.get('http://localhost:8000/api/restorePassword/' + email);
  }

  updatePassword(user: any) {
    return this.http.post('http://localhost:8000/api/updatePassword/', user);
  }

  login(email: string, password: string) {
    return this.http.get('http://localhost:8000/api/login/' + email + '/' + password).pipe(
      map(user => {
        if (user) {
          debugger;
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      }));
  }

  register(user: any) {
    return this.http.post('http://localhost:8000/api/register/', user);
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
