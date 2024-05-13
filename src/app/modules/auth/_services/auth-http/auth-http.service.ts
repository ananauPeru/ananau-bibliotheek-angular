import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../_models/user.model";
import { environment } from "../../../../../environments/environment";
import { AuthModel } from "../../_models/auth.model";
import { RegisterDTO } from "../../_dto/register-dto";
import { ResetPasswordDTO } from "../../_dto/reset-password-dto";

const API_USERS_URL = `${environment.apiUrl}/users`;

//Comment to push

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(`${API_USERS_URL}/login`, { email, password });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: RegisterDTO): Observable<RegisterDTO> {
    const response = this.http.post<RegisterDTO>(`${API_USERS_URL}/registration`, user);
    response.subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
      },
      (error) => {
        console.log("Error", error);
      }
    )
    return response;
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string) {
    return this.http.post(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  resetPassword(dto: ResetPasswordDTO) {
    return this.http.post(`${API_USERS_URL}/reset-password`, dto);
  }

  getUserByToken(auth: AuthModel): Observable<UserModel> {
    // console.log("Auth", auth);
    // console.log("AuthId", auth.user.id);
    // return this.http.get<UserModel>(`${API_USERS_URL}/${auth.user.id}`);

    return of(auth.user);
  }
}
