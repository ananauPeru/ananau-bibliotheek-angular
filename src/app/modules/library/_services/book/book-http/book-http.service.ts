import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ItemModel } from "../../../_models/item.model";
import { ItemDTO } from "../../../_dto/item-dto";
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
      .get(`${API_ITEMS_URL}`, {
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
          return response.books.map((book: any) => ({
            bookId: book.id,
            name:book.title,
            category: book.category,
            genre: book.genre,
            author: book.author,
            description: book.description,
            state: book.state,
            purchasedAt: book.purchasedAt,
            loanedPieces: null,
            quantity: book.quantity,
            photoUrl: book.photoUrl,
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
          }));
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
      map(
        (response: any): BookModel => {
          if (response.success) {
            return {
              bookId: null,
              name: response.book.title,
              category: response.book.category,
              genre: response.book.genre,
              author: response.book.author,
              description: response.book.description,
              state: response.book.state,
              purchasedAt: response.book.purchasedAt,
              loanedPieces: null,
              quantity: response.book.quantity,
              photoUrl: response.book.photoUrl,
              createdAt: response.book.createdAt,
              updatedAt: response.book.updatedAt,
              user:null,
              archived: response.book.archived,
              deleted: response.book.deleted,
            };
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
      map(
        (book: any): BookModel => {
          return book;
        }
      )
    );
  }

  getItemById(id: number): Observable<BookModel> {
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
          (book: any): BookModel => {
            return book;
          }
        )
      );
  }
}
