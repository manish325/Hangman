import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PlayerDashboardService } from 'src/app/core/services/player/player-dashboard.service';
import { AddTournamentComponent } from '../../components/add-tournament/add-tournament.component';

@Component({
  selector: 'app-player-tournaments',
  templateUrl: './player-tournaments.component.html',
  styleUrls: ['./player-tournaments.component.scss']
})
export class PlayerTournamentsComponent implements OnInit {
    displayedColumns : string[] = [
      'tournamentName',
      'tournamentDetails',
      'tournamentCategory',
      'tournamentPrizes',
      'action'
    ];
    useColumns : string[] = [
      'Tournament Name',
      'Tournament Details',
      'Tournament Category',
      'Tournament Prizes'
    ];
    dataSource : ITournaments[] = [];

    constructor(
      private playerService : PlayerDashboardService, 
      private authService : AuthService,
      private dialog: MatDialog
      ) {}

    ngOnInit(): void {
      this.getTournaments()
    }

    getTournaments() {
      console.log();
      this.playerService.getTournamentsToPlay(this.authService.getUserDetails()?.player).subscribe({
        next : (response : IResponse<ITournaments>)=>{
            this.dataSource = response.data;
        }
      })
    }

    openTournamentDialog() {
      this.dialog.open(
        AddTournamentComponent
      ).afterClosed().subscribe({
        next : (response : ITournaments)=>{
          response.playerId = this.authService.getUserDetails()?.player
          this.playerService.createTournament(response as ITournaments).subscribe({
            next : (response : any)=>{
              alert(response.message)
            }
          })
        }
      })
    }
}
