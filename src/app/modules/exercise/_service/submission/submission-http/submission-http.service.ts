import { Injectable } from "@angular/core";
import {
  StudentShortSubmissionModel,
  StudentSubmissionModel,
  SubmissionResultModel,
  TeacherShortSubmissionModel,
} from "../../../_model/submission.model";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { CreateSubmissionDto } from "../../../_dto/create-submission-dto";
import { GradeSubmissionDto } from "../../../_dto/grade-submission-dto";
import { DateUtil } from "src/app/_utils/date_util";

const API_URL = `${environment.apiUrl}/spanish_platform/submission`;

@Injectable({
  providedIn: "root",
})
export class SubmissionHttpService {
  constructor(private http: HttpClient, private DateUtil: DateUtil) {}

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
            return response.submissions.map((submission: TeacherShortSubmissionModel) => {
              submission.gradedAt = this.DateUtil.utcToPeruvianDate(submission.gradedAt);
              return submission;
            });
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
        `${API_URL}/learner?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
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
            return response.submissions.map((submission: StudentShortSubmissionModel) => {
              submission.gradedAt = this.DateUtil.utcToPeruvianDate(submission.gradedAt);
              return submission;
            }
            );
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getStudentSubmissionById$(id: number): Observable<StudentSubmissionModel> {
    return this.http
      .get<StudentSubmissionModel>(`${API_URL}/${id}/learner`, {
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
            const submission = response.submission;
            submission.gradedAt = this.DateUtil.utcToPeruvianDate(submission.gradedAt);
            return submission;
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
            const submission = response.submission;
            submission.gradedAt = this.DateUtil.utcToPeruvianDate(submission.gradedAt);
            return submission;
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
  ): Observable<boolean> {
    return this.http
      .put<boolean>(`${API_URL}/${id}/grade`, gradeSubmissionDto, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): boolean => {
          if (response.success) {
            return response.success;
          } else {
            throwError(response.error);
            return response.success;
          }
        })
      );
  }
}
