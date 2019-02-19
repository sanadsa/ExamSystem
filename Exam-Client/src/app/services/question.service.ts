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
    return this.http.post(this.constFields.addQuestion, question);
  }
  
  deleteQuestion(questionId) {
    return this.http.delete(this.constFields.deleteQuestion + questionId);
  }

  deleteAnswers(questionId) {
    return this.http.delete(this.constFields.deleteAnswers + questionId);
  }

  editQuestion(ques) {
    return this.http.put(this.constFields.editQuestion, ques);
  }

  getQuestions(field,min,max): Observable<any> {
    debugger;
    return this.http.get(this.constFields.getQuestions + field + '/' + min + '/' + max);
  }

  addAnswer(ans) {
    debugger;
    return this.http.post(this.constFields.addAnswer, ans);
  }

  getAnswers(questionId): Observable<any> {
    return this.http.get(this.constFields.getAnswers + questionId);
  }
}
