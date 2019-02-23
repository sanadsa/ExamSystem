import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getExam(id){
    debugger;
    return this.http.get('http://localhost:8000/api/Tests/getExam/' + id);
  }

  nextQuestion(){
    return this.http.get('http://localhost:8000/api/Tests/getNextQuestion/');
    
  }
}
