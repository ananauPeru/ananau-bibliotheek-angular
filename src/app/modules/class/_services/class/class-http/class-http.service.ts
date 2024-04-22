import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { catchError, finalize, map } from "rxjs/operators";
import { ClassModel } from "../../../_models/class.model"
import { ClassDTO } from "../../../_dto/class-dto";

const API_ITEMS_URL = `${environment.apiUrl}/class`;

@Injectable({
  providedIn: "root",
})
export class ClassHTTPService {


  
  constructor(private http: HttpClient) {}

  getAllClasses$(): Observable<ClassModel[]> {
    return this.http
      .get(`${API_ITEMS_URL}`, {
        responseType: "json",
      })
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            console.error("Login please...");
          }
          return throwError(error);
        }),
        map((response: any): ClassModel[] => {
          if(response.success) {
            return response.classes;
          } else {
            throwError(response.error);
            return []
          }
        })
      );
  }

  // CREATE
  // server should return the object with ID
  create(classDto: ClassDTO): Observable<ClassModel> {
    return this.http.post<ClassModel>(`${API_ITEMS_URL}`, classDto.getRequestModel()).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): ClassModel => {
        if(response.success) {
          return response.class;
        } else {
          throwError(response.error);
          return undefined;
        }
      })
    );
  }
  edit(id: number, classDto: ClassDTO): Observable<ClassModel> {
    return this.http.put<ClassModel>(`${API_ITEMS_URL}/${id}`, classDto.getRequestModel()).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error("Login please...");
        }
        return throwError(error);
      }),
      map((response: any): ClassModel => {
        if(response.success) {
          return response.class;
        } else {
          throwError(response.error);
          return undefined;
        }
      })
    );
  }

  getItemById(id: number): Observable<ClassModel> {
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
        map((response: any): ClassModel => {
          if(response.success) {
            return response.class;
          } else {
            throwError(response.error);
            return undefined;
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
          if(response.success) {
            return response.success;
          } else {
            throwError(response.error);
            return undefined;
          }
        })
      );
  }
}
