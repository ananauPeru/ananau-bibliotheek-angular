import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "../../auth";
import { ChangePasswordDTO } from "../_dto/change-password-dto";
import { UserDTO } from "../_dto/user-dto";

const API_USERS_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUser$(dto: UserDTO): Observable<UserModel> {
    return this.http
      .put(`${API_USERS_URL}`, dto, { responseType: "json" })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.log("Login please...");
          }
          return throwError(error);
        }),
        map((user: any): UserModel => user)
      );
  }

  changePassword$(dto: ChangePasswordDTO) {
    return this.http.post(`${API_USERS_URL}/change-password`, dto).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.log("Login please...");
        }
        return throwError(error);
      })
    );
  }
}
