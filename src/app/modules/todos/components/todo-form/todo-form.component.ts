import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TodoService } from '@modules/todos/services/todo.service';
import { Todo, UpdateTodoResponse } from '@modules/todos/types/todo';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';

interface DialogData {
  action: string;
  todo: Todo;
}

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);
  private dialog = inject(Dialog);

  minDate: string = new Date().toISOString().split('T')[0];
  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['', Validators.required],
    status: ['TODO', Validators.required],
    dueDate: ['', Validators.required],
  });

  constructor(@Inject(DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    if (this.data.action === 'update') {
      const todo = this.data.todo;
      this.form.setValue({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate.split('T')[0],
        priority: todo.priority,
        status: todo.status,
      });

      this.minDate = todo.dueDate.split('T')[0];
    }
  }

  submit() {
    if (this.form.invalid) return;

    if (this.data.action === 'create') {
      this.createTodo();
    } else {
      this.updateTodo();
    }
  }

  createTodo() {
    this.todoService
      .createTodo(this.form.getRawValue())
      .subscribe(this.responseHandler());
  }

  updateTodo() {
    this.todoService
      .updateTodo(this.data.todo.id, this.form.getRawValue())
      .subscribe(this.responseHandler());
  }

  private responseHandler(): Observer<UpdateTodoResponse> {
    return {
      next: (v) => {
        this.toastr.success(v.message, 'Update task');
      },
      error: (e: HttpErrorResponse) => {
        this.toastr.error(e.error.message, 'Update task');
      },
      complete: () => {
        this.dialog.closeAll();
      },
    };
  }
}
