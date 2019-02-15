import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  addTest(test){
    return this.http.post('http://localhost:8000/api/Tests/createTest',test);
  }

  getTestsByField(field){
    return this.http.get('http://localhost:8000/api/Tests/getTestsByField/' + field);
  }

  getTestById(id){
    return this.http.get('http://localhost:8000/api/Tests/getTestById/' + id);
  }
}
