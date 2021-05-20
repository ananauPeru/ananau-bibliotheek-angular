import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { TodoDTO } from "../../../_dto/item-dto";
import { TodoModel } from "../../../_models/todo.model";

const API_TODOS_URL = `${environment.apiUrl}/todo`;

@Injectable({
  providedIn: "root",
})
export class TodoHTTPService {
  constructor(private http: HttpClient) {}

  getAllTodos$(): Observable<TodoModel[]> {
    return this.http
      .get(`${API_TODOS_URL}/getall`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((todos: any): TodoModel[] => {
          return todos;
        })
      );
  }

  // CREATE
  // server should return the object with ID
  create(lp: TodoDTO): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${API_TODOS_URL}`, lp).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (lp: any): TodoModel => {
          return lp;
        }
      )
    );
  }

  edit(id: number, lp: TodoDTO): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${API_TODOS_URL}/${id}`, lp).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (lp: any): TodoModel => {
          return lp;
        }
      )
    );
  }

  getItemById(id: number): Observable<TodoModel> {
    return this.http
      .get(`${API_TODOS_URL}/getById/${id}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map(
          (lp: any): TodoModel => {
            return lp;
          }
        )
      );
  }

  delete(id: number): Observable<TodoModel> {
    return this.http
      .delete(`${API_TODOS_URL}/${id}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map(
          (res: any): TodoModel => {
            return res;
          }
        )
      );
  }
}
