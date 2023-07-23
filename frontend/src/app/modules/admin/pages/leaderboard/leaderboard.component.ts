import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAction } from 'src/app/core/models/action';
import { ICategories, IDisplayedColumns, IGetLeaderboard, IGetTournaments, ILeaderboard, IPlayer, ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { LeaderboardService } from 'src/app/core/services/admin/leaderboard/leaderboard.service';
import { TournamentService } from 'src/app/core/services/admin/tournament/tournament.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
    displayedColumns : string[] = [
      'playerName',
      'tournamentName',
      'categoryName',
      'score'
    ];
    useColumns : string[] = [
      'Name',
      'Tournament',
      'Category',
      'Score',
    ];
    dataSource : any[] = [];
    categories : ICategories[] = [];
    tournaments : ITournaments[] = [];
    totalCount !: number;
    leaderboardData : ILeaderboard[] = [];
    pageNumber : number = 0;

    category = new FormControl('');
    tournament = new FormControl('')
    constructor(
      private http : HttpClient, 
      private authService : AuthService, 
      private categoryService : CategoryService,
      private leaderboardService : LeaderboardService,
      private tournamentService : TournamentService
      ) {
      
      // this.displayedColumns = Object.keys(this.dataSource[0]);
      // this.displayedColumns.push('action');
    }

    ngOnInit(): void {
      this.getCateories();
      this.getTournaments();
      this.getLeaderboardData();
      this.category.valueChanges.subscribe({
        next : (value)=>{
          this.getTournaments();
          this.getLeaderboardData();
        },
      })

      this.tournament.valueChanges.subscribe({
        next : (value)=>{
          this.getLeaderboardData();
        }
      })
    }

    handleAction(event : IAction<IPlayer>) {
        console.log(event.element)
    }

    getCateories() {
      const payload : IPagination = {
        searchText :  '',
        pageSize : Infinity,
        pageNumber : 0,
        sortManner : 1,
        status : true
      }

      this.categoryService.getAllCategories(payload).subscribe({
        next : (response : IResponse<ICategories>)=>{
            this.categories = response.data;
        }
      })
    }

    clearAllFilters() {
      this.category.reset();
      this.tournament.reset();
    }

    getTournaments() {
      const payload : IGetTournaments = {
        searchText : '',
        pageNumber : 0,
        pageSize : 10000,
        filter : {
          category : this.category.value || '',
          player : ''
        },
        tournamentStatus : 1,
        sortManner : 1,
      }
      this.tournamentService.getTournaments(payload).subscribe({
        next : (response : IResponse<ITournaments>)=>{
          this.tournaments = response.data;
        }
      })
    }

    getLeaderboardData() {
      const payload : IGetLeaderboard = {
        searchText : '',
        pageSize : 10,
        pageNumber : this.pageNumber,
        filter : {
          category : this.category.value || '',
          tournament : this.tournament.value || ''
        }
      }
      this.leaderboardService.getLeaderBoardData(payload).subscribe({
        next : (response : IResponse<ILeaderboard>) => {
            this.leaderboardData = response.data;
            this.totalCount = response.totalCount;
            this.dataSource = this.leaderboardData.map(l=>{
              return {
                playerName : l.player.playerName,
                tournamentName : l.tournament.tournamentName,
                categoryName : l.category.categoryName,
                score : l.score
              }
            })
        }
      })
    }
}
