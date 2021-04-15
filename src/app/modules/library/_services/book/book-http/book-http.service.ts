import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment'
import { catchError, finalize, map } from 'rxjs/operators'
import { ItemModel } from '../../../_models/item.model'
import { ItemDTO } from '../../../_dto/item-dto'
import { BookModel } from '../../../_models/book.model'
import { BookDTO } from '../../../_dto/book-dto'

const API_ITEMS_URL = `${environment.apiUrl}/book`

@Injectable({
  providedIn: 'root',
})
export class BookHTTPService {
  constructor(private http: HttpClient) {}

  getAllBooks$(): Observable<BookModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}/getall`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map((items: any): BookModel[] => {
          console.log(items)
          return items
        }),
      )
  }

  // CREATE
  // server should return the object with ID
  create(book: BookDTO): Observable<BookModel> {
    return this.http.post<BookModel>(`${API_ITEMS_URL}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (book: any): BookModel => {
          console.log(book)
          return book
        },
      ),
    )
  }

  edit(id: number, book: BookDTO): Observable<BookModel> {
    console.log(id)
    console.log(book)
    return this.http.put<BookModel>(`${API_ITEMS_URL}/${id}`, book).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (book: any): BookModel => {
          console.log(book)
          return book
        },
      ),
    )
  }

  getItemById(id: number): Observable<BookModel> {
    return this.http
      .get(`${API_ITEMS_URL}/getById/${id}`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map(
          (book: any): BookModel => {
            console.log(book)
            return book
          },
        ),
      )
  }
}
