import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ItemHTTPService } from 'src/app/modules/library/_services/item/item-http/item-http.service'
import { ItemModel } from '../../_models/item.model'

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

  filter(
    filter: any,
    _category: any,
    // pp: number,
    // p: number,
    _course: any,
  ) {
    let f = filter.toLowerCase()
    let category = undefined
    if (_category) {
      category = _category.toLowerCase()
    }
    let course = undefined
    if (_course) {
      course = _course.toLowerCase()
    }
    if (category == undefined) {
      console.log('FILTERING WITHOUT CATEGORY SET!!!')
      this.items = this._items.pipe(
        map((items) =>
          items.filter((item) => {
            return (
              item.name.toLowerCase().includes(f) 
              // (item.description
              //   ? item.description.toLowerCase().includes(f)
              //   : false) ||
              // (item.purpose ? item.purpose.toLowerCase().includes(f) : false) ||
              // (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
              // (item.course ? item.course.toLowerCase().includes(f) : false)
            )
            // return b
          }),
        ),
      )
    }
    // else {
    //   console.log('Filtering for category')
    //   this.books = this._books.pipe(
    //     map((books) =>
    //       books.filter((book) => {
    //         let b =
    //           (book.name.toLowerCase().includes(f) ||
    //             (book.description
    //               ? book.description.toLowerCase().includes(f)
    //               : false) ||
    //             (book.author ? book.author.toLowerCase().includes(f) : false) ||
    //             (book.state ? book.state.toLowerCase().includes(f) : false)) &&
    //           book.genre.toLowerCase().includes(category)
    //         console.log(b)

    //         return b
    //       }),
    //     ),
    //   )
    // }

    if (course) {
      this.items = this.items.pipe(
        map((items) =>
          items.filter((item) => {
            let b = item.course.toLowerCase().includes(course)
            return b
          }),
        ),
      )
    }

    // this.books = this.books.pipe(
    //   map((books) =>
    //     books.filter((book, index) => {
    //       console.log(index)
    //       let i = index < pp * p && index >= pp * (p - 1)
    //       return i
    //     }),
    //   ),
    // )
  }

  paginate(pp: any, p: any) {
    console.log(this.items[0])
  }
}
