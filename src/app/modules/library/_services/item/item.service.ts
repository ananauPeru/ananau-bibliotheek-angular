import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ItemModel } from "../../_models/item.model";
import { ItemHTTPService } from "./item-http/item-http.service";

@Injectable({
  providedIn: "root",
})
export class ItemService {
  private filterString = "";

  private _items: BehaviorSubject<ItemModel[]> = new BehaviorSubject([]);
  public items: Observable<ItemModel[]> = this._items
    // .pipe(
    //   map((items) => items.filter((item) => item.name == this.filterString)),
    // )
    .asObservable();

  // get items() {
  //   return asObservable(this.items)
  // }

  constructor(
    private itemHttpService: ItemHTTPService,
    private router: Router
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.itemHttpService.getAllItems$().subscribe(
      (res) => {
        // let items = (<Object[]>res.json()).map((todo: any) =>
        //     new Item({id:todo.id, description:todo.description,completed: todo.completed}));

        this._items.next(res);
      },
      (err) => console.error("Error retrieving Items")
    );
  }

  filter(
    filter: any,
    _category: any,
    // pp: number,
    // p: number,
    _course: any
  ) {
    let f = filter.toLowerCase();
    let category = undefined;
    if (_category) {
      category = _category.toLowerCase();
    }
    let course = undefined;
    if (_course) {
      course = _course.toLowerCase();
    }
    if (category == undefined) {
      this.items = this._items.pipe(
        map((items) =>
          items.filter((item) => {
            return item.name.toLowerCase().includes(f);
          })
        )
      );
    }

    if (course) {
      this.items = this.items.pipe(
        map((items) =>
          items.filter((item) => {
            let b = item.course.toLowerCase().includes(course);
            return b;
          })
        )
      );
    }
  }

  paginate(pp: any, p: any) {}
}
