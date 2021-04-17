import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserModel } from 'src/app/modules/auth/_models/user.model'
import { ItemModel } from '../../_models/item.model'
import { UserHTTPService } from './user-http/user-http.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private filterString = ''

  private _users: BehaviorSubject<UserModel[]> = new BehaviorSubject([])
  public users: Observable<UserModel[]> = this._users
    // .pipe(
    //   map((items) => items.filter((item) => item.name == this.filterString)),
    // )
    .asObservable()

  // get items() {
  //   return asObservable(this.items)
  // }

  constructor(
    private userHttpService: UserHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.userHttpService.getAllUsersWithDetails$().subscribe(
      (res) => {
        // let items = (<Object[]>res.json()).map((todo: any) =>
        //     new Item({id:todo.id, description:todo.description,completed: todo.completed}));

        this._users.next(res)
        console.log(this._users)
      },
      (err) => console.log('Error retrieving Items'),
    )
  }

  // filter(filter: any, _category: any, pp: number, p: number, _course: any) {
  //   let f = filter.toLowerCase()
  //   console.log(f)
  //   let category = undefined
  //   if (_category) {
  //     category = _category.toLowerCase()
  //   }
  //   console.log(category)
  //   console.log(this.items[0])
  //   let course = undefined
  //   if (_course) {
  //     course = _course.toLowerCase()
  //   }
  //   if (category == undefined) {
  //     this.items = this._items.pipe(
  //       map((items) =>
  //         items.filter((item) => {
  //           let b =
  //             item.name.toLowerCase().includes(f) ||
  //             (item.description
  //               ? item.description.toLowerCase().includes(f)
  //               : false) ||
  //             (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
  //             (item.material
  //               ? item.material.toLowerCase().includes(f)
  //               : false) ||
  //             (item.category ? item.category.toLowerCase().includes(f) : false)

  //           return b
  //         }),
  //       ),
  //     )
  //   } else {
  //     console.log('Filtering for category')
  //     this.items = this._items.pipe(
  //       map((items) =>
  //         items.filter((item) => {
  //           let b =
  //             (item.name.toLowerCase().includes(f) ||
  //               (item.description
  //                 ? item.description.toLowerCase().includes(f)
  //                 : false) ||
  //               (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
  //               (item.material
  //                 ? item.material.toLowerCase().includes(f)
  //                 : false)) &&
  //             item.category.toLowerCase().includes(category)
  //           console.log(b)

  //           return b
  //         }),
  //       ),
  //     )
  //   }

  //   if (course) {
  //     console.log('Filtering for genre')
  //     this.items = this._items.pipe(
  //       map((items) =>
  //         items.filter((item) => {
  //           let b = item.course.toLowerCase().includes(course)
  //           return b
  //         }),
  //       ),
  //     )
  //   }

  //   this.items = this.items.pipe(
  //     map((items) =>
  //       items.filter((item, index) => {
  //         // console.log(index)
  //         let i = index < pp * p && index >= pp * (p - 1)
  //         return i
  //       }),
  //     ),
  //   )
  // }

  filter(filter: any) {
    let f = filter.toLowerCase()
    let category = undefined

    this.users = this._users.pipe(
      map((users) =>
        users.filter((user) => {
          let r = false
          user.roles.forEach((role) =>
            role.toLowerCase().includes(f) ? (r = true) : '',
          )
          console.log(r)
          return (
            user.user.userName.toLowerCase().includes(f) ||
            user.user.userDetail.firstName.toLowerCase().includes(f) ||
            user.user.userDetail.lastName.toLowerCase().includes(f) ||
            r
          )
        }),
      ),
    )
  }

  changeRoles(userId: number, roles: string[]): Observable<string[]> {
    return this.userHttpService.changeRoles(userId, roles)
  }
}
