import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGifts } from 'src/app/core/models/admin.model';
import { IResponse } from 'src/app/core/models/auth.models';
import { IPagination } from 'src/app/core/models/paginator';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private http : HttpClient) { }

  getAllGifts(payload : IPagination) : Observable<IResponse<IGifts>> {
      return this.http.post('admin/gifts/getAllGifts', payload) as Observable<IResponse<IGifts>>;
  }

  updateGift(gift : IGifts) {
      return this.http.put('admin/gifts/updateGift'+'/'+ gift.giftId, gift)
  }

  changeGiftStatus(gift : IGifts) {
    return this.http.delete(`admin/gifts/changeGiftStatus/${gift.giftId}`)
  }

  addGift(gift : IGifts) {
      return this.http.post('admin/gifts/addGift', gift)
  }

  getAllAvailableGifts() : Observable<IResponse<IGifts>> {
    return this.http.get('player/gifts/getAllAvailableGifts') as Observable<IResponse<IGifts>>;
  }

  getGiftsToClaim() : Observable<IResponse<IGifts>> {
    return this.http.get('player/gifts/getGiftsToClaim') as Observable<IResponse<IGifts>>;
  }

  claimGifts(payload : {giftId : string, quantity : number}[]) {
    return this.http.post('player/gifts/claimGifts', payload);
  }
}
