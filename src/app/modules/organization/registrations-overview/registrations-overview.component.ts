import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../_services/registration/registration.service";
import { SmallRegistrationModel } from "../_models/small-registration.model";

@Component({
  selector: "app-registrations-overview",
  templateUrl: "./registrations-overview.component.html",
  styleUrls: ["./registrations-overview.component.scss"],
})
export class RegistrationsOverviewComponent implements OnInit {
  constructor(public registrationService: RegistrationService) {
    this.registrationService.loadInitialData();
  }

  ngOnInit(): void {}

  getDetailUrl(registration: SmallRegistrationModel): string {
    const urlRole = registration.role === "Student" ? "students" : "volunteers"
    return `/organization/registrations/${urlRole}/${ registration.id }`
  }
}
