import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getExam(id){
    return this.http.get('http://localhost:8000/api/Tests/getExam/' + id);
  }

  saveAnswer(answer){
    return this.http.post('http://localhost:8000/api/Tests/saveAnswer/',answer);
  }
}
