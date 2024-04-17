import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, delay, map } from "rxjs/operators";
import { CheckInUser } from "../../../_models/check-in-user.model";

const API_CHECKIN_URL = `${environment.apiUrl}/checkin`;

@Injectable({
  providedIn: "root",
})
export class CheckInHttpService {
  constructor(private http: HttpClient) {}

  getIsCheckedIn$(userId: number): Observable<boolean> {
    const url = `${API_CHECKIN_URL}/${userId}`;

    return this.http.get<boolean>(url).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Login please...");
        } else {
          console.error(error);
        }
        return throwError(error);
      }),
      map((response: any): boolean => {
        return response.isCheckedIn;
      })
    );
  }

  postCheckIn$(userId: number): Observable<CheckInHistory> {
    const url = `${API_CHECKIN_URL}/${userId}`;

    return this.http.post<CheckInHistory>(url, null).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Login please...");
        } else {
          console.error(error);
        }
        return throwError(error);
      }),
      map((checkInHistoryResponse: any): CheckInHistory => {
        return checkInHistoryResponse.checkInOutRecord;
      })
    );
  }

  getAllCheckInHistoryOfUser$(
    userId: number,
    startDate: Date | null,
    endDate: Date | null
  ): Observable<CheckInHistory[]> {
    const url = `${API_CHECKIN_URL}/history/${userId}`;
    const params = {};

    if(startDate) {
      params['StartDate'] = startDate?.toISOString();
    }

    if(endDate) {
      params['EndDate'] = endDate?.toISOString();
    }
    return this.http.get<any>(url, { params }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Login please...");
        } else {
          console.error(error);
        }
        return throwError(error);
      }),
      map((response: any): CheckInHistory[] => {
        return response.history.map((history: any): CheckInHistory => {
          return {
            id: history.id,
            userId: history.userId,
            checkIn: history.checkIn,
            checkOut: history.checkOut,
          };
        });
      })
    );
  }

  getAllCheckInHistory$(): Observable<CheckInHistory[]> {
    const url = `${API_CHECKIN_URL}/history`;
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error("Login please...");
        } else {
          console.error(error);
        }
        return throwError(error);
      }),
      map((response: any): CheckInHistory[] => {
        const checkInHistories: CheckInHistory[] = [];
        response.users.forEach((user: any) => {
          user.history.forEach((history: any) => {
            checkInHistories.push({
              id: history.id,
              userId: history.userId,
              checkIn: history.checkIn,
              checkOut: history.checkOut,
            });
          });
        });
        return checkInHistories;
      })
    );
  }

  getCheckInList$(): Observable<CheckInUser[]> {
    const url = `${API_CHECKIN_URL}/list`;
    return this.http.get(url).pipe(
      // (response: any) => {
      //   if(response.success) {
      //     return throwError(response.error);
      //   }
      // },
      catchError((error) => {
        if (error.status === 401) {
          console.error("Login please...");
        } else {
          console.error(error);
        }
        return throwError(error);
      }),
      
      map((response: any): CheckInUser[] => {
        return response.users.map((user: any): CheckInUser => {
          return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            isCheckedIn: user.isCheckedIn,
          };
        });
      })
    );
  }
}
