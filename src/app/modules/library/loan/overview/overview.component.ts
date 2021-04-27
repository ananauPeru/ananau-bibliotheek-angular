import { Component, OnInit } from '@angular/core'
import { LoanService } from '../../_services/loan/loan.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public working = true

  constructor(public loanService: LoanService) {}

  ngOnInit(): void {}

  applyFilter(filterValue: string) {
    // this.filter = filterValue.trim().toLowerCase()
    // this.userService.filter(this.filter);
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

  diffDays(date) {
    let d = new Date(date)
    let od = new Date()
    return Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - Date.UTC(od.getFullYear(), od.getMonth(), od.getDate()) ) /(1000 * 60 * 60 * 24));
  }
}
