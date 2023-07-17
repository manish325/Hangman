import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IAction } from 'src/app/core/models/action';
import { ICategories, IGetTournaments, IPlayer, ITournaments } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';
import { CategoryService } from 'src/app/core/services/admin/category/category.service';
import { TournamentService } from 'src/app/core/services/admin/tournament/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {
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
  categories : ICategories[] = [];
  players : IPlayer[] = [];
  category = new FormControl('');
  player = new FormControl('')
  pageNumber : number = 0;
  status : boolean = true;
  sortManner : 0 | 1 = 1;
  searchTournament  = new FormControl('');
  tournamentStatus : 0|1|-1 = 1;
  totalCount !: number;

  constructor(
    private categoryService: CategoryService, 
    private tournamentService : TournamentService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getCateories();
    this.getTournaments();
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
  this.player.reset();
}

getTournaments() {
  const payload : IGetTournaments = {
    searchText : this.searchTournament.value || '',
    pageNumber : this.pageNumber,
    pageSize : 10,
    filter : {
      category : this.category.value || '',
      player : this.player.value || ''
    },
    tournamentStatus : this.tournamentStatus,
    sortManner : 1,
  }

  this.tournamentService.getTournaments(payload).subscribe({
    next : (response : IResponse<ITournaments>) =>{
      this.totalCount = response.totalCount;
        this.dataSource = response.data;
    }
  })
}

}
