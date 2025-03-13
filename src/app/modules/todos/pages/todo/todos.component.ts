import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TodoService } from '@modules/todos/services/todo.service';
import { Todo } from '@modules/todos/types/todo';
import { Dialog } from '@angular/cdk/dialog';
import { TodoFormComponent } from '@modules/todos/components/todo-form/todo-form.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(Dialog);
  private unsubscribe$ = new Subject<void>();
  todoService = inject(TodoService);
  isDesktop: boolean = true;

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe();

    this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.matches) {
          this.isDesktop = false;
        } else {
          this.isDesktop = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
