import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantFields } from '../helpers/common-constants';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constFields: ConstantFields = new ConstantFields();
  
  constructor(private http:HttpClient) { }

  addTest(test){
    return this.http.post(this.constFields.addTest,test);
  }

  getTestsByField(field){
    return this.http.get(this.constFields.getTestsByField + field);
  }

  getTestById(id,field){
    return this.http.get(this.constFields.getTestById  + id + '/' + field);
  }
}
