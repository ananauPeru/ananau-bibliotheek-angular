import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ItemService } from '../../_services/item/item.service'
import { AuthUtil } from '../../../../_utils/auth_util'
import { BookCategories } from '../../_models/book-categories.enum'
import { Categories } from '../../_models/categories.enum'
import { timer } from 'rxjs'
import { EducationalCategories } from '../../_models/educational-categories.enum'
import { BookService } from '../../_services/book/book.service'

export interface UserData {
  id: string
  name: string
  description: string
  color: string
}

const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray',
]

const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
]

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.'

  const description = 'Testing'

  return {
    id: id.toString(),
    name,
    description,
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
  }
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview-book.component.html',
  styleUrls: ['./overview-book.component.scss'],
})
export class OverviewBookComponent implements OnInit {
  private itemsPerPage: number = 5
  private page: number = 1
  public Categories = Categories
  public BookCategories = BookCategories
  public EducationalCategories = EducationalCategories
  public showErrorGenre: boolean = false

  // MatPaginator Output
  pageEvent: PageEvent

  dataSource7: MatTableDataSource<UserData>
  displayedColumns7: string[] = ['id', 'name', 'description', 'color']

  category: string = undefined
  genre: string = undefined

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator
  @ViewChild('sort7', { static: true }) sort7: MatSort

  formGroup: FormGroup

  ngAfterViewInit() {}

  constructor(
    private http: HttpClient,
    public bookService: BookService,
    public AuthUtil: AuthUtil,
  ) {
    // super()
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1))

    // Assign the data to the data source for the table to render
    this.dataSource7 = new MatTableDataSource(users)
  }

  ngOnInit(): void {
    console.log(this.bookService.books)

    console.log('Library Module main component')

    // Example 7
    this.dataSource7.paginator = this.paginator7
    this.dataSource7.sort = this.sort7

    this.applyFilter7('')
  }

  applyFilter7(filterValue: string) {
    this.dataSource7.filter = filterValue.trim().toLowerCase()
    // console.log(this.dataSource7)

    // if (this.dataSource7.paginator) {
    //   console.log('paginating')
    //   this.dataSource7.paginator.firstPage()
    // }

    this.bookService.filter(
      filterValue,
      this.category,
      this.itemsPerPage,
      this.page,
      this.genre,
    )
  }

  applyCategory(category: string) {
    this.showErrorGenre = false

    if (category.length > 0) {
      this.category = category
    } else {
      this.category = undefined
    }

    console.log(this.category)

    this.bookService.filter(
      this.dataSource7.filter,
      this.category,
      this.itemsPerPage,
      this.page,
      this.genre,
    )
  }

  applyGenre(genre: string) {
    this.showErrorGenre = false

    if (genre.length > 0) {
      this.genre = genre
    } else {
      this.genre = undefined
    }

    console.log(this.genre)

    this.bookService.filter(
      this.dataSource7.filter,
      this.category,
      this.itemsPerPage,
      this.page,
      this.genre,
    )
  }

  // setItemsPerPage(event?: PageEvent) {
  //   this.itemService.getdata(event).subscribe(
  //     (response) => {
  //       if (response.error) {
  //         // handle error
  //       } else {
  //         this.datasource = response.data
  //         this.pageIndex = response.pageIndex
  //         this.pageSize = response.pageSize
  //         this.length = response.length
  //       }
  //     },
  //     (error) => {
  //       // handle error
  //     },
  //   )
  //   return event

  //   // this.itemsPerPage = event.pageSize
  //   // console.log(this.itemsPerPage)
  //   this.paginate()
  // }


  pageEvents(event: any) {
    console.log(event.pageIndex)
    console.log(event.pageSize)
    this.itemsPerPage = event.pageSize
    this.paginate()
    // The code that you want to execute on clicking on next and previous buttons will be written here.
  }

  setPage(p: number) {
    this.page = p
    this.paginate()
  }

  paginate() {
    this.bookService.filter(
      this.dataSource7.filter,
      this.category,
      this.itemsPerPage,
      this.page,
      this.genre,
    )
  }

  showError() {
    // set showloader to true to show loading div on view
    this.showErrorGenre = true
    console.log('SHOW ERROR')

    let _timer = timer(3000) // 5000 millisecond means 5 seconds
    let subscription = _timer.subscribe(() => {
      // set showloader to false to hide loading div from view after 5 seconds
      console.log('5 seconds passed')
      this.showErrorGenre = false
      console.log(this.showErrorGenre)
    })
  }
}
