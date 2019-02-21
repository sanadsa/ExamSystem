import { Question } from 'src/app/models/question';
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
