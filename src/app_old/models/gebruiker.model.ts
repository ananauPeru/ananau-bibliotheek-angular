import { GebruikerItem } from './gebruiker-item.model'

export class Gebruiker {
  id: string
  voornaam: string
  achternaam: string
  email: string
  wachtwoord: string
  geboorteDatum: Date
  telefoonNummer: String
  type: String
  gebruikerItems: GebruikerItem[]
  country: string
  nationality: string

  static fromJSON(json: any): Gebruiker {
    //json = {id: 3,voornaam: "string",achternaam: "string",email: "string", wachtwoord: "string",geboorteDatum: "Date",telefoonNummer: "String",type: "String"}
    var gebruiker = new Gebruiker()
    gebruiker.id = json.id
    gebruiker.voornaam = json.userDetail.firstName
    gebruiker.achternaam = json.userDetail.lastName
    gebruiker.email = json.email
    gebruiker.wachtwoord = ''
    gebruiker.type = 'user'
    gebruiker.geboorteDatum = new Date(json.userDetail.dateOfBirth)
    gebruiker.telefoonNummer = json.userDetail.phone
    if (json.gebruikerItems != undefined) {
      gebruiker.gebruikerItems = json.gebruikerItems.map(GebruikerItem.fromJSON)
    }
    gebruiker.country = json.userDetail.country
    gebruiker.nationality = json.userDetail.nationality
    return gebruiker
  }
}
