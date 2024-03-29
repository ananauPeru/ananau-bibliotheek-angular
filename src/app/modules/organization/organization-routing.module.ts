import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { CalendarComponent } from "./calendar/calendar.component";
import { OrganizationComponent } from "./organization.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { RegistrationsOverviewComponent } from "./registrations-overview/registrations-overview.component";
import { RolesComponent } from "./roles/roles.component";
import { RegistrationRole } from "./_models/registration-role";

const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: ["Admin", "SuperAdmin"],
    },
    children: [
      {
        path: "roles",
        component: RolesComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: "registrations",
        children: [
          {
            path: "",
            component: RegistrationsOverviewComponent,
          },
          {
            path: "students/:id",
            component: RegistrationDetailsComponent,
            data: {
              role: RegistrationRole.STUDENT,
            },
          },
          {
            path: "volunteers/:id",
            component: RegistrationDetailsComponent,
            data: {
              role: RegistrationRole.VOLUNTEER,
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
