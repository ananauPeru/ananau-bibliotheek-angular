import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
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

  constructor(private registartionHttpService: RegistrationHttpService) {}

  loadInitialData() {
    this.registartionHttpService.getAllRegistrations$().subscribe(
      (registrations) => this._registrations.next(registrations),
      (err) => console.log(err)
    );
  }

  filter(filterValue: string) {
    const f = filterValue.toLowerCase();
    this.registrations = this._registrations.pipe(
      map((registrations) =>
        registrations.filter((registration) => {
          const role =
            registration.role === SmallRegistrationModelRole.STUDENT
              ? "student"
              : "volunteer";
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
            role.includes(f)
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
}
