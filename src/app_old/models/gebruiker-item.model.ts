import { Gebruiker } from './gebruiker.model';
import { Item } from './item.model';

export class GebruikerItem {
    id: string;
    gebruiker: Gebruiker;
    item: Item;
    OntleendOp: Date;
    TerugOp?: Date;

    static fromJSON(json: any): GebruikerItem {
        var item = new GebruikerItem();
        item.id = json.id;
        item.gebruiker = json.gebruiker;
        item.item = json.item;
        item.OntleendOp = new Date(json.ontleendOp);
        item.TerugOp = json.terugOp == undefined ? undefined : new Date(json.terugOp);
        return item;
    }
}