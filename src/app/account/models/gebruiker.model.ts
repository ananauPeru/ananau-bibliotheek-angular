export class Gebruiker {
  id: string;
  voornaam: string;
  achternaam: string;
  email: string;
  wachtwoord: string;
  geboorteDatum: Date;
  telefoonNummer: String;
  type: String;
  country: string;
  nationality: string;

  static fromJSON(json: any): Gebruiker {
    var gebruiker = new Gebruiker();
    gebruiker.id = json.id;
    gebruiker.email = json.email;
    gebruiker.wachtwoord = "";
    gebruiker.type = "user";

    if (json.userDetail) {
      gebruiker.voornaam = json.userDetail.firstName;
      gebruiker.achternaam = json.userDetail.lastName;
      gebruiker.geboorteDatum = new Date(json.userDetail.dateOfBirth);
      gebruiker.telefoonNummer = json.userDetail.phone;
      gebruiker.country = json.userDetail.country;
      gebruiker.nationality = json.userDetail.nationality;
    } else {
      gebruiker.voornaam = json.voornaam;
      gebruiker.achternaam = json.achternaam;
      gebruiker.geboorteDatum = new Date(json.geboorteDatum);
      gebruiker.telefoonNummer = json.telefoonNummer;
      gebruiker.country = json.country;
      gebruiker.nationality = json.nationality;
    }

    return gebruiker;
  }
}
