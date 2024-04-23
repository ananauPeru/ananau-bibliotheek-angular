import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { Roles } from "../../_utils/auth_util";
import { TestComponent } from "./test.component";
import { TestListComponent } from "./test-list/test-list.component";

const routes: Routes = [
  {
    path: "",
    component: TestComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.QRCodeReader],
    },
    children: [
        {
            path: "list",
            component: TestListComponent,
        },
    //   {
    //     path: "roles",
    //     component: RolesComponent,
    //     data: {
    //       permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //     },
    //   },
    //   {
    //     path: "calendar",
    //     component: CalendarComponent,
    //     data: {
    //       permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //     },
    //   },
    //   {
    //     path: "registrations",
    //     children: [
    //       {
    //         path: "",
    //         component: RegistrationsOverviewComponent,
    //         data: {
    //           permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //         },
    //       },
    //       {
    //         path: "students/:id",
    //         component: RegistrationDetailsComponent,
    //         data: {
    //           role: RegistrationRole.STUDENT,
    //           permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //         },
    //       },
    //       {
    //         path: "volunteers/:id",
    //         component: RegistrationDetailsComponent,
    //         data: {
    //           role: RegistrationRole.VOLUNTEER,
    //           permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     path: "general-information",
    //     component: EditGeneralInformationComponent,
    //     data: {
    //       permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //     },
    //   },
    //   {
    //     path: "check-in",
    //     children: [
    //       {
    //         path: "scan",
    //         component: CheckInComponent,
    //         canActivate: [AuthGuard],
    //         data: {
    //           permittedRoles: [Roles.QRCodeReader],
    //         },
    //       },
    //       {
    //         path: "list",
    //         component: CheckInListComponent,
    //         canActivate: [AuthGuard],
    //         data: {
    //           permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //         },
    //       },
    //       {
    //         path: ":id",
    //         component: CheckInDetailsComponent,
    //         canActivate: [AuthGuard],
    //         data: {
    //           permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    //         },
    //       },
    //       {
    //         path: "",
    //         redirectTo: "list",
    //         pathMatch: "full",
    //       },
    //       {
    //         path: "**",
    //         redirectTo: "list",
    //         pathMatch: "full",
    //       },
    //     ],
    //   },
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
