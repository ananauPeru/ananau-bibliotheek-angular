import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { RegistrationRole } from "../_models/registration-role";
import { RegistrationModel } from "../_models/registration.model";
import { RegistrationService } from "../_services/registration/registration.service";

@Component({
  selector: "app-registration-details",
  templateUrl: "./registration-details.component.html",
  styleUrls: ["./registration-details.component.scss"],
})
export class RegistrationDetailsComponent implements OnInit {
  public id: number;
  public role: RegistrationRole;
  public registration$: Observable<RegistrationModel>;
  public errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService
  ) {
    this.route.data.subscribe(
      (data) =>
        (this.role = data["role"] ? data["role"] : RegistrationRole.VOLUNTEER)
    );
    this.route.params.subscribe((params) => (this.id = params["id"]));

    if (this.role === RegistrationRole.STUDENT) {
      this.registration$ = this.registrationService
        .getStudentRegistrationById$(this.id)
        .pipe(
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        );
    } else {
      this.registration$ = this.registrationService
        .getVolunteerRegistrationById$(this.id)
        .pipe(
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        );
    }
  }

  ngOnInit(): void {}
}
