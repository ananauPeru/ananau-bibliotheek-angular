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

  // isCheckedIn(userId: number): Observable<boolean> {
  //   console.log("Fetching...")
  //   return this.checkInHttpService.getIsCheckedIn$(userId);
  // }

  isCheckedIn(userId: number): Observable<boolean> {
    return this._checkInHistory.pipe(
      map((checkInHistory: CheckInHistory[]) => {
        const userCheckIns = checkInHistory.filter(
          (checkIn) => checkIn.userId === userId
        );
        if (userCheckIns.length === 0) {
          return false;
        }
        const latestCheckIn = userCheckIns[userCheckIns.length - 1];
        return latestCheckIn.checkOutTime === null || latestCheckIn.checkOutTime === undefined;
      })
    );
  }

  checkIn(userId: number): Observable<CheckInHistory> {
    return this.checkInHttpService.postCheckIn$(userId);
  }

  checkOut(userId: number): Observable<CheckInHistory> {
    return this.checkInHttpService.putCheckOut$(userId);
  }

  getCheckinHistory(userId: number, startDate: Date | null, endDate: Date | null): Observable<CheckInHistory[]> {
    return this.checkInHttpService.getAllCheckInHistoryOfUser$(userId, startDate, endDate);
  }
}