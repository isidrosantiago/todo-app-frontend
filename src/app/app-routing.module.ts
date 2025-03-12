import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivate } from './core/guards/auth.guard';
import { todoCanMatch } from './core/guards/todo.guard';

const routes: Routes = [
  {
    path: 'to-do',
    loadChildren: () =>
      import('./modules/todos/todo.module').then((m) => m.TodoModule),
    canActivate: [todoCanMatch],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authCanActivate],
  },
  { path: '**', redirectTo: 'to-do' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
