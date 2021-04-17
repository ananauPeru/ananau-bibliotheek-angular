import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemModel } from '../_models/item.model';
import { ItemHTTPService } from '../_services/item/item-http/item-http.service';

@Injectable({
    providedIn: "root"
})
export class ItemResolver implements Resolve<ItemModel> {
    constructor(private itemService: ItemHTTPService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<ItemModel> {
        return this.itemService.getItemById(route.params["id"]);
    }
}
