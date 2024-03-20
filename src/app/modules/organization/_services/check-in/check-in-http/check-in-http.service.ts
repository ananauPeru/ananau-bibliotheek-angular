import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { delay } from "rxjs/operators";

const API_GENERAL_INFORMATION_URL = `${environment.apiUrl}/checkin`;

const MOCK_CHECKIN_HISTORY: CheckInHistory[] = [
  {
    id: 1,
    userId: 1,
    checkInTime: "2023-06-01T09:00:00",
    checkOutTime: "2023-06-01T17:00:00",
  },
  {
    id: 2,
    userId: 1,
    checkInTime: "2024-03-19T09:30:00",
    checkOutTime: "2024-03-19T18:00:00",
  },
  {
    id: 3,
    userId: 2,
    checkInTime: "2023-06-01T10:00:00",
    checkOutTime: "2023-06-01T16:30:00",
  },
  { id: 4, userId: 2, checkInTime: "2023-06-03T08:45:00", checkOutTime: null },
  { id: 5, userId: 72, checkInTime: "2024-03-19T15:45:00", checkOutTime: "2024-03-19T17:50:00" },
  { id: 6, userId: 72, checkInTime: "2024-03-20T08:45:00", checkOutTime: "2024-03-20T10:45:00" },
  { id: 7, userId: 72, checkInTime: "2024-03-20T12:07:00", checkOutTime: "2024-03-20T13:12:00" },
  { id: 7, userId: 72, checkInTime: "2024-02-20T12:07:00", checkOutTime: "2024-02-20T13:12:00" },
];

@Injectable({
  providedIn: "root",
})
export class CheckInHttpService {
  constructor(private http: HttpClient) {}

  getIsCheckedIn$(userId: number): Observable<boolean> {
    // const url = `${API_GENERAL_INFORMATION_URL}/${userId}`;

    // return this.http
    //     .get<boolean>(url)
    //     .pipe(
    //         catchError((error) => {
    //             if(error.status === 401) {
    //                 console.error("Login please...");
    //             } else {
    //                 console.error(error);
    //             }
    //             return throwError(error);
    //         })
    //     );

    const latestCheckIn = MOCK_CHECKIN_HISTORY.reduce((latest, current) => {
      if (current.userId === userId && current.checkOutTime === null) {
        if (
          !latest ||
          new Date(current.checkInTime) > new Date(latest.checkInTime)
        ) {
          return current;
        }
      }
      return latest;
    }, null as CheckInHistory | null);

    const isCheckedIn = latestCheckIn !== null;
    return of(isCheckedIn).pipe(delay(500));
  }

  postCheckIn$(userId: number): Observable<CheckInHistory> {
    // const url = `${API_GENERAL_INFORMATION_URL}/${userId}`;

    // return this.http
    //     .post<CheckInHistory>(url, null)
    //     .pipe(
    //         catchError((error) => {
    //             if(error.status === 401) {
    //                 console.error("Login please...");
    //             } else {
    //                 console.error(error);
    //             }
    //             return throwError(error);
    //         })
    //     );

    const newCheckIn: CheckInHistory = {
      id: MOCK_CHECKIN_HISTORY.length + 1,
      userId: userId,
      checkInTime: new Date().toISOString(),
      checkOutTime: null,
    };
    MOCK_CHECKIN_HISTORY.push(newCheckIn);
    return of(newCheckIn).pipe(delay(500));
  }

  putCheckOut$(userId: number): Observable<CheckInHistory> {
    // const url = `${API_GENERAL_INFORMATION_URL}/${userId}`;

    // return this.http
    //     .put<CheckInHistory>(url, null)
    //     .pipe(
    //         catchError((error) => {
    //             if(error.status === 401) {
    //                 console.error("Login please...");
    //             } else {
    //                 console.error(error);
    //             }
    //             return throwError(error);
    //         })
    //     );

    const checkInIndex = MOCK_CHECKIN_HISTORY.findIndex(
      (history) => history.userId === userId && history.checkOutTime === null
    );
    if (checkInIndex !== -1) {
      MOCK_CHECKIN_HISTORY[checkInIndex].checkOutTime =
        new Date().toISOString();
      return of(MOCK_CHECKIN_HISTORY[checkInIndex]).pipe(delay(500));
    }
    return throwError(new Error("No active check-in found for the user"));
  }

  getAllCheckInHistoryOfUser$(
    userId: number,
    startDate: Date | null,
    endDate: Date | null
  ): Observable<CheckInHistory[]> {
    // const url = `${API_GENERAL_INFORMATION_URL}/history/${userId}`;
    // const params = {
    //   startDate: startDate.toISOString(),
    //   endDate: endDate.toISOString()
    // };

    // return this.http
    //     .get<CheckInHistory[]>(url, { params })
    //     .pipe(
    //         catchError((error) => {
    //             if(error.status === 401) {
    //                 console.error("Login please...");
    //             } else {
    //                 console.error(error);
    //             }
    //             return throwError(error);
    //         }),
    //         map((checkInHisories: any): CheckInHistory[] => {
    //             return checkInHisories;
    //         })
    //     );

    let filteredHistory = MOCK_CHECKIN_HISTORY.filter(
      (history) => history.userId === userId
    );
  
    if (startDate !== null && startDate !== undefined && startDate.toString() !== ""){
      filteredHistory = filteredHistory.filter(
        (history) => {
          return new Date(history.checkInTime) >= new Date(startDate);
        }
      );
    }
  
    if (endDate !== null && endDate !== undefined && endDate.toString() !== "") {
      endDate = new Date(endDate);
      endDate.setDate(endDate.getDate() + 1); // Add one day to include the end date
      filteredHistory = filteredHistory.filter(
        (history) => new Date(history.checkInTime) < new Date(endDate)
      );
    }
  
    return of(filteredHistory).pipe(delay(500));
  }

  getAllCheckInHistory$(): Observable<CheckInHistory[]> {
    // const url = `${API_GENERAL_INFORMATION_URL}/history`;

    // return this.http
    //     .get<CheckInHistory[]>(url)
    //     .pipe(
    //         catchError((error) => {
    //             if(error.status === 401) {
    //                 console.error("Login please...");
    //             } else {
    //                 console.error(error);
    //             }
    //             return throwError(error);
    //         }),
    //         map((checkInHisories: any): CheckInHistory[] => {
    //             return checkInHisories;
    //         })
    //     );

    return of(MOCK_CHECKIN_HISTORY).pipe(delay(500));
  }
}
