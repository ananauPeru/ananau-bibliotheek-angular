import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ItemService } from '../_services/item.service'

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
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  private itemsPerPage: number = 5
  private page: number = 1

  // MatPaginator Output
  pageEvent: PageEvent

  dataSource7: MatTableDataSource<UserData>
  displayedColumns7: string[] = ['id', 'name', 'description', 'color']

  category: string = undefined

  @ViewChild('matPaginator7', { static: true }) paginator7: MatPaginator
  @ViewChild('sort7', { static: true }) sort7: MatSort

  formGroup: FormGroup

  ngAfterViewInit() {}

  constructor(private http: HttpClient, public itemService: ItemService) {
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1))

    // Assign the data to the data source for the table to render
    this.dataSource7 = new MatTableDataSource(users)
  }

  ngOnInit(): void {
    console.log(this.itemService.items)

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

    this.itemService.filter(
      filterValue,
      this.category,
      this.itemsPerPage,
      this.page,
    )
  }

  applyCategory(category: string) {
    if (category.length > 0) {
      this.category = category
    } else {
      this.category = undefined
    }

    console.log(this.category)

    this.itemService.filter(
      this.dataSource7.filter,
      this.category,
      this.itemsPerPage,
      this.page,
    )
  }

  setItemsPerPage(event?:PageEvent) {
    this.itemsPerPage = event.pageSize
    console.log(this.itemsPerPage)
    this.paginate()
  }

  setPage(p: number) {
    this.page = p
    this.paginate()
  }

  paginate() {
    this.itemService.filter(
      this.dataSource7.filter,
      this.category,
      this.itemsPerPage,
      this.page,
    )
  }
}
