import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { Roles } from "../../_utils/auth_util";
import { ExerciseListComponent } from "./exercise-list/exercise-list.component";
import { ExerciseComponent } from "./exercise.component";
import { CreateExerciseComponent } from "./create-exercise/create-exercise.component";
import { OverviewExerciseComponent } from "./overview-exercise/overview-exercise.component";
import { SubmissionListComponent } from "./submission-list/submission-list.component";
import { OverviewSubmissionComponent } from "./overview-submission/overview-submission.component";
import { SharedExercisesListComponent } from "./shared-exercises-list/shared-exercises-list.component";

const routes: Routes = [
  {
    path: "",
    component: ExerciseComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
    },
    children: [
      {
        path: "list",
        component: ExerciseListComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "shared",
        component: SharedExercisesListComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        },
      },
      {
        path: "create",
        component: CreateExerciseComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "edit/:id",
        component: CreateExerciseComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "overview/:id",
        component: OverviewExerciseComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        },
      },
      {
        path: "submission/list",
        component: SubmissionListComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        },
      },
      {
        path: "submission/overview/:id",
        component: OverviewSubmissionComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
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
