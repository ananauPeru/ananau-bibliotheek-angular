import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserModel } from "src/app/modules/auth/_models/user.model";
import { UserHTTPService } from "./user-http/user-http.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private filterString = "";

  private _users: BehaviorSubject<UserModel[]> = new BehaviorSubject([]);
  public users: Observable<UserModel[]> = this._users
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
    this.userHttpService.getAllUsersWithDetails$().subscribe(
      (res) => {
        this._users.next(res);
      },
      (err) => console.error("Error retrieving Items")
    );
  }

  filter(filter: any) {
    let f = filter.toLowerCase();
    let category = undefined;

    this.users = this._users.pipe(
      map((users) =>
        users.filter((user) => {
          let r = false;
          user.roles.forEach((role) =>
            role.toLowerCase().includes(f) ? (r = true) : ""
          );
          return (
            user.user.userName.toLowerCase().includes(f) ||
            user.user.userDetail.firstName.toLowerCase().includes(f) ||
            user.user.userDetail.lastName.toLowerCase().includes(f) ||
            r
          );
        })
      )
    );
  }

  changeRoles(userId: number, roles: string[]): Observable<string[]> {
    return this.userHttpService.changeRoles(userId, roles);
  }
}
