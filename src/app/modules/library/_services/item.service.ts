import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ItemModel } from '../_models/item.model'
import { ItemHTTPService } from './item-http'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private filterString = ''

  private _items: BehaviorSubject<ItemModel[]> = new BehaviorSubject([])
  public items: Observable<ItemModel[]> = this._items
    // .pipe(
    //   map((items) => items.filter((item) => item.name == this.filterString)),
    // )
    .asObservable()

  // get items() {
  //   return asObservable(this.items)
  // }

  constructor(
    private itemHttpService: ItemHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.itemHttpService.getAllItems$().subscribe(
      (res) => {
        // let items = (<Object[]>res.json()).map((todo: any) =>
        //     new Item({id:todo.id, description:todo.description,completed: todo.completed}));

        this._items.next(res)
        console.log(this._items)
      },
      (err) => console.log('Error retrieving Items'),
    )
  }

  filter(filter: any, category: any, pp: number, p: number) {
    let f = filter.toLowerCase()
    console.log(f)
    console.log(category)
    console.log(this.items[0])
    if (category == undefined) {
      this.items = this._items.pipe(
        map((items) =>
          items.filter((item) => {
            let b =
              item.name.toLowerCase().includes(f) ||
              (item.description
                ? item.description.toLowerCase().includes(f)
                : false) ||
              (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
              (item.material
                ? item.material.toLowerCase().includes(f)
                : false) ||
              (item.category ? item.category.toLowerCase().includes(f) : false)
       
          
            return b
          }),
        ),
      )
    } else {
      console.log('Filtering for category')
      this.items = this._items.pipe(
        map((items) =>
          items.filter((item) => {
            let b =
              (item.name.toLowerCase().includes(f) ||
                (item.description
                  ? item.description.toLowerCase().includes(f)
                  : false) ||
                (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
                (item.material
                  ? item.material.toLowerCase().includes(f)
                  : false)) &&
              item.category.toLowerCase().includes(category)
            console.log(b)

            return b
          }),
        ),
      )
    }

    this.items = this.items.pipe(
      map((items) =>
        items.filter((item, index) => {
          console.log(index)
          let i = index < pp * p && index >= pp * (p - 1)
          return i
        }),
      ),
    )

  }

  paginate(pp: any, p: any) {
    console.log(this.items[0])
  }
}
