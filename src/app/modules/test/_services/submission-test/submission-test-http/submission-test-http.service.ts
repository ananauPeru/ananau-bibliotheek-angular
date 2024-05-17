import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateUtil } from "src/app/_utils/date_util";
import { environment } from 'src/environments/environment';
import { StudentTestSubmissionModel, TeacherTestSubmissionModel, TestSubmissionModel } from '../../../_models/test/test-submission.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const API_URL = `${environment.apiUrl}/spanish_platform/test`;

@Injectable({
  providedIn: 'root'
})
export class SubmissionTestHttpService {

  constructor(private http: HttpClient, private DateUtil: DateUtil) { }

  getTeacherSubmissionsTest$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<TeacherTestSubmissionModel[]> {
    return this.http
      .get<TeacherTestSubmissionModel[]>(
        `${API_URL}/test_attemts?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        {
          responseType: "json",
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TeacherTestSubmissionModel[] => {
          if (response.success) {
            return response.attempts.map((attempts: TeacherTestSubmissionModel) => {
              attempts.submittedAt = this.DateUtil.utcToPeruvianDate(attempts.submittedAt);
              return attempts;
            });
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getStudentSubmissionsTest$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<StudentTestSubmissionModel[]> {
    return this.http
      .get<StudentTestSubmissionModel[]>(
        `${API_URL}/my_test_attemts?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        {
          responseType: "json",
        }
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): any => {
          if (response.success) {
            return response.attempts.map((attempts: StudentTestSubmissionModel) => {
              attempts.submittedAt = this.DateUtil.utcToPeruvianDate(attempts.submittedAt);
              return attempts;
            }
            );
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getTeacherSubmissionTestById$(id: number): Observable<TestSubmissionModel> {
    return this.http
      .get<TestSubmissionModel>(`${API_URL}/test_attemts/${id}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TestSubmissionModel => {
          if (response.success) {
            const attempt = response.attempt;
            attempt.submittedAt = this.DateUtil.utcToPeruvianDate(attempt.submittedAt);
            attempt.gradedAt = this.DateUtil.utcToPeruvianDate(attempt.gradedAt);
            return attempt;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  getStudentSubmissionTestById$(id: number): Observable<TestSubmissionModel> {
    return this.http
      .get<TestSubmissionModel>(`${API_URL}/my_test_attemts/${id}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TestSubmissionModel => {
          if (response.success) {
            const attempt = response.attempt;
            attempt.submittedAt = this.DateUtil.utcToPeruvianDate(attempt.submittedAt);
            attempt.gradedAt = this.DateUtil.utcToPeruvianDate(attempt.gradedAt);
            return attempt;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
