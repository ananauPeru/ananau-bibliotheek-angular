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
        path: "",
        component: ContainerComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: ["Student", "Volunteer", "SuperAdmin"],
          fallbackRole: FormRole.VOLUNTEER,
        },
        pathMatch: "full",
      },
      {
        path: "student",
        component: ContainerComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: ["SuperAdmin"], // only SuperAdmins are allowed to explicitly access the student form
          fallbackRole: FormRole.STUDENT,
        },
      },
      {
        path: "volunteer",
        component: ContainerComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: ["SuperAdmin"], // only SuperAdmins are allowed to explicitly access the volunteer form
          fallbackRole: FormRole.VOLUNTEER,
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
