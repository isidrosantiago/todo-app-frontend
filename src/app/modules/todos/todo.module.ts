import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TodoRoutingModule } from './todo-routing.module';
import { TodosComponent } from './pages/todo/todos.component';
import { SharedModule } from '../../shared/shared.module';
import { TodoComponent } from './components/todo/todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { DialogModule } from '@angular/cdk/dialog';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodosComponent, TodoComponent, TodoFormComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    SharedModule,
    DragDropModule,
    DialogModule,
    ReactiveFormsModule,
    CdkMenuModule,
  ],
})
export class TodoModule {}
