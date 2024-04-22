import { Component, OnDestroy, OnInit } from "@angular/core";
import { CheckInService } from "../_services/check-in/check-in.service";
import { Observable } from "rxjs";
import { UserService } from "../_services/user/user.service";

@Component({
  selector: "app-check-in-list",
  templateUrl: "./check-in-list.component.html",
  styleUrls: ["./check-in-list.component.scss"],
})
export class CheckInListComponent implements OnInit, OnDestroy {

  constructor(
    public checkInService: CheckInService,
  ) {}

  ngOnInit() {
    this.checkInService.refreshData();
  }

  ngOnDestroy(): void {
    this.checkInService.filter("");
  }
}
