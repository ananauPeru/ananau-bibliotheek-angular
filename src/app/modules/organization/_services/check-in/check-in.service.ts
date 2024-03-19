import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckInHttpService } from './check-in-http/check-in-http.service';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private checkInHttpService: CheckInHttpService) { }

  isCheckedIn(userId: number): Observable<boolean> {
    return this.checkInHttpService.getIsCheckedIn$(userId);
  }

  checkIn(userId: number): Observable<CheckInHistory> {
    return this.checkInHttpService.postCheckIn$(userId);
  }

  checkOut(userId: number): Observable<CheckInHistory> {
    return this.checkInHttpService.putCheckOut$(userId);
  }

  getCheckoutHistory(userId: number, startDate: Date | null, endDate: Date | null): Observable<CheckInHistory[]> {
    return this.checkInHttpService.getAllCheckInHistoryOfUser$(userId, startDate, endDate);
  }
}