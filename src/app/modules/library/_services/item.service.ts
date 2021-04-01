import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { ItemModel } from '../_models/item.model'
import { ItemHTTPService } from './item-http'

@Injectable({
  providedIn: 'root',
})

export class ItemService {
  private _items: BehaviorSubject<ItemModel[]> = new BehaviorSubject([])

  public readonly items: Observable<ItemModel[]> = this._items.asObservable()

  constructor(
    private itemHttpService: ItemHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.itemHttpService.getAllItems$()
        .subscribe(
            res => {
                // let items = (<Object[]>res.json()).map((todo: any) =>
                //     new Item({id:todo.id, description:todo.description,completed: todo.completed}));

                this._items.next
                console.log(this._items)
            },
            err => console.log("Error retrieving Items")
        );

}

}
