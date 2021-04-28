import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  RegistrationModel,
  RegistrationModelRole,
} from "../../_models/registration.model";
import { RegistrationHttpService } from "./registration-http/registration-http.service";

@Injectable({
  providedIn: "root",
})
export class RegistrationService {
  private _registrations: BehaviorSubject<
    RegistrationModel[]
  > = new BehaviorSubject([]);
  public registrations: Observable<
    RegistrationModel[]
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
            registration.role === RegistrationModelRole.STUDENT
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
}
