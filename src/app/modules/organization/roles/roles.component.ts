import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { AuthService } from "../../auth";
import { RoleHTTPService } from "../_services/role/role-http/role-http.service";
import { RoleService } from "../_services/role/role.service";
import { UserService } from "../_services/user/user.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  private filter = "";
  public working = false;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    public roleService: RoleService,
    public toastrUtil: ToastrUtil
  ) {}

  ngOnInit(): void {}

  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase();
    this.userService.filter(this.filter);
  }

  changeRoles(e, user, role) {
    if (e.target.checked) {
      if (user.roles.includes("role")) {
        this.toastrUtil.showInfo(
          "User already has specified role.",
          "No Changes"
        );
      } else if (!user.roles.includes("role")) {
        user.roles.push(role);
        this.changeRoleService(user.user.userName, user.user.id, user.roles);
      }
    } else {
      if (!user.roles.includes(role)) {
        this.toastrUtil.showInfo(
          "User didn't have specified role.",
          "No Changes"
        );
      } else {
        const index = user.roles.indexOf(role);
        if (index > -1) {
          user.roles.splice(index, 1);
        }
        this.changeRoleService(user.user.userName, user.user.id, user.roles);
      }
    }
  }

  changeRoleService(email: string, id: number, roles: string[]) {
    this.working = true;
    this.toastrUtil.showInfo(
      "Making Changes...",
      "Please wait for the changes to complete."
    );
    this.userService
      .changeRoles(id, roles)
      .pipe(
        tap(
          // Log the result or error
          (data) => {
            this.toastrUtil.showSuccess(email, "Roles of user are updated");
          },
          (error) => {
            console.error(error);
            this.toastrUtil.showError(
              email,
              "Error, could not change roles... Try again later "
            );
          }
        )
      )
      .subscribe((res) => {
        if (id == this.authService.getAuthFromLocalStorage().user.id) {
          this.authService.setRolesToLocalStorage(res);
        }
        this.userService.loadInitialData();
        res as string[];
        this.working = false;
      });
  }
}
