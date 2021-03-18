import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';


@Injectable({
    providedIn: "root"
})
export class ItemResolver implements Resolve<Item> {
    constructor(private itemService: ItemService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Item> {
        return this.itemService.getItemById$(route.params["id"]);
    }
}
