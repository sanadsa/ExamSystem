import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  restorePassword(email):Observable<any> {
    return this.http.get('http://localhost:8000/api/RestorePassword/' + email);
  }
}
