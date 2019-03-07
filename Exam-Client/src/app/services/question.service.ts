import { Question } from 'src/app/models/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ConstantFields } from '../helpers/common-constants';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constFields: ConstantFields;
  prefixURL: string = 'http://localhost:8000/api/Question/';

  constructor(private http: HttpClient) {
    this.constFields = new ConstantFields();
  }

  private getHeaders(jwt: boolean): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    console.log('token: ' + localStorage.getItem('token'));
    if (jwt) {
      headers=headers.append(
        'admin_token',
        localStorage.getItem('token')
      );
    }
    console.log({headers});
    return headers;
  }

  public addQuestion(question: Question) {
    return this.http.post(this.constFields.addQuestion, question);
  }

  public deleteQuestion(questionId) {
    return this.http.delete(this.constFields.deleteQuestion + questionId);
  }

  public deleteAnswers(questionId) {
    return this.http.delete(this.constFields.deleteAnswers + questionId);
  }

  public editQuestion(ques) {
    return this.http.put(this.constFields.editQuestion, ques);
  }

  public getQuestions(field, min, max): Observable<any> {
    return this.http.get(this.constFields.getQuestions + field + '/' + min + '/' + max);
  }

  public getQuestionById(quesId: number) {
    return this.http.get(this.prefixURL + 'getQuestionById/' + quesId);
  }

  public addAnswer(ans) {
    return this.http.post(this.constFields.addAnswer, ans);
  }

  public updateAnswer(ans) {
    return this.http.put(this.constFields.updateAnswer, ans);
  }

  public getAnswers(questionId): Observable<any> {
    return this.http.get(this.constFields.getAnswers + questionId);
  }
}
