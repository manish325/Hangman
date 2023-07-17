import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { ChooseRoleComponent } from './choose-role/choose-role.component';

const routes: Routes = [
  {
    path : '',
    canActivate : [AuthGuard],
    component : LoginComponent
  },
  {
    path : 'choose-role',
    canActivate : [AuthGuard],
    component : ChooseRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
