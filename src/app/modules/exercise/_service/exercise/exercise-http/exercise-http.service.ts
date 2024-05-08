import { Injectable } from "@angular/core";
import {
  AssignedExerciseModel,
  ExerciseModel,
  StudentShortExerciseModel,
  TeacherShortExerciseModel,
} from "../../../_model/exercise.model";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { CreateExerciseDto } from "../../../_dto/create-exercise-dto";

const API_URL = `${environment.apiUrl}/spanish_platform/exercise`;

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor(private http: HttpClient) {}

  getTeacherExercises$(searchTerm: string, page: number, pageSize: number): Observable<TeacherShortExerciseModel[]> {
    return this.http
      .get<TeacherShortExerciseModel[]>(`${API_URL}/teacher?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): TeacherShortExerciseModel[] => {
          if (response.success) {
            return response.exercises;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getStudentExercises$(searchTerm: string, page: number, pageSize: number): Observable<StudentShortExerciseModel[]> {
    return this.http
      .get<StudentShortExerciseModel[]>(`${API_URL}/student?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): StudentShortExerciseModel[] => {
          if (response.success) {
            return response.exercises;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getAssignedExercises$(searchTerm: string, page: number, pageSize: number): Observable<AssignedExerciseModel[]> {
    return this.http
      .get<AssignedExerciseModel[]>(`${API_URL}/assigned?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): AssignedExerciseModel[] => {
          if (response.success) {
            return response.exercises;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getTeacherExerciseById$(id: number): Observable<ExerciseModel> {
    return this.http.get<ExerciseModel>(`${API_URL}/${id}/teacher`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): ExerciseModel => {
        if (response.success) {
          return response.exercise;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  getStudentExerciseById$(id: number): Observable<ExerciseModel> {
    return this.http.get<ExerciseModel>(`${API_URL}/${id}/student`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): ExerciseModel => {
        if (response.success) {
          return response.exercise;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  createExercise$(
    createExerciseDto: CreateExerciseDto
  ): Observable<ExerciseModel> {
    return this.http
      .post<ExerciseModel>(`${API_URL}`, createExerciseDto)
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): ExerciseModel => {
          if (response.success) {
            return response.exercise;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
