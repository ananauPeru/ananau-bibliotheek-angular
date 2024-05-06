import { Injectable } from "@angular/core";
import { ExerciseModel } from "../../../_model/exercise.model";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ShortExerciseModel } from "../../../_model/short-exercise.model";
import { catchError, map } from "rxjs/operators";
import { CreateExerciseDto } from "../../../_dto/create-exercise-dto";

const API_URL = `${environment.apiUrl}/spanish_platform/exercise`;

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor(private http: HttpClient) {}

  getExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<ShortExerciseModel[]> {
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
}
