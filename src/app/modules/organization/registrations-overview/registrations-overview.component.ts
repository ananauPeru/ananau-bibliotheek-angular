import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../_services/registration/registration.service";
import { CsvUtil } from 'src/app/_utils/csv_util';
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-registrations-overview",
  templateUrl: "./registrations-overview.component.html",
  styleUrls: ["./registrations-overview.component.scss"],
})
export class RegistrationsOverviewComponent implements OnInit {
 constructor(public registrationService: RegistrationService, private csvUtil: CsvUtil) {
    this.registrationService.loadInitialData()
  }

  ngOnInit(): void {}

  async exportUsers() {
    const now = new Date();
    const fourWeeksFromNow = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000);

    let registrations = this.registrationService.registrations;
    let regInFourWeeks = [];

    registrations.forEach(reg =>
      reg.forEach(regg => (new Date(regg.startDate) >= now && new Date(regg.startDate) <= fourWeeksFromNow ) ? regInFourWeeks.push(regg) : null
    ))

    this.csvUtil.csvDownload(regInFourWeeks, `Arriving in the next 4 weeks`);
  }
}
