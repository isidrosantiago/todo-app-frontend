import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TodoService } from '@modules/todos/services/todo.service';
import { Todo } from '@modules/todos/types/todo';
import { ToastrService } from 'ngx-toastr';

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
    this.todoService.createTodo(this.form.getRawValue()).subscribe({
      next: (v) => {
        this.toastr.success(v.message, 'Create task');
      },
      error: (e) => {
        this.toastr.error(e.error.message, 'Create task');
      },
      complete: () => {
        this.dialog.closeAll();
      },
    });
  }

  updateTodo() {
    this.todoService
      .updateTodo(this.data.todo.id, this.form.getRawValue())
      .subscribe({
        next: (v) => {
          this.toastr.success(v.message, 'Update task');
        },
        error: (e) => {
          this.toastr.error(e.error.message, 'Update task');
        },
        complete: () => {
          this.dialog.closeAll();
        },
      });
  }
}
