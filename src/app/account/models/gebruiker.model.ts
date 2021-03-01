// import { GebruikerItem } from './gebruiker-item.model';

export class Gebruiker {
    id: string;
    voornaam: string;
    achternaam: string;
    email: string;
    wachtwoord: string;
    geboorteDatum: Date;
    telefoonNummer: String;
    type: String;
    //gebruikerItems: GebruikerItem[];

    static fromJSON(json: any): Gebruiker {
        // json = {id: 3,voornaam: "string",achternaam: "string",email: "string", wachtwoord: "string",geboorteDatum: "Date",telefoonNummer: "String",type: "String"}
        var gebruiker = new Gebruiker();
        gebruiker.id = json.id;
        gebruiker.voornaam = json.voornaam;
        gebruiker.achternaam = json.achternaam;
        gebruiker.email = json.email;
        gebruiker.wachtwoord = "";
        gebruiker.type = "user";
        gebruiker.geboorteDatum = new Date(json.geboorteDatum);
        gebruiker.telefoonNummer = json.telefoonNummer;
        // if (json.gebruikerItems != undefined) {
        //     gebruiker.gebruikerItems = json.gebruikerItems.map(GebruikerItem.fromJSON);
        // }
        return gebruiker;
    }

}
