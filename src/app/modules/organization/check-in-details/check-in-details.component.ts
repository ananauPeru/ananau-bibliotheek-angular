import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckInService } from '../_services/check-in/check-in.service';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { CheckInUser } from '../_models/check-in-user.model';

@Component({
  selector: 'app-check-in-details',
  templateUrl: './check-in-details.component.html',
  styleUrls: ['./check-in-details.component.scss']
})
export class CheckInDetailsComponent implements OnInit {
  isLoading: boolean = true;

  id: number;
  checkInUser$: Observable<CheckInUser>;
  startDate: Date;
  endDate: Date;
  checkInHistory$: Observable<CheckInHistory[]>;

  selectedWeek: Date = new Date();
  selectedMonth: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService,
    private cdr: ChangeDetectorRef
  ) {
    checkInService.loadInitialData();
  }

  ngOnInit() {
    this.checkInHistory$ = this.route.params.pipe(
      switchMap(params => {
        this.id = parseInt(params['id']);
        if (isNaN(this.id)) {
          console.error('Invalid ID');
          return of(null);
        }
        return this.checkInService.getCheckInHistory(this.id, this.startDate, this.endDate);
      }),
      catchError(error => {
        console.error('Error fetching check-in history:', error);
        return of(null);
      })
    );

    this.checkInUser$ = this.route.params.pipe(
      switchMap(params => {
        this.id = parseInt(params['id']);
        if (isNaN(this.id)) {
          console.error('Invalid ID');
          return of(null);
        }
        return this.checkInService.getCheckInUser(this.id);
      })
    )
  }

  calculateTotalCheckedInTime(checkInHistory: CheckInHistory[], startDate: Date, endDate: Date): number {
    if (!checkInHistory) return 0;
    let totalTime = 0;

    if (typeof startDate === 'string') startDate = new Date(startDate);
    if (typeof endDate === 'string') endDate = new Date(endDate);

    startDate = startDate || new Date(-8640000000000000); // Minimum date value
    endDate = endDate || new Date(8640000000000000); // Maximum date value

    for (const entry of checkInHistory) {
      const checkInTime = new Date(entry.checkIn + 'Z');
      const checkOutTime = entry.checkOut ? new Date(entry.checkOut + 'Z') : new Date();

      if (checkInTime >= startDate && checkOutTime <= endDate) {
        const duration = checkOutTime.getTime() - checkInTime.getTime();
        totalTime += duration;
      }
    }

    return totalTime;
  }

  convertToLocalTime(utcDate: Date): Date {
    return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  }

  calculateTotalCheckedInTimeToday(checkInHistory: CheckInHistory[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.calculateTotalCheckedInTime(checkInHistory, today, tomorrow);
  }

  formatDuration(duration: number, hoursLabel: string, minutesLabel: string, secondsLabel: string): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours} ${hoursLabel}, ${minutes} ${minutesLabel}, ${seconds} ${secondsLabel}`;
  }

  getFirstDayOfWeek(): Date {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), diff);
  }
  
  getLastDayOfWeek(): Date {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? 0 : 7);
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), diff);
  }

  getFirstDayOfSelectedWeek(): Date {
    const day = this.selectedWeek.getDay();
    const diff = this.selectedWeek.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(this.selectedWeek.setDate(diff));
  }

  getLastDayOfSelectedWeek(): Date {
    const day = this.selectedWeek.getDay();
    const diff = this.selectedWeek.getDate() - day + (day === 0 ? 0 : 7);
    return new Date(this.selectedWeek.setDate(diff));
  }

  goToPreviousWeek(): void {
    this.selectedWeek = new Date(this.selectedWeek.getFullYear(), this.selectedWeek.getMonth(), this.selectedWeek.getDate() - 7);
  }

  goToNextWeek(): void {
    this.selectedWeek = new Date(this.selectedWeek.getFullYear(), this.selectedWeek.getMonth(), this.selectedWeek.getDate() + 7);
  }

  resetToCurrentWeek(): void {
    this.selectedWeek = new Date();
  }

  getWeekRange(date: Date): string {
    const startDate = this.getFirstDayOfSelectedWeek();
    const endDate = this.getLastDayOfSelectedWeek();
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }

  getFirstDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }
  
  getLastDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  getFirstDayOfSelectedMonth(): Date {
    return new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth(), 1);
  }
  
  getLastDayOfSelectedMonth(): Date {
    return new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 0);
  }
  
  goToPreviousMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() - 1, 1);
  }
  
  goToNextMonth(): void {
    this.selectedMonth = new Date(this.selectedMonth.getFullYear(), this.selectedMonth.getMonth() + 1, 1);
  }
  
  resetToCurrentMonth(): void {
    this.selectedMonth = new Date();
  }

  isCheckedIn$(userId: number): Observable<boolean> {
    return this.checkInService.isCheckedIn(userId);
  }
}