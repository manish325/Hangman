import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAction } from 'src/app/core/models/action';
import { ICategories, IPlayer } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';
import { PlayerService } from 'src/app/core/services/admin/player/player.service';
import { AddPlayerComponent } from '../../components/dialogs/add-player/add-player.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  searchPlayer = new FormControl('');
  displayedColumns: string[] = [  ];
  dataSource: IPlayer[] = [];
  useColumns: string[] = [
    'Player Name',
    'Tournaments Played',
    'Tournaments Created',
    'Total Score',
    'Earned Coins',
    'password'
  ];
  pageNumber : number = 0;
  status : boolean = true;
  sortManner : 0 | 1 = 1;
  totalCount !: number;

  constructor(private playerService : PlayerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllPlayers();
    this.playerSearch();
  }

  openPlayerDialog(role : 'add' | 'edit') {
    this.dialog.open(AddPlayerComponent, {
      data : {}
    }).afterClosed().subscribe({
      next : ()=>{
        this.getAllPlayers();
      }
    })
  }

  openConfirmationDialog(player: IPlayer) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: player
    }).afterClosed().subscribe({
      next: (response ? : any) => {
        if(response==='yes') {
          this.playerService.changePlayerStatus(player).subscribe({
            next : (response ? : any)=>{
              this.getAllPlayers();
            }
          })
        }
      }
    })
  }

  handleTabChange(event : MatTabChangeEvent) {
    this.pageNumber = 0;
    switch(event.index) {
      case 0 : 
      this.status = true;
      this.getAllPlayers();
      break;
      case 1 : 
      this.status = false;
      this.getAllPlayers();
      break;
    }
  }

  handleAction(event: IAction<IPlayer>) {
    if (event.actionType === 'delete') {
      this.openConfirmationDialog(event.element);
    }
  }

  getAllPlayers() {
    const payload : IPagination = {
      searchText : this.searchPlayer.value || '',
      pageSize : 10,
      pageNumber : this.pageNumber,
      sortManner : this.sortManner,
      status : this.status
    };

    this.playerService.getAllPlayers(payload).subscribe({
      next : (response : IResponse<IPlayer>)=>{
        try {

          this.totalCount = response.totalCount;
          this.dataSource = response.data;
          if(this.dataSource.length) {
            this.displayedColumns = Object.keys(this.dataSource[0]).filter(k=>!k.includes('Id'));
          this.displayedColumns.push('action');
          console.log(this.displayedColumns)
        }
      } catch(e) {
        alert(e)
      }
      }
    })
  }

  playerSearch() {
    this.searchPlayer.valueChanges.subscribe({
      next : ()=>{
        this.getAllPlayers();
      }
    })
  }

  handlePagination(pageDetails : IPagination) {
    this.pageNumber = pageDetails.pageNumber || 0;
    this.getAllPlayers();
  }
}
