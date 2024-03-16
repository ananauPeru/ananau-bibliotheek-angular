import { Component, OnInit } from "@angular/core";
import { GeneralInformationService } from "../../organization/_services/general-information/general-information.service";
import { VaccinationModel } from "../../organization/_models/vaccination.model";
import { Observable } from "rxjs";
import { HolidayModel } from "../../organization/_models/holiday.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-general-information",
  templateUrl: "./general-information.component.html",
  styleUrls: ["./general-information.component.scss"],
})
export class GeneralInformationComponent implements OnInit {
  visaInformation$: Observable<string>;
  vaccinations$: Observable<VaccinationModel[]>;
  holidays$: Observable<HolidayModel[]>;

  constructor(
    private generalInformationService: GeneralInformationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.fetchVisaInformation();
    this.fetchVaccinations();
    this.fetchHolidays();
  }

  private fetchVisaInformation() {
    this.visaInformation$ = this.generalInformationService.getVisaInformation();
  }

  private fetchVaccinations() {
    this.vaccinations$ = this.generalInformationService.getVaccinations();
  }

  private fetchHolidays() {
    this.holidays$ = this.generalInformationService.getHolidays();
  }

  /**
   * Translates the identifier.
   * @param identifier The identifier for the translated text.
   * @returns The translated text.
   */
  getTranslatedText(identifier: string): string {
    return this.translate.instant(identifier);
  }
}
