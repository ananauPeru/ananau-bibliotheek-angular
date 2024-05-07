import { Injectable } from "@angular/core";
import { ExerciseModel } from "../../../_model/exercise.model";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ShortExerciseModel } from "../../../_model/short-exercise.model";
import { catchError, map } from "rxjs/operators";
import { CreateExerciseDto } from "../../../_dto/create-exercise-dto";
import { Roles } from "src/app/_utils/auth_util";
import { ShortSharedExerciseModel } from "../../../_model/short-shared-exercise.model";

const API_URL = `${environment.apiUrl}/spanish_platform/exercise`;

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor(private http: HttpClient) {}

  getExercises$(
    searchTerm: string,
    page: number,
    pageSize: number,
    role: Roles
  ): Observable<ShortExerciseModel[]> {
    if (role == Roles.SpanishTeacher) {
      return this.http
        .get<ShortExerciseModel[]>(
          `${API_URL}?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`,
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
          map((response: any): ShortExerciseModel[] => {
            if (response.success) {
              return response.exercises;
            } else {
              throwError(response.error);
              return [];
            }
          })
        );
    } else {
      //Make the request as a student
    }
  }

  getExerciseById$(id: number): Observable<ExerciseModel> {
    return this.http
      .get<ExerciseModel>(`${API_URL}/${id}`, {
        responseType: "json",
      })
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

  createExercise$(exerciseDto: CreateExerciseDto): Observable<ExerciseModel> {
    return this.http
      .post<ExerciseModel>(API_URL, exerciseDto, {
        responseType: "json",
      })
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

  getExercisesSharedWithUser$(searchTerm, page, pageSize): Observable<ShortSharedExerciseModel[]> {
    return of([]);
  }
}
