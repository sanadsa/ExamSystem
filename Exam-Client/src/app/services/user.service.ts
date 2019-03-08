import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantFields } from '../helpers/common-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constFields: ConstantFields = new ConstantFields();

  constructor(private http: HttpClient) { }

  public addUser(user: any): Observable<any> {
    return this.http.post(this.constFields.createUser, user);
  }
}
