import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import Quill from 'quill'
import { tap } from 'rxjs/operators'
import { BookModel } from 'src/app/modules/library/_models/book.model'
import { AuthUtil } from 'src/app/_utils/auth_util'
import { ToastrUtil } from 'src/app/_utils/toastr_util'
import { TodoDTO } from '../../_dto/item-dto'
import { TodoModel } from '../../_models/todo.model'
import { TodoService } from '../../_services/loan/todo.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  public todo: TodoModel
  public content: string
  public saving = false
  public assignedUserId: number = undefined
  private routeId: number = undefined

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public toastrUtil: ToastrUtil,
    public authUtil: AuthUtil,
    private datePipe: DatePipe,
    private todoService: TodoService,
  ) {
    this.route.data.subscribe((data) => {
      this.todo = data['todo']
      if (this.todo) {
        this.content = this.todo.content
      }
    })
    this.route.params.subscribe((params) => {
      this.routeId = params['id']
    })
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: [
        this.todo && this.todo.title ? this.todo.title : '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    })
  }

  save() {
    this.saving = true

    this.formGroup.markAllAsTouched()
    if (!this.formGroup.valid) {
      return
    }

    const formValues = this.formGroup.value

    if (!this.todo) {
      let todo = new TodoDTO()
      todo.title = formValues.title
      todo.content = this.content
      todo.assignedUserId = this.assignedUserId
      todo.status = 'OPEN'
      if (this.assignedUserId) {
        todo.status = 'ASSIGNED'
      }
      this.create(todo)
    } else {
      this.todo.title = formValues.title
      this.todo.content = this.content
      this.todo.assignedUserId = this.assignedUserId
      this.todo.status = 'OPEN'
      if (this.assignedUserId) {
        this.todo.status = 'ASSIGNED'
      }

      this.create(this.todo)
    }
  }

  create(todo: any) {
    if (!this.todo) {
      const icreate = this.todoService
        .create(todo)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'ToDo successfully created!',
                'ToDo Created',
              )
              this.todoService.loadInitialData()
              this.router.navigate(['/documentation/todos'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'ToDo could not be added... Try again later.',
                'Error',
              )
            },
          ),
        )
        .subscribe((res) => res as TodoModel)
    } else {
      const icreate = this.todoService
        .edit(this.routeId, todo)
        .pipe(
          tap(
            // Log the result or error
            (data) => {
              this.toastrUtil.showSuccess(
                'ToDo successfully edited!',
                'Changes Saved',
              )
              this.todoService.loadInitialData()
              // this.router.navigate(['/documentation/todos'])
            },
            (error) => {
              console.error(error)
              this.toastrUtil.showError(
                'ToDo could not be edited... Try again later.',
                'Error',
              )
            },
          ),
        )
        .subscribe((res) => res as TodoModel)
      // this.subscriptions.push(sbCreate)
    }
    this.saving = false
  }

  assign() {
    if (this.assignedUserId == undefined && !this.todo) {
      this.assignedUserId = this.authUtil.getAuthFromLocalStorage().user.id
      console.log(this.assignedUserId)
    } else if (this.todo.assignedUserId) {
      this.assignedUserId = undefined
    } else {
      this.assignedUserId = this.authUtil.getAuthFromLocalStorage().user.id
    }

    if (this.todo) {
      this.save()
    }
  }

  me(): boolean {
    if (this.todo && !this.assignedUserId) {
      return true
    } else if (
      this.todo &&
      this.todo.assignedUserId ==
        this.authUtil.getAuthFromLocalStorage().user.id
    ) {
      return true
    } else if (
      this.todo &&
      this.todo.assignedUserId !=
        this.authUtil.getAuthFromLocalStorage().user.id
    ) {
      return false
    }

    return true
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.valid && (control.dirty || control.touched)
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.invalid && (control.dirty || control.touched)
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName]
    return control.hasError(validation) && (control.dirty || control.touched)
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName]
    return control.dirty || control.touched
  }
}
