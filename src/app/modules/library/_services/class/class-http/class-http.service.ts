import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ItemModel } from "../../../_models/item.model";
import { ItemDTO } from "../../../_dto/item-dto";
import { ClassModel } from "../../../_models/class.model"
import { ClassDTO } from "../../../_dto/class-dto";

const API_ITEMS_URL = `${environment.apiUrl}/book`;

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
  create(book: ClassDTO): Observable<ClassModel> {
    return this.http.post<ClassModel>(`${API_ITEMS_URL}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (book: any): ClassModel => {
          return book;
        }
      )
    );
  }
  edit(id: number, book: ClassDTO): Observable<ClassModel> {
    return this.http.put<ClassModel>(`${API_ITEMS_URL}/${id}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (book: any): ClassModel => {
          return book;
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
          (book: any): ClassModel => {
            return book;
          }
        )
      );
  }
}
