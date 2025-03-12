import { Component, inject, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TodoService } from '@modules/todos/services/todo.service';
import { Todo } from '@modules/todos/types/todo';
import { Dialog } from '@angular/cdk/dialog';
import { TodoFormComponent } from '@modules/todos/components/todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(Dialog);
  todoService = inject(TodoService);
  isDesktop: boolean = true;

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe();
    this.breakpointObserver.observe('(max-width: 800px)').subscribe((state) => {
      if (state.matches) {
        this.isDesktop = false;
      } else {
        this.isDesktop = true;
      }
    });
  }

  drop(event: CdkDragDrop<Todo[]>): void {
    this.todoService.onDrop(event);
  }

  openDialog() {
    this.dialog.open(TodoFormComponent, {
      minWidth: '500px',
      data: {
        action: 'create',
      },
    });
  }
}
