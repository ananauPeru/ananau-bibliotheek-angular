import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ItemModel } from "../../../_models/item.model";
import { ItemDTO } from "../../../_dto/item-dto";

const API_ITEMS_URL = `${environment.apiUrl}/item`;

@Injectable({
  providedIn: "root",
})
export class ItemHTTPService {
  constructor(private http: HttpClient) {}

  getAllItems$(): Observable<ItemModel[]> {
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
        map((items: any): ItemModel[] => {
          return items;
        })
      );
  }

  // CREATE
  // server should return the object with ID
  create(item: ItemDTO): Observable<ItemModel> {
    return this.http.post<ItemModel>(`${API_ITEMS_URL}`, item).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (item: any): ItemModel => {
          return item;
        }
      )
    );
  }

  edit(id: number, item: ItemDTO): Observable<ItemModel> {
    return this.http.put<ItemModel>(`${API_ITEMS_URL}/${id}`, item).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map(
        (item: any): ItemModel => {
          return item;
        }
      )
    );
  }

  getItemById(id: number): Observable<ItemModel> {
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
          (item: any): ItemModel => {
            return item;
          }
        )
      );
  }

  delete(id: number): Observable<ItemModel> {
    return this.http
      .delete(`${API_ITEMS_URL}/${id}`, {
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
          (res: any): ItemModel => {
            return res;
          }
        )
      );
  }
}
