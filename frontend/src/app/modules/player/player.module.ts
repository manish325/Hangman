import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerDashboardComponent } from './pages/player-dashboard/player-dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { PlayerTournamentsComponent } from './pages/player-tournaments/player-tournaments.component';
import { PlayerProgressComponent } from './pages/player-progress/player-progress.component';
import { DataGridComponent } from 'src/app/shared/data-grid/data-grid.component';
import { AddTournamentComponent } from './components/add-tournament/add-tournament.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GameBoardComponent } from './pages/game-board/game-board.component';
import { ScoreComponent } from './pages/game-board/dialogs/score/score.component';
import { PlayerGiftsComponent } from './pages/player-gifts/player-gifts.component';
import { GraphComponent } from 'src/app/shared/graph/graph.component';

const material = [
  MatTableModule,
  MatIconModule,
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatDividerModule,
  MatDialogModule,
  MatTabsModule,
  MatSelectModule
  // MatSnackBarModule
]


@NgModule({
  declarations: [
    PlayerDashboardComponent,
    PlayerTournamentsComponent,
    PlayerProgressComponent,
    AddTournamentComponent,
    GameBoardComponent,
    ScoreComponent,
    PlayerGiftsComponent
  ],
  imports: [
    CommonModule,
    ...material,
    PlayerRoutingModule,
    DataGridComponent,
    ReactiveFormsModule,
    GraphComponent
  ]
})
export class PlayerModule { }
