import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { PlayersComponent } from './pages/players/players.component';
import { GiftsComponent } from './pages/gifts/gifts.component';

const routes: Routes = [
  {
    path : '',
    canActivate : [AuthGuard],
    component : AdminDashboardComponent,
    children : [
        {
            path : 'leader-board',
            component : LeaderboardComponent
        },
        {
            path : 'categories',
            component : CategoriesComponent
        },
        {
            path : 'tournaments',
            component : TournamentsComponent
        },
        {
            path : 'players',
            component : PlayersComponent
        },
        {
            path : 'gifts',
            component : GiftsComponent
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
export class AdminRoutingModule { }
