import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategories, IGetTournaments, ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PlayerDashboardService } from 'src/app/core/services/player/dashboard/player-dashboard.service';
import { AddTournamentComponent } from '../../components/add-tournament/add-tournament.component';
import { IPagination } from 'src/app/core/models/paginator';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

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
    self : boolean = false;
    currentTabIndex : number = 0;

    constructor(
      private playerService : PlayerDashboardService, 
      private authService : AuthService,
      private router : Router,
      private dialog: MatDialog
      ) {}

    ngOnInit(): void {
      this.getCateories();
      this.getTournaments();
      this.tournamentSearch();
    }

    getTournaments() {
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
        self : this.self
      }
      this.playerService.getTournamentsToPlay(this.authService.getUserDetails()?.player?.playerId, payload).subscribe({
        next : (response : IResponse<ITournaments>)=>{
          this.totalCount = response.totalCount;
          this.dataSource = response.data;
          this.displayedColumns = [
            'tournamentName',
            'tournamentDetails',
            'tournamentCategory',
            'tournamentPrizes',
            'action'
          ];
          this.useColumns = [
            'Tournament Name',
            'Tournament Details',
            'Tournament Category',
            'Tournament Prizes'
          ];
        }
      })
    }

    openTournamentDialog() {
      this.dialog.open(
        AddTournamentComponent
      ).afterClosed().subscribe({
        next : (response : ITournaments)=>{
          response.playerId = this.authService.getUserDetails()?.player?.playerId
          this.playerService.createTournament(response as ITournaments).subscribe({
            next : (response : any)=>{
              alert(response.message)
            }
          })
        }
      })
    }

    handleTabChange(event : MatTabChangeEvent) {
      this.currentTabIndex = event.index;
      this.dataSource = [];
      this.pageNumber = 0;
      if(event.index ===0 || event.index === 1) {
        this.self = !this.self;
        this.getTournaments();
      }
      if(event.index===2) {
        this.getPlayedTournaments();
      }
    }

    handlePagination(pageDetails : IPagination) {
      this.pageNumber = pageDetails.pageNumber || 0;
      if(this.currentTabIndex === 0 || this.currentTabIndex === 1)
      this.getTournaments();

      if(this.currentTabIndex === 2) {
        this.getPlayedTournaments();
      }
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
      this.category.valueChanges.subscribe({
        next : (v)=>{
          if(this.currentTabIndex === 0 || this.currentTabIndex === 1)
          this.getTournaments();

          if(this.currentTabIndex === 2) {
            this.getPlayedTournaments();
          }
        }
      })
      this.searchTournament.valueChanges.subscribe({
        next : (value)=>{
          if(this.currentTabIndex === 0 || this.currentTabIndex === 1)
          this.getTournaments();

          if(this.currentTabIndex === 2) {
            this.getPlayedTournaments();
          }

        }
      })
    }

    openTournament(tournament : ITournaments) {
      this.router.navigate([`player/game-board/${tournament.tournamentId}`])
    }

    getPlayedTournaments() {
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

      this.playerService.getPlayedTournaments(payload).subscribe({
        next : (response : IResponse<ITournaments>)=>{
            this.dataSource = response.data;
            this.totalCount = response.totalCount;
            this.displayedColumns = Object.keys(this.dataSource[0]).filter(K=>K!=='tournamentId');
            this.useColumns.push('Score')
        }
      })
    }
}
