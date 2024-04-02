import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { CalendarComponent } from "./calendar/calendar.component";
import { OrganizationComponent } from "./organization.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { RegistrationsOverviewComponent } from "./registrations-overview/registrations-overview.component";
import { RolesComponent } from "./roles/roles.component";
import { RegistrationRole } from "./_models/registration-role";
import { EditGeneralInformationComponent } from "./edit-general-information/edit-general-information.component";
import { CheckInComponent } from "./check-in/check-in.component";
import { CheckInListComponent } from "./check-in-list/check-in-list.component";
import { CheckInDetailsComponent } from "./check-in-details/check-in-details.component";
import { Roles } from "../../_utils/auth_util";

const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.QRCodeReader],
    },
    children: [
      {
        path: "roles",
        component: RolesComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin],
        },
      },
      {
        path: "calendar",
        component: CalendarComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin],
        },
      },
      {
        path: "registrations",
        children: [
          {
            path: "",
            component: RegistrationsOverviewComponent,
            data: {
              permittedRoles: [Roles.Admin, Roles.SuperAdmin],
            },
          },
          {
            path: "students/:id",
            component: RegistrationDetailsComponent,
            data: {
              role: RegistrationRole.STUDENT,
              permittedRoles: [Roles.Admin, Roles.SuperAdmin],
            },
          },
          {
            path: "volunteers/:id",
            component: RegistrationDetailsComponent,
            data: {
              role: RegistrationRole.VOLUNTEER,
              permittedRoles: [Roles.Admin, Roles.SuperAdmin],
            },
          },
        ],
      },
      {
        path: "general-information",
        component: EditGeneralInformationComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin],
        },
      },
      {
        path: "check-in",
        children: [
          {
            path: "",
            component: CheckInComponent,
            data: {
              permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.QRCodeReader],
            },
          },
          {
            path: "list",
            component: CheckInListComponent,
            data: {
              permittedRoles: [Roles.Admin, Roles.SuperAdmin],
            },
          },
          {
            path: ":id",
            component: CheckInDetailsComponent,
            data: {
              permittedRoles: [Roles.Admin, Roles.SuperAdmin],
            },
          },
        ],
      },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
