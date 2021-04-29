import { Timestamp } from 'rxjs/internal/operators/timestamp'
import { UserModel } from '../../auth'
import { LoanedPieceModel } from './loaned-piece.model'

export class BookModel {
  bookId: number
  user: UserModel
  category: string
  genre: string
  name: string
  author: string
  description: string
  state: string
  archived: boolean
  deleted: boolean
  pieces: LoanedPieceModel[]
  photoUrl: string
  purchasedAt: Date
  createdAt: Date
  updatedAt: Date

  constructor() {}

  //   static fromJSON(json: any): ItemModel {
  //     var item = new Item()
  //     item.id = json.id
  //     item.naam = json.naam
  //     item.beschikbaar = json.beschikbaar
  //     item.gearchiveerd = json.gearchiveerd
  //     item.gebruikerItems = json.gebruikerItems.map(GebruikerItem.fromJSON)
  //     item.toegevoegdOp = new Date(json.toegevoegdOp)
  //     item.categorie = Object.values(ItemCategorie)[json.categorie]
  //     item.materiaal = json.materiaal
  //     item.merk = json.merk
  //     item.aankoopDatum =
  //       json.aankoopDatum != null ? new Date(json.aankoopDatum) : null
  //     item.inhoud = json.inhoud
  //     return item
  //   }
  //   public ontleendDoor(): string {
  //     let gebruiker = this.gebruikerItems[0].gebruiker
  //     return gebruiker.voornaam + ' ' + gebruiker.achternaam
  //   }

  //   public ontleendOp(): Date {
  //     return _.sortBy([...this.gebruikerItems], 'ontleendOp').reverse()[0]
  //       .OntleendOp
  //   }
}
