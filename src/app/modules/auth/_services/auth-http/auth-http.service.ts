import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserModel } from "../../_models/user.model";
import { environment } from "../../../../../environments/environment";
import { AuthModel } from "../../_models/auth.model";
import { RegisterDTO } from "../../_dto/register-dto";

const API_USERS_URL = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthModel>(API_USERS_URL, { email, password });
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: RegisterDTO): Observable<RegisterDTO> {
    return this.http.post<RegisterDTO>(`${API_USERS_URL}/register`, user);
  }

  // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
  forgotPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${API_USERS_URL}/forgot-password`, {
      email,
    });
  }

  getUserByToken(auth): Observable<UserModel> {
    console.log(auth.token);

    return this.http.get<UserModel>(`${API_USERS_URL}/${auth.user.id}`);
  }
}
