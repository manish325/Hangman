import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAction } from 'src/app/core/models/action';
import { IGifts } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';
import { GiftService } from 'src/app/core/services/admin/gifts/gift.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddGiftComponent } from '../../components/dialogs/add-gift/add-gift.component';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.scss']
})
export class GiftsComponent implements OnInit {
  displayedColumns: string[] = [
    'giftName',
    'giftValue',
    'quantity',
    'action'
  ];
  dataSource: IGifts[] = [];
  useColumns: string[] = [
    'Name',
    'Coins',
    'Quantity'
  ];

  searchGift  = new FormControl('');
  pageNumber : number = 0;
  status : boolean = true;
  sortManner : 0 | 1 = 1;
  totalCount !: number;

  constructor(private giftService : GiftService , private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllGifts();
    this.giftSearch();
  }

  getAllGifts() {
    const payload : IPagination = {
      searchText : this.searchGift.value || '',
      pageSize : 10,
      pageNumber : this.pageNumber,
      sortManner : this.sortManner,
      status : this.status
    }

    this.giftService.getAllGifts(payload).subscribe({
      next : (response : IResponse<IGifts>)=>{
        this.totalCount = response.totalCount;
        this.dataSource = response.data;
      }
    })
  }

  openGiftDialog(mode : 'add' | 'edit', gift ? : IGifts) {
    this.dialog.open(AddGiftComponent, {
      data: {
        mode,
        gift : gift
      }
    }).afterClosed().subscribe({
      next: (response ? : any) => {
        if(response) {
          this.giftService.addGift(response.giftData as IGifts).subscribe({
            next : (response)=>{
              this.getAllGifts();
            }
          })
        }
      }
    })
  }

  openConfirmationDialog(gift: IGifts) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: gift
    }).afterClosed().subscribe({
      next: (response ? : any) => {
        if(response==='yes') {
          this.giftService.changeGiftStatus(gift).subscribe({
            next : (response ? : any)=>{
              this.getAllGifts();
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
      this.getAllGifts();
      break;
      case 1 : 
      this.status = false;
      this.getAllGifts();
      break;
    }
  }

  handleAction(event: IAction<IGifts>) {
    if (event.actionType === 'edit')
      this.openGiftDialog('edit', event.element);
    else if (event.actionType === 'delete') {
      this.openConfirmationDialog(event.element);
    }
  }

  giftSearch() {
    this.searchGift.valueChanges.subscribe({
      next : (value)=>{
        this.getAllGifts();
      }
    })
  }

  handlePagination(pageDetails : IPagination) {
    this.pageNumber = pageDetails.pageNumber || 0;
    this.getAllGifts();
  }
}
