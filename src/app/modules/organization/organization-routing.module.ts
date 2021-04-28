import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { OrganizationComponent } from "./organization.component";
import { RegistrationsOverviewComponent } from "./registrations-overview/registrations-overview.component";
import { RolesComponent } from "./roles/roles.component";

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
        path: "registrations",
        component: RegistrationsOverviewComponent,
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
