import { UserModel } from '../../auth/_models/user.model'
import { BookModel } from './book.model'
import { ItemModel } from './item.model'

export class LoanedPieceModel {
  loanedPieceId: number
  item: ItemModel
  book: BookModel
  quantity: number
  responsibleUser: UserModel
  loaningUser: UserModel
  loanState: string
  loanStateDescription: string
  returnState: string
  returnStateDescription: string
  loanDate: Date
  returnDate: Date
  returnedAt: Date
  remarks: string
  status: string
}
