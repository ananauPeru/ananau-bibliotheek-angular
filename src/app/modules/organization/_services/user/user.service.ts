import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/modules/auth/_models/user.model";
import { UserHTTPService } from "./user-http/user-http.service";
import { UserRoleModel } from "../../_models/user-role.model";
import { RoleModel } from "../../_models/role.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private filterString = "";

  private _users: BehaviorSubject<UserRoleModel[]> = new BehaviorSubject([]);
  public users: Observable<UserRoleModel[]> = this._users
    // .pipe(
    //   map((items) => items.filter((item) => item.name == this.filterString)),
    // )
    .asObservable();

  // get items() {
  //   return asObservable(this.items)
  // }

  constructor(
    private userHttpService: UserHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.userHttpService.getAllUsers$().subscribe(
      (res) => {
        this._users.next(res);
      },
      (err) => console.error("Error retrieving Items")
    );
  }

  filter(filter: string) {
    let filterText = filter.toLowerCase();

    this.users = this._users.pipe(
      map((users : UserRoleModel[]) =>
        users.filter((user: UserRoleModel) => {
          const matchesRole = user.roles.some((role: RoleModel) => role.name.toLowerCase().includes(filterText));
          return (
            user.email?.toLowerCase().includes(filterText) ||
            user.firstName?.toLowerCase().includes(filterText) ||
            user.lastName?.toLowerCase().includes(filterText) ||
            matchesRole
          );
        })
      )
    );
  }

  changeRoles(userId: number, roles: RoleModel[]): Observable<UserRoleModel> {
    return this.userHttpService.changeRoles(userId, roles.map((r) => r.id));
  }
}
