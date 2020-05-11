import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConstantFields } from '../helpers/common-constants';

export interface IAuthenticationService {
  restorePassword(email): Observable<any>;
  updatePassword(user: any);
  login(email: string, password: string);
  register(user: any);
  logout();
}

export class FakeAuthenticationService implements IAuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constFields: ConstantFields = new ConstantFields();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  restorePassword(email): Observable<any> {
    //return this.http.get(this.constFields.restorePassword + email);    
    let x=new Observable<any>(()=>{"i am sanad"});

    return 
  }

  updatePassword(user: any) {
    return this.http.post(this.constFields.updatePassword, user);
  }

  login(email: string, password: string) {
    return this.http.get<any>(this.constFields.login + email + '/' + password).pipe(
      map(data => {
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.currentUserSubject.next(data.user);
        }
      }));
  }

  register(user: any) {
    return this.http.post(this.constFields.register, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constFields: ConstantFields = new ConstantFields();
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  restorePassword(email): Observable<any> {
    return this.http.get(this.constFields.restorePassword + email);
  }

  updatePassword(user: any) {
    return this.http.post(this.constFields.updatePassword, user);
  }

  login(email: string, password: string) {
    return this.http.get<any>(this.constFields.login + email + '/' + password).pipe(
      map(data => {
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.currentUserSubject.next(data.user);
        }
      }));
  }

  register(user: any) {
    return this.http.post(this.constFields.register, user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
