import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';
import { PillComponent } from './components/pill/pill.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [InputErrorsComponent, PillComponent, NavBarComponent],
  imports: [CommonModule],
  exports: [InputErrorsComponent, PillComponent, NavBarComponent],
})
export class SharedModule {}
