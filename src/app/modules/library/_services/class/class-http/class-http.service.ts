import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ItemModel } from "../../../_models/item.model";
import { ItemDTO } from "../../../_dto/item-dto";
import { ClassModel } from "../../../_models/class.model"
import { ClassDTO } from "../../../_dto/class-dto";

const API_ITEMS_URL = `${environment.apiUrl}/class`;

@Injectable({
  providedIn: "root",
})
export class ClassHTTPService {
  constructor(private http: HttpClient) {}

  getAllClasses$(): Observable<ClassModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}/getall`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((items: any): ClassModel[] => {
          return items;
        })
      );
  }

  // CREATE
  // server should return the object with ID
  create(c: ClassDTO): Observable<ClassModel> {
    return this.http.post<ClassModel>(`${API_ITEMS_URL}`, c).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (c: any): ClassModel => {
          return c;
        }
      )
    );
  }
  edit(id: number, c: ClassDTO): Observable<ClassModel> {
    return this.http.put<ClassModel>(`${API_ITEMS_URL}/${id}`, c).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (c: any): ClassModel => {
          return c;
        }
      )
    );
  }

  getItemById(id: number): Observable<ClassModel> {
    return this.http
      .get(`${API_ITEMS_URL}/getById/${id}`, {
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
          (c: any): ClassModel => {
            return c;
          }
        )
      );
  }
}
