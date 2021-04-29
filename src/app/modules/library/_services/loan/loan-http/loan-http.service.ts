import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../../environments/environment'
import { catchError, finalize, map } from 'rxjs/operators'
import { LoanedPieceModel } from '../../../_models/loaned-piece.model'
import { LoanedPieceDTO } from '../../../_dto/loaned-piece-dto'

const API_LOANS_URL = `${environment.apiUrl}/loanedpiece`

@Injectable({
  providedIn: 'root',
})
export class LoanHTTPService {
  constructor(private http: HttpClient) {}

  getAllloans$(): Observable<LoanedPieceModel[]> {
    return this.http
      .get(`${API_LOANS_URL}/getall`, {
        responseType: 'json',
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log('Login please...')
          }
          return throwError(error)
        }),
        map((loans: any): LoanedPieceModel[] => {
          console.log(loans)
          return loans
        }),
      )
  }

  // CREATE
  // server should return the object with ID
  create(lp: LoanedPieceDTO): Observable<LoanedPieceModel> {
    return this.http.post<LoanedPieceModel>(`${API_LOANS_URL}`, lp).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (lp: any): LoanedPieceModel => {
          console.log(lp)
          return lp
        },
      ),
    )
  }

  edit(id: number, lp: LoanedPieceDTO): Observable<LoanedPieceModel> {
    return this.http.put<LoanedPieceModel>(`${API_LOANS_URL}/${id}`, lp).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log('Login please...')
        }
        return throwError(error)
      }),
      map(
        (lp: any): LoanedPieceModel => {
          console.log(lp)
          return lp
        },
      ),
    )
  }

  getItemById(id: number): Observable<LoanedPieceModel> {
    return this.http
      .get(`${API_LOANS_URL}/getById/${id}`, {
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
          (lp: any): LoanedPieceModel => {
            console.log(lp)
            return lp
          },
        ),
      )
  }

  delete(id: number): Observable<LoanedPieceModel> {
    return this.http
      .delete(`${API_LOANS_URL}/${id}`, {
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
          (res: any): LoanedPieceModel => {
            console.log(res)
            return res
          },
        ),
      )
  }
}
