import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',
    pathMatch:  'full',
    redirectTo : 'auth'
  },
  {
    path : 'auth',
    loadChildren : ()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path : 'admin',
    loadChildren : ()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path : 'player',
    loadChildren : ()=>import('./player/player.module').then(m=>m.PlayerModule)
  },
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
