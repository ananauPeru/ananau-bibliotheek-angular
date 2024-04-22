import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { UserModel } from "src/app/modules/auth/_models/user.model";
import { UserRoleModel } from "../../../_models/user-role.model";

const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: "root",
})
export class UserHTTPService {
  constructor(private http: HttpClient) {}

  getAllUsers$(): Observable<UserRoleModel[]> {
    return this.http
      .get(`${API_USERS_URL}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          } else {
            console.error(error);
          }
          return throwError(error);
        }),
        map((response: any): UserRoleModel[] => {
          return response.users.map((item: any) => {
            return {
              id: item.id,
              firstName: item.firstName,
              lastName: item.lastName,
              email: item.email,
              roles: item.roles.map((role: any) => {
                return {
                  id: role.id,
                  name: role.name,
                  normalizedName: role.name,
                };
              }),
            };
          });
        })
      );
  }

  changeRoles(userId: number, rolesIds: number[]): Observable<UserRoleModel> {
    return this.http
      .post<string[]>(`${API_USERS_URL}/roles/change/${userId}`, { rolesIds: rolesIds })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): UserRoleModel => {
          return {
            id: response.user.id,
            firstName: response.user.firstName,
            lastName: response.user.lastName,
            email: response.user.email,
            roles: response.user.roles.map((role: any) => {
              return {
                id: role.id,
                name: role.name,
                normalizedName: role.name,
              };
            }),
          };
        })
      );
  }
}
