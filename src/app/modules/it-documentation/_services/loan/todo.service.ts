import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { TodoDTO } from '../../_dto/item-dto'
import { TodoModel } from '../../_models/todo.model'
import { TodoHTTPService } from './todo-http/todo-http.service'

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private filterString = ''

  private _todos: BehaviorSubject<TodoModel[]> = new BehaviorSubject([])
  public todos: Observable<TodoModel[]> = this._todos.asObservable()

  constructor(
    private todoHttpService: TodoHTTPService,
    private router: Router,
  ) {
    this.loadInitialData()
  }

  loadInitialData() {
    this.todoHttpService.getAllTodos$().subscribe(
      (res) => {
        this._todos.next(res)
      },
      (err) => console.error('Error retrieving Todos'),
    )
  }

  filter(s: string, f?: string) {
    let status = s.toLowerCase()
    let filter = f ? f.toLowerCase() : ''
    this.todos = this._todos.pipe(
      map((todos) =>
        todos.filter((l) => {
          let b =
            l.status.toLowerCase().includes(status) &&
            (l.title.toLowerCase().includes(filter) ||
              l.content.toLowerCase().includes(filter))
          return b
        }),
      ),
    )
  }

  create(todoDTO: TodoDTO): Observable<TodoModel> {
    return this.todoHttpService.create(todoDTO)
  }

  edit(routeId: number, todoDTO: TodoDTO): Observable<TodoModel> {
    return this.todoHttpService.edit(routeId, todoDTO)
  }
}
