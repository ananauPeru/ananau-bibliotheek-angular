import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs/operators";
import { ToastrUtil } from "src/app/_utils/toastr_util";
import { AuthService } from "../../auth";
import { RoleHTTPService } from "../_services/role/role-http/role-http.service";
import { RoleService } from "../_services/role/role.service";
import { UserService } from "../_services/user/user.service";
import { TranslateService } from "@ngx-translate/core";
import { CsvUtil } from 'src/app/_utils/csv_util'

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  private filter = "";
  public working = false;
  private userToRemove;
  loggedInUsername$: String;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private csvUtil: CsvUtil,
    public roleService: RoleService,
    public toastrUtil: ToastrUtil,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loggedInUsername$ = this.authService.getAuthFromLocalStorage().user.userName;
  }

  async exportUsers() {
    let users: any = await this.userService.getAllUsersForExport();

    const normalizedUsers= users.map(user => ({
      firstname: user.user.userDetail.firstName || "not found",
      lastname: user.user.userDetail.lastName || "not found",
      dateofbirth: user.user.userDetail.dateOfBirth || "not found",
      country: user.user.userDetail.country || "not found",
      nationality: user.user.userDetail.nationality || "not found",
      phone: user.user.userDetail.phone || "not found",
      email: user.user.userName|| "not found",
      roles: user.roles.join() || "not found"
    }))


    this.csvUtil.csvDownload(normalizedUsers, "All Users");
  }

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

  setRemoveUser(user) {
    this.userToRemove = user;
  }

  removeUser() {
    this.working = true;

    this.userService
      .removeUser(this.userToRemove.user.id)
      .subscribe(() => {
        this.toastrUtil.showSuccess(
          this.translate.instant("ORGANIZATION.ROLES.TOASTS.DELETE_SUCCESS"),
          this.translate.instant("ORGANIZATION.ROLES.TOASTS.SUCCESS")
        );
      }, (err) => {
        console.error(err);
        this.toastrUtil.showError(
          this.translate.instant("ORGANIZATION.ROLES.TOASTS.DELETE_ERROR"),
          this.translate.instant("ORGANIZATION.ROLES.TOASTS.ERROR")
        );
      },
      () => {
        this.working = false;
        this.userService.loadInitialData();
      });
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
