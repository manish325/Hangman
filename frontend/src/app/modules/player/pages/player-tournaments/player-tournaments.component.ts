import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategories, IGetTournaments, ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PlayerDashboardService } from 'src/app/core/services/player/player-dashboard.service';
import { AddTournamentComponent } from '../../components/add-tournament/add-tournament.component';
import { IPagination } from 'src/app/core/models/paginator';
import { FormControl } from '@angular/forms';

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

    pageNumber : number = 0;
    status : boolean = true;
    sortManner : 0 | 1 = 1;
    totalCount !: number;
    categories : ICategories[] = [];
    category = new FormControl('');
    searchTournament = new FormControl('')

    constructor(
      private playerService : PlayerDashboardService, 
      private authService : AuthService,
      private dialog: MatDialog
      ) {}

    ngOnInit(): void {
      this.getCateories();
      this.getTournaments();
      this.tournamentSearch()
    }

    getTournaments() {
      console.log();
      const payload : IGetTournaments = {
        searchText : this.searchTournament.value || '',
        pageNumber : this.pageNumber,
        pageSize : 10,
        filter : {
          category : this.category.value || '',
          player :  ''
        },
        tournamentStatus : 1,
        sortManner : 1,
      }
      this.playerService.getTournamentsToPlay(this.authService.getUserDetails()?.player, payload).subscribe({
        next : (response : IResponse<ITournaments>)=>{
          this.totalCount = response.totalCount;
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

    handlePagination(pageDetails : IPagination) {
      this.pageNumber = pageDetails.pageNumber || 0;
      this.getTournaments();
    }

    handleAction(event : any) {

    }

    getCateories() {
      const payload : IPagination = {
        searchText :  '',
        pageSize : Infinity,
        pageNumber : 0,
        sortManner : 1,
        status : true
      }
    
      this.playerService.getAllCategories(payload).subscribe({
        next : (response : IResponse<ICategories>)=>{
            this.categories = response.data;
        }
      })
    }

    tournamentSearch() {
      this.searchTournament.valueChanges.subscribe({
        next : (value)=>{
          this.getTournaments();
        }
      })
    }
}
