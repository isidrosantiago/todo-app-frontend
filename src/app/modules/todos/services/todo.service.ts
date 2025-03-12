import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CreateTodoRequest,
  CreateTodoResponse,
  DeleteTodoResponse,
  GetTodosResponse,
  PrioritySortOrder,
  Status,
  Todo,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from '../types/todo';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

function sortByProprity(a: Todo, b: Todo) {
  if (a.priority === b.priority) return 0;
  return PrioritySortOrder[a.priority] > PrioritySortOrder[b.priority] ? 1 : -1;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  private apiUrl: string = environment.apiUrl;
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable().pipe(
    map((todos) => ({
      todo: todos.filter((t) => t.status === 'TODO').sort(sortByProprity),
      inProgress: todos
        .filter((t) => t.status === 'IN_PROGRESS')
        .sort(sortByProprity),
      done: todos.filter((t) => t.status === 'DONE').sort(sortByProprity),
    }))
  );

  constructor() {}

  getAllTodos(): Observable<GetTodosResponse> {
    return this.http.get<GetTodosResponse>(`${this.apiUrl}/tasks`).pipe(
      tap((resp) => {
        this.todos.next(resp.task);
      })
    );
  }

  updateTodoStatus(
    todoId: number,
    newStatus: Status
  ): Observable<UpdateTodoResponse> {
    return this.http.patch<UpdateTodoResponse>(
      `${this.apiUrl}/tasks/${todoId}`,
      {
        status: newStatus,
      }
    );
  }

  createTodo(
    createTodoRequest: CreateTodoRequest
  ): Observable<CreateTodoResponse> {
    return this.http
      .post<CreateTodoResponse>(`${this.apiUrl}/tasks`, {
        ...createTodoRequest,
        dueDate: createTodoRequest.dueDate + 'T00:00:00.000Z',
      })
      .pipe(tap((v) => this.addTodo(v.task)));
  }

  updateTodo(
    todoId: number,
    updateTodoRequest: UpdateTodoRequest
  ): Observable<UpdateTodoResponse> {
    return this.http
      .patch<UpdateTodoResponse>(`${this.apiUrl}/tasks/${todoId}`, {
        ...updateTodoRequest,
        dueDate: updateTodoRequest.dueDate + 'T00:00:00.000Z',
      })
      .pipe(tap((v) => this.updateTodos(v.task)));
  }

  deleteTodo(id: number): Observable<DeleteTodoResponse> {
    return this.http
      .delete<DeleteTodoResponse>(`${this.apiUrl}/tasks/${id}`)
      .pipe(tap(() => this.removeTodo(id)));
  }

  onDrop(event: CdkDragDrop<Todo[]>): void {
    if (event.container.id !== event.previousContainer.id) {
      const { id } = event.item.data as Todo;
      const newStatus = event.container.id as Status;

      this.updateTodoStatus(id, newStatus).subscribe({
        next: (v) => {
          this.updateTodos(v.task);
        },
        error: (e) => {
          this.toastr.error(e.error.message, 'Update task');
        },
      });
    }
  }

  updateTodos(todo: Todo) {
    const currentTodos = this.todos.getValue();

    const newTodos = currentTodos.map((t) => {
      if (t.id === todo.id) {
        return todo;
      }

      return t;
    });

    this.todos.next(newTodos);
  }

  addTodo(todo: Todo) {
    const currentTodos = this.todos.getValue();
    this.todos.next([...currentTodos, todo]);
  }

  removeTodo(id: number) {
    const currentTodos = this.todos.getValue();
    const newTodos = currentTodos.filter((t) => t.id !== id);
    this.todos.next(newTodos);
  }
}
