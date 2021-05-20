import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { map, defaultIfEmpty } from 'rxjs/operators'
import { TodoModel } from '../../_models/todo.model'
import { TodoService } from '../../_services/loan/todo.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  public working = true
  public filter = ''
  public filteredActiveTodosEmpty: Observable<Boolean>

  constructor(public todoService: TodoService) {
    console.log(todoService.todos)
  }

  ngOnInit(): void {}

  applyFilter(filterValue: string) {}

  filteredActiveTodos(): Observable<TodoModel[]> {
    this.todoService.filter('', this.filter)
    this.filteredActiveTodosEmpty = this.todoService.todos.pipe(
      map((l) => l.length <= 0),
      defaultIfEmpty(true),
    )
    return this.todoService.todos
  }

  filteredArchivedTodos(): Observable<TodoModel[]> {
    this.todoService.filter('closed')
    return this.todoService.todos
  }

  diffDays(date) {
    let d = new Date(date)
    let od = new Date()
    return Math.floor(
      (Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) -
        Date.UTC(od.getFullYear(), od.getMonth(), od.getDate())) /
        (1000 * 60 * 60 * 24),
    )
  }

  listEmpty(l: any): boolean {
    let b = l.pipe(
      map((count) => count > 0),
      defaultIfEmpty(true),
    )
    return b
  }
}
