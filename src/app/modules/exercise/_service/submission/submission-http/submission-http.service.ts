import { Injectable } from "@angular/core";
import {
  StudentShortSubmissionModel,
  StudentSubmissionModel,
  SubmissionResultModel,
  TeacherShortSubmissionModel,
} from "../../../_model/submission.model";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { CreateSubmissionDto } from "../../../_dto/create-submission-dto";
import { GradeSubmissionDto } from "../../../_dto/grade-submission-dto";

const API_URL = `${environment.apiUrl}/spanish_platform/submission`;

@Injectable({
  providedIn: "root",
})
export class SubmissionHttpService {
  constructor(private http: HttpClient) {}

  getTeacherSubmissions$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<TeacherShortSubmissionModel[]> {
    return this.http
      .get<TeacherShortSubmissionModel[]>(
        `${API_URL}/teacher?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
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
        map((response: any): TeacherShortSubmissionModel[] => {
          if (response.success) {
            return response.submissions;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getStudentSubmissions$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<StudentShortSubmissionModel[]> {
    return this.http
      .get<StudentShortSubmissionModel[]>(
        `${API_URL}/student?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
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
            return response.submissions;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getStudentSubmissionById$(id: number): Observable<StudentSubmissionModel> {
    return this.http
      .get<StudentSubmissionModel>(`${API_URL}/${id}/student`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): StudentSubmissionModel => {
          if (response.success) {
            return response.submission;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  getTeacherSubmissionById$(id: number): Observable<StudentSubmissionModel> {
    return this.http
      .get<StudentSubmissionModel>(`${API_URL}/${id}/teacher`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): StudentSubmissionModel => {
          if (response.success) {
            return response.submission;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  createSubmission$(
    id: number,
    createSubmissionDto: CreateSubmissionDto
  ): Observable<SubmissionResultModel> {
    return this.http
      .post<any>(`${API_URL}/${id}/submit`, createSubmissionDto, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): any => {
          if (response.success) {
            return response.result;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  gradeSubmission$(
    id: number,
    gradeSubmissionDto: GradeSubmissionDto
  ): Observable<void> {
    return this.http
      .post<any>(`${API_URL}/${id}/grade`, gradeSubmissionDto, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): void => {
          if (response.success) {
            return;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
