import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { BookModel } from "../../../_models/book.model";
import { BookDTO } from "../../../_dto/book-dto";

const API_ITEMS_URL = `${environment.apiUrl}/books`;

@Injectable({
  providedIn: "root",
})
export class BookHTTPService {
  constructor(private http: HttpClient) {}

  getAllBooks$(): Observable<BookModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}?PageSize=1000`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): BookModel[] => {
          if (response.success) {
            return response.books;
          } else {
            throwError(response.error);
            return [];
          }
        })
      );
  }
  

  // CREATE
  // server should return the object with ID
  create(book: BookDTO): Observable<BookModel> {
    return this.http.post<BookModel>(`${API_ITEMS_URL}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): BookModel => {
        if (response.success) {
          return response.book;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  edit(id: number, book: BookDTO): Observable<BookModel> {
    return this.http.put<BookModel>(`${API_ITEMS_URL}/${id}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): BookModel => {
        if (response.success) {
          return response.book;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  getItemById(id: number): Observable<BookModel> {
    return this.http
      .get(`${API_ITEMS_URL}/${id}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): BookModel => {
          if (response.success) {
            return response.book;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
