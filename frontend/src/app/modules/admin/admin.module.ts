import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TournamentsComponent } from './pages/tournaments/tournaments.component';
import { PlayersComponent } from './pages/players/players.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { DataGridComponent } from 'src/app/shared/data-grid/data-grid.component';
import {MatDividerModule} from '@angular/material/divider';
import { AddCategoryComponent } from './components/dialogs/add-category/add-category.component'
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { AddPlayerComponent } from './components/dialogs/add-player/add-player.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddGiftComponent } from './components/dialogs/add-gift/add-gift.component';

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
    AdminDashboardComponent,
    LeaderboardComponent,
    CategoriesComponent,
    TournamentsComponent,
    PlayersComponent,
    GiftsComponent,
    AddCategoryComponent,
    AddPlayerComponent,
    AddGiftComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ...material,
    DataGridComponent,
    ReactiveFormsModule,
    ConfirmationDialogComponent
  ]
})
export class AdminModule { }
