import { Injectable } from '@angular/core'
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'
import { Observable } from 'rxjs'
import { TodoModel } from '../_models/todo.model'
import { TodoHTTPService } from '../_services/loan/todo-http/todo-http.service'

@Injectable({
  providedIn: 'root',
})
export class TodoResolver implements Resolve<TodoModel> {
  constructor(private todoService: TodoHTTPService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<TodoModel> {
    return this.todoService.getItemById(route.params['id'])
  }
}
