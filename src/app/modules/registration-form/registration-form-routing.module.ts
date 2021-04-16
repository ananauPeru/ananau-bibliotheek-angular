import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { ContainerComponent } from "./container/container.component";
import { FormRole } from "./models/form-role";
import { RegistrationFormComponent } from "./registration-form.component";

const routes: Routes = [
  {
    path: "",
    component: RegistrationFormComponent,
    children: [
      {
        path: "student",
        component: ContainerComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: ["Student", "SuperAdmin"],
          fallbackRole: FormRole.STUDENT, // Since SuperAdmins can access both student and volunteer forms, the exact rol still needs to be given.
        },
      },
      {
        path: "volunteer",
        component: ContainerComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: ["Volunteer", "SuperAdmin"],
          fallbackRole: FormRole.VOLUNTEER, // Since SuperAdmins can access both student and volunteer forms, the exact rol still needs to be given.
        },
      },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationFormRoutingModule {}
