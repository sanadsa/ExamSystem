import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string = 'http://localhost:8000/api/Report/';
  constructor(private http: HttpClient) { }

  public getRespondentReportByTest(testId: number, fromDate, toDate) {
    return this.http.get(this.url + 'getReportsByTest/' + testId + '/' + fromDate + '/' + toDate);
  }
}
