import { GebruikerItem } from './gebruiker-item.model';
import { _ } from 'underscore';
import { ItemCategorie } from './item-categorie.enum';

export class Item {
    id: string;
    naam: string;
    beschikbaar: boolean;
    gearchiveerd: boolean;
    gebruikerItems: GebruikerItem[];
    toegevoegdOp: Date;
    categorie: ItemCategorie;
    materiaal: string;
    merk: string;
    aankoopDatum: Date;
    inhoud: string;

    constructor() { }

    static fromJSON(json: any): Item {
        var item = new Item();
        item.id = json.id;
        item.naam = json.naam;
        item.beschikbaar = json.beschikbaar;
        item.gearchiveerd = json.gearchiveerd;
        item.gebruikerItems = json.gebruikerItems.map(GebruikerItem.fromJSON);
        item.toegevoegdOp = new Date(json.toegevoegdOp);
        item.categorie = Object.values(ItemCategorie)[json.categorie];
        item.materiaal = json.materiaal;
        item.merk = json.merk;
        item.aankoopDatum = json.aankoopDatum != null ? new Date(json.aankoopDatum) : null;
        item.inhoud = json.inhoud;
        return item;
    }
    public ontleendDoor(): string {
        let gebruiker = this.gebruikerItems[0].gebruiker
        return gebruiker.voornaam + " " + gebruiker.achternaam;
    }

    public ontleendOp(): Date {
        return _.sortBy([...this.gebruikerItems], 'ontleendOp').reverse()[0].OntleendOp;
    }

}
