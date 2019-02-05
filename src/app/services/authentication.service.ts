import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  restorePassword(email): Observable<any> {
    return this.http.get('http://localhost:8000/api/restorePassword/' + email);
  }

  updatePassword(user: any) {
    return this.http.post('http://localhost:8000/api/updatePassword/', user);
  }

  login(email: string, password: string) {
    return this.http.get('http://localhost:8000/api/login/' + email + '/' + password);
  }

  register(user: any) {
    return this.http.post('http://localhost:8000/api/register/', user);
  }
}
