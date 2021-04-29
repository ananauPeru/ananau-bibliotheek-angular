import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoanedPieceDTO } from '../../_dto/loaned-piece-dto'
import { LoanedPieceModel } from '../../_models/loaned-piece.model'
import { LoanHTTPService } from './loan-http/loan-http.service'

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private filterString = ''

  private _loans: BehaviorSubject<LoanedPieceModel[]> = new BehaviorSubject([])
  public loans: Observable<LoanedPieceModel[]> = this._loans.asObservable()

  constructor(
    private loanHttpService: LoanHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.loanHttpService.getAllloans$().subscribe(
      (res) => {
        // let loans = (<Object[]>res.json()).map((todo: any) =>
        //     new Item({id:todo.id, description:todo.description,completed: todo.completed}));

        this._loans.next(res)
        console.log(this._loans)
      },
      (err) => console.log('Error retrieving loans'),
    )
  }

  filter(s: string, f?: string) {
    let status = s.toLowerCase()
    let filter = f ? f.toLowerCase() : ''

    // let f = filter.toLowerCase()
    // let category = undefined
    // if (_category) {
    //   category = _category.toLowerCase()
    // }
    // let course = undefined
    // if (_course) {
    //   course = _course.toLowerCase()
    // }

    console.log('FILTERING WITHOUT CATEGORY SET!!!')
    this.loans = this._loans.pipe(
      map((loans) =>
        loans.filter((l) => {
          let b =
            l.status.toLowerCase().includes(status) &&
            ((
              l.loaningUser.userDetail.firstName +
              ' ' +
              l.loaningUser.userDetail.lastName
            ).toLowerCase().includes(filter) ||
              l.loaningUser.email.toLowerCase().includes(filter))
          // item.name.toLowerCase().includes(f)
          // (item.description
          //   ? item.description.toLowerCase().includes(f)
          //   : false) ||
          // (item.purpose ? item.purpose.toLowerCase().includes(f) : false) ||
          // (item.brand ? item.brand.toLowerCase().includes(f) : false) ||
          // (item.course ? item.course.toLowerCase().includes(f) : false)
          return b
        }),
      ),
    )
  }

  // paginate(pp: any, p: any) {
  //   console.log(this.loans[0])
  // }

  create(loanedPieceDTO: LoanedPieceDTO): Observable<LoanedPieceModel> {
    return this.loanHttpService.create(loanedPieceDTO)
  }

  edit(
    routeId: number,
    loanedPieceDTO: LoanedPieceDTO,
  ): Observable<LoanedPieceModel> {
    return this.loanHttpService.edit(routeId, loanedPieceDTO)
  }
}
