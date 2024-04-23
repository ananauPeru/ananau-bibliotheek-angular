import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionTypeModel } from '../../../_models/question-type/question-type.model';
import { catchError, map } from 'rxjs/operators';

const API_URL = `${environment.apiUrl}/spanish_platform/questiontypes`;

@Injectable({
  providedIn: 'root'
})
export class QuestionTypeHttpService {

constructor(private http: HttpClient) { }



  getQuestionTypes$(): Observable<QuestionTypeModel[]> {
    return this.http.get(`${API_URL}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error('Login please...');
        }
        return error;
      }
      ),
      map((response: any): QuestionTypeModel[] => {
        if (response.success) {
          return response.types;
        } else {
          return [];
        }
      })
    );
  }


  createQuestionType$(name: string): Observable<QuestionTypeModel> {
    return this.http.post(`${API_URL}`, { name }).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error('Login please...');
        }
        return error;
      }
      ),
      map((response: any): QuestionTypeModel => {
        if (response.success) {
          return response.type;
        } else {
          return null;
        }
      })
    );
  }

  deleteQuestionType$(id: number): Observable<boolean> {
    return this.http.delete(`${API_URL}/${id}`).pipe(
      catchError((error) => {
        if (error.status == 401) {
          console.error('Login please...');
        }
        return error;
      }
      ),
      map((response: any): boolean => {
        if (response.success) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
