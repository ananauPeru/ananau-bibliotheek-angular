import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { AuthService } from "../../auth";
import { RoleHTTPService } from "../_services/role/role-http/role-http.service";
import { RoleService } from "../_services/role/role.service";
import { UserService } from "../_services/user/user.service";
import { UserRoleModel } from "../_models/user-role.model";
import { RoleModel } from "../_models/role.model";
import { Roles } from "src/app/_utils/auth_util";

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

  changeRoles(e: any, user: UserRoleModel, role: RoleModel) {
    if (e.target.checked) {
      //Checked
      if (this.hasRole(user, role)) {
        this.toastrUtil.showInfo(
          "User already has specified role.",
          "No Changes"
        );
      } else if (!this.hasRole(user, role)) {
        user.roles.push(role);
        this.changeRoleService(user.email, user.id, user.roles);
      }
    } else {
      //Unchecked
      if (!this.hasRole(user, role)) {
        this.toastrUtil.showInfo(
          "User didn't have specified role.",
          "No Changes"
        );
      } else {
        user.roles = user.roles.filter((userRole) => userRole.id !== role.id);
        this.changeRoleService(user.email, user.id, user.roles);
      }
    }
  }

  private changeRoleService(email: string, userId: number, roles: RoleModel[]) {
    this.working = true;
    this.toastrUtil.showInfo(
      "Making Changes...",
      "Please wait for the changes to complete."
    );
    this.userService
      .changeRoles(userId, roles)
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
      .subscribe((response) => {
        if (userId == this.authService.getAuthFromLocalStorage().user.id) {
          this.authService.setRolesToLocalStorage(response.roles);
        }

        this.userService.loadInitialData();
        this.working = false;
      });
  }

  hasRole(user: UserRoleModel, role: RoleModel): boolean {
    return user.roles.some((userRole) => userRole.id === role.id);
  }

  /**
   * Checks if the role should be disabled based on the user's roles
   * @param user The user for who we are checking if the role should be disabled
   * @param role The role that we are checking if it should be disabled
   * @returns true or false if the role should be disabled
   */
  shouldDisable(user: UserRoleModel, role: RoleModel): boolean {
    const isStudent =
      role.name.toLowerCase() === Roles.Student.toString().toLowerCase();
    const isVolunteer =
      role.name.toLowerCase() === Roles.Volunteer.toString().toLowerCase();
    const hasVolunteerRole = this.hasRoleByString(
      user,
      Roles.Volunteer.toString().toLowerCase()
    );
    const hasStudentRole = this.hasRoleByString(
      user,
      Roles.Student.toString().toLowerCase()
    );

    const shouldDisable =
      (isStudent && hasVolunteerRole) || (isVolunteer && hasStudentRole);

    return shouldDisable;
  }

  private hasRoleByString(user: UserRoleModel, role: string): boolean {
    return user.roles.some(
      (userRole) =>
        userRole.name.toLocaleLowerCase() === role.toLocaleLowerCase()
    );
  }
}
