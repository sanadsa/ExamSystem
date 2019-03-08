import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantFields } from '../helpers/common-constants';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constFields: ConstantFields = new ConstantFields();
  constructor(private http:HttpClient) { }

  getExam(id){
    return this.http.get(this.constFields.getExam + id);
  }

  saveAnswer(answer){
    return this.http.post(this.constFields.saveAnswer,answer);
  }

  generateReport(report){
    return this.http.post(this.constFields.generateReport,report);
  }
}
