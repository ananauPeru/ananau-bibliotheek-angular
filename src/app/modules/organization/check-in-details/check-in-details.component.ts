import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckInService } from '../_services/check-in/check-in.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-in-details',
  templateUrl: './check-in-details.component.html',
  styleUrls: ['./check-in-details.component.scss']
})
export class CheckInDetailsComponent implements OnInit {
  id: number;

  startDate: Date;
  endDate: Date;

  checkInHistory: Observable<CheckInHistory[]>;

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService
    ) {
      checkInService.loadInitialData();
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    });
    this.checkInHistory = this.checkInService.getCheckInHistory(this.id, this.startDate, this.endDate);
    this.checkInHistory.subscribe(data => console.log(data));
  }
}