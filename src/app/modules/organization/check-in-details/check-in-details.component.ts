import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckInService } from '../_services/check-in/check-in.service';
import { Observable, of } from 'rxjs';
import { RegistrationService } from '../_services/registration/registration.service';
import { RegistrationModel } from '../_models/registration.model';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-check-in-details',
  templateUrl: './check-in-details.component.html',
  styleUrls: ['./check-in-details.component.scss']
})
export class CheckInDetailsComponent implements OnInit {
  isLoading: boolean = true;

  id: number;
  registration: RegistrationModel;
  startDate: Date;
  endDate: Date;
  checkInHistory$: Observable<CheckInHistory[]>;

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService,
    private registrationService: RegistrationService,
    private cdr: ChangeDetectorRef
  ) {
    checkInService.loadInitialData();
    registrationService.loadInitialData();
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

    this.route.params.pipe(
      switchMap(params => {
        this.id = parseInt(params['id']);
        if (isNaN(this.id)) {
          console.error('Invalid ID');
          return of(null);
        }
        return this.registrationService.getVolunteerRegistrationById$(this.id).pipe(
          catchError(error => {
            console.error('Error fetching volunteer registration:', error);
            return this.registrationService.getStudentRegistrationById$(this.id);
          }),
          catchError(error => {
            console.error('Error fetching student registration:', error);
            return of(null);
          })
        );
      })
    ).subscribe(registration => {
      this.registration = registration;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  calculateTotalCheckedInTime(checkInHistory: CheckInHistory[], startDate: Date, endDate: Date): number {
    if(!checkInHistory) return 0;
    let totalTime = 0;

    if(typeof startDate === 'string') startDate = new Date(startDate);
    if(typeof endDate === 'string') endDate = new Date(endDate);


    startDate = startDate || new Date(-8640000000000000); // Minimum date value
    endDate = endDate || new Date(8640000000000000); // Maximum date value
    
    for (const entry of checkInHistory) {
      const checkInTime = new Date(entry.checkInTime);
      const checkOutTime = entry.checkOutTime ? new Date(entry.checkOutTime) : new Date();
  
      if (checkInTime >= startDate && checkOutTime <= endDate) {
        const duration = checkOutTime.getTime() - checkInTime.getTime();
        totalTime += duration;
      }
    }
  
    return totalTime;
  }

  calculateTotalCheckedInTimeToday(checkInHistory: CheckInHistory[]): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    return this.calculateTotalCheckedInTime(checkInHistory, today, tomorrow);
  }

  formatDuration(duration: number): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }

  getFirstDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }
  
  getLastDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  isCheckedIn$(userId: number): Observable<boolean> {
    return this.checkInService.isCheckedIn(userId);
  }
}