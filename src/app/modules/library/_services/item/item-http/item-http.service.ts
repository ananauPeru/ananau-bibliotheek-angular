import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ItemModel } from "../../../_models/item.model";
import { ItemDTO } from "../../../_dto/item-dto";

const API_ITEMS_URL = `${environment.apiUrl}/items`;

@Injectable({
  providedIn: "root",
})
export class ItemHTTPService {
  constructor(private http: HttpClient) {}

  getAllItems$(): Observable<ItemModel[]> {
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
        map((response: any): ItemModel[] => {
          if (response.success) {
            return response.items;
          } else {
            throwError(response.error);
            return [];
          }
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
      map((response: any): ItemModel => {
        if (response.success) {
          return response.item;
        } else {
          throwError(response.error);
          return null;
        }
      })
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
      map((response: any): ItemModel => {
        if (response.success) {
          return response.item;
        } else {
          throwError(response.error);
          return null;
        }
      })
    );
  }

  getItemById(id: number): Observable<ItemModel> {
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
        map((response: any): ItemModel => {
          if (response.success) {
            return response.item;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }

  delete(id: number): Observable<any> {
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
        map((response: any): any => {
          if (response.success) {
            return response;
          } else {
            throwError(response.error);
            return null;
          }
        })
      );
  }
}
