import { Dialog } from '@angular/cdk/dialog';
import { Component, inject, Input } from '@angular/core';
import { Todo } from '@modules/todos/types/todo';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoService } from '@modules/todos/services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'todo[item]',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  private dialog = inject(Dialog);
  private todoService = inject(TodoService);
  private toastr = inject(ToastrService);

  @Input() item!: Todo;

  updateTodo() {
    this.dialog.open(TodoFormComponent, {
      minWidth: '500px',
      data: {
        action: 'update',
        todo: this.item,
      },
    });
  }

  deleteTodo() {
    this.todoService.deleteTodo(this.item.id).subscribe({
      next: (v) => {
        this.toastr.success(v.message, 'Delete task');
      },
      error: (e) => {
        this.toastr.error(e.error.message, 'Delete task');
      },
      complete: () => {
        this.dialog.closeAll();
      },
    });
  }
}
