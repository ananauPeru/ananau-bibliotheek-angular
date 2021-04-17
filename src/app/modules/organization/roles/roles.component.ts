import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  private filter = ''

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    this.filter = filterValue.trim().toLowerCase()
    // console.log(this.dataSource7)

    // if (this.dataSource7.paginator) {
    //   console.log('paginating')
    //   this.dataSource7.paginator.firstPage()
    // }

    // this.bookService.filter(
    //   filterValue,
    //   this.category,
    //   // this.itemsPerPage,
    //   // this.page,
    //   this.genre,
    // )

    // this.paginate()
  }

}

