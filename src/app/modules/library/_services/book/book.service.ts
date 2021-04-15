import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { BookModel } from '../../_models/book.model'
import { BookHTTPService } from './book-http/book-http.service'

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private filterString = ''

  private _books: BehaviorSubject<BookModel[]> = new BehaviorSubject([])
  public books: Observable<BookModel[]> = this._books
    // .pipe(
    //   map((books) => books.filter((book) => book.name == this.filterString)),
    // )
    .asObservable()

  // get books() {
  //   return asObservable(this.books)
  // }

  constructor(
    private bookHttpService: BookHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.bookHttpService.getAllBooks$().subscribe(
      (res) => {
        // let books = (<Object[]>res.json()).map((todo: any) =>
        //     new book({id:todo.id, description:todo.description,completed: todo.completed}));

        this._books.next(res)
        console.log(this._books)
      },
      (err) => console.log('Error retrieving books'),
    )
  }

  filter(
    filter: any,
    _category: any,
    // pp: number,
    // p: number,
    _genre: any,
  ) {
    let f = filter.toLowerCase()
    console.log(f)
    let category = undefined
    if (_category) {
      category = _category.toLowerCase()
    }
    console.log(category)
    console.log(this.books[0])
    let genre = undefined
    if (_genre) {
      genre = _genre.toLowerCase()
    }
    if (category == undefined) {
      console.log("FILTERING WITHOUT CATEGORY SET!!!")
      this.books = this._books.pipe(
        map((books) =>
          books.filter((book) => {
            console.log(book.name.toLowerCase())
            let b =
              book.name.toLowerCase().includes(f) ||
              (book.description
                ? book.description.toLowerCase().includes(f)
                : false) ||
              (book.author ? book.author.toLowerCase().includes(f) : false) ||
              (book.state ? book.state.toLowerCase().includes(f) : false) ||
              (book.category ? book.category.toLowerCase().includes(f) : false)

            return b
          }),
        ),
      )
    } else {
      console.log('Filtering for category')
      this.books = this._books.pipe(
        map((books) =>
          books.filter((book) => {
            let b =
              (book.name.toLowerCase().includes(f) ||
                (book.description
                  ? book.description.toLowerCase().includes(f)
                  : false) ||
                (book.author ? book.author.toLowerCase().includes(f) : false) ||
                (book.state ? book.state.toLowerCase().includes(f) : false)) &&
              book.category.toLowerCase().includes(category)
            console.log(b)

            return b
          }),
        ),
      )
    }

    // if (genre) {
    //   console.log('Filtering for genre')
    //   this.books = this._books.pipe(
    //     map((books) =>
    //       books.filter((book) => {
    //         let b = book.genre.toLowerCase().includes(genre)
    //         return b
    //       }),
    //     ),
    //   )
    // }

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
}
