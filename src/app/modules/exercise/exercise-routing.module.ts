import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { Roles } from "../../_utils/auth_util";
import { ExerciseListComponent } from "./exercise-list/exercise-list.component";
import { ExerciseComponent } from "./exercise.component";
import { CreateExerciseComponent } from "./create-exercise/create-exercise.component";
import { OverviewExerciseComponent } from "./overview-exercise/overview-exercise.component";

const routes: Routes = [
  {
    path: "",
    component: ExerciseComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    },
    children: [
      {
        path: "list",
        component: ExerciseListComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        },
      },
      {
        path: "create",
        component: CreateExerciseComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        },
      },
      {
        path: "edit/:id",
        component: CreateExerciseComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        },
      },
      {
        path: "overview/:id",
        component: OverviewExerciseComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        },
      },
      {
        path: "",
        redirectTo: "",
        pathMatch: "full",
      },
      {
        path: "**",
        redirectTo: "",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExerciseRoutingModule {}
