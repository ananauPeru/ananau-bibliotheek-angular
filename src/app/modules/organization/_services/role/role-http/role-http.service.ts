import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { RoleModel } from "../../../_models/role.model";

const API_ITEMS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: "root",
})
export class RoleHTTPService {
  constructor(private http: HttpClient) {}

  getAllRoles$(): Observable<RoleModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}/roles`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): RoleModel[] => {
          return response.roles.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              normalizedName: item.normalizedName,
            };
          });
        })
      );
  }

  getItemById(id: number): Observable<RoleModel> {
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
        map((item: any): RoleModel => {
          return item;
        })
      );
  }
}
