import { Injectable } from "@angular/core";
import {
  AssignedExerciseModel,
  ExerciseModel,
  LearnersModel,
  StudentExerciseModel,
  StudentShortExerciseModel,
  TeacherShortExerciseModel,
  TypeModel,
} from "../../../_model/exercise.model";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, map } from "rxjs/operators";
import { CreateExerciseDto } from "../../../_dto/create-exercise-dto";
import { DateUtil } from "src/app/_utils/date_util";
import { ExerciseSubmissionModel } from "../../../_model/submission.model";

const API_URL = `${environment.apiUrl}/spanish_platform/exercise`;
const TEMP_API_URL = `${environment.apiUrl}/spanish_platform/submission`;

@Injectable({
  providedIn: "root",
})
export class ExerciseHttpService {
  constructor(private http: HttpClient, private DateUtil: DateUtil) {}

  getTeacherExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<TeacherShortExerciseModel[]> {
    return this.http
      .get<TeacherShortExerciseModel[]>(
        `${API_URL}/teacher?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`
      )
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

  getStudentExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<StudentShortExerciseModel[]> {
    return this.http
      .get<StudentShortExerciseModel[]>(
        `${API_URL}/learner?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): StudentShortExerciseModel[] => {
          if (response.success) {
            return response.exercises.map(
              (exercise: StudentShortExerciseModel) => {
                exercise.deadline = this.DateUtil.utcToPeruvianDate(
                  exercise.deadline
                );
                return exercise;
              }
            );
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }

  getAssignedExercises$(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<AssignedExerciseModel[]> {
    return this.http
      .get<AssignedExerciseModel[]>(
        `${TEMP_API_URL}/assigns?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): AssignedExerciseModel[] => {
          if (response.success) {
            return response.assigns.map((assign: AssignedExerciseModel) => {
              assign.deadline = this.DateUtil.utcToPeruvianDate(
                assign.deadline
              );
              return assign;
            });
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
          const exercise = response.exercise;

          exercise.submissions = exercise.submissions.map(
            (submission: ExerciseSubmissionModel): ExerciseSubmissionModel => {
              submission.submittedAt = this.DateUtil.utcToPeruvianDate(
                submission.submittedAt
              );
              submission.gradedAt = this.DateUtil.utcToPeruvianDate(
                submission.gradedAt
              );
              return submission;
            }
          );

          return exercise;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  getStudentExerciseById$(id: number): Observable<StudentExerciseModel> {
    return this.http.get<StudentExerciseModel>(`${API_URL}/${id}/learner`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): StudentExerciseModel => {
        if (response.success) {
          const exercise = response.exercise;

          //TODO: Remove this when the backend is fixed
          if(exercise.deadline) {
            exercise.deadline = this.DateUtil.utcToPeruvianDate(exercise.deadline);
          } else {
            exercise.deadline = new Date();
            exercise.deadline = exercise.deadline.setDate(exercise.deadline.getDate() + 1);
          }

          exercise.submissions = exercise.submissions.map(
            (submission: ExerciseSubmissionModel): ExerciseSubmissionModel => {
              submission.submittedAt = this.DateUtil.utcToPeruvianDate(
                submission.submittedAt
              );
              submission.gradedAt = this.DateUtil.utcToPeruvianDate(
                submission.gradedAt
              );
              return submission;
            }
          );

          return exercise;
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
    return this.http.post<ExerciseModel>(`${API_URL}`, createExerciseDto).pipe(
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

  getExerciseTypes$(): Observable<TypeModel[]> {
    return this.http.get<TypeModel[]>(`${API_URL}/exercise_types`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): TypeModel[] => {
        if (response.success) {
          return response.types;
        } else {
          throwError(response.error);
          return [];
        }
      })
    );
  }

  getLearners$(): Observable<LearnersModel[]> {
    return this.http.get<LearnersModel[]>(`${API_URL}/learners`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): LearnersModel[] => {
        if (response.success) {
          return response.learners;
        } else {
          throwError(response.error);
          return [];
        }
      })
    );
  }
}
