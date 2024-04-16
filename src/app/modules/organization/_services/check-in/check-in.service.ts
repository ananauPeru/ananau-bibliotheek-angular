import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CheckInHttpService } from "./check-in-http/check-in-http.service";
import { filter, find, first, map } from "rxjs/operators";
import { CheckInUser } from "../../_models/check-in-user.model";

@Injectable({
  providedIn: "root",
})
export class CheckInService {
  private _checkInHistory: BehaviorSubject<CheckInHistory[]> =
    new BehaviorSubject([]);

  private _checkInList: BehaviorSubject<CheckInUser[]> = new BehaviorSubject(
    []
  );
  public checkInList: Observable<CheckInUser[]> =
    this._checkInList.asObservable();

  constructor(private checkInHttpService: CheckInHttpService) {
    this.refreshData();
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

    this.checkInHttpService.getCheckInList$().subscribe(
      (checkInList) => {
        this._checkInList.next(checkInList);
      },
      (err) => console.error(err)
    );
  }

  filter(filterValue: string) {
    const f = filterValue.toLowerCase();
    this.checkInList = this._checkInList.pipe(
      map((users: CheckInUser[]) =>
        users.filter((user: CheckInUser) => {
          return (
            user.firstName?.toLowerCase().includes(f) ||
            user.lastName?.toLowerCase().includes(f)
          );
        })
      )
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

  getCheckInUser(userId: number): Observable<CheckInUser> {
    return this._checkInList.pipe(
      map(checkInList => checkInList.find(checkInUser => checkInUser.userId === userId))
    );
  }

  getCheckInHistory(
    userId: number,
    startDate: Date | null,
    endDate: Date | null
  ): Observable<CheckInHistory[]> {
    return this.checkInHttpService.getAllCheckInHistoryOfUser$(
      userId,
      startDate,
      endDate
    );
  }

  getCheckInList(): Observable<CheckInUser[]> {
    return this.checkInHttpService.getCheckInList$();
  }
}
