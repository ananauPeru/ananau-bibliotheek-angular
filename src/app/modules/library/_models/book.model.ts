import { Timestamp } from 'rxjs/internal/operators/timestamp'
import { UserModel } from '../../auth'
import { LoanedPieceModel } from './loaned-piece.model'

export class BookModel {
  id: number
  title: string
  category: string
  genre: string
  author: string
  description: string
  state: string
  purchasedAt: Date
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  quantity: number
  photoUrl: string
  createdAt: Date
  updatedAt: Date


  /*user: UserModel
  archived: boolean
  deleted: boolean
  loanedPieces: LoanedPieceModel[]*/

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
