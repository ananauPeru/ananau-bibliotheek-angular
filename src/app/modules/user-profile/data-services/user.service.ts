import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "../../auth";
import { UserDTO } from "../_dto/user-dto";

const API_USERS_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUser$(dto: UserDTO): Observable<UserModel> {
    return this.http
      .put(`${API_USERS_URL}/${dto.userId}`, dto, { responseType: "json" })
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
}
