import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { RegistrationModel } from "../../_models/registration.model";
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
}
