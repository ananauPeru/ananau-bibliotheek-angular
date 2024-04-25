import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/_services/auth.guard";
import { Roles } from "../../_utils/auth_util";
import { TestComponent } from "./test.component";
import { TestListComponent } from "./test-list/test-list.component";
import { CreateTestComponent } from "./create-test/create-test.component";
import { OverviewTestComponent } from "./overview-test/overview-test.component";

const routes: Routes = [
  {
    path: "",
    component: TestComponent,
    canActivate: [AuthGuard],
    data: {
      permittedRoles: [Roles.Admin, Roles.SuperAdmin],
    },
    children: [
      {
        path: "list",
        component: TestListComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        }
      },
      {
        path: "create",
        component: CreateTestComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        }
      },
      {
        path: "overview/:id",
        component: OverviewTestComponent,
        data: {
          permittedRoles: [Roles.Admin, Roles.SuperAdmin, Roles.Teacher],
        }
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
export class TestRoutingModule {}
