import { Pipe, PipeTransform } from '@angular/core';
import { CheckInService } from '../_services/check-in/check-in.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'checkInSort'
})
export class CheckInSortPipe implements PipeTransform {
  constructor(private checkInService: CheckInService) {}

  transform(registrations: any[]): Observable<any[]> {
    const checkInObservables = registrations.map(registration =>
      this.checkInService.isCheckedIn(registration.userId).pipe(
        map(isCheckedIn => ({ registration, isCheckedIn }))
      )
    );

    return combineLatest(checkInObservables).pipe(
      map(combinedResults => {
        const sortedResults = combinedResults.sort((a, b) => {
          if (a.isCheckedIn && !b.isCheckedIn) return -1;
          if (!a.isCheckedIn && b.isCheckedIn) return 1;
          return 0;
        });

        return sortedResults.map(result => result.registration);
      })
    );
  }
}