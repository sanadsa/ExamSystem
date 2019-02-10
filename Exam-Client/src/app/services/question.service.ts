import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantFields } from '../helpers/common-constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constFields: ConstantFields;
  constructor(private http: HttpClient) { 
    this.constFields = new ConstantFields();
  }

  addQuestion(question) {
    debugger;
    return this.http.post(this.constFields.addQuestion, question);
  }

  getQuestions(field) {
    debugger;
    return this.http.get(this.constFields.getQuestions + field);
  }
}
