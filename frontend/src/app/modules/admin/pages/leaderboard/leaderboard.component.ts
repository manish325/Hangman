import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAction } from 'src/app/core/models/action';
import { ICategories, IDisplayedColumns, IGetTournaments, IPlayer, ITournaments } from 'src/app/core/models/admin.model';
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
    displayedColumns : string[] = [];
    useColumns : string[] = [
      'Name',
      'Played Tournaments',
      'Total Score',
      'Earned Coins'
    ];
    dataSource : IPlayer[] = [];
    categories : ICategories[] = [];
    tournaments : ITournaments[] = [];
    totalCount !: number;

    category = new FormControl('');
    tournament = new FormControl('')
    constructor(
      private http : HttpClient, 
      private authService : AuthService, 
      private categoryService : CategoryService,
      private leaderboardService : LeaderboardService,
      private tournamentService : TournamentService
      ) {
      this.dataSource = [
        {
          playerName : 'Manish Ingale',
          playedTournaments : 50,
          totalScore : 3000,
          earnedCoins : 5000,
        },
        {
          playerName : 'Manish Ingale',
          playedTournaments : 50,
          totalScore : 3000,
          earnedCoins : 5000,
        },
        {
          playerName : 'Manish Ingale',
          playedTournaments : 50,
          totalScore : 3000,
          earnedCoins : 5000,
        },
        {
          playerName : 'Manish Ingale',
          playedTournaments : 50,
          totalScore : 3000,
          earnedCoins : 5000,
        },
        {
          playerName : 'Manish Ingale',
          playedTournaments : 50,
          totalScore : 3000,
          earnedCoins : 5000,
        }
      ];

      this.displayedColumns = Object.keys(this.dataSource[0]);
      this.displayedColumns.push('action');
    }

    ngOnInit(): void {
      this.http.post('admin/leaderboard/getLeaderboardData', {
        userId : this.authService.getUserDetails()?._id
      }).subscribe({
        next : (response : any)=> {
          // alert(response.message)
        }
      })

      this.getCateories();
      this.getTournaments();

      this.category.valueChanges.subscribe({
        next : (value)=>{
          this.getTournaments();
        },
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
}
