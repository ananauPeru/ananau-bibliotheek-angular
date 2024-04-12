import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckInHttpService } from './check-in-http/check-in-http.service';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private _checkInHistory: BehaviorSubject<CheckInHistory[]> = new BehaviorSubject([]);

  constructor(private checkInHttpService: CheckInHttpService) {
    this.loadInitialData();
   }


  loadInitialData() {
    this.refreshData();
  }

  refreshData() {
    this.checkInHttpService.getAllCheckInHistory$().subscribe(
      (checkInHistory) => {
        this._checkInHistory.next(checkInHistory);
      },
      (err) => console.error(err)
    );
  }

  isCheckedIn(userId: number): Observable<boolean> {
    return this._checkInHistory.pipe(
      map((checkInHistory: CheckInHistory[]) => {
        const userCheckIns = checkInHistory.filter(
          (checkIn) => checkIn.userId === userId
        );
        if (userCheckIns.length === 0) {
          return false;
        }
        return userCheckIns.some((checkIn) => checkIn.checkOut === null);
      })
    );
  }

  checkIn(userId: number): Observable<CheckInHistory> {
    return this.checkInHttpService.postCheckIn$(userId);
  }

  getCheckInHistory(userId: number, startDate: Date | null, endDate: Date | null): Observable<CheckInHistory[]> {
    return this.checkInHttpService.getAllCheckInHistoryOfUser$(userId, startDate, endDate);
  }
}