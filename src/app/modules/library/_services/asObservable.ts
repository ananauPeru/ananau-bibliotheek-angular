/*
 *
 * taken from https://github.com/Reactive-Extensions/RxJS/blob/8f12f812d497acf639588e90f74d504a9fc801ec/src/core/linq/observable/asobservable.js
 *
 * not needed if using RxJs beta 2 or higher
 *
 **/

import { Observable } from 'rxjs'
import { Subject } from 'rxjs'
import { Item } from 'src/app_old/models/item.model'

export function asObservable(subject: Subject<Item[]>) {
  return new Observable((fn) => subject.subscribe(fn))
}
