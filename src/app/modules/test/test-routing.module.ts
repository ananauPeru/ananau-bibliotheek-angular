import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { Roles } from "../../_utils/auth_util";
import { TestComponent } from "./test.component";
import { TestListComponent } from "./test-list/test-list.component";
import { CreateTestComponent } from "./create-test/create-test.component";
import { OverviewTestComponent } from "./overview-test/overview-test.component";
import { FillInTestComponent } from "./fill-in-test/fill-in-test.component";
import { OverviewSubmissionTestComponent } from "./overview-submission-test/overview-submission-test.component";
import { SubmissionTestDetailsComponent } from "./submission-test-details/submission-test-details.component";

const routes: Routes = [
  {
    path: "",
    component: TestComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
    },
    children: [
      {
        path: "list",
        component: TestListComponent,
        data: {
          canActivate: [AuthGuard],
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "submitted",
        component: OverviewSubmissionTestComponent,
        data: {
          canActivate: [AuthGuard],
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        },
      },
      {
        path: "submitted_test/:id",
        component: SubmissionTestDetailsComponent,
        data: {
          canActivate: [AuthGuard],
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        },
      },
      {
        path: "create",
        component: CreateTestComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "edit/:id",
        component: CreateTestComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
        },
      },
      {
        path: "examination/:id",
        component: FillInTestComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher, Roles.SpanishLearner],
        }
      },
      {
        path: "overview/:id",
        component: OverviewTestComponent,
        canActivate: [AuthGuard],
        data: {
          permittedRoles: [Roles.SuperAdmin, Roles.SpanishTeacher],
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
export class TestRoutingModule {}
