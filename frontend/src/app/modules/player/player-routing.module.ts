import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDashboardComponent } from './pages/player-dashboard/player-dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { PlayerTournamentsComponent } from './pages/player-tournaments/player-tournaments.component';
import { PlayerProgressComponent } from './pages/player-progress/player-progress.component';

const routes: Routes = [
 {
  path : '',
  canActivate : [AuthGuard],
  component : PlayerDashboardComponent,
  children : [
    {
      path : 'tournaments',
      component : PlayerTournamentsComponent
    },
    {
      path : 'progress',
      component : PlayerProgressComponent
    },
    {
      path : '**',
      pathMatch : 'full',
      redirectTo : ''
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule {
  
 }
