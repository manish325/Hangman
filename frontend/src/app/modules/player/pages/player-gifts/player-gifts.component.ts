import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { IGifts } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { GiftService } from 'src/app/core/services/admin/gifts/gift.service';

@Component({
  selector: 'app-player-gifts',
  templateUrl: './player-gifts.component.html',
  styleUrls: ['./player-gifts.component.scss']
})
export class PlayerGiftsComponent implements OnInit {
  gifts : IGifts[] = [];
  giftsToClaim : IGifts[] = [];
  totalCount : number = 0;
  tabChanged : boolean = false;
  giftQuantityArray !: FormArray;
  playerAvailableCoins : number = 0;
  amountClaimed : number = 0;
  claimedGifts : any = {};
  claimedGiftsList : {
    giftId : string,
    quantity : number,
    giftName : string
  }[] = []
  constructor(private giftService : GiftService, private formBuilder : FormBuilder) {
    this.giftQuantityArray = formBuilder.array([]);
  }
  ngOnInit(): void {
    this.getAllGifts();
    this.getAllGiftsToClaim();
  }
  
  getAllGifts() {
    this.giftService.getAllAvailableGifts().subscribe({
      next : (response : IResponse<IGifts>)=>{
        this.gifts = response.data;
        this.totalCount = response.totalCount;
      }
    })
  }

  getAllGiftsToClaim() {
    this.giftService.getGiftsToClaim().subscribe({
      next : (response : IResponse<IGifts>)=>{
        this.giftsToClaim = response.data;
        this.playerAvailableCoins = Math.floor(response.availableCoins || 0);
        this.createValueControls();
      }
    })
  }

  handleTabChange() {
    this.tabChanged = !this.tabChanged;
    if(!this.tabChanged) {
      this.getAllGiftsToClaim
    } else {
      this.getAllGifts();
    }
  }

  createValueControls() {
    this.giftsToClaim.map(G=>{
      const quantityControl = new FormControl(0);
      this.giftQuantityArray.controls.push(quantityControl);
    })
  }

  increaseGiftQuantity(gift : IGifts, giftControl : FormControl)  {
    const amount = (this.playerAvailableCoins - this.amountClaimed)-parseInt(gift.giftValue);
    if(amount >=0) {
      this.amountClaimed += parseInt(gift.giftValue);
      giftControl.patchValue(giftControl.value + 1);
      if(this.claimedGifts[gift.giftId || '']) {
        this.claimedGifts[gift.giftId || ''].quantity +=1;
      } else {
        this.claimedGifts[gift.giftId || ''] = {
          giftId : gift.giftId,
          quantity : 1,
          giftName : gift.giftName
        }
      }
      this.prepareClaimedGifts();
    }
  }

  decreaseGiftQuantity(gift : IGifts, giftControl : FormControl) {
    if(this.claimedGifts[gift.giftId || ''].quantity) {
      this.claimedGifts[gift.giftId || ''].quantity -= 1;
      this.amountClaimed -= parseInt(gift.giftValue);
      giftControl.patchValue(giftControl.value - 1);

      if(this.claimedGifts[gift.giftId || ''].quantity === 0) {
          delete this.claimedGifts[gift.giftId || ''];
      }
      this.prepareClaimedGifts();
    }
  }

  prepareClaimedGifts() {
    this.claimedGiftsList = [];
    for(let gift in this.claimedGifts) {
      this.claimedGiftsList.push(this.claimedGifts[gift]);
    }
  }

  claimGifts() {
    const giftsToClaim = this.claimedGiftsList.map(G=>{
      return {
        giftId : G.giftId,
        quantity : G.quantity
      }
    });
    console.clear();
    console.log(giftsToClaim);
    this.giftService.claimGifts(giftsToClaim).subscribe({
      next : (response)=>{
        this.giftsToClaim = [];
        this.giftQuantityArray = this.formBuilder.array([]);
        this.playerAvailableCoins = 0;
        this.amountClaimed = 0;
        this.claimedGifts = {};
        this.claimedGiftsList = [];
        this.getAllGiftsToClaim();
      }
    })
  }
}
