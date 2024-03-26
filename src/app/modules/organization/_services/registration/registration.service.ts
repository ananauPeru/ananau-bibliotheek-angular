import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RegistrationStudentModel } from "../../_models/registration-student.model";
import { RegistrationModel } from "../../_models/registration.model";
import {
  SmallRegistrationModel,
  SmallRegistrationModelRole,
} from "../../_models/small-registration.model";
import { RegistrationHttpService } from "./registration-http/registration-http.service";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private _registrations: BehaviorSubject<
    SmallRegistrationModel[]
  > = new BehaviorSubject([]);
  public registrations: Observable<
    SmallRegistrationModel[]
  > = this._registrations.asObservable();

  constructor(
    private registartionHttpService: RegistrationHttpService,
    private translate: TranslateService
  ) {}

  loadInitialData() {
    this.registartionHttpService.getAllRegistrations$().subscribe(
      (registrations) => this._registrations.next(registrations),
      (err) => console.error(err)
    );
  }

  filter(filterValue: string) {
    const f = filterValue.toLowerCase();
    this.registrations = this._registrations.pipe(
      map((registrations) =>
        registrations.filter((registration) => {
          const role =
            registration.role === SmallRegistrationModelRole.STUDENT
              ? this.translate.instant("REGISTRATIONS.STUDENT")
              : this.translate.instant("REGISTRATIONS.VOLUNTEER");
          return (
            registration.firstName.toLowerCase().includes(f) ||
            registration.lastName.toLowerCase().includes(f) ||
            registration.email.toLowerCase().includes(f) ||
            formatDate(registration.startDate, "dd-MM-yyyy", "en-US").includes(
              f
            ) ||
            formatDate(registration.endDate, "dd-MM-yyyy", "en-US").includes(
              f
            ) ||
            role.toLowerCase().includes(f)
          );
        })
      )
    );
  }

  getStudentRegistrationById$(
    userId: number
  ): Observable<RegistrationStudentModel> {
    return this.registartionHttpService.getStudentRegistrationById$(userId);
  }

  getVolunteerRegistrationById$(userId: number): Observable<RegistrationModel> {
    return this.registartionHttpService.getVolunteerRegistrationById$(userId);
  }

  confirmRegistration$(userId: number, confirm: boolean) {
    return this.registartionHttpService.confirmRegistration$(userId, confirm);
  }

  deleteRegistration$(userId: number) {
    return this.registartionHttpService.deleteRegistration$(userId);
  }

  updateRegistrationDates$(userId: number, dates: any) {
    return this.registartionHttpService.updateRegistrationDates$(userId, dates);
  }

  updateSpanishDates$(userId: number, dates: any) {
    return this.registartionHttpService.updateSpanishDates$(userId, dates);
  }
}
